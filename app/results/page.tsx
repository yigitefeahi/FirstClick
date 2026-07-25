"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LoadingState } from "@/components/ui/empty-state";
import { STORAGE_KEYS } from "@/lib/constants";
import { useT } from "@/lib/i18n/preferences-context";

/** Legacy /results → redirect to /results/[id] when possible. */
export default function ResultsRedirectPage() {
  const router = useRouter();
  const t = useT();

  useEffect(() => {
    const id = sessionStorage.getItem(STORAGE_KEYS.analysisId);
    if (id) {
      router.replace(`/results/${id}`);
      return;
    }
    router.replace("/analyze");
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <LoadingState label={t("results.redirecting")} />
      </main>
      <SiteFooter />
    </div>
  );
}
