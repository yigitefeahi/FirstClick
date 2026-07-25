"use client";

import { FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-200 px-6 py-12 text-center dark:border-white/15",
        className
      )}
      style={{ backgroundColor: "var(--surface)" }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0c1222] text-lab-signal">
        <FlaskConical className="h-5 w-5" />
      </div>
      <p className="font-display text-lg font-semibold" style={{ color: "var(--lab-ink)" }}>
        {title}
      </p>
      {description ? (
        <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">{description}</p>
      ) : null}
      {action}
    </div>
  );
}

export function LoadingState({ label = "Yükleniyor…" }: { label?: string }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-600 border-t-transparent dark:border-brand-400 dark:border-t-transparent" />
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  );
}
