"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock3, Trash2 } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AuthGuard } from "@/components/auth/auth-guard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState, LoadingState } from "@/components/ui/empty-state";
import { deleteAnalysis, listAnalyses, type AnalysisSummary } from "@/lib/api";
import { useAuth } from "@/lib/supabase/auth-context";
import { useRouter } from "next/navigation";
import { localeDateTag } from "@/lib/i18n/dictionaries";
import { usePreferences, useT } from "@/lib/i18n/preferences-context";

function HistoryContent() {
  const { getAccessToken } = useAuth();
  const router = useRouter();
  const t = useT();
  const { locale } = usePreferences();
  const dateTag = localeDateTag(locale);
  const [items, setItems] = useState<AnalysisSummary[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [productFilter, setProductFilter] = useState<string>("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function refresh() {
    const token = await getAccessToken();
    if (!token) throw new Error(t("common.errorSessionNotFound"));
    setItems(await listAnalyses(token));
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await refresh();
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : t("history.loadFailed"));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAccessToken]);

  const productNames = useMemo(() => {
    const names = new Set<string>();
    items.forEach((i) => names.add(i.productName));
    return Array.from(names).sort();
  }, [items]);

  const filtered = useMemo(() => {
    if (productFilter === "all") return items;
    return items.filter((i) => i.productName === productFilter);
  }, [items, productFilter]);

  async function handleDelete(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    const token = await getAccessToken();
    if (!token) return;
    setDeletingId(id);
    try {
      await deleteAnalysis(token, id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : t("common.errorDeleteFailed"));
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return <LoadingState label={t("history.loading")} />;
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
          {error}
        </div>
      )}

      {items.length > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm text-slate-600 dark:text-slate-400" htmlFor="productFilter">
            {t("history.productFilter")}
          </label>
          <select
            id="productFilter"
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-white/10 dark:bg-surface dark:text-white"
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
          >
            <option value="all">{t("common.all")}</option>
            {productNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          title={t("history.emptyTitle")}
          description={t("history.emptyDesc")}
          action={
            <Link href="/analyze" className="text-sm font-medium text-brand-700 hover:text-brand-800 dark:text-brand-400">
              {t("history.startFirst")}
            </Link>
          }
        />
      ) : (
        <div className="grid gap-4">
          {filtered.map((item) => (
            <Card
              key={item.id}
              className="cursor-pointer transition-shadow hover:shadow-md"
              onClick={() => router.push(`/results/${item.id}`)}
            >
              <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-2">
                <CardTitle className="text-base">{item.productName}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant={item.source === "openai" ? "success" : "neutral"}>
                    {item.source === "openai" ? t("common.ai") : t("common.demo")}
                  </Badge>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={deletingId === item.id}
                    onClick={(e) => handleDelete(item.id, e)}
                    aria-label={t("common.delete")}
                  >
                    <Trash2 className="h-4 w-4 text-slate-400" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                {typeof item.overallScore === "number" && (
                  <span>
                    {t("common.score")}: {item.overallScore}
                  </span>
                )}
                {item.createdAt && (
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5" />
                    {new Date(item.createdAt).toLocaleString(dateTag)}
                  </span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default function HistoryPage() {
  const t = useT();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
          <Link
            href="/analyze"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-brand-700"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("common.backToAnalyze")}
          </Link>
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-display text-3xl font-semibold tracking-tight text-lab-ink dark:text-white">
                {t("history.title")}
              </h1>
              <p className="mt-2 text-slate-500 dark:text-slate-400">{t("history.subtitle")}</p>
            </div>
            <Link
              href="/compare"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:text-brand-800 dark:text-brand-400"
            >
              {t("history.compareLink")}
            </Link>
          </div>
          <AuthGuard>
            <HistoryContent />
          </AuthGuard>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
