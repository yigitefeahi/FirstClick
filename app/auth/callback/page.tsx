"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

function AuthCallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Giriş tamamlanıyor…");

  useEffect(() => {
    let cancelled = false;

    async function finish() {
      const supabase = getSupabaseBrowserClient();
      const nextRaw = searchParams.get("next") || "/analyze";
      const next = nextRaw.startsWith("/") ? nextRaw : "/analyze";
      const code = searchParams.get("code");
      const oauthError = searchParams.get("error_description") || searchParams.get("error");

      if (oauthError) {
        if (!cancelled) {
          setMessage(oauthError);
          router.replace(`/login?error=${encodeURIComponent(oauthError)}`);
        }
        return;
      }

      if (!supabase) {
        if (!cancelled) router.replace("/login");
        return;
      }

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          if (!cancelled) {
            setMessage(error.message);
            router.replace(`/login?error=${encodeURIComponent(error.message)}`);
          }
          return;
        }
      } else {
        // Implicit / hash fragment or already-exchanged session
        const { data } = await supabase.auth.getSession();
        if (!data.session) {
          if (!cancelled) {
            setMessage("Oturum alınamadı.");
            router.replace("/login");
          }
          return;
        }
      }

      if (!cancelled) router.replace(next);
    }

    void finish();
    return () => {
      cancelled = true;
    };
  }, [router, searchParams]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4 text-sm text-slate-500">
      {message}
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center px-4 text-sm text-slate-500">
          Giriş tamamlanıyor…
        </div>
      }
    >
      <AuthCallbackInner />
    </Suspense>
  );
}
