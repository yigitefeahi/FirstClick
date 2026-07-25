"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/lib/i18n/preferences-context";

export function AnalyzePageHeader() {
  const t = useT();

  return (
    <>
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-brand-700 dark:text-slate-400 dark:hover:text-brand-400"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("common.home")}
      </Link>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-lab-ink dark:text-white">
          {t("analyze.title")}
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">{t("analyze.subtitle")}</p>
      </div>
    </>
  );
}
