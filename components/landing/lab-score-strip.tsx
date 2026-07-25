"use client";

import { useEffect, useState } from "react";
import { fetchPublicStats } from "@/lib/api";
import { SNAP_SLIDE } from "@/components/ui/snap-scroller";
import { usePreferences, useT } from "@/lib/i18n/preferences-context";

const SLIDE = `${SNAP_SLIDE} overflow-hidden`;

export function LabScoreStrip() {
  const t = useT();
  const { locale } = usePreferences();
  const [headline, setHeadline] = useState("");
  const [avg, setAvg] = useState<number | null>(null);
  const [tests, setTests] = useState<number | null>(null);

  useEffect(() => {
    setHeadline(t("labScore.loading"));
  }, [t, locale]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const stats = await fetchPublicStats();
        if (cancelled) return;
        setHeadline(stats.headline);
        setAvg(stats.avgScoreThisWeek);
        setTests(stats.testsThisWeek);
      } catch {
        if (!cancelled) {
          setHeadline(t("labScore.fallback"));
          setAvg(63);
          setTests(24);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [t, locale]);

  return (
    <section
      aria-label={t("labScore.kicker")}
      className={`${SLIDE} border-b border-slate-200/80 bg-[#0c1222] text-white dark:border-white/10`}
    >
      <div className="pointer-events-none absolute inset-0 lab-grid opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-600/20 via-transparent to-lab-signal/15" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[55vmin] w-[55vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lab-signal/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-full max-w-6xl flex-col justify-center px-4 py-12 sm:px-6">
        <p className="animate-rise-in text-xs font-medium uppercase tracking-[0.2em] text-lab-signal">
          {t("labScore.kicker")}
        </p>
        <p
          className="mt-3 max-w-2xl animate-rise-in font-display text-lg text-slate-300 sm:text-xl"
          style={{ animationDelay: "80ms" }}
        >
          {headline || t("labScore.loading")}
        </p>

        <div className="mt-12 grid gap-12 sm:mt-16 sm:grid-cols-2 sm:gap-16">
          <div className="animate-rise-in" style={{ animationDelay: "160ms" }}>
            <p className="font-display text-[clamp(4rem,16vw,9rem)] font-semibold leading-none tracking-tight tabular-nums text-white">
              {tests ?? "—"}
            </p>
            <p className="mt-4 text-sm uppercase tracking-[0.18em] text-slate-400 sm:text-base">
              {t("labScore.testsSlide")}
            </p>
          </div>
          <div className="animate-rise-in" style={{ animationDelay: "240ms" }}>
            <p className="font-display text-[clamp(4rem,16vw,9rem)] font-semibold leading-none tracking-tight tabular-nums text-lab-signal">
              {avg != null ? Math.round(avg) : "—"}
            </p>
            <p className="mt-4 text-sm uppercase tracking-[0.18em] text-slate-400 sm:text-base">
              {t("labScore.avgSlide")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
