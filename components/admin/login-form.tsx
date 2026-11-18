"use client";

import { useActionState } from "react";

import { login, type FormState } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(login, {});

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? "password-error" : undefined}
        />
        {state.error && (
          <p id="password-error" role="alert" className="text-sm text-destructive">
            {state.error}
          </p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Connexion…" : "Se connecter"}
      </Button>
    </form>
  );
}
