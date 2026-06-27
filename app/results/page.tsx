"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ResultsDashboard } from "@/components/results/results-dashboard";
import { Button } from "@/components/ui/button";
import { STORAGE_KEYS } from "@/lib/constants";
import type { AnalysisFormData, AnalysisResult } from "@/types/analysis";

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [formData, setFormData] = useState<AnalysisFormData | null>(null);
  const [source, setSource] = useState<"openai" | "mock">("mock");

  useEffect(() => {
    const storedResult = sessionStorage.getItem(STORAGE_KEYS.analysisResult);
    const storedForm = sessionStorage.getItem(STORAGE_KEYS.formData);

    if (!storedResult) {
      router.replace("/analyze");
      return;
    }

    try {
      setResult(JSON.parse(storedResult));
      if (storedForm) {
        setFormData(JSON.parse(storedForm));
      }
      const storedSource = sessionStorage.getItem("firstclick-analysis-source");
      if (storedSource === "openai" || storedSource === "mock") {
        setSource(storedSource);
      }
    } catch {
      router.replace("/analyze");
    }
  }, [router]);

  if (!result) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-slate-50/50">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link
                href="/analyze"
                className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-brand-600"
              >
                <ArrowLeft className="h-4 w-4" />
                Yeni analiz
              </Link>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Analiz Sonuçları</h1>
              <p className="mt-2 text-slate-500">
                Kullanıcı simülasyonu tamamlandı. İşte bulgular ve öneriler.
              </p>
            </div>
            <Link href="/analyze">
              <Button variant="outline">
                <RotateCcw className="h-4 w-4" />
                Yeni Analiz
              </Button>
            </Link>
          </div>

          <ResultsDashboard
            result={result}
            productName={formData?.productName}
            source={source}
          />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
