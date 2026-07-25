"use client";

import { Fragment, type ReactNode, useEffect, useState } from "react";
import { Download, Loader2, MessageCircle, Send, Video } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScoreRing } from "@/components/ui/score-ring";
import { cn } from "@/lib/utils";
import { generatePDF } from "@/lib/pdf";
import { askPersonaFollowup } from "@/lib/api";
import { useAuth } from "@/lib/supabase/auth-context";
import { usePreferences, useT } from "@/lib/i18n/preferences-context";
import { localizedPersonaDisplayName } from "@/lib/i18n/persona-labels";
import { DecisionSummary } from "@/components/results/decision-summary";
import { ExportShareActions } from "@/components/results/export-share-actions";
import { RagEvidencePanel } from "@/components/results/rag-evidence-panel";
import { SessionTimeline } from "@/components/results/session-timeline";
import type { AnalysisFormData, AnalysisResult, PersonaAnalysis, RagSource } from "@/types/analysis";
import {
  AlertTriangle,
  HelpCircle,
  Lightbulb,
  MessageSquareQuote,
  Target,
  TrendingDown,
  User,
} from "lucide-react";

/** Header (4rem) + sticky tabs (~3rem) — keep section anchors visible under chrome. */
const SECTION_SCROLL_MT = "scroll-mt-[7.5rem]";

const SECTION_TABS = [
  { id: "ozet", aliases: ["summary"], labelKey: "resultsDash.tabSummary" },
  { id: "persona", aliases: [] as string[], labelKey: "resultsDash.tabPersona" },
  { id: "aksiyon", aliases: ["actions"], labelKey: "resultsDash.tabActions" },
  { id: "rag", aliases: [] as string[], labelKey: "resultsDash.tabRag" },
] as const;

interface ResultsDashboardProps {
  result: AnalysisResult;
  productName?: string;
  formData?: AnalysisFormData | null;
  source?: "openai" | "mock";
  ragSources?: RagSource[];
  analysisId?: string | null;
  readOnly?: boolean;
  /** Optional chrome (back link, title, CTAs) rendered in the overview section. */
  leading?: ReactNode;
}

function likelihoodVariant(likelihood: string): "success" | "warning" | "danger" {
  if (likelihood === "Yüksek" || likelihood === "High") return "success";
  if (likelihood === "Orta" || likelihood === "Medium") return "warning";
  return "danger";
}

function likelihoodLabel(likelihood: string, t: (k: string) => string): string {
  if (likelihood === "Yüksek" || likelihood === "High") return t("resultsDash.likelihoodHigh");
  if (likelihood === "Orta" || likelihood === "Medium") return t("resultsDash.likelihoodMedium");
  return t("resultsDash.likelihoodLow");
}

function behaviorLabel(likelihood: string, t: (k: string) => string): string {
  if (likelihood === "Düşük" || likelihood === "Low") return t("resultsDash.behaviorHesitant");
  if (likelihood === "Orta" || likelihood === "Medium") return t("resultsDash.behaviorCautious");
  return t("resultsDash.behaviorOpen");
}

function CitedText({ value }: { value: string }) {
  const parts = value.split(/(\[(?:doc|web|past|kb):[^\]]+\])/g);
  return (
    <p className="mt-1 text-slate-700 dark:text-slate-300">
      {parts.map((part, i) =>
        /^\[(?:doc|web|past|kb):/.test(part) ? (
          <Badge key={i} variant="neutral" className="mx-0.5 align-middle font-mono text-[10px]">
            {part}
          </Badge>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </p>
  );
}

function SectionShell({
  id,
  aliases = [],
  label,
  children,
  className,
}: {
  id: string;
  aliases?: readonly string[];
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn(SECTION_SCROLL_MT, className)} aria-label={label}>
      {aliases.map((alias) => (
        <div
          key={alias}
          id={alias}
          className={cn(SECTION_SCROLL_MT, "pointer-events-none h-0 w-0 overflow-hidden")}
          aria-hidden
        />
      ))}
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-10">
        {children}
      </div>
    </section>
  );
}

function ResultsSectionTabs({ activeId }: { activeId: string }) {
  const t = useT();

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav
      className="sticky top-16 z-40 border-b border-[color:var(--border-subtle)] bg-[var(--surface)]"
      aria-label={t("resultsDash.sectionNav")}
    >
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 sm:px-6">
        {SECTION_TABS.map((tab) => {
          const isActive = activeId === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => scrollToSection(tab.id)}
              className={cn(
                "shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-lab-mist text-lab-ink dark:bg-lab-signal/15 dark:text-lab-signal"
                  : "text-slate-600 hover:bg-slate-100 hover:text-lab-ink dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
              )}
              aria-current={isActive ? "true" : undefined}
            >
              {t(tab.labelKey)}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export function ResultsDashboard({
  result,
  productName,
  formData,
  source,
  ragSources,
  analysisId,
  readOnly = false,
  leading,
}: ResultsDashboardProps) {
  const { getAccessToken } = useAuth();
  const t = useT();
  const { locale, tp } = usePreferences();
  const [activePersona, setActivePersona] = useState(result.personas[0]?.name ?? "");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [answerCitations, setAnswerCitations] = useState<string[]>([]);
  const [asking, setAsking] = useState(false);
  const [askError, setAskError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>(SECTION_TABS[0].id);

  useEffect(() => {
    const nodes = SECTION_TABS.map((tab) => document.getElementById(tab.id)).filter(
      (n): n is HTMLElement => Boolean(n)
    );
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (top?.target?.id) setActiveSection(top.target.id);
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.55],
      }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const downloadPDF = () => {
    generatePDF(result, productName, source, {
      ragSources,
      analysisId,
      locale,
    });
  };

  function selectPersona(name: string) {
    setActivePersona(name);
    setMessages([]);
    setAnswerCitations([]);
    setAskError(null);
  }

  async function handleFollowup(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim() || !activePersona) return;
    const q = question.trim();
    setAsking(true);
    setAskError(null);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error(t("common.errorLoginRequired"));
      const persona = result.personas.find((p) => p.name === activePersona);
      const res = await askPersonaFollowup(token, {
        analysisId,
        productId: formData?.productId,
        personaName: activePersona,
        question: q,
        productName: formData?.productName ?? productName,
        productDescription: formData?.productDescription,
        priorPersona: persona as unknown as Record<string, unknown>,
        history: messages,
        locale,
      });
      setMessages((prev) => [...prev, { role: "user", content: q }, { role: "assistant", content: res.answer }]);
      setAnswerCitations(res.citations ?? []);
      setQuestion("");
    } catch (err) {
      setAskError(err instanceof Error ? err.message : t("common.errorAskFailed"));
    } finally {
      setAsking(false);
    }
  }

  return (
    <div className="pb-6 print:pb-0">
      <ResultsSectionTabs activeId={activeSection} />

      {/* Summary hero — score + decision + main CTAs */}
      <SectionShell
        id="ozet"
        aliases={["summary"]}
        label={t("resultsDash.tabSummary")}
        className="border-b border-[color:var(--border-subtle)]"
      >
        {leading}
        {analysisId && !readOnly && (
          <Card className="overflow-hidden border-brand-300 bg-gradient-to-r from-brand-50 via-white to-cyan-50 shadow-md dark:border-brand-500/30 dark:from-brand-500/10 dark:via-surface dark:to-cyan-500/10">
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg">
                  <Video className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700 dark:text-brand-400">
                    {t("resultsDash.liveAdvisorKicker")}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-lab-ink dark:text-white">
                    {t("resultsDash.liveAdvisorTitle")}
                  </h3>
                  <p className="mt-1 max-w-xl text-sm text-slate-600 dark:text-slate-300">
                    {analysisId === "demo-public"
                      ? t("resultsDash.liveAdvisorDescDemo")
                      : t("resultsDash.liveAdvisorDesc")}
                  </p>
                </div>
              </div>
              <Link
                href={`/results/${analysisId}/talk?persona=${encodeURIComponent(activePersona)}`}
                className="shrink-0"
              >
                <Button size="lg" className="w-full gap-2 sm:w-auto">
                  <Video className="h-4 w-4" />
                  {t("resultsDash.goLiveAdvisor")}
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        <DecisionSummary
          result={result}
          productName={productName}
          analysisId={analysisId}
          productId={formData?.productId}
        />

        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={downloadPDF} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            {t("resultsDash.downloadPdf")}
          </Button>
          {!readOnly && (
            <ExportShareActions
              result={result}
              productName={productName}
              analysisId={analysisId}
            />
          )}
          {source && (
            <Badge variant={source === "openai" ? "success" : "neutral"}>
              {source === "openai" ? t("resultsDash.aiAnalysis") : t("resultsDash.demoAnalysis")}
            </Badge>
          )}
          {ragSources && ragSources.length > 0 && (
            <a
              href="#rag"
              className="text-xs text-slate-500 hover:text-brand-700 dark:text-slate-400 dark:hover:text-brand-400"
            >
              {tp("resultsDash.sourcesUsed", { count: ragSources.length })}
            </a>
          )}
        </div>

        <div id="detay" className={SECTION_SCROLL_MT}>
          <Card className="overflow-hidden dark:border-white/10 dark:bg-surface">
            <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-brand-50/80 to-lab-chalk dark:border-white/10 dark:from-brand-500/10 dark:to-surface">
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <Target className="h-5 w-5 text-brand-600" />
                {t("resultsDash.scoresTitle")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between">
                <ScoreRing score={result.overallScore} label={t("resultsDash.overallScore")} size="lg" />
                <div className="grid w-full max-w-xl flex-1 gap-5 sm:grid-cols-2">
                  <ScoreRing score={result.clarityScore} label={t("resultsDash.clarity")} size="sm" />
                  <ScoreRing score={result.adoptionScore} label={t("resultsDash.adoption")} size="sm" />
                  <ScoreRing
                    score={result.onboardingRiskScore}
                    label={t("resultsDash.onboardingRisk")}
                    size="sm"
                    invert
                  />
                  <ScoreRing score={result.targetFitScore} label={t("resultsDash.targetFit")} size="sm" />
                </div>
              </div>

              <div className="mt-8 space-y-4 border-t border-slate-100 pt-8 dark:border-white/10">
                <Progress value={result.clarityScore} label={t("resultsDash.clarity")} />
                <Progress value={result.adoptionScore} label={t("resultsDash.adoptionLower")} />
                <Progress
                  value={result.onboardingRiskScore}
                  label={t("resultsDash.onboardingRiskLower")}
                  invert
                />
                <Progress value={result.targetFitScore} label={t("resultsDash.targetFitLower")} />
              </div>
            </CardContent>
          </Card>
        </div>
      </SectionShell>

      {/* Persona insights + ask */}
      <SectionShell id="persona" label={t("resultsDash.personaSims")}>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <User className="h-5 w-5 text-brand-600" />
          {t("resultsDash.personaSims")}
        </h3>
        <div className="grid gap-4 lg:grid-cols-2">
          {result.personas.map((persona) => (
            <PersonaCard key={persona.name} persona={persona} t={t} />
          ))}
        </div>

        <Card className="dark:border-white/10 dark:bg-surface">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base dark:text-white">
              <MessageCircle className="h-5 w-5 text-brand-600" />
              {t("resultsDash.askPersona")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysisId && !readOnly && (
              <Link
                href={`/results/${analysisId}/talk?persona=${encodeURIComponent(activePersona)}`}
                className="inline-flex"
              >
                <Button type="button" variant="outline" className="gap-2">
                  <Video className="h-4 w-4" />
                  {t("resultsDash.talk3d")}
                </Button>
              </Link>
            )}
            <p className="text-sm text-slate-500 dark:text-slate-400">{t("resultsDash.askHint")}</p>
            <div className="flex flex-wrap gap-2">
              {result.personas.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => selectPersona(p.name)}
                  className={cn(
                    "rounded-xl border px-3 py-1.5 text-sm transition-colors",
                    activePersona === p.name
                      ? "border-brand-500 bg-brand-50 text-brand-800 dark:border-lab-signal/50 dark:bg-lab-signal/15 dark:text-lab-signal"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-white/15 dark:bg-[var(--lab-mist)] dark:text-slate-300 dark:hover:bg-white/5"
                  )}
                >
                  {localizedPersonaDisplayName(t, p.name)}
                </button>
              ))}
            </div>
            {messages.length > 0 && (
              <div className="max-h-72 space-y-3 overflow-y-auto rounded-xl border border-slate-200 bg-lab-chalk/50 p-4">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={cn(
                      "rounded-xl px-3 py-2 text-sm",
                      m.role === "user"
                        ? "ml-8 bg-[#0c1222] text-white dark:bg-lab-signal dark:text-[#0c1222]"
                        : "mr-8 border border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-[var(--lab-mist)] dark:text-slate-300"
                    )}
                  >
                    {m.role === "assistant" ? (
                      <>
                        <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-slate-400">
                          {activePersona}
                        </p>
                        <CitedText value={m.content} />
                      </>
                    ) : (
                      m.content
                    )}
                  </div>
                ))}
              </div>
            )}
            <form onSubmit={handleFollowup} className="flex flex-col gap-3 sm:flex-row">
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={t("resultsDash.askPlaceholder")}
                className="flex-1"
              />
              <Button type="submit" disabled={asking || !question.trim()}>
                {asking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {t("resultsDash.askButton")}
              </Button>
            </form>
            {askError && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
                {askError}
              </div>
            )}
            {answerCitations.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {answerCitations.map((c) => (
                  <Badge key={c} variant="neutral" className="font-mono text-[10px]">
                    {c}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </SectionShell>

      {/* Insights & actions */}
      <SectionShell
        id="aksiyon"
        aliases={["actions"]}
        label={t("resultsDash.actionPlan")}
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <InsightList
            title={t("resultsDash.blindSpots")}
            icon={AlertTriangle}
            items={result.blindSpots}
            iconColor="text-amber-600"
          />
          <InsightList
            title={t("resultsDash.dropOffs")}
            icon={TrendingDown}
            items={result.dropOffPoints}
            iconColor="text-rose-600"
          />
        </div>

        <InsightList
          title={t("resultsDash.actionPlan")}
          icon={Lightbulb}
          items={result.actionPlan}
          iconColor="text-brand-600"
          numbered
        />

        <Card className="print:mb-8 print:break-inside-avoid dark:border-white/10 dark:bg-surface">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base dark:text-white">
              <MessageSquareQuote className="h-5 w-5 text-brand-600" />
              {t("resultsDash.improvedPitch")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {result.improvedPitch}
            </p>
          </CardContent>
        </Card>

        <InsightList
          title={t("resultsDash.toughQuestions")}
          icon={HelpCircle}
          items={result.toughQuestions}
          iconColor="text-brand-700"
          numbered
        />
      </SectionShell>

      {/* RAG evidence */}
      <SectionShell id="rag" label="RAG">
        <RagEvidencePanel ragSources={ragSources} source={source} />
      </SectionShell>
    </div>
  );
}

function PersonaCard({ persona, t }: { persona: PersonaAnalysis; t: (k: string) => string }) {
  const behavior = behaviorLabel(persona.likelihood, t);

  return (
    <Card className="transition-shadow hover:shadow-md print:mb-8 print:break-inside-avoid dark:border-white/10 dark:bg-surface">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <CardTitle className="font-display text-base dark:text-white">
              {localizedPersonaDisplayName(t, persona.name)}
            </CardTitle>
            <p className="mt-1 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {t("resultsDash.behavior")} · {behavior}
            </p>
          </div>
          <Badge variant={likelihoodVariant(persona.likelihood)}>
            {t("resultsDash.likelihood")}: {likelihoodLabel(persona.likelihood, t)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <PersonaField label={t("resultsDash.firstImpression")} value={persona.firstImpression} />
        <PersonaField label={t("resultsDash.understood")} value={persona.understood} />
        <PersonaField
          label={t("resultsDash.confusion")}
          value={persona.confusion}
          highlight="warning"
        />
        <PersonaField label={t("resultsDash.dropOffReason")} value={persona.dropOffReason} highlight="danger" />
        <PersonaField label={t("resultsDash.suggestion")} value={persona.suggestion} highlight="success" />
        {persona.dropOffTimeline && persona.dropOffTimeline.length > 0 && (
          <SessionTimeline steps={persona.dropOffTimeline} />
        )}
        {persona.citations && persona.citations.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {persona.citations.map((c) => (
              <Badge key={c} variant="neutral" className="font-mono text-[10px]">
                {c}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function PersonaField({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: "warning" | "danger" | "success";
}) {
  const bg =
    highlight === "warning"
      ? "bg-amber-50 dark:bg-amber-500/10"
      : highlight === "danger"
        ? "bg-red-50 dark:bg-red-500/10"
        : highlight === "success"
          ? "bg-emerald-50 dark:bg-emerald-500/10"
          : "bg-slate-50 dark:bg-white/5";

  return (
    <div className={cn("rounded-lg p-3", bg)}>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
      <CitedText value={value} />
    </div>
  );
}

function InsightList({
  title,
  icon: Icon,
  items,
  iconColor,
  numbered = false,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: string[];
  iconColor: string;
  numbered?: boolean;
}) {
  return (
    <Card className="print:mb-8 print:break-inside-avoid dark:border-white/10 dark:bg-surface">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base dark:text-white">
          <Icon className={cn("h-5 w-5", iconColor)} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-500 dark:bg-white/10 dark:text-slate-400">
                {numbered ? i + 1 : "•"}
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
