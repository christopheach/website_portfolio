import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProject } from "@/lib/projects";
import { ProjectForm } from "@/components/admin/project-form";

export const metadata: Metadata = { title: "Modifier le projet" };

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-medium tracking-tight">Modifier « {project.title} »</h1>
      <ProjectForm key={project.updatedAt} project={project} />
    </div>
  );
}
