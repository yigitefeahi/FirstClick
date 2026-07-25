"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, GitCompare, Loader2, TrendingDown, TrendingUp } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AuthGuard } from "@/components/auth/auth-guard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CompareDeltaSummary } from "@/components/compare/compare-delta-summary";
import { EmptyState, LoadingState } from "@/components/ui/empty-state";
import { compareAnalyses, listAnalyses, type AnalysisSummary } from "@/lib/api";
import { useAuth } from "@/lib/supabase/auth-context";
import type { CompareResult } from "@/types/analysis";
import { cn } from "@/lib/utils";
import { localeDateTag } from "@/lib/i18n/dictionaries";
import { usePreferences, useT } from "@/lib/i18n/preferences-context";

function CompareContent() {
  const { getAccessToken } = useAuth();
  const searchParams = useSearchParams();
  const t = useT();
  const { locale } = usePreferences();
  const dateTag = localeDateTag(locale);
  const [items, setItems] = useState<AnalysisSummary[]>([]);
  const [beforeId, setBeforeId] = useState("");
  const [afterId, setAfterId] = useState("");
  const [result, setResult] = useState<CompareResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [comparing, setComparing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoRan, setAutoRan] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const token = await getAccessToken();
        if (!token) throw new Error(t("common.errorSessionNotFound"));
        const data = await listAnalyses(token);
        if (cancelled) return;
        setItems(data);
        const qBefore = searchParams.get("before");
        const qAfter = searchParams.get("after");
        if (qBefore && qAfter) {
          setBeforeId(qBefore);
          setAfterId(qAfter);
        } else if (data.length >= 2) {
          setAfterId(data[0].id);
          setBeforeId(data[1].id);
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : t("common.errorLoadFailed"));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [getAccessToken, searchParams]);

  async function runCompare(b = beforeId, a = afterId) {
    setComparing(true);
    setError(null);
    setResult(null);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error(t("common.errorSessionRequired"));
      const data = await compareAnalyses(token, b, a, locale);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("common.errorCompareFailed"));
    } finally {
      setComparing(false);
    }
  }

  useEffect(() => {
    if (autoRan || loading) return;
    const qBefore = searchParams.get("before");
    const qAfter = searchParams.get("after");
    if (qBefore && qAfter && qBefore !== qAfter) {
      setAutoRan(true);
      void runCompare(qBefore, qAfter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, searchParams, autoRan]);

  const timeline = useMemo(() => {
    const selected = items.filter((i) => i.id === beforeId || i.id === afterId);
    return [...selected].reverse();
  }, [items, beforeId, afterId]);

  if (loading) {
    return <LoadingState label={t("compare.loading")} />;
  }

  if (items.length < 2) {
    return (
      <EmptyState
        title={items.length === 0 ? t("compare.emptyNoneTitle") : t("compare.emptyOneTitle")}
        description={
          items.length === 0 ? t("compare.emptyNoneDesc") : t("compare.emptyOneDesc")
        }
        action={
          <Link href="/analyze">
            <Button>{items.length === 0 ? t("compare.startFirst") : t("compare.runSecond")}</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 bg-white dark:border-white/10 dark:bg-surface">
        <CardHeader>
          <CardTitle className="font-display text-base dark:text-white">{t("compare.selectTitle")}</CardTitle>
          <p className="text-sm text-slate-500 dark:text-slate-400">{t("compare.selectDesc")}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t("compare.beforeLabel")}</label>
              <select
                className="flex h-11 w-full rounded-xl border border-slate-200 bg-lab-chalk px-3 text-sm dark:border-white/10 dark:bg-surface dark:text-white"
                value={beforeId}
                onChange={(e) => setBeforeId(e.target.value)}
              >
                <option value="">{t("common.select")}</option>
                {items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.productName} · {item.overallScore ?? "—"} ·{" "}
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString(dateTag) : ""}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t("compare.afterLabel")}</label>
              <select
                className="flex h-11 w-full rounded-xl border border-slate-200 bg-lab-chalk px-3 text-sm dark:border-white/10 dark:bg-surface dark:text-white"
                value={afterId}
                onChange={(e) => setAfterId(e.target.value)}
              >
                <option value="">{t("common.select")}</option>
                {items.map((item) => (
                  <option key={`a-${item.id}`} value={item.id}>
                    {item.productName} · {item.overallScore ?? "—"} ·{" "}
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString(dateTag) : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Button
            onClick={() => runCompare()}
            disabled={comparing || !beforeId || !afterId || beforeId === afterId}
          >
            {comparing ? <Loader2 className="h-4 w-4 animate-spin" /> : <GitCompare className="h-4 w-4" />}
            {t("compare.runButton")}
          </Button>
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {timeline.length === 2 && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#0c1222] text-white dark:border-white/10">
          <div className="border-b border-white/10 px-6 py-4 sm:px-8">
            <p className="text-xs uppercase tracking-[0.18em] text-lab-signal">{t("compare.timelineKicker")}</p>
            <p className="mt-1 text-sm text-slate-400">{t("compare.timelineDesc")}</p>
          </div>
          <div className="grid gap-0 sm:grid-cols-[1fr_auto_1fr]">
            {timeline.map((item, i) => (
              <div key={item.id} className="contents">
                <div
                  className="animate-delta-slide px-6 py-8 sm:px-8"
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    {i === 0 ? t("compare.v1") : t("compare.v2")}
                  </p>
                  <p className="mt-2 font-display text-5xl font-semibold tabular-nums text-lab-signal">
                    {item.overallScore ?? "—"}
                  </p>
                  <p className="mt-3 text-sm text-slate-300">{item.productName}</p>
                  {item.createdAt && (
                    <p className="mt-1 text-xs text-slate-500">
                      {new Date(item.createdAt).toLocaleString(dateTag)}
                    </p>
                  )}
                </div>
                {i === 0 && (
                  <div className="hidden items-center justify-center sm:flex">
                    <div className="h-16 w-px bg-gradient-to-b from-transparent via-lab-signal/60 to-transparent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <CompareDeltaSummary
            result={result}
            beforeScore={items.find((i) => i.id === beforeId)?.overallScore}
            afterScore={items.find((i) => i.id === afterId)?.overallScore}
          />

          <details className="group rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-surface">
            <summary className="cursor-pointer list-none px-6 py-4 text-sm font-medium text-slate-700 marker:content-none dark:text-slate-200">
              {t("compare.detailsSummary")}
              <span className="float-right text-xs text-slate-400 group-open:hidden">{t("common.show")}</span>
              <span className="float-right hidden text-xs text-slate-400 group-open:inline">{t("common.hide")}</span>
            </summary>
            <div className="space-y-6 border-t border-slate-100 px-6 pb-6 pt-2 dark:border-white/10">
          <Card className="dark:border-white/10 dark:bg-surface">
            <CardHeader>
              <CardTitle className="font-display text-base dark:text-white">{t("compare.scoreDeltasTitle")}</CardTitle>
              <p className="text-sm text-slate-500">
                {result.beforeLabel} → {result.afterLabel}
              </p>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {result.scoreDeltas.map((d, i) => (
                <div
                  key={d.key}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-lab-chalk px-4 py-3 animate-delta-slide dark:border-white/10"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-white">
                      {d.key === "overallScore"
                        ? t("resultsDash.overallScore")
                        : d.key === "clarityScore"
                          ? t("resultsDash.clarity")
                          : d.key === "adoptionScore"
                            ? t("resultsDash.adoption")
                            : d.key === "onboardingRiskScore"
                              ? t("resultsDash.onboardingRisk")
                              : d.key === "targetFitScore"
                                ? t("resultsDash.targetFit")
                                : d.label}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {d.before} → {d.after}
                    </p>
                  </div>
                  <Badge
                    variant={d.delta > 0 ? "success" : d.delta < 0 ? "danger" : "neutral"}
                    className="inline-flex items-center gap-1"
                  >
                    {d.delta > 0 ? (
                      <>
                        <TrendingUp className="h-3 w-3" />
                        {t("compare.deltaImproved")} +{d.delta}
                      </>
                    ) : d.delta < 0 ? (
                      <>
                        <TrendingDown className="h-3 w-3" />
                        {t("compare.deltaRegressed")} {d.delta}
                      </>
                    ) : (
                      t("compare.deltaUnchanged")
                    )}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-4 lg:grid-cols-3">
            <ChangeList title={t("compare.improved")} items={result.improved} tone="success" />
            <ChangeList title={t("compare.regressed")} items={result.regressed} tone="danger" />
            <ChangeList title={t("compare.unchanged")} items={result.unchangedRisks} tone="warning" />
          </div>

          <Card className="dark:border-white/10 dark:bg-surface">
            <CardHeader>
              <CardTitle className="font-display text-base dark:text-white">{t("common.summary")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <p className="leading-relaxed">{result.narrative}</p>
              <p className="rounded-xl bg-brand-50 px-4 py-3 text-brand-900 dark:bg-black dark:text-lab-signal">
                <span className="font-medium">{t("common.recommendation")}: </span>
                {result.recommendation}
              </p>
            </CardContent>
          </Card>
            </div>
          </details>
        </div>
      )}
    </div>
  );
}

function ChangeList({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "success" | "danger" | "warning";
}) {
  const bg =
    tone === "success"
      ? "bg-emerald-50 dark:bg-emerald-500/10"
      : tone === "danger"
        ? "bg-red-50 dark:bg-red-500/10"
        : "bg-amber-50 dark:bg-amber-500/10";
  return (
    <Card className="dark:border-white/10 dark:bg-surface">
      <CardHeader>
        <CardTitle className="font-display text-base dark:text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {(items.length ? items : ["—"]).map((item, i) => (
            <li key={i} className={cn("rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300", bg)}>
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default function ComparePage() {
  const t = useT();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
          <Link
            href="/history"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-brand-700"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("common.backToHistory")}
          </Link>
          <div className="mb-8">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-lab-ink dark:text-white">
              {t("compare.title")}
            </h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">{t("compare.subtitle")}</p>
          </div>
          <AuthGuard>
            <Suspense
              fallback={
                <div className="flex min-h-[30vh] items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
                </div>
              }
            >
              <CompareContent />
            </Suspense>
          </AuthGuard>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
