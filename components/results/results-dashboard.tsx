"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScoreRing } from "@/components/ui/score-ring";
import { cn } from "@/lib/utils";
import type { AnalysisResult } from "@/types/analysis";
import {
  AlertTriangle,
  HelpCircle,
  Lightbulb,
  MessageSquareQuote,
  Target,
  TrendingDown,
  User,
} from "lucide-react";

interface ResultsDashboardProps {
  result: AnalysisResult;
  productName?: string;
  source?: "openai" | "mock";
}

function likelihoodVariant(likelihood: string): "success" | "warning" | "danger" {
  if (likelihood === "Yüksek") return "success";
  if (likelihood === "Orta") return "warning";
  return "danger";
}

export function ResultsDashboard({ result, productName, source }: ResultsDashboardProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        {productName && (
          <h2 className="text-2xl font-bold text-slate-900">{productName}</h2>
        )}
        {source && (
          <Badge variant={source === "openai" ? "success" : "neutral"}>
            {source === "openai" ? "AI Analizi" : "Demo Analizi"}
          </Badge>
        )}
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-brand-50/50 to-violet-50/50">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-brand-600" />
            FirstClick Skorları
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between">
            <ScoreRing score={result.overallScore} label="Genel Skor" size="lg" />
            <div className="grid w-full max-w-xl flex-1 gap-5 sm:grid-cols-2">
              <ScoreRing score={result.clarityScore} label="Anlaşılabilirlik" size="sm" />
              <ScoreRing score={result.adoptionScore} label="Kullanma İsteği" size="sm" />
              <ScoreRing
                score={result.onboardingRiskScore}
                label="Onboarding Riski"
                size="sm"
                invert
              />
              <ScoreRing score={result.targetFitScore} label="Hedef Kitle Uyumu" size="sm" />
            </div>
          </div>

          <div className="mt-8 space-y-4 border-t border-slate-100 pt-8">
            <Progress value={result.clarityScore} label="Anlaşılabilirlik" />
            <Progress value={result.adoptionScore} label="Kullanma isteği" />
            <Progress
              value={result.onboardingRiskScore}
              label="Onboarding riski"
              invert
            />
            <Progress value={result.targetFitScore} label="Hedef kitle uyumu" />
          </div>
        </CardContent>
      </Card>

      <section>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
          <User className="h-5 w-5 text-brand-600" />
          Persona Simülasyonları
        </h3>
        <div className="grid gap-4 lg:grid-cols-2">
          {result.personas.map((persona) => (
            <Card key={persona.name} className="transition-shadow hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{persona.name}</CardTitle>
                  <Badge variant={likelihoodVariant(persona.likelihood)}>
                    Kullanma: {persona.likelihood}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <PersonaField label="İlk izlenim" value={persona.firstImpression} />
                <PersonaField label="Anladığı şey" value={persona.understood} />
                <PersonaField label="Kafasının karıştığı nokta" value={persona.confusion} highlight="warning" />
                <PersonaField label="Vazgeçme sebebi" value={persona.dropOffReason} highlight="danger" />
                <PersonaField label="Geliştirme önerisi" value={persona.suggestion} highlight="success" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <InsightList
          title="En Büyük 5 Kör Nokta"
          icon={AlertTriangle}
          items={result.blindSpots}
          iconColor="text-amber-600"
        />
        <InsightList
          title="Vazgeçme Noktaları"
          icon={TrendingDown}
          items={result.dropOffPoints}
          iconColor="text-rose-600"
        />
      </div>

      <InsightList
        title="Öncelikli Aksiyon Planı"
        icon={Lightbulb}
        items={result.actionPlan}
        iconColor="text-brand-600"
        numbered
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <MessageSquareQuote className="h-5 w-5 text-violet-600" />
            Daha İyi Ürün Anlatımı Önerisi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-slate-600">{result.improvedPitch}</p>
        </CardContent>
      </Card>

      <InsightList
        title="Jüri / Yatırımcının Sorabileceği 5 Soru"
        icon={HelpCircle}
        items={result.toughQuestions}
        iconColor="text-violet-600"
        numbered
      />
    </div>
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
      ? "bg-amber-50"
      : highlight === "danger"
        ? "bg-red-50"
        : highlight === "success"
          ? "bg-emerald-50"
          : "bg-slate-50";

  return (
    <div className={cn("rounded-lg p-3", bg)}>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-slate-700">{value}</p>
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon className={cn("h-5 w-5", iconColor)} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex gap-3 text-sm text-slate-600">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-500">
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
