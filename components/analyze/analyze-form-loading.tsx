"use client";

import { LoadingState } from "@/components/ui/empty-state";
import { useT } from "@/lib/i18n/preferences-context";

export function AnalyzeFormLoading() {
  const t = useT();
  return <LoadingState label={t("analyze.formPreparing")} />;
}
