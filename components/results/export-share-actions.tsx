"use client";

import { useState } from "react";
import { Check, Copy, FileText, Link2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createShareLink } from "@/lib/api";
import { useAuth } from "@/lib/supabase/auth-context";
import { usePreferences, useT } from "@/lib/i18n/preferences-context";
import type { AnalysisResult } from "@/types/analysis";

export function ExportShareActions({
  result,
  productName,
  analysisId,
}: {
  result: AnalysisResult;
  productName?: string;
  analysisId?: string | null;
}) {
  const { getAccessToken } = useAuth();
  const t = useT();
  const { tp } = usePreferences();
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const name = productName || t("common.product");
  const summary = tp("export.summaryLine", {
    name,
    score: result.overallScore,
    actions: result.actionPlan.slice(0, 2).join(" · "),
  });

  async function handleShare(role: "viewer" | "editor") {
    if (!analysisId || analysisId === "demo-public") {
      setError(t("export.shareNeedsSaved"));
      return;
    }
    setError(null);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error(t("export.loginRequired"));
      const link = await createShareLink(token, analysisId, role);
      const url = `${window.location.origin}${link.urlPath}`;
      setShareUrl(url);
      await navigator.clipboard.writeText(url);
      setCopied("share");
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("export.failed"));
    }
  }

  async function copyNotion() {
    const md = [
      `# ${tp("export.notionTitle", { name })}`,
      ``,
      tp("export.notionScore", { score: result.overallScore }),
      ``,
      t("export.notionActionsHeading"),
      ...result.actionPlan.map((a, i) => `${i + 1}. ${a}`),
      ``,
      t("export.notionBlindSpotsHeading"),
      ...result.blindSpots.map((b) => `- ${b}`),
      ``,
      t("export.notionPitchHeading"),
      result.improvedPitch,
    ].join("\n");
    await navigator.clipboard.writeText(md);
    setCopied("notion");
    setTimeout(() => setCopied(null), 2000);
  }

  function shareLinkedIn() {
    const url = encodeURIComponent(shareUrl || window.location.href);
    const text = encodeURIComponent(summary);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button type="button" variant="outline" size="sm" onClick={() => handleShare("viewer")}>
        <Share2 className="h-4 w-4" />
        {copied === "share" ? t("export.linkCopied") : t("export.shareViewer")}
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={() => handleShare("editor")}>
        <Link2 className="h-4 w-4" />
        {t("export.editorLink")}
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={copyNotion}>
        {copied === "notion" ? <Check className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
        {t("export.copyNotion")}
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={shareLinkedIn}>
        {t("export.linkedin")}
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={async () => {
          await navigator.clipboard.writeText(summary);
          setCopied("summary");
          setTimeout(() => setCopied(null), 2000);
        }}
      >
        <Copy className="h-4 w-4" />
        {copied === "summary" ? t("export.copied") : t("export.summary")}
      </Button>
      {error && <p className="w-full text-xs text-red-600 dark:text-red-400">{error}</p>}
      {shareUrl && (
        <p className="w-full truncate font-mono text-[11px] text-slate-500 dark:text-slate-400">
          {shareUrl}
        </p>
      )}
    </div>
  );
}
