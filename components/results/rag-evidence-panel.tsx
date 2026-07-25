"use client";

import {
  BookOpen,
  Database,
  FileText,
  Globe,
  History,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RagSource } from "@/types/analysis";
import { cn } from "@/lib/utils";
import { localizedKbTitle } from "@/lib/i18n/kb-titles";
import { usePreferences, useT } from "@/lib/i18n/preferences-context";

function isKnowledgeSource(src: RagSource): boolean {
  return (
    src.scope === "global" ||
    src.sourceType === "knowledge" ||
    src.citation.startsWith("kb:")
  );
}

function kbSlugFromCitation(citation: string): string | undefined {
  if (citation.startsWith("kb:")) return citation.slice(3) || undefined;
  return undefined;
}

function SourceRow({
  src,
  label,
  tone,
  Icon,
}: {
  src: RagSource;
  label: string;
  tone: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  const t = useT();

  function categoryLabel(category?: string | null) {
    if (!category) return null;
    const map: Record<string, string> = {
      foundation: t("rag.cat.foundation"),
      "ux-product": t("rag.cat.uxProduct"),
      sector: t("rag.cat.sector"),
      "persona-research": t("rag.cat.personaResearch"),
      "growth-trust": t("rag.cat.growthTrust"),
    };
    return map[category] ?? category;
  }

  const cat = categoryLabel(src.category);

  return (
    <li
      className={cn(
        "rounded-xl border-l-4 p-4 transition-shadow hover:shadow-sm dark:border-white/10",
        tone
      )}
    >
      <div className="flex flex-wrap items-start gap-2">
        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <code className="rounded-md bg-white/80 px-2 py-0.5 font-mono text-xs text-lab-ink ring-1 ring-slate-200 dark:bg-surface dark:text-white dark:ring-white/10">
              {src.citation}
            </code>
            <Badge variant="neutral" className="text-[10px]">
              {label}
            </Badge>
            {cat && (
              <Badge variant="neutral" className="text-[10px]">
                {cat}
              </Badge>
            )}
          </div>
          {src.title && (
            <p className="mt-1.5 text-sm font-medium text-lab-ink dark:text-white">
              {isKnowledgeSource(src)
                ? localizedKbTitle("tr", kbSlugFromCitation(src.citation), src.title)
                : src.title}
            </p>
          )}
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {src.excerpt}
          </p>
        </div>
      </div>
    </li>
  );
}

interface RagEvidencePanelProps {
  ragSources?: RagSource[];
  source?: "openai" | "mock";
}

export function RagEvidencePanel({ ragSources = [], source }: RagEvidencePanelProps) {
  const t = useT();
  const { tp } = usePreferences();

  const kb = ragSources.filter(isKnowledgeSource);
  const user = ragSources.filter((s) => !isKnowledgeSource(s));

  function sourceMeta(src: RagSource) {
    if (isKnowledgeSource(src)) {
      return {
        label: t("rag.kbLabel"),
        icon: Sparkles,
        tone: "border-lab-signal/40 bg-lab-signal/5 dark:bg-lab-signal/10",
      };
    }
    if (src.sourceType === "web" || src.citation.startsWith("web:")) {
      return {
        label: t("rag.webLabel"),
        icon: Globe,
        tone: "border-brand-200 bg-brand-50/40 dark:border-brand-500/30 dark:bg-brand-500/10",
      };
    }
    if (src.sourceType === "analysis" || src.citation.startsWith("past:")) {
      return {
        label: t("rag.pastLabel"),
        icon: History,
        tone: "border-violet-200 bg-violet-50/40 dark:border-violet-500/30 dark:bg-violet-500/10",
      };
    }
    return {
      label: t("rag.docLabel"),
      icon: FileText,
      tone: "border-slate-200 bg-white dark:border-white/10 dark:bg-surface",
    };
  }

  if (ragSources.length === 0) {
    return (
      <Card id="rag-evidence" className="scroll-mt-24 border-dashed border-slate-300 dark:border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base dark:text-white">
            <BookOpen className="h-5 w-5 text-slate-400" />
            {t("rag.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {source === "mock" ? t("rag.emptyMock") : t("rag.emptyLive")}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      id="rag-evidence"
      className="scroll-mt-24 overflow-hidden border-brand-200/60 shadow-sm dark:border-white/10 dark:bg-surface"
    >
      <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-brand-50/90 via-lab-chalk to-lab-signal/10 dark:border-white/10 dark:from-brand-500/10 dark:via-surface dark:to-lab-signal/5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 font-display text-lg dark:text-white">
              <BookOpen className="h-5 w-5 text-brand-700 dark:text-brand-400" />
              {t("rag.titleFull")}
            </CardTitle>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {t("rag.desc")}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Badge variant="success" className="gap-1">
              <Sparkles className="h-3 w-3" />
              {tp("rag.kbCount", { count: kb.length })}
            </Badge>
            <Badge variant="neutral" className="gap-1">
              <Database className="h-3 w-3" />
              {tp("rag.corpusCount", { count: user.length })}
            </Badge>
            <Badge variant="neutral">{tp("rag.pieces", { count: ragSources.length })}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8 p-6">
        {kb.length > 0 && (
          <section>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <Sparkles className="h-4 w-4 text-lab-signal" />
              {t("rag.kbSection")}
            </h4>
            <ul className="space-y-3">
              {kb.map((src, i) => {
                const meta = sourceMeta(src);
                return (
                  <SourceRow
                    key={`kb-${src.citation}-${i}`}
                    src={src}
                    label={meta.label}
                    tone={meta.tone}
                    Icon={meta.icon}
                  />
                );
              })}
            </ul>
          </section>
        )}
        {user.length > 0 && (
          <section>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <Database className="h-4 w-4 text-brand-600 dark:text-brand-400" />
              {t("rag.corpusSection")}
            </h4>
            <ul className="space-y-3">
              {user.map((src, i) => {
                const meta = sourceMeta(src);
                return (
                  <SourceRow
                    key={`user-${src.citation}-${i}`}
                    src={src}
                    label={meta.label}
                    tone={meta.tone}
                    Icon={meta.icon}
                  />
                );
              })}
            </ul>
          </section>
        )}
      </CardContent>
    </Card>
  );
}
