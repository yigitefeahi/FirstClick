"use client";

import { useT } from "@/lib/i18n/preferences-context";
import { localizedTimelineStep } from "@/lib/i18n/persona-labels";

export function SessionTimeline({ steps }: { steps: import("@/types/analysis").DropOffStep[] }) {
  const t = useT();

  if (!steps.length) return null;

  const FRICTION_COLOR = {
    low: "bg-emerald-500",
    med: "bg-amber-500",
    high: "bg-rose-500",
  };

  return (
    <div className="mt-3">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {t("timeline.title")}
      </p>
      <ol className="mt-3 space-y-0">
        {steps.map((s, i) => (
          <li key={`${s.step}-${i}`} className="relative flex gap-3 pb-4 last:pb-0">
            {i < steps.length - 1 && (
              <span className="absolute left-[7px] top-4 h-full w-px bg-slate-200 dark:bg-white/10" />
            )}
            <span
              className={`relative z-10 mt-1 h-3.5 w-3.5 shrink-0 rounded-full ring-2 ring-white dark:ring-surface ${
                FRICTION_COLOR[s.friction] || FRICTION_COLOR.med
              }`}
            />
            <div>
              <p className="text-sm font-medium text-lab-ink dark:text-white">
                {localizedTimelineStep(t, s.step)}
              </p>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">{s.moment}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
