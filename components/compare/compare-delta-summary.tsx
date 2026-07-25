"use client";

import { AlertTriangle, ArrowRight, TrendingDown, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { CompareResult } from "@/types/analysis";
import { cn } from "@/lib/utils";
import { usePreferences, useT } from "@/lib/i18n/preferences-context";

interface CompareDeltaSummaryProps {
  result: CompareResult;
  beforeScore?: number | null;
  afterScore?: number | null;
}

export function CompareDeltaSummary({ result, beforeScore, afterScore }: CompareDeltaSummaryProps) {
  const t = useT();
  const { tp } = usePreferences();

  const overall = result.scoreDeltas.find((d) => d.key === "overallScore");
  const delta = overall?.delta ?? 0;
  const before = beforeScore ?? overall?.before ?? 0;
  const after = afterScore ?? overall?.after ?? 0;

  const improvedLead = result.improved.find((item) => item && item !== "—");
  const remainingRisk =
    result.unchangedRisks.find((item) => item && item !== "—") ??
    result.regressed.find((item) => item && item !== "—");

  const deltaLabel =
    delta === 0
      ? t("compareDelta.scoreSame")
      : tp("compareDelta.scoreDelta", { delta: delta > 0 ? `+${delta}` : delta });

  return (
    <Card className="overflow-hidden border-lab-ink/15 bg-gradient-to-br from-lab-chalk via-white to-brand-50/30 dark:border-white/10 dark:from-surface dark:via-surface dark:to-brand-500/10">
      <CardContent className="p-6 sm:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-700 dark:text-brand-400">
          {t("compareDelta.kicker")}
        </p>
        <div className="mt-4 flex flex-wrap items-end gap-4">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t("compareDelta.v1v2")}</p>
            <p className="mt-1 flex items-baseline gap-3 font-display text-4xl font-semibold tabular-nums text-lab-ink dark:text-white">
              <span>{before}</span>
              <ArrowRight className="h-6 w-6 text-slate-400" />
              <span className="text-brand-700 dark:text-brand-400">{after}</span>
            </p>
          </div>
          <Badge
            variant={delta > 0 ? "success" : delta < 0 ? "danger" : "neutral"}
            className="inline-flex items-center gap-1 px-3 py-1 text-sm"
          >
            {delta > 0 ? <TrendingUp className="h-4 w-4" /> : delta < 0 ? <TrendingDown className="h-4 w-4" /> : null}
            {deltaLabel}
          </Badge>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/80 px-4 py-3 dark:border-emerald-500/30 dark:bg-emerald-500/10">
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-800 dark:text-emerald-300">
              {t("compareDelta.improved")}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-emerald-950 dark:text-emerald-100">
              {improvedLead ?? t("compareDelta.noImprovement")}
            </p>
          </div>
          <div className="rounded-xl border border-amber-200/80 bg-amber-50/80 px-4 py-3 dark:border-amber-500/30 dark:bg-amber-500/10">
            <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-amber-900 dark:text-amber-300">
              <AlertTriangle className="h-3.5 w-3.5" />
              {t("compareDelta.stillRisk")}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-amber-950 dark:text-amber-100">
              {remainingRisk ?? t("compareDelta.noRisk")}
            </p>
          </div>
        </div>

        <p className={cn("mt-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300")}>
          {result.narrative}
        </p>
      </CardContent>
    </Card>
  );
}
