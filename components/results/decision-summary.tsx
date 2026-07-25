"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, GitCompare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { listAnalyses } from "@/lib/api";
import { useAuth } from "@/lib/supabase/auth-context";
import type { AnalysisResult } from "@/types/analysis";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n/preferences-context";
import { localizedPersonaDisplayName } from "@/lib/i18n/persona-labels";

function CitedSnippet({ value }: { value: string }) {
  const parts = value.split(/(\[(?:doc|web|past|kb):[^\]]+\])/g);
  return (
    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
      {parts.map((part, i) =>
        /^\[(?:doc|web|past|kb):/.test(part) ? (
          <Badge key={i} variant="neutral" className="mx-0.5 align-middle font-mono text-[10px]">
            {part}
          </Badge>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  );
}

export function DecisionSummary({
  result,
  productName,
  analysisId,
  productId,
}: {
  result: AnalysisResult;
  productName?: string;
  analysisId?: string | null;
  productId?: string | null;
}) {
  const { getAccessToken } = useAuth();
  const t = useT();
  const [prevId, setPrevId] = useState<string | null>(null);
  const topActions = result.actionPlan.slice(0, 3);
  const blindSpot = result.blindSpots[0];
  const quotePersona = result.personas[0];

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!analysisId) return;
      try {
        const token = await getAccessToken();
        if (!token) return;
        const items = await listAnalyses(token);
        const same = items.filter((a) => {
          if (a.id === analysisId) return false;
          if (productId && a.productId) return a.productId === productId;
          if (productName) return a.productName === productName;
          return true;
        });
        if (!cancelled && same[0]) setPrevId(same[0].id);
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [analysisId, productId, productName, getAccessToken]);

  const riskTone =
    result.onboardingRiskScore >= 60
      ? "text-rose-700 dark:text-rose-400"
      : result.overallScore >= 70
        ? "text-brand-700 dark:text-brand-400"
        : "text-amber-700 dark:text-amber-400";

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/40 dark:border-white/10 dark:bg-surface">
      <div className="grid gap-0 lg:grid-cols-[1fr_1.2fr]">
        <div className="bg-[#0c1222] px-6 py-8 text-white sm:px-8 sm:py-10">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-lab-signal">
            {t("decision.kicker")}
          </p>
          {productName && (
            <p className="mt-3 font-display text-lg text-slate-300">{productName}</p>
          )}
          <p
            className={cn(
              "mt-4 font-display text-6xl font-semibold tabular-nums animate-rise-in",
              result.overallScore >= 70 ? "text-lab-signal" : "text-white"
            )}
          >
            {result.overallScore}
          </p>
          <p className="mt-2 text-sm text-slate-400">{t("decision.overallHint")}</p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs">
            <span className="rounded-md bg-white/10 px-2 py-1">
              {t("decision.clarity")} {result.clarityScore}
            </span>
            <span className="rounded-md bg-white/10 px-2 py-1">
              {t("decision.adoption")} {result.adoptionScore}
            </span>
            <span className={cn("rounded-md bg-white/10 px-2 py-1", riskTone)}>
              {t("decision.onboardingRisk")} {result.onboardingRiskScore}
            </span>
          </div>
        </div>

        <div className="space-y-8 px-6 py-8 sm:px-8 sm:py-10">
          <div className="animate-rise-in" style={{ animationDelay: "80ms" }}>
            <h3 className="font-display text-lg font-semibold text-lab-ink dark:text-white">
              {t("decision.threeThings")}
            </h3>
            <ol className="mt-4 space-y-3">
              {topActions.map((action, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-lab-mist font-mono text-xs font-semibold text-brand-800 dark:bg-lab-signal/20 dark:text-lab-signal">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{action}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="animate-rise-in border-t border-slate-100 pt-6 dark:border-white/10" style={{ animationDelay: "160ms" }}>
            <h3 className="font-display text-lg font-semibold text-lab-ink dark:text-white">
              {t("decision.why")}
            </h3>
            {blindSpot && (
              <p className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-950 dark:bg-amber-500/10 dark:text-amber-100">
                {blindSpot}
              </p>
            )}
            {quotePersona && (
              <div className="mt-4 rounded-xl border border-slate-200 bg-lab-chalk px-4 py-3 dark:border-white/10 dark:bg-[var(--surface)]">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {localizedPersonaDisplayName(t, quotePersona.name)}
                </p>
                <div className="mt-2">
                  <CitedSnippet value={quotePersona.confusion || quotePersona.firstImpression} />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 animate-rise-in" style={{ animationDelay: "240ms" }}>
            <Link
              href={
                productId
                  ? `/analyze?productId=${encodeURIComponent(productId)}&retest=1`
                  : "/analyze"
              }
            >
              <Button>
                {t("decision.retest")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            {prevId && analysisId ? (
              <Link href={`/compare?before=${prevId}&after=${analysisId}`}>
                <Button variant="outline">
                  <GitCompare className="h-4 w-4" />
                  {t("decision.comparePrev")}
                </Button>
              </Link>
            ) : (
              <Link href="/compare">
                <Button variant="outline">
                  <GitCompare className="h-4 w-4" />
                  {t("decision.compareLab")}
                </Button>
              </Link>
            )}
            <a href="#detay">
              <Button variant="ghost">{t("decision.allDetails")}</Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
