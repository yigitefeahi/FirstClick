"use client";

import { Languages, Moon, Sun } from "lucide-react";
import { usePreferences } from "@/lib/i18n/preferences-context";

type PreferencesTogglesProps = {
  compact?: boolean;
};

export function PreferencesToggles({ compact = false }: PreferencesTogglesProps) {
  const { theme, toggleTheme, locale, setLocale, t } = usePreferences();

  return (
    <div
      className={`flex items-center gap-1 ${compact ? "" : "rounded-full border border-slate-200/80 bg-white/70 p-0.5 dark:border-white/10 dark:bg-white/5"}`}
      role="group"
      aria-label={`${t("prefs.theme")} / ${t("prefs.language")}`}
    >
      <button
        type="button"
        onClick={toggleTheme}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition hover:bg-lab-chalk hover:text-lab-ink dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
        aria-label={theme === "dark" ? t("prefs.themeLight") : t("prefs.themeDark")}
        title={theme === "dark" ? t("prefs.themeLight") : t("prefs.themeDark")}
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>

      <button
        type="button"
        onClick={() => setLocale(locale === "tr" ? "en" : "tr")}
        className="inline-flex h-9 min-w-9 items-center justify-center gap-1 rounded-full px-2 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:bg-lab-chalk hover:text-lab-ink dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
        aria-label={t("prefs.language")}
        title={locale === "tr" ? t("prefs.langEn") : t("prefs.langTr")}
      >
        <Languages className="h-3.5 w-3.5" />
        <span>{locale === "tr" ? "EN" : "TR"}</span>
      </button>
    </div>
  );
}
