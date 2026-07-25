"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Video } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ResultsDashboard } from "@/components/results/results-dashboard";
import { LoadingState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { fetchPublicDemo } from "@/lib/api";
import { getLocalDemoPayload } from "@/lib/demo-fixture";
import { useT } from "@/lib/i18n/preferences-context";
import type { AnalysisFormData, AnalysisResult, RagSource } from "@/types/analysis";

export default function DemoPage() {
  const t = useT();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [formData, setFormData] = useState<AnalysisFormData | null>(null);
  const [ragSources, setRagSources] = useState<RagSource[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const demo = await fetchPublicDemo();
        if (cancelled) return;
        setResult(demo.data);
        setFormData(demo.formData);
        setRagSources(demo.ragSources ?? []);
      } catch {
        if (cancelled) return;
        const local = getLocalDemoPayload();
        setResult(local.data);
        setFormData(local.formData);
        setRagSources(local.ragSources);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-700 dark:text-brand-400">
                {t("demo.kicker")}
              </p>
              <h1 className="mt-2 font-display text-3xl font-semibold text-lab-ink dark:text-white">
                {t("demo.title")}
              </h1>
              <p className="mt-2 max-w-xl text-slate-500 dark:text-slate-400">{t("demo.subtitle")}</p>
            </div>
            <Link href="/signup">
              <Button>{t("demo.ctaSignup")}</Button>
            </Link>
            <Link href="/results/demo-public/talk">
              <Button variant="outline" className="gap-2">
                <Video className="h-4 w-4" />
                {t("demo.ctaTalk")}
              </Button>
            </Link>
          </div>
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
              {error}
            </div>
          )}
          {!result ? (
            <LoadingState label={t("demo.loading")} />
          ) : (
            <ResultsDashboard
              result={result}
              productName={formData?.productName}
              formData={formData}
              source="mock"
              ragSources={ragSources}
              analysisId="demo-public"
            />
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
