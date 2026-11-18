"use client";

import { startTransition, useActionState, useState } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "lucide-react";

import { saveProject, type FormState } from "@/app/admin/actions";
import type { ProjectKind, WorkCategory } from "@/types/content";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ImageUpload } from "@/components/admin/image-upload";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm text-destructive">
      {message}
    </p>
  );
}

function Checkbox({ name, label, description, defaultChecked }: { name: string; label: string; description: string; defaultChecked: boolean }) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="mt-0.5 size-4 accent-primary" />
      <span className="space-y-0.5">
        <span className="block text-sm font-medium">{label}</span>
        <span className="block text-xs text-muted-foreground">{description}</span>
      </span>
    </label>
  );
}

export function ProjectForm({ project }: { project?: Project }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    saveProject.bind(null, project?.id ?? null),
    {},
  );
  const [category, setCategory] = useState<WorkCategory>(project?.category ?? "photo");
  const [kind, setKind] = useState<ProjectKind>(project?.kind ?? "client");
  const [uploads, setUploads] = useState(0);
  const errors = state.fieldErrors ?? {};
  const busy = pending || uploads > 0;
  const trackUpload = (uploading: boolean) => setUploads((count) => count + (uploading ? 1 : -1));

  return (
    <form
      // Submitting through onSubmit keeps the typed values if the server returns validation errors
      // (a plain `action` would reset the form).
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(() => formAction(formData));
      }}
      className="space-y-6"
      noValidate
    >
      <Card className="gap-5">
        <h2 className="font-medium">Projet</h2>

        <div className="space-y-2">
          <Label htmlFor="title">Titre</Label>
          <Input
            id="title"
            name="title"
            defaultValue={project?.title}
            placeholder="Lookbook Automne/Hiver 26"
            maxLength={120}
            required
            aria-invalid={errors.title ? true : undefined}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          <FieldError id="title-error" message={errors.title} />
        </div>

        <div className="space-y-2">
          <span id="category-label" className="text-sm font-medium">
            Catégorie
          </span>
          <ToggleGroup
            type="single"
            variant="pill"
            size="sm"
            value={category}
            onValueChange={(value) => value && setCategory(value as WorkCategory)}
            aria-labelledby="category-label"
            className="w-fit"
          >
            <ToggleGroupItem value="photo">Photo</ToggleGroupItem>
            <ToggleGroupItem value="film">Vidéo</ToggleGroupItem>
          </ToggleGroup>
          <input type="hidden" name="category" value={category} />
          <FieldError id="category-error" message={errors.category} />
        </div>

        <div className={cn("grid gap-5", category === "film" && "sm:grid-cols-[1fr_10rem]")}>
          <div className="space-y-2">
            <Label htmlFor="href">{category === "film" ? "Lien de la vidéo" : "Lien (optionnel)"}</Label>
            <Input
              id="href"
              name="href"
              type="url"
              inputMode="url"
              defaultValue={project?.href}
              placeholder={category === "film" ? "https://youtube.com/watch?v=…" : "https://instagram.com/…"}
              aria-invalid={errors.href ? true : undefined}
              aria-describedby="href-hint"
            />
            <p id="href-hint" className="text-xs text-muted-foreground">
              {category === "film"
                ? "Lue dans une fenêtre sur le site. YouTube, Vimeo ou lien direct vers un fichier .mp4."
                : "Bouton « Voir le projet » sous l'image agrandie."}
            </p>
            <FieldError id="href-error" message={errors.href} />
          </div>
          {category === "film" && (
            <div className="space-y-2">
              <Label htmlFor="duration">Durée</Label>
              <Input
                id="duration"
                name="duration"
                defaultValue={project?.duration}
                placeholder="1:05"
                inputMode="numeric"
                aria-invalid={errors.duration ? true : undefined}
                aria-describedby={errors.duration ? "duration-error" : undefined}
              />
              <FieldError id="duration-error" message={errors.duration} />
            </div>
          )}
        </div>
      </Card>

      <Card className="gap-5">
        <h2 className="font-medium">Image de couverture</h2>
        <ImageUpload
          name="cover"
          label="Image"
          hint="Format portrait (4:5) conseillé. JPG, PNG ou WebP, 20 Mo max."
          defaultValue={project?.cover}
          error={errors.cover}
          onUploadingChange={trackUpload}
        />
        <div className="space-y-2">
          <Label htmlFor="coverAlt">Description de l&apos;image</Label>
          <Input
            id="coverAlt"
            name="coverAlt"
            defaultValue={project?.cover.alt}
            placeholder="Mannequin en manteau dans une lumière de fenêtre"
            maxLength={200}
            aria-describedby="coverAlt-hint"
          />
          <p id="coverAlt-hint" className="text-xs text-muted-foreground">
            Pour l&apos;accessibilité et le référencement. Par défaut : le titre du projet.
          </p>
        </div>
      </Card>

      <Card className="gap-5">
        <div className="space-y-2">
          <Label htmlFor="kind">Type de projet</Label>
          <div className="relative">
            <select
              id="kind"
              name="kind"
              value={kind}
              onChange={(event) => setKind(event.target.value as ProjectKind)}
              aria-describedby="kind-hint"
              className="h-10 w-full appearance-none rounded-md border border-input bg-surface pr-9 pl-3 text-sm text-foreground outline-none transition-[border-color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40"
            >
              <option value="client">Projet client</option>
              <option value="personal">Projet personnel</option>
            </select>
            <ChevronDownIcon aria-hidden className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
          </div>
          <p id="kind-hint" className="text-xs text-muted-foreground">
            {kind === "client"
              ? "Réalisé pour un client. Son nom et son logo s'affichent sur la carte s'ils sont renseignés."
              : "Projet du studio : la carte affiche « Projet personnel » avec le logo Studio Cabines."}
          </p>
          <FieldError id="kind-error" message={errors.kind} />
        </div>

        {kind === "client" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="clientName">Nom du client (optionnel)</Label>
              <Input
                id="clientName"
                name="clientName"
                defaultValue={project?.client.name}
                placeholder="Maison Lune"
                maxLength={80}
                aria-invalid={errors.clientName ? true : undefined}
                aria-describedby={errors.clientName ? "clientName-error" : "clientName-hint"}
              />
              <p id="clientName-hint" className="text-xs text-muted-foreground">
                Laissez vide pour afficher « Projet client ».
              </p>
              <FieldError id="clientName-error" message={errors.clientName} />
            </div>
            <ImageUpload
              name="avatar"
              label="Logo ou photo du client (optionnel)"
              hint="Image carrée, affichée en petit à côté du nom."
              shape="round"
              removable
              defaultValue={project?.client.avatar}
              error={errors.avatar}
              onUploadingChange={trackUpload}
            />
            <Checkbox
              name="clientVerified"
              label="Client vérifié"
              description="Affiche le badge de vérification à côté du nom."
              defaultChecked={project?.client.verified ?? true}
            />
          </>
        )}
      </Card>

      <Card className="gap-4">
        <Checkbox
          name="published"
          label="Publier sur le site"
          description="Décochez pour garder le projet en brouillon."
          defaultChecked={project?.published ?? true}
        />
      </Card>

      <div className="flex flex-wrap items-center justify-end gap-3">
        {state.error && (
          <p role="alert" className="mr-auto text-sm text-destructive">
            {state.error}
          </p>
        )}
        <Button asChild variant="ghost">
          <Link href="/admin">Annuler</Link>
        </Button>
        <Button type="submit" disabled={busy}>
          {pending ? "Enregistrement…" : uploads > 0 ? "Envoi de l'image…" : project ? "Enregistrer" : "Créer le projet"}
        </Button>
      </div>
    </form>
  );
}
