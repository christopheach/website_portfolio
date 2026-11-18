import type { ProjectKind, WorkCategory } from "@/types/content";

/** A file stored on Zipline. `fileId` lets the backoffice delete it when it is replaced. */
export type StoredMedia = {
  url: string;
  fileId?: string;
};

/** A project managed from the backoffice (/admin) and shown in the "Projets" section. */
export type Project = {
  id: string;
  title: string;
  category: WorkCategory;
  kind: ProjectKind;
  /** Only meaningful for client projects. */
  client: {
    name?: string;
    verified: boolean;
    avatar?: StoredMedia;
  };
  cover: StoredMedia & { alt: string };
  /** Film projects only, e.g. "1:05". */
  duration?: string;
  /** Optional link opened when the card is clicked (YouTube, Instagram, case study…). */
  href?: string;
  /** Hidden projects stay in the backoffice but are not shown on the site. */
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

/** Fields the backoffice form edits. */
export type ProjectInput = Omit<Project, "id" | "createdAt" | "updatedAt">;
