import Link from "next/link";
import { ExternalLinkIcon, LogOutIcon } from "lucide-react";

import { logout } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <>
      <header className="sticky top-0 z-20 border-b bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4">
          <Link href="/admin" className="flex items-baseline gap-2 font-medium tracking-tight">
            Studio Cabines
            <span className="text-xs font-normal text-muted-foreground">Backoffice</span>
          </Link>
          <div className="flex items-center gap-1">
            <Button asChild variant="ghost" size="sm">
              <a href="/" target="_blank" rel="noreferrer">
                <ExternalLinkIcon aria-hidden />
                <span className="max-sm:sr-only">Voir le site</span>
              </a>
            </Button>
            <form action={logout}>
              <Button type="submit" variant="ghost" size="sm">
                <LogOutIcon aria-hidden />
                <span className="max-sm:sr-only">Déconnexion</span>
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main id="main" className="mx-auto max-w-5xl px-4 py-8 sm:py-10">
        {children}
      </main>
    </>
  );
}
