"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DEFAULT_PERSONA_IDS, PERSONA_OPTIONS, STORAGE_KEYS } from "@/lib/constants";
import { submitAnalysis } from "@/lib/api";
import type { AnalysisFormData } from "@/types/analysis";
import { cn } from "@/lib/utils";

export function AnalysisForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<AnalysisFormData>({
    productName: "",
    productDescription: "",
    targetAudience: "",
    coreFeatures: "",
    differentiator: "",
    selectedPersonas: [...DEFAULT_PERSONA_IDS],
  });

  function togglePersona(id: string) {
    setForm((prev) => {
      const selected = prev.selectedPersonas.includes(id)
        ? prev.selectedPersonas.filter((p) => p !== id)
        : [...prev.selectedPersonas, id];
      return { ...prev, selectedPersonas: selected };
    });
  }

  function updateField<K extends keyof AnalysisFormData>(key: K, value: AnalysisFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.productName.trim() || !form.productDescription.trim()) {
      setError("Ürün adı ve açıklaması zorunludur.");
      return;
    }

    if (form.selectedPersonas.length === 0) {
      setError("En az bir kullanıcı profili seçmelisiniz.");
      return;
    }

    setLoading(true);

    try {
      const json = await submitAnalysis(form);

      if (!json.success || !json.data) {
        throw new Error(json.error ?? "Analiz sırasında bir hata oluştu.");
      }

      sessionStorage.setItem(STORAGE_KEYS.formData, JSON.stringify(form));
      sessionStorage.setItem(STORAGE_KEYS.analysisResult, JSON.stringify(json.data));
      sessionStorage.setItem("firstclick-analysis-source", json.source ?? "mock");

      router.push("/results");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Beklenmeyen bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Ürün Bilgileri</CardTitle>
          <CardDescription>
            Test etmek istediğiniz ürün fikrini mümkün olduğunca detaylı anlatın.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="productName">Ürün adı *</Label>
            <Input
              id="productName"
              placeholder="Örn: TaskFlow"
              value={form.productName}
              onChange={(e) => updateField("productName", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="productDescription">Ürün açıklaması *</Label>
            <Textarea
              id="productDescription"
              placeholder="Ürününüz ne yapıyor? Hangi problemi çözüyor?"
              value={form.productDescription}
              onChange={(e) => updateField("productDescription", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAudience">Hedef kitle</Label>
            <Textarea
              id="targetAudience"
              placeholder="Kimler kullanacak? Demografik ve davranışsal özellikler..."
              className="min-h-[80px]"
              value={form.targetAudience}
              onChange={(e) => updateField("targetAudience", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coreFeatures">Temel özellikler</Label>
            <Textarea
              id="coreFeatures"
              placeholder="Virgül veya satır ile ayırarak özellikleri listeleyin"
              className="min-h-[80px]"
              value={form.coreFeatures}
              onChange={(e) => updateField("coreFeatures", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="differentiator">Rakiplerden farkı</Label>
            <Textarea
              id="differentiator"
              placeholder="Rakiplere göre sizi farklı kılan nedir?"
              className="min-h-[80px]"
              value={form.differentiator}
              onChange={(e) => updateField("differentiator", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Test Edilecek Kullanıcı Profilleri</CardTitle>
          <CardDescription>
            Ürününüzü hangi persona tipleriyle simüle etmek istediğinizi seçin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {PERSONA_OPTIONS.map((persona) => {
              const selected = form.selectedPersonas.includes(persona.id);
              return (
                <button
                  key={persona.id}
                  type="button"
                  onClick={() => togglePersona(persona.id)}
                  className={cn(
                    "rounded-xl border p-4 text-left transition-all duration-200",
                    selected
                      ? "border-brand-400 bg-brand-50 shadow-sm shadow-brand-500/10"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                        selected
                          ? "border-brand-600 bg-brand-600 text-white"
                          : "border-slate-300 bg-white"
                      )}
                    >
                      {selected && (
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{persona.label}</p>
                      <p className="mt-1 text-xs text-slate-500">{persona.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analiz ediliyor…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Analizi Başlat
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
