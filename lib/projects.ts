import "server-only";

import { randomUUID } from "node:crypto";

import { db, isDatabaseConfigured } from "@/lib/db";
import type { WorkItem } from "@/types/content";
import type { Project, ProjectInput } from "@/types/project";

/**
 * Projects live in Postgres (table `projects`, see db/schema.sql). Images live on Zipline; only their URLs are kept here.
 */

type ProjectRow = {
  id: string;
  title: string;
  category: Project["category"];
  client_name: string;
  client_verified: boolean;
  client_avatar_url: string | null;
  client_avatar_file_id: string | null;
  cover_url: string;
  cover_file_id: string | null;
  cover_alt: string;
  duration: string | null;
  href: string | null;
  published: boolean;
  created_at: Date;
  updated_at: Date;
};

/** Columns the backoffice form can change. */
const COLUMNS = [
  "title",
  "category",
  "client_name",
  "client_verified",
  "client_avatar_url",
  "client_avatar_file_id",
  "cover_url",
  "cover_file_id",
  "cover_alt",
  "duration",
  "href",
  "published",
] as const;

function fromRow(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    client: {
      name: row.client_name,
      verified: row.client_verified,
      avatar: row.client_avatar_url
        ? { url: row.client_avatar_url, fileId: row.client_avatar_file_id ?? undefined }
        : undefined,
    },
    cover: { url: row.cover_url, fileId: row.cover_file_id ?? undefined, alt: row.cover_alt },
    duration: row.duration ?? undefined,
    href: row.href ?? undefined,
    published: row.published,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

function toColumns(input: ProjectInput): Record<(typeof COLUMNS)[number], string | boolean | null> {
  return {
    title: input.title,
    category: input.category,
    client_name: input.client.name,
    client_verified: input.client.verified,
    client_avatar_url: input.client.avatar?.url ?? null,
    client_avatar_file_id: input.client.avatar?.fileId ?? null,
    cover_url: input.cover.url,
    cover_file_id: input.cover.fileId ?? null,
    cover_alt: input.cover.alt,
    duration: input.duration ?? null,
    href: input.href ?? null,
    published: input.published,
  };
}

export async function listProjects() {
  const rows = await db()<ProjectRow[]>`SELECT * FROM projects ORDER BY position, created_at DESC`;
  return rows.map(fromRow);
}

export async function getProject(id: string) {
  const [row] = await db()<ProjectRow[]>`SELECT * FROM projects WHERE id = ${id}`;
  return row ? fromRow(row) : null;
}

export async function createProject(input: ProjectInput) {
  const sql = db();
  // New projects go first, like a portfolio feed. (Ties are ordered by newest, so a race here is harmless.)
  const [{ position }] = await sql<{ position: number }[]>`SELECT COALESCE(MIN(position), 0) - 1 AS position FROM projects`;
  const [row] = await sql<ProjectRow[]>`
    INSERT INTO projects ${sql({ id: randomUUID(), position, ...toColumns(input) })} RETURNING *
  `;
  return fromRow(row);
}

/** Returns the previous version (to clean up replaced files) or null if the project doesn't exist. */
export async function updateProject(id: string, input: ProjectInput) {
  return db().begin(async (sql) => {
    const [previous] = await sql<ProjectRow[]>`SELECT * FROM projects WHERE id = ${id} FOR UPDATE`;
    if (!previous) return null;
    await sql`UPDATE projects SET ${sql(toColumns(input), ...COLUMNS)}, updated_at = now() WHERE id = ${id}`;
    return fromRow(previous);
  });
}

export async function toggleProjectPublished(id: string) {
  await db()`UPDATE projects SET published = NOT published, updated_at = now() WHERE id = ${id}`;
}

/** Returns the deleted project (to clean up its files) or null. */
export async function deleteProject(id: string) {
  const [row] = await db()<ProjectRow[]>`DELETE FROM projects WHERE id = ${id} RETURNING *`;
  return row ? fromRow(row) : null;
}

/** Swaps a project with its neighbour in the display order. */
export async function moveProject(id: string, direction: "up" | "down") {
  return db().begin(async (sql) => {
    // Lock the whole ordering so concurrent moves can't interleave.
    const rows = await sql<{ id: string; position: number }[]>`
      SELECT id, position FROM projects ORDER BY position, created_at DESC FOR UPDATE
    `;
    const from = rows.findIndex((row) => row.id === id);
    const to = direction === "up" ? from - 1 : from + 1;
    if (from === -1 || to < 0 || to >= rows.length) return false;

    // Renumber the list densely so swapping two rows always changes the order (even after ties).
    const order = rows.map((row) => row.id);
    [order[from], order[to]] = [order[to], order[from]];
    const values = order.map((rowId, index) => [rowId, index] as const);
    await sql`
      UPDATE projects SET position = v.position::int
      FROM (VALUES ${sql(values)}) AS v(id, position)
      WHERE projects.id = v.id::uuid
    `;
    return true;
  });
}

export function toWorkItem(project: Project): WorkItem {
  return {
    id: project.id,
    title: project.title,
    category: project.category,
    duration: project.category === "film" ? project.duration : undefined,
    href: project.href,
    client: {
      name: project.client.name,
      verified: project.client.verified,
      // Decorative next to the client name; empty src renders the striped placeholder.
      avatar: { src: project.client.avatar?.url ?? "", alt: "" },
    },
    image: { src: project.cover.url, alt: project.cover.alt },
  };
}

/** Published projects for the home page, or null when none exist yet (the site then keeps its sample projects). */
export async function getPublishedWorkItems(): Promise<WorkItem[] | null> {
  if (!isDatabaseConfigured()) {
    console.warn("[projects] DATABASE_URL is not set: showing the sample projects.");
    return null;
  }
  const rows = await db()<ProjectRow[]>`
    SELECT * FROM projects WHERE published ORDER BY position, created_at DESC
  `;
  return rows.length > 0 ? rows.map(fromRow).map(toWorkItem) : null;
}
