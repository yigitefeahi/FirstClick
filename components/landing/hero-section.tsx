"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SNAP_SLIDE } from "@/components/ui/snap-scroller";
import { useT } from "@/lib/i18n/preferences-context";

const SLIDE = `${SNAP_SLIDE} overflow-hidden`;

export function HeroSection() {
  const t = useT();
  return (
    <section className={`${SLIDE} border-b border-slate-200/80 dark:border-white/10`}>
      <div className="pointer-events-none absolute inset-0 lab-grid opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-lab-chalk via-transparent to-lab-chalk" />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-lab-signal/20 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-full max-w-6xl flex-col justify-center gap-14 px-4 py-12 sm:px-6 lg:flex-row lg:items-end lg:gap-16 lg:py-16">
        <div className="max-w-xl animate-rise-in lg:pb-6">
          <p className="font-display text-5xl font-semibold tracking-tight text-lab-ink sm:text-6xl lg:text-7xl">
            FirstClick
          </p>
          <h1 className="mt-5 font-display text-2xl font-medium leading-snug tracking-tight text-lab-ink sm:text-3xl">
            {t("hero.headline")}
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
            {t("hero.sub")}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/demo">
              <Button size="lg">{t("hero.demoCta")}</Button>
            </Link>
            <Link href="/analyze">
              <Button variant="outline" size="lg">
                {t("hero.startCta")}
              </Button>
            </Link>
            <Link href="#neden">
              <Button variant="ghost" size="lg">
                {t("hero.whyCta")}
              </Button>
            </Link>
          </div>
        </div>

        <div
          className="relative w-full flex-1 animate-rise-in"
          style={{ animationDelay: "120ms" }}
          aria-hidden
        >
          <div className="absolute inset-0 rounded-[2rem] bg-[#0c1222]" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c1222] px-6 py-8 text-white sm:px-8 sm:py-10">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-lab-signal">
              {t("hero.demoBadge")}
            </p>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div className="animate-delta-slide" style={{ animationDelay: "280ms" }}>
                <p className="text-sm text-slate-400">{t("hero.v1Label")}</p>
                <p className="mt-2 font-display text-5xl font-semibold tabular-nums">48</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{t("hero.v1Quote")}</p>
                <span className="mt-4 inline-block rounded-md bg-white/10 px-2 py-1 font-mono text-[10px] text-slate-300">
                  [doc:guide]
                </span>
              </div>
              <div
                className="animate-delta-slide border-t border-white/10 pt-8 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0"
                style={{ animationDelay: "420ms" }}
              >
                <p className="text-sm text-lab-signal">{t("hero.v2Label")}</p>
                <p className="mt-2 font-display text-5xl font-semibold tabular-nums text-lab-signal">
                  71
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{t("hero.v2Quote")}</p>
                <span className="mt-4 inline-block rounded-md bg-lab-signal/15 px-2 py-1 font-mono text-[10px] text-lab-signal">
                  {t("hero.v2Delta")}
                </span>
              </div>
            </div>
            <p className="mt-10 text-xs text-slate-500">{t("hero.demoFoot")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyNotAiSection() {
  const t = useT();
  const items = [
    { title: t("why.1.title"), body: t("why.1.body") },
    { title: t("why.2.title"), body: t("why.2.body") },
    { title: t("why.3.title"), body: t("why.3.body") },
  ];

  return (
    <section
      id="neden"
      className={`${SLIDE} border-b border-slate-200/80 bg-surface dark:border-white/10`}
    >
      <div className="pointer-events-none absolute inset-0 lab-grid opacity-50" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-lab-signal/10" />

      <div className="relative mx-auto flex min-h-full max-w-6xl flex-col justify-center px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-700 dark:text-brand-400">
          {t("why.kicker")}
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-lab-ink sm:text-4xl">
          {t("why.title")}
        </h2>
        <div className="mt-10 grid gap-8 md:mt-12 md:grid-cols-3 md:gap-10">
          {items.map((item, i) => (
            <div key={item.title} className="animate-rise-in" style={{ animationDelay: `${i * 80}ms` }}>
              <p className="font-mono text-xs text-brand-600 dark:text-brand-400">0{i + 1}</p>
              <h3 className="mt-3 font-display text-xl font-semibold text-lab-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LabPillars() {
  const t = useT();
  const pillars = [
    { title: t("pillars.1.title"), description: t("pillars.1.body") },
    { title: t("pillars.2.title"), description: t("pillars.2.body") },
    { title: t("pillars.3.title"), description: t("pillars.3.body") },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <h2 className="font-display text-3xl font-semibold tracking-tight text-lab-ink">
        {t("pillars.title")}
      </h2>
      <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-300">{t("pillars.sub")}</p>
      <div className="mt-12 grid gap-8 border-t border-slate-200 pt-10 dark:border-white/10 md:grid-cols-3">
        {pillars.map((p) => (
          <div key={p.title}>
            <h3 className="font-display text-lg font-semibold text-lab-ink">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {p.description}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-14">
        <Link href="/analyze">
          <Button size="lg">{t("pillars.cta")}</Button>
        </Link>
      </div>
    </section>
  );
}
