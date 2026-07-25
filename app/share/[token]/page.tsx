"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ResultsDashboard } from "@/components/results/results-dashboard";
import { LoadingState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { getSharedAnalysis } from "@/lib/api";
import { useT } from "@/lib/i18n/preferences-context";
import type { AnalysisFormData, AnalysisResult, RagSource } from "@/types/analysis";

export default function SharePage() {
  const t = useT();
  const params = useParams<{ token: string }>();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [formData, setFormData] = useState<AnalysisFormData | null>(null);
  const [ragSources, setRagSources] = useState<RagSource[]>([]);
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [source, setSource] = useState<"openai" | "mock">("mock");
  const [readOnly, setReadOnly] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const detail = await getSharedAnalysis(params.token);
        if (cancelled) return;
        setResult(detail.result as AnalysisResult);
        setFormData(detail.formData);
        setRagSources(detail.ragSources ?? []);
        setAnalysisId(detail.id);
        setSource(detail.source);
        setReadOnly(Boolean(detail.readOnly ?? true));
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : t("common.errorShareOpenFailed"));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [params.token]);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Badge variant="neutral">{t("share.badge")}</Badge>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t("share.hint")}</p>
          </div>
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-6 text-center text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
              <p>{error}</p>
              <Link href="/" className="mt-3 inline-block text-brand-700 underline dark:text-brand-400">
                {t("share.home")}
              </Link>
            </div>
          )}
          {!error && !result && <LoadingState label={t("share.loading")} />}
          {result && (
            <ResultsDashboard
              result={result}
              productName={formData?.productName}
              formData={formData}
              source={source}
              ragSources={ragSources}
              analysisId={analysisId}
              readOnly={readOnly}
            />
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
