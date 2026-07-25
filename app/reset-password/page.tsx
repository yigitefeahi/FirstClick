"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/supabase/auth-context";
import { useT } from "@/lib/i18n/preferences-context";

export default function ResetPasswordPage() {
  const { updatePassword, configured } = useAuth();
  const router = useRouter();
  const t = useT();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: err } = await updatePassword(password);
    setLoading(false);
    if (err) {
      setError(err);
      return;
    }
    router.replace("/analyze");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md dark:border-white/10 dark:bg-surface">
          <CardHeader>
            <CardTitle className="dark:text-white">{t("auth.resetTitle")}</CardTitle>
            <CardDescription className="dark:text-slate-400">{t("auth.resetDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            {!configured ? (
              <p className="text-sm text-amber-800 dark:text-amber-200">{t("auth.supabaseMissing")}</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">{t("auth.resetPasswordLabel")}</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {t("auth.resetSubmit")}
                </Button>
                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                  <Link href="/login" className="text-brand-700 dark:text-brand-400">
                    {t("auth.resetBackLogin")}
                  </Link>
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
