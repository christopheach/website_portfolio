import type { Metadata } from "next";

import { ProjectForm } from "@/components/admin/project-form";

export const metadata: Metadata = { title: "Nouveau projet" };

export default function NewProjectPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-medium tracking-tight">Nouveau projet</h1>
      <ProjectForm />
    </div>
  );
}
