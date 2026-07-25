"use client";

import { FlaskConical } from "lucide-react";
import { useT } from "@/lib/i18n/preferences-context";

export function SiteFooter() {
  const t = useT();
  return (
    <footer
      className="border-t border-[color:var(--border-subtle)]"
      style={{ backgroundColor: "var(--surface-muted)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <FlaskConical className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          <span>{t("footer.tagline")}</span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">{t("footer.chips")}</p>
      </div>
    </footer>
  );
}
