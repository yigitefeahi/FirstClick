"use client";

import { CheckCircle2, Circle, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/dictionaries";
import { localizedKbTitle } from "@/lib/i18n/kb-titles";
import {
  localizedPersonaDisplayName,
  localizedPersonaLabel,
} from "@/lib/i18n/persona-labels";
import { usePreferences, useT } from "@/lib/i18n/preferences-context";

export type OrchestrationLogItem = {
  id: string;
  /** Dictionary key — always translated at render via t()/tp() */
  textKey: string;
  params?: Record<string, string | number>;
  /** When set, `name` param is resolved from persona id at render (never bake BE labels). */
  personaId?: string;
  fallbackName?: string;
  /** RAG: localize titles from slugs at render for current locale */
  ragSlugs?: string[];
  ragTitles?: string[];
  tone?: "default" | "rag" | "persona" | "synthesis" | "done";
};

export type OrchestrationActive = {
  textKey: string;
  params?: Record<string, string | number>;
};

export type OrchestrationPersonaProgress = {
  index: number;
  total: number;
  personaId?: string;
  fallbackName?: string;
};

interface OrchestrationPanelProps {
  active: OrchestrationActive | null;
  logs: OrchestrationLogItem[];
  personaProgress?: OrchestrationPersonaProgress | null;
}

function resolveName(
  t: (key: string) => string,
  personaId?: string,
  fallbackName?: string
): string {
  if (personaId && !personaId.startsWith("custom:")) {
    const labeled = localizedPersonaLabel(t, personaId);
    if (labeled && labeled !== `persona.${personaId}.label`) {
      return labeled;
    }
  }
  if (fallbackName) {
    return localizedPersonaDisplayName(t, fallbackName);
  }
  return personaId ? localizedPersonaLabel(t, personaId) : "";
}

function resolveRagTitles(locale: Locale, slugs?: string[], titles?: string[]): string {
  const out: string[] = [];
  const n = Math.max(slugs?.length ?? 0, titles?.length ?? 0);
  for (let i = 0; i < Math.min(n, 4); i++) {
    const title = localizedKbTitle(locale, slugs?.[i], titles?.[i]);
    if (title && !out.includes(title)) out.push(title);
  }
  if (out.length === 0 && titles?.length) {
    for (const raw of titles.slice(0, 4)) {
      const title = localizedKbTitle(locale, undefined, raw);
      if (title && !out.includes(title)) out.push(title);
    }
  }
  return out.join(", ");
}

function formatLogLine(
  t: (key: string) => string,
  tp: (key: string, params: Record<string, string | number>) => string,
  locale: Locale,
  log: OrchestrationLogItem
): string {
  const params = { ...(log.params ?? {}) };
  if (log.personaId || log.fallbackName) {
    params.name = resolveName(t, log.personaId, log.fallbackName);
  }
  if (log.ragSlugs?.length || log.ragTitles?.length) {
    params.titles = resolveRagTitles(locale, log.ragSlugs, log.ragTitles);
  }
  return Object.keys(params).length > 0 ? tp(log.textKey, params) : t(log.textKey);
}

export function OrchestrationPanel({
  active,
  logs,
  personaProgress,
}: OrchestrationPanelProps) {
  const t = useT();
  const { tp, locale } = usePreferences();

  const activeText = active
    ? active.params && Object.keys(active.params).length > 0
      ? tp(active.textKey, active.params)
      : t(active.textKey)
    : t("orchestration.running");

  const progressName = personaProgress
    ? resolveName(t, personaProgress.personaId, personaProgress.fallbackName)
    : "";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm shadow-brand-500/5 dark:border-white/10 dark:bg-surface dark:text-slate-200">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lab-ink text-lab-signal dark:bg-[#0c1222]">
          <Sparkles className="h-5 w-5 animate-pulse" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-700 dark:text-brand-400">
            {t("orchestration.kicker")}
          </p>
          <p className="mt-1 text-sm font-medium text-lab-ink dark:text-white">{activeText}</p>
          {personaProgress && (
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {tp("orchestration.personaProgress", {
                index: personaProgress.index,
                total: personaProgress.total,
                name: progressName,
              })}
            </p>
          )}
        </div>
        <Loader2 className="h-5 w-5 shrink-0 animate-spin text-brand-600" />
      </div>

      <ul className="mt-4 max-h-48 space-y-2 overflow-y-auto border-t border-slate-100 pt-3 dark:border-white/10">
        {logs.length === 0 ? (
          <li className="text-xs text-slate-400">{t("orchestration.stepsPlaceholder")}</li>
        ) : (
          logs.map((log) => (
            <li key={log.id} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
              {log.tone === "done" ? (
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
              ) : (
                <Circle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-300 dark:text-slate-600" />
              )}
              <span
                className={cn(
                  log.tone === "rag" && "font-mono text-[11px] text-brand-800 dark:text-brand-300",
                  log.tone === "persona" && "text-lab-ink dark:text-white",
                  log.tone === "synthesis" && "text-violet-800 dark:text-violet-300"
                )}
              >
                {formatLogLine(t, tp, locale, log)}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
