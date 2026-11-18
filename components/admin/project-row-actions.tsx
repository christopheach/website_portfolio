"use client";

import { useTransition } from "react";
import Link from "next/link";
import { ArrowDownIcon, ArrowUpIcon, EyeIcon, EyeOffIcon, PencilIcon, Trash2Icon } from "lucide-react";

import { removeProject, reorderProject, togglePublished } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";

type Props = { id: string; title: string; published: boolean; isFirst: boolean; isLast: boolean };

export function ProjectRowActions({ id, title, published, isFirst, isLast }: Props) {
  const [pending, startTransition] = useTransition();
  const run = (action: () => Promise<void>) => startTransition(action);

  return (
    <div className="flex shrink-0 flex-wrap items-center justify-end gap-0.5" aria-busy={pending}>
      <Button
        variant="ghost"
        size="icon-sm"
        disabled={pending || isFirst}
        onClick={() => run(() => reorderProject(id, "up"))}
        aria-label={`Monter « ${title} »`}
        title="Monter"
      >
        <ArrowUpIcon />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        disabled={pending || isLast}
        onClick={() => run(() => reorderProject(id, "down"))}
        aria-label={`Descendre « ${title} »`}
        title="Descendre"
      >
        <ArrowDownIcon />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        disabled={pending}
        onClick={() => run(() => togglePublished(id))}
        aria-label={published ? `Masquer « ${title} » du site` : `Publier « ${title} »`}
        title={published ? "Masquer du site" : "Publier"}
      >
        {published ? <EyeIcon /> : <EyeOffIcon />}
      </Button>
      <Button asChild variant="ghost" size="icon-sm" aria-label={`Modifier « ${title} »`} title="Modifier">
        <Link href={`/admin/projects/${id}`}>
          <PencilIcon />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        disabled={pending}
        className="hover:text-destructive"
        onClick={() => {
          if (window.confirm(`Supprimer « ${title} » ? Ses images seront aussi supprimées.`)) {
            run(() => removeProject(id));
          }
        }}
        aria-label={`Supprimer « ${title} »`}
        title="Supprimer"
      >
        <Trash2Icon />
      </Button>
    </div>
  );
}
