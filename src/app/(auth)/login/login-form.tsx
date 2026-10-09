"use client";

import { useActionState } from "react";
import { Loader2, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { loginAction, type LoginActionResult } from "./actions";

interface LoginFormProps {
  callbackUrl: string;
  isDemoMode: boolean;
}

const initialState: LoginActionResult = {};

export function LoginForm({ callbackUrl, isDemoMode }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <Card>
      <CardContent className="pt-6">
        <form action={formAction} className="flex flex-col gap-4">
          <input type="hidden" name="callbackUrl" value={callbackUrl} />

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">E-posta</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="ornek@kargovo.com"
              defaultValue={isDemoMode ? "demo@kargovo.com" : ""}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Parola</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              defaultValue={isDemoMode ? "demo1234" : ""}
              required
            />
          </div>

          {state?.error ? (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {state.error}
            </p>
          ) : null}

          <Button type="submit" disabled={isPending} className="mt-1 w-full">
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogIn className="h-4 w-4" />
            )}
            Giriş Yap
          </Button>

          {isDemoMode ? (
            <p className="text-center text-xs text-muted-foreground">
              Veritabanı yapılandırılmadığı için <strong>demo giriş</strong>{" "}
              bilgileri otomatik dolduruldu. Gerçek kullanıcı hesapları için{" "}
              <code className="rounded bg-muted px-1 py-0.5">.env</code>{" "}
              içinde <code className="rounded bg-muted px-1 py-0.5">DATABASE_URL</code>{" "}
              tanımlayın.
            </p>
          ) : null}
        </form>
      </CardContent>
    </Card>
  );
}
