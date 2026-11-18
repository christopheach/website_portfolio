import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheckIcon, ImageIcon, PlusIcon } from "lucide-react";

import { listProjects } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProjectRowActions } from "@/components/admin/project-row-actions";

export const metadata: Metadata = { title: "Projets" };

export default async function AdminProjectsPage() {
  const projects = await listProjects();
  const publishedCount = projects.filter((project) => project.published).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-medium tracking-tight">Projets</h1>
          <p className="text-sm text-muted-foreground">
            {projects.length === 0
              ? "Les projets ajoutés ici apparaissent dans la section « Projets » du site."
              : `${publishedCount} publié${publishedCount > 1 ? "s" : ""} sur ${projects.length}. L'ordre ci-dessous est celui du site.`}
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">
            <PlusIcon aria-hidden />
            Nouveau projet
          </Link>
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card variant="muted" className="items-center py-14 text-center">
          <ImageIcon aria-hidden className="size-8 text-muted-foreground" />
          <div className="space-y-1">
            <p className="font-medium">Aucun projet pour l&apos;instant</p>
            <p className="text-sm text-muted-foreground">
              Tant qu&apos;aucun projet n&apos;est publié, le site affiche les projets d&apos;exemple.
            </p>
          </div>
        </Card>
      ) : (
        <ul className="space-y-3">
          {projects.map((project, index) => (
            <li key={project.id}>
              <Card size="none" className="flex-row items-center gap-4 p-3">
                <img
                  src={project.cover.url}
                  alt=""
                  className="aspect-[4/5] w-14 shrink-0 rounded-md bg-muted object-cover"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/admin/projects/${project.id}`} className="truncate font-medium hover:underline">
                      {project.title}
                    </Link>
                    <Badge variant="secondary" size="sm">
                      {project.category === "film" ? "Vidéo" : "Photo"}
                    </Badge>
                    {!project.published && (
                      <Badge variant="outline" size="sm" className="text-muted-foreground">
                        Masqué
                      </Badge>
                    )}
                  </div>
                  <p className="flex items-center gap-1 truncate text-sm text-muted-foreground">
                    {project.client.name}
                    {project.client.verified && <BadgeCheckIcon aria-label="Client vérifié" className="size-3.5 text-primary" />}
                  </p>
                </div>
                <ProjectRowActions
                  id={project.id}
                  title={project.title}
                  published={project.published}
                  isFirst={index === 0}
                  isLast={index === projects.length - 1}
                />
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
