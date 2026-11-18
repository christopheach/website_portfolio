import { Spinner } from "@/components/ui/spinner";

/** Shown while an admin page loads its projects from the database. */
export default function AdminLoading() {
  return (
    <div className="grid min-h-[50dvh] place-items-center">
      <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
        <Spinner size="lg" tone="primary" label="" />
        <p role="status">Chargement des projets…</p>
      </div>
    </div>
  );
}
