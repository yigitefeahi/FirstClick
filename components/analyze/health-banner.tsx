"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Wifi } from "lucide-react";
import { checkBackendHealth, type HealthStatus } from "@/lib/api";
import { useT } from "@/lib/i18n/preferences-context";

export function HealthBanner() {
  const t = useT();
  const [health, setHealth] = useState<HealthStatus | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const status = await checkBackendHealth();
      if (!cancelled) setHealth(status);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!health) return null;

  if (!health.ok) {
    return (
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
        <Wifi className="mt-0.5 h-4 w-4 shrink-0" />
        <div>
          <p className="font-medium">{t("health.apiUnreachable")}</p>
          <p className="mt-0.5 text-red-700/90 dark:text-red-200/80">
            {t("health.apiUnreachableDesc")}
          </p>
        </div>
      </div>
    );
  }

  if (health.mode === "mock") {
    return (
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
        <div>
          <p className="font-medium">{t("health.mockMode")}</p>
          <p className="mt-0.5 text-amber-800/90 dark:text-amber-200/80">
            {t("health.mockModeDesc")}
          </p>
        </div>
      </div>
    );
  }

  return null;
}
