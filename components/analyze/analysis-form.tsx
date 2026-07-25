"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, FileUp, Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HealthBanner } from "@/components/analyze/health-banner";
import {
  OrchestrationPanel,
  type OrchestrationActive,
  type OrchestrationLogItem,
  type OrchestrationPersonaProgress,
} from "@/components/analyze/orchestration-panel";
import { DEFAULT_PERSONA_IDS, PERSONA_OPTIONS, STORAGE_KEYS } from "@/lib/constants";
import { PERSONA_PACKS } from "@/lib/persona-packs";
import {
  createCustomPersona,
  createProduct,
  deleteCustomPersona,
  deleteDocument,
  ingestWebUrl,
  listCustomPersonas,
  listDocuments,
  listProducts,
  submitAnalysisStream,
  uploadDocument,
  type CustomPersonaItem,
  type DocumentItem,
  type OrchestrationEvent,
  type ProductItem,
} from "@/lib/api";
import type { AnalysisFormData } from "@/types/analysis";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/supabase/auth-context";
import {
  localizedPersonaDescription,
  localizedPersonaLabel,
  personaPackDescriptionKey,
} from "@/lib/i18n/persona-labels";
import { usePreferences, useT } from "@/lib/i18n/preferences-context";

function pushLog(
  setter: React.Dispatch<React.SetStateAction<OrchestrationLogItem[]>>,
  item: Omit<OrchestrationLogItem, "id">
) {
  setter((prev) => [...prev, { ...item, id: `${Date.now()}-${prev.length}` }]);
}

const STAGE_TEXT_KEYS: Record<"scanning" | "simulating", string> = {
  scanning: "analyze.form.orchestration.scanning",
  simulating: "analyze.form.orchestration.simulating",
};

/**
 * Map stream stage → dictionary key. Never return BE `message` for display —
 * prior bug preferred Turkish human strings over t().
 */
function stageTextKey(event: { key?: string; message?: string }): string {
  if (event.key === "scanning" || event.key === "simulating") {
    return STAGE_TEXT_KEYS[event.key];
  }
  const n = (event.message ?? "").toLowerCase();
  if (n.includes("taran") || n.includes("scanning") || n.includes("source")) {
    return STAGE_TEXT_KEYS.scanning;
  }
  if (n.includes("simüle") || n.includes("simul") || n.includes("persona")) {
    return STAGE_TEXT_KEYS.simulating;
  }
  return "orchestration.running";
}

function handleOrchestrationEvent(
  event: OrchestrationEvent,
  setters: {
    setOrchestrationActive: (msg: OrchestrationActive | null) => void;
    setOrchestrationLogs: React.Dispatch<React.SetStateAction<OrchestrationLogItem[]>>;
    setPersonaProgress: (p: OrchestrationPersonaProgress | null) => void;
  }
) {
  const { setOrchestrationActive, setOrchestrationLogs, setPersonaProgress } = setters;
  switch (event.type) {
    case "stage": {
      const textKey = stageTextKey(event);
      setOrchestrationActive({ textKey });
      pushLog(setOrchestrationLogs, { textKey });
      break;
    }
    case "rag":
      if (event.count > 0) {
        setOrchestrationActive({
          textKey: "analyze.form.orchestration.ragFetched",
          params: { count: event.count },
        });
        const titles = event.titles ?? [];
        const slugs = event.slugs ?? [];
        if (titles.length > 0 || slugs.length > 0) {
          pushLog(setOrchestrationLogs, {
            textKey: "analyze.form.orchestration.ragTitles",
            ragTitles: titles.slice(0, 4),
            ragSlugs: slugs.slice(0, 4),
            tone: "rag",
          });
        } else {
          pushLog(setOrchestrationLogs, {
            textKey: "analyze.form.orchestration.ragFetched",
            params: { count: event.count },
            tone: "rag",
          });
        }
      } else {
        setOrchestrationActive({ textKey: "analyze.form.orchestration.ragEmpty" });
        pushLog(setOrchestrationLogs, {
          textKey: "analyze.form.orchestration.ragNone",
          tone: "rag",
        });
      }
      break;
    case "persona": {
      if (event.status === "running") {
        setPersonaProgress({
          index: event.index,
          total: event.total,
          personaId: event.personaId,
          fallbackName: event.name,
        });
        setOrchestrationActive({
          textKey: "analyze.form.orchestration.personaRunning",
          params: { index: event.index, total: event.total },
        });
        pushLog(setOrchestrationLogs, {
          textKey: "analyze.form.orchestration.personaLog",
          params: { index: event.index, total: event.total },
          personaId: event.personaId,
          fallbackName: event.name,
          tone: "persona",
        });
      } else {
        pushLog(setOrchestrationLogs, {
          textKey:
            event.ok === false
              ? "analyze.form.orchestration.personaFailed"
              : "analyze.form.orchestration.personaDone",
          params: { index: event.index },
          tone: event.ok === false ? "default" : "done",
        });
      }
      break;
    }
    case "synthesis":
      if (event.status === "running") {
        setPersonaProgress(null);
        setOrchestrationActive({ textKey: "analyze.form.orchestration.synthesisRunning" });
        pushLog(setOrchestrationLogs, {
          textKey: "analyze.form.orchestration.synthesisWorking",
          tone: "synthesis",
        });
      } else {
        pushLog(setOrchestrationLogs, {
          textKey: "analyze.form.orchestration.synthesisDone",
          tone: "done",
        });
      }
      break;
    default:
      break;
  }
}

export function AnalysisForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getAccessToken } = useAuth();
  const t = useT();
  const { locale } = usePreferences();

  const steps = useMemo(
    () =>
      [
        { id: 1, label: t("analyze.form.steps.product") },
        { id: 2, label: t("analyze.form.steps.sources") },
        { id: 3, label: t("analyze.form.steps.personas") },
      ] as const,
    [t]
  );
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orchestrationActive, setOrchestrationActive] = useState<OrchestrationActive | null>(null);
  const [orchestrationLogs, setOrchestrationLogs] = useState<OrchestrationLogItem[]>([]);
  const [personaProgress, setPersonaProgress] = useState<OrchestrationPersonaProgress | null>(null);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [customPersonas, setCustomPersonas] = useState<CustomPersonaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [webUrl, setWebUrl] = useState("");
  const [ingestingUrl, setIngestingUrl] = useState(false);
  const [newPersonaName, setNewPersonaName] = useState("");
  const [newPersonaTraits, setNewPersonaTraits] = useState("");

  const [form, setForm] = useState<AnalysisFormData>({
    productName: "",
    productDescription: "",
    targetAudience: "",
    coreFeatures: "",
    differentiator: "",
    selectedPersonas: [...DEFAULT_PERSONA_IDS],
    productId: null,
  });

  const refreshProducts = useCallback(async () => {
    const token = await getAccessToken();
    if (!token) return;
    try {
      setProducts(await listProducts(token));
    } catch {
      /* ignore */
    }
  }, [getAccessToken]);

  const refreshDocuments = useCallback(
    async (productId: string | null | undefined) => {
      const token = await getAccessToken();
      if (!token || !productId) {
        setDocuments([]);
        return;
      }
      try {
        setDocuments(await listDocuments(token, productId));
      } catch {
        setDocuments([]);
      }
    },
    [getAccessToken]
  );

  const refreshCustomPersonas = useCallback(async () => {
    const token = await getAccessToken();
    if (!token) return;
    try {
      setCustomPersonas(await listCustomPersonas(token));
    } catch {
      setCustomPersonas([]);
    }
  }, [getAccessToken]);

  useEffect(() => {
    refreshProducts();
    refreshCustomPersonas();
  }, [refreshProducts, refreshCustomPersonas]);

  useEffect(() => {
    refreshDocuments(form.productId);
  }, [form.productId, refreshDocuments]);

  useEffect(() => {
    const productId = searchParams.get("productId");
    if (!productId || products.length === 0) return;
    const selected = products.find((p) => p.id === productId);
    if (!selected) return;
    setForm((prev) => ({
      ...prev,
      productId: selected.id,
      productName: selected.name,
      productDescription: selected.description || prev.productDescription,
    }));
    if (searchParams.get("retest") === "1") setStep(1);
  }, [searchParams, products]);

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

  function loadSample() {
    setForm({
      productName: "TaskFlow",
      productDescription: t("analyze.form.sample.productDescription"),
      targetAudience: t("analyze.form.sample.targetAudience"),
      coreFeatures: t("analyze.form.sample.coreFeatures"),
      differentiator: t("analyze.form.sample.differentiator"),
      selectedPersonas: [...DEFAULT_PERSONA_IDS],
      productId: null,
    });
    setStep(1);
    setError(null);
  }

  async function ensureProduct(): Promise<string> {
    if (form.productId) return form.productId;
    if (!form.productName.trim()) {
      throw new Error(t("analyze.form.error.productNameRequired"));
    }
    const token = await getAccessToken();
    if (!token) throw new Error(t("analyze.form.error.sessionRequired"));
    const created = await createProduct(token, form.productName, form.productDescription);
    setProducts((prev) => [created, ...prev]);
    updateField("productId", created.id);
    return created.id;
  }

  async function handleUpload(fileList: FileList | null) {
    // Snapshot immediately — FileList is live; clearing the input empties it.
    const file = fileList?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const productId = await ensureProduct();
      const token = await getAccessToken();
      if (!token) throw new Error(t("analyze.form.error.sessionRequired"));
      await uploadDocument(token, productId, file);
      await refreshDocuments(productId);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "string"
            ? err
            : t("analyze.form.error.uploadFailed");
      setError(
        message === "[object Object]"
          ? t("analyze.form.error.uploadDocFailed")
          : message
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleIngestUrl() {
    if (!webUrl.trim()) return;
    setIngestingUrl(true);
    setError(null);
    try {
      const productId = await ensureProduct();
      const token = await getAccessToken();
      if (!token) throw new Error(t("analyze.form.error.sessionRequired"));
      await ingestWebUrl(token, productId, webUrl.trim());
      setWebUrl("");
      await refreshDocuments(productId);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("analyze.form.error.urlFailed"));
    } finally {
      setIngestingUrl(false);
    }
  }

  async function handleDeleteDoc(id: string) {
    const token = await getAccessToken();
    if (!token) return;
    try {
      await deleteDocument(token, id);
      await refreshDocuments(form.productId);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("analyze.form.error.deleteFailed"));
    }
  }

  async function handleCreateCustomPersona() {
    if (!newPersonaName.trim()) return;
    const token = await getAccessToken();
    if (!token) {
      setError(t("analyze.form.error.sessionRequired"));
      return;
    }
    try {
      const created = await createCustomPersona(token, newPersonaName.trim(), newPersonaTraits.trim());
      setCustomPersonas((prev) => [created, ...prev]);
      togglePersona(`custom:${created.id}`);
      setNewPersonaName("");
      setNewPersonaTraits("");
    } catch (err) {
      setError(err instanceof Error ? err.message : t("analyze.form.error.personaCreateFailed"));
    }
  }

  async function handleDeleteCustomPersona(id: string) {
    const token = await getAccessToken();
    if (!token) return;
    try {
      await deleteCustomPersona(token, id);
      setCustomPersonas((prev) => prev.filter((p) => p.id !== id));
      setForm((prev) => ({
        ...prev,
        selectedPersonas: prev.selectedPersonas.filter((p) => p !== `custom:${id}`),
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : t("analyze.form.error.deleteFailed"));
    }
  }

  function canGoNext(): boolean {
    if (step === 1) {
      return Boolean(form.productName.trim() && form.productDescription.trim());
    }
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step < 3) {
      if (!canGoNext()) {
        setError(t("analyze.form.error.productRequired"));
        return;
      }
      setError(null);
      if (step === 1) {
        try {
          await ensureProduct();
        } catch (err) {
          setError(err instanceof Error ? err.message : t("analyze.form.error.productSaveFailed"));
          return;
        }
      }
      setStep((s) => Math.min(3, s + 1));
      return;
    }

    setError(null);
    if (!form.productName.trim() || !form.productDescription.trim()) {
      setError(t("analyze.form.error.productRequired"));
      setStep(1);
      return;
    }
    if (form.selectedPersonas.length === 0) {
      setError(t("analyze.form.error.personaRequired"));
      return;
    }

    setLoading(true);
    setOrchestrationActive({ textKey: "analyze.form.orchestration.labStarting" });
    setOrchestrationLogs([]);
    setPersonaProgress(null);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error(t("analyze.form.error.loginRequired"));
      const productId = await ensureProduct();
      const payload = { ...form, productId, locale };
      const json = await submitAnalysisStream(payload, token, (event) => {
        handleOrchestrationEvent(event, {
          setOrchestrationActive,
          setOrchestrationLogs,
          setPersonaProgress,
        });
      });
      if (!json.success || !json.data) {
        throw new Error(json.error ?? t("analyze.form.error.analysisFailed"));
      }

      sessionStorage.setItem(STORAGE_KEYS.formData, JSON.stringify(payload));
      sessionStorage.setItem(STORAGE_KEYS.analysisResult, JSON.stringify(json.data));
      sessionStorage.setItem("firstclick-analysis-source", json.source ?? "mock");
      sessionStorage.setItem(STORAGE_KEYS.ragSources, JSON.stringify(json.ragSources ?? []));
      if (json.analysisId) {
        sessionStorage.setItem(STORAGE_KEYS.analysisId, json.analysisId);
        router.push(`/results/${json.analysisId}`);
      } else {
        router.push("/results");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t("analyze.form.error.unexpected"));
    } finally {
      setLoading(false);
      setPersonaProgress(null);
    }
  }

  const sourceKindLabel = useMemo(
    () => (kind?: string) => {
      if (kind === "web") return t("analyze.form.sourceKind.web");
      if (kind === "screenshot") return t("analyze.form.sourceKind.screenshot");
      return t("analyze.form.sourceKind.file");
    },
    [t]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <HealthBanner />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {steps.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setStep(s.id)}
              className={cn(
                "rounded-xl px-3 py-1.5 text-sm font-medium transition-colors",
                step === s.id
                  ? "bg-[#0c1222] text-white dark:bg-lab-signal dark:text-[#0c1222]"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-lab-chalk dark:bg-[var(--lab-mist)] dark:text-slate-300 dark:ring-[color:var(--border-subtle)] dark:hover:bg-white/5"
              )}
            >
              {s.id}. {s.label}
            </button>
          ))}
        </div>
        <Button type="button" variant="outline" size="sm" onClick={loadSample}>
          {t("analyze.form.trySample")}
        </Button>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>{t("analyze.form.step1.title")}</CardTitle>
            <CardDescription>{t("analyze.form.step1.description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="productSelect">{t("analyze.form.registeredProduct")}</Label>
              <select
                id="productSelect"
                className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-[color:var(--border-subtle)] dark:bg-[var(--surface)] dark:text-slate-100"
                value={form.productId ?? ""}
                onChange={(e) => {
                  const id = e.target.value || null;
                  const selected = products.find((p) => p.id === id);
                  updateField("productId", id);
                  if (selected) {
                    updateField("productName", selected.name);
                    if (selected.description) {
                      updateField("productDescription", selected.description);
                    }
                  }
                }}
              >
                <option value="">{t("analyze.form.newProduct")}</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="productName">{t("analyze.form.productName")}</Label>
              <Input
                id="productName"
                placeholder={t("analyze.form.productNamePlaceholder")}
                value={form.productName}
                onChange={(e) => updateField("productName", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productDescription">{t("analyze.form.productDescription")}</Label>
              <Textarea
                id="productDescription"
                placeholder={t("analyze.form.productDescriptionPlaceholder")}
                value={form.productDescription}
                onChange={(e) => updateField("productDescription", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetAudience">{t("analyze.form.targetAudience")}</Label>
              <Textarea
                id="targetAudience"
                placeholder={t("analyze.form.targetAudiencePlaceholder")}
                className="min-h-[80px]"
                value={form.targetAudience}
                onChange={(e) => updateField("targetAudience", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coreFeatures">{t("analyze.form.coreFeatures")}</Label>
              <Textarea
                id="coreFeatures"
                placeholder={t("analyze.form.coreFeaturesPlaceholder")}
                className="min-h-[80px]"
                value={form.coreFeatures}
                onChange={(e) => updateField("coreFeatures", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="differentiator">{t("analyze.form.differentiator")}</Label>
              <Textarea
                id="differentiator"
                placeholder={t("analyze.form.differentiatorPlaceholder")}
                className="min-h-[80px]"
                value={form.differentiator}
                onChange={(e) => updateField("differentiator", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>{t("analyze.form.step2.title")}</CardTitle>
            <CardDescription>{t("analyze.form.step2.description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2 text-xs text-slate-500 sm:grid-cols-4 dark:text-slate-400">
              <p className="rounded-lg bg-lab-chalk px-3 py-2">{t("analyze.form.sourceHint.file")}</p>
              <p className="rounded-lg bg-lab-chalk px-3 py-2">{t("analyze.form.sourceHint.url")}</p>
              <p className="rounded-lg bg-lab-chalk px-3 py-2">{t("analyze.form.sourceHint.history")}</p>
              <p className="rounded-lg bg-lab-ink px-3 py-2 text-lab-signal">
                {t("analyze.form.sourceHint.expertise")}
              </p>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t("analyze.form.sourceNote")}</p>
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-lab-chalk/80 px-4 py-8 text-center transition-colors hover:border-brand-500 hover:bg-brand-50/40 dark:border-[color:var(--border-subtle)] dark:hover:bg-brand-500/10">
              <FileUp className="h-6 w-6 text-brand-600" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {uploading ? t("analyze.form.uploading") : t("analyze.form.uploadLabel")}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{t("analyze.form.uploadFormats")}</span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.md,.txt,.markdown,.png,.jpg,.jpeg,.webp,text/plain,application/pdf,image/*"
                disabled={uploading}
                onChange={(e) => {
                  void handleUpload(e.target.files);
                  e.target.value = "";
                }}
              />
            </label>
            <div className="space-y-2">
              <Label htmlFor="webUrl">{t("analyze.form.webUrlLabel")}</Label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  id="webUrl"
                  type="url"
                  placeholder={t("analyze.form.webUrlPlaceholder")}
                  value={webUrl}
                  onChange={(e) => setWebUrl(e.target.value)}
                  disabled={ingestingUrl}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleIngestUrl}
                  disabled={ingestingUrl || !webUrl.trim()}
                >
                  {ingestingUrl ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {t("analyze.form.addPage")}
                </Button>
              </div>
            </div>
            {documents.length > 0 && (
              <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white dark:divide-[color:var(--border-subtle)] dark:border-[color:var(--border-subtle)] dark:bg-[var(--surface)]">
                {documents.map((doc) => (
                  <li key={doc.id} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                    <div className="min-w-0">
                      <p className="truncate text-slate-700 dark:text-slate-200">{doc.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {sourceKindLabel(doc.sourceKind)}
                        {doc.sourceUrl ? ` · ${doc.sourceUrl}` : ""}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteDoc(doc.id)}
                      className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
                      aria-label={t("analyze.form.delete")}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>{t("analyze.form.step3.title")}</CardTitle>
            <CardDescription>{t("analyze.form.step3.description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {PERSONA_PACKS.map((pack) => (
                <button
                  key={pack.id}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, selectedPersonas: [...pack.personaIds] }))
                  }
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-xs hover:border-brand-400 hover:bg-brand-50 dark:border-[color:var(--border-subtle)] dark:bg-[var(--surface)] dark:hover:bg-brand-500/10"
                >
                  <span className="font-medium text-lab-ink">{pack.label}</span>
                  <span className="mt-0.5 block text-slate-500">
                    {t(personaPackDescriptionKey(pack.id))}
                  </span>
                </button>
              ))}
            </div>
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
                        ? "border-brand-400 bg-brand-50 shadow-sm shadow-brand-500/10 dark:border-transparent dark:bg-[#0c1222] dark:shadow-none dark:ring-1 dark:ring-lab-signal/40"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-transparent dark:bg-[#0c1222] dark:hover:bg-[#151b27]"
                    )}
                  >
                    <p
                      className={cn(
                        "text-sm font-medium",
                        selected
                          ? "text-brand-800 dark:text-lab-signal"
                          : "text-slate-900 dark:text-slate-200"
                      )}
                    >
                      {localizedPersonaLabel(t, persona.id)}
                    </p>
                    <p
                      className={cn(
                        "mt-1 text-xs",
                        selected ? "text-brand-700/80 dark:text-slate-400" : "text-slate-500 dark:text-slate-400"
                      )}
                    >
                      {localizedPersonaDescription(t, persona.id)}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="rounded-xl border border-slate-200 bg-lab-chalk/60 p-4 dark:border-[color:var(--border-subtle)]">
              <p className="text-sm font-medium text-lab-ink">{t("analyze.form.customPersonaTitle")}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Input
                  placeholder={t("analyze.form.customPersonaNamePlaceholder")}
                  value={newPersonaName}
                  onChange={(e) => setNewPersonaName(e.target.value)}
                />
                <Input
                  placeholder={t("analyze.form.customPersonaTraitsPlaceholder")}
                  value={newPersonaTraits}
                  onChange={(e) => setNewPersonaTraits(e.target.value)}
                />
              </div>
              <Button type="button" variant="outline" size="sm" className="mt-3" onClick={handleCreateCustomPersona}>
                <Plus className="h-4 w-4" />
                {t("analyze.form.add")}
              </Button>
              {customPersonas.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {customPersonas.map((p) => {
                    const id = `custom:${p.id}`;
                    const selected = form.selectedPersonas.includes(id);
                    return (
                      <li
                        key={p.id}
                        className={cn(
                          "flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-sm",
                          selected
                            ? "border-brand-400 bg-brand-50 dark:border-transparent dark:bg-[#0c1222] dark:ring-1 dark:ring-lab-signal/40"
                            : "border-slate-200 bg-white dark:border-transparent dark:bg-[#0c1222]"
                        )}
                      >
                        <button type="button" className="min-w-0 flex-1 text-left" onClick={() => togglePersona(id)}>
                          <p
                            className={cn(
                              "font-medium",
                              selected ? "text-brand-800 dark:text-lab-signal" : "text-slate-800 dark:text-slate-200"
                            )}
                          >
                            {p.name}
                          </p>
                          {p.traits ? (
                            <p
                              className={cn(
                                "truncate text-xs",
                                selected ? "text-brand-700/80 dark:text-slate-400" : "text-slate-500 dark:text-slate-400"
                              )}
                            >
                              {p.traits}
                            </p>
                          ) : null}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCustomPersona(p.id)}
                          className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
                          aria-label={t("analyze.form.delete")}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      {loading && (
        <OrchestrationPanel
          active={orchestrationActive}
          logs={orchestrationLogs}
          personaProgress={personaProgress}
        />
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button
          type="button"
          variant="ghost"
          disabled={step === 1 || loading}
          onClick={() => setStep((s) => Math.max(1, s - 1))}
        >
          <ChevronLeft className="h-4 w-4" />
          {t("analyze.form.back")}
        </Button>
        <Button type="submit" size="lg" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("analyze.form.analyzing")}
            </>
          ) : step < 3 ? (
            <>
              {t("analyze.form.continue")}
              <ChevronRight className="h-4 w-4" />
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              {t("analyze.form.startAnalysis")}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
