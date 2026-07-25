"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/supabase/auth-context";
import { usePreferences, useT } from "@/lib/i18n/preferences-context";

export function SignupForm() {
  const { signUp, signInWithOAuth, configured } = useAuth();
  const router = useRouter();
  const t = useT();
  const { locale } = usePreferences();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    const { error: authError } = await signUp(email.trim(), password);
    setLoading(false);
    if (authError) {
      setError(authError);
      return;
    }
    setMessage(
      locale === "en"
        ? "Signup successful. If email confirmation is on, check your inbox; otherwise you can log in."
        : "Kayıt başarılı. E-posta onayı açıksa gelen kutunuzu kontrol edin; değilse giriş yapabilirsiniz."
    );
    setTimeout(() => router.replace("/login"), 1200);
  }

  async function handleOAuth(provider: "google" | "github") {
    setError(null);
    const { error: authError } = await signInWithOAuth(provider, { next: "/analyze" });
    if (authError) setError(authError);
  }

  return (
    <Card className="w-full max-w-md border-slate-200/80 shadow-lg shadow-brand-500/5 dark:border-white/10">
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-lab-ink text-lab-signal dark:bg-lab-signal dark:text-[#0c1222]">
          <Sparkles className="h-5 w-5" />
        </div>
        <CardTitle className="text-2xl">{t("auth.signupTitle")}</CardTitle>
        <CardDescription>{t("auth.signupDesc")}</CardDescription>
      </CardHeader>
      <CardContent>
        {!configured ? (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100">
            {t("auth.supabaseMissing")}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@mail.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={locale === "en" ? "At least 6 characters" : "En az 6 karakter"}
              />
            </div>
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
                {error}
              </div>
            )}
            {message && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
                {message}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {t("auth.submitSignup")}
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button type="button" variant="outline" onClick={() => handleOAuth("google")}>
                Google
              </Button>
              <Button type="button" variant="outline" onClick={() => handleOAuth("github")}>
                GitHub
              </Button>
            </div>
            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              {t("auth.hasAccount")}{" "}
              <Link href="/login" className="font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
                {t("nav.login")}
              </Link>
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
