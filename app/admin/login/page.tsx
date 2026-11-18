import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = { title: "Connexion" };

export default async function LoginPage() {
  if (await isAuthenticated()) redirect("/admin");

  return (
    <main id="main" className="grid min-h-dvh place-items-center px-4">
      <Card className="w-full max-w-sm">
        <div className="space-y-1.5">
          <p className="text-xs font-medium tracking-wide text-primary uppercase">Studio Cabines</p>
          <h1 className="text-xl font-medium tracking-tight">Backoffice</h1>
          <p className="text-sm text-muted-foreground">Connectez-vous pour gérer vos projets.</p>
        </div>
        <LoginForm />
      </Card>
    </main>
  );
}
