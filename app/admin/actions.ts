"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createSession, destroySession, isPasswordValid, requireAdmin } from "@/lib/auth";
import { createProject, deleteProject, moveProject, toggleProjectPublished, updateProject } from "@/lib/projects";
import { getVideoEmbed } from "@/lib/video-embed";
import { deleteFromZiplineQuietly } from "@/lib/zipline";
import type { WorkCategory } from "@/types/content";
import type { ProjectInput } from "@/types/project";

export type FormState = { error?: string; fieldErrors?: Partial<Record<string, string>> };

/* ------------------------------------------------------------------ */
/* Session                                                             */
/* ------------------------------------------------------------------ */

export async function login(_state: FormState, formData: FormData): Promise<FormState> {
  const password = String(formData.get("password") ?? "");
  if (!isPasswordValid(password)) {
    // Slows down password guessing.
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { error: "Mot de passe incorrect." };
  }
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

const CATEGORIES: WorkCategory[] = ["photo", "film"];

/** Only accept image URLs served by our own Zipline instance. */
function isZiplineUrl(value: string) {
  const base = process.env.ZIPLINE_URL?.replace(/\/+$/, "");
  return Boolean(base) && value.startsWith(`${base}/raw/`);
}

function parseProject(formData: FormData): { input?: ProjectInput; fieldErrors?: FormState["fieldErrors"] } {
  const text = (name: string) => String(formData.get(name) ?? "").trim();
  const fieldErrors: NonNullable<FormState["fieldErrors"]> = {};

  const title = text("title");
  const category = text("category") as WorkCategory;
  const clientName = text("clientName");
  const duration = text("duration");
  const href = text("href");
  const coverUrl = text("coverUrl");
  const avatarUrl = text("avatarUrl");

  if (!title) fieldErrors.title = "Le titre est obligatoire.";
  else if (title.length > 120) fieldErrors.title = "120 caractères maximum.";
  if (!CATEGORIES.includes(category)) fieldErrors.category = "Choisissez Photo ou Vidéo.";
  if (!clientName) fieldErrors.clientName = "Le nom du client est obligatoire.";
  else if (clientName.length > 80) fieldErrors.clientName = "80 caractères maximum.";
  if (!coverUrl) fieldErrors.cover = "Ajoutez une image de couverture.";
  else if (!isZiplineUrl(coverUrl)) fieldErrors.cover = "Image invalide, renvoyez-la.";
  if (avatarUrl && !isZiplineUrl(avatarUrl)) fieldErrors.avatar = "Logo invalide, renvoyez-le.";
  if (category === "film" && duration && !/^(\d{1,2}:)?\d{1,2}:\d{2}$/.test(duration)) {
    fieldErrors.duration = "Format attendu : 1:05 ou 1:02:30.";
  }
  if (href && !/^(https?:\/\/|\/|#)/.test(href)) fieldErrors.href = "Le lien doit commencer par https://";
  else if (category === "film" && href && !getVideoEmbed(href)) {
    fieldErrors.href = "Lien vidéo non reconnu : utilisez un lien YouTube, Vimeo ou un fichier .mp4.";
  }

  if (Object.keys(fieldErrors).length > 0) return { fieldErrors };

  return {
    input: {
      title,
      category,
      client: {
        name: clientName,
        verified: formData.get("clientVerified") === "on",
        avatar: avatarUrl ? { url: avatarUrl, fileId: text("avatarFileId") || undefined } : undefined,
      },
      cover: { url: coverUrl, fileId: text("coverFileId") || undefined, alt: text("coverAlt") || title },
      duration: category === "film" ? duration || undefined : undefined,
      href: href || undefined,
      published: formData.get("published") === "on",
    },
  };
}

export async function saveProject(id: string | null, _state: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

  const { input, fieldErrors } = parseProject(formData);
  if (!input) return { error: "Corrigez les champs indiqués.", fieldErrors };

  if (id) {
    const previous = await updateProject(id, input);
    if (!previous) return { error: "Ce projet n'existe plus." };
    // Remove images that were replaced so Zipline doesn't fill up with orphans.
    await deleteFromZiplineQuietly([
      previous.cover.fileId !== input.cover.fileId ? previous.cover.fileId : undefined,
      previous.client.avatar?.fileId !== input.client.avatar?.fileId ? previous.client.avatar?.fileId : undefined,
    ]);
  } else {
    await createProject(input);
  }

  revalidatePath("/");
  redirect("/admin");
}

export async function removeProject(id: string) {
  await requireAdmin();
  const removed = await deleteProject(id);
  if (removed) await deleteFromZiplineQuietly([removed.cover.fileId, removed.client.avatar?.fileId]);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function reorderProject(id: string, direction: "up" | "down") {
  await requireAdmin();
  await moveProject(id, direction);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function togglePublished(id: string) {
  await requireAdmin();
  await toggleProjectPublished(id);
  revalidatePath("/");
  revalidatePath("/admin");
}
