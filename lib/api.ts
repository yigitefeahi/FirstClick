import type {
  AnalysisFormData,
  AnalysisResult,
  AnalyzeApiResponse,
  CompareResult,
  FollowupResult,
  RagSource,
} from "@/types/analysis";

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

function formatFetchError(error: unknown, fallback: string): string {
  if (error instanceof TypeError && /load failed|failed to fetch|network/i.test(error.message)) {
    return "Sunucuya bağlanılamadı. Backend (port 8000) ve Supabase (port 54321) çalışıyor mu?";
  }
  return error instanceof Error ? error.message : fallback;
}

/** FastAPI may return detail as string, object, or validation array — never show [object Object]. */
function formatApiDetail(detail: unknown, fallback: string): string {
  if (detail == null || detail === "") return fallback;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    const parts = detail.map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object") {
        const row = item as { msg?: string; loc?: unknown[]; message?: string };
        const where = Array.isArray(row.loc) ? row.loc.filter((x) => x !== "body").join(".") : "";
        const msg = row.msg || row.message || JSON.stringify(item);
        return where ? `${where}: ${msg}` : msg;
      }
      return String(item);
    });
    return parts.filter(Boolean).join(" · ") || fallback;
  }
  if (typeof detail === "object") {
    const row = detail as { message?: string; msg?: string; error?: string };
    if (row.message) return row.message;
    if (row.msg) return row.msg;
    if (row.error) return row.error;
    try {
      return JSON.stringify(detail);
    } catch {
      return fallback;
    }
  }
  return String(detail);
}

async function throwIfNotOk(response: Response, fallback: string): Promise<void> {
  if (response.ok) return;
  const err = (await response.json().catch(() => ({}))) as { detail?: unknown; error?: unknown };
  throw new Error(formatApiDetail(err.detail ?? err.error, fallback));
}

async function apiFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  try {
    return await fetch(input, init);
  } catch (error) {
    throw new Error(formatFetchError(error, "İstek başarısız oldu."));
  }
}

async function authHeaders(token?: string | null): Promise<HeadersInit> {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export async function submitAnalysis(
  form: AnalysisFormData,
  token?: string | null
): Promise<AnalyzeApiResponse> {
  const response = await apiFetch(`${API_BASE}/api/v1/analyze`, {
    method: "POST",
    headers: await authHeaders(token),
    body: JSON.stringify(form),
  });

  const json = (await response.json()) as AnalyzeApiResponse & { detail?: string };

  if (!response.ok) {
    return {
      success: false,
      source: "mock",
      error:
        json.error ??
        formatApiDetail(json.detail, "Analiz sırasında bir hata oluştu."),
    };
  }

  return json;
}

export type OrchestrationEvent =
  | { type: "stage"; key?: "scanning" | "simulating"; message?: string }
  | { type: "rag"; count: number; titles: string[]; slugs?: string[] }
  | {
      type: "persona";
      status: "running" | "done";
      index: number;
      total: number;
      name: string;
      personaId?: string;
      ok?: boolean;
    }
  | { type: "synthesis"; status: "running" | "done" }
  | { type: "complete"; payload: AnalyzeApiResponse };

export async function submitAnalysisStream(
  form: AnalysisFormData,
  token: string,
  onEvent: (event: OrchestrationEvent) => void
): Promise<AnalyzeApiResponse> {
  const response = await apiFetch(`${API_BASE}/api/v1/analyze/stream`, {
    method: "POST",
    headers: await authHeaders(token),
    body: JSON.stringify(form),
  });

  if (!response.ok) {
    const json = (await response.json().catch(() => ({}))) as { detail?: string };
    throw new Error(formatApiDetail(json.detail, "Analiz sırasında bir hata oluştu."));
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("Stream desteklenmiyor.");
  }

  const decoder = new TextDecoder();
  let buffer = "";
  let finalPayload: AnalyzeApiResponse | null = null;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.trim()) continue;
      let event: OrchestrationEvent;
      try {
        event = JSON.parse(line) as OrchestrationEvent;
      } catch {
        continue;
      }
      if (event.type === "complete") {
        finalPayload = event.payload;
      } else {
        onEvent(event);
      }
    }
  }

  if (buffer.trim()) {
    try {
      const event = JSON.parse(buffer) as OrchestrationEvent;
      if (event.type === "complete") {
        finalPayload = event.payload;
      } else {
        onEvent(event);
      }
    } catch {
      /* ignore trailing partial */
    }
  }

  if (!finalPayload?.success || !finalPayload.data) {
    throw new Error(finalPayload?.error ?? "Analiz tamamlanamadı.");
  }

  return finalPayload;
}

export async function checkBackendHealth(): Promise<HealthStatus> {
  try {
    const response = await apiFetch(`${API_BASE}/health`, { method: "GET" });
    if (!response.ok) return { ok: false, mode: "mock", openaiConfigured: false, supabaseConfigured: false };
    const json = await response.json();
    return {
      ok: true,
      mode: json.mode === "openai" ? "openai" : "mock",
      openaiConfigured: Boolean(json.openaiConfigured),
      supabaseConfigured: Boolean(json.supabaseConfigured),
    };
  } catch {
    return { ok: false, mode: "mock", openaiConfigured: false, supabaseConfigured: false };
  }
}

export interface HealthStatus {
  ok: boolean;
  mode: "openai" | "mock";
  openaiConfigured: boolean;
  supabaseConfigured: boolean;
}

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  createdAt?: string | null;
  workspaceId?: string | null;
}

export interface DocumentItem {
  id: string;
  title: string;
  productId: string;
  createdAt?: string | null;
  byteSize?: number | null;
  sourceKind?: string;
  sourceUrl?: string | null;
}

export interface AnalysisSummary {
  id: string;
  productName: string;
  overallScore?: number | null;
  source: string;
  createdAt?: string | null;
  productId?: string | null;
}

export interface AnalysisDetail {
  id: string;
  formData: AnalysisFormData;
  result: AnalyzeApiResponse["data"];
  source: "openai" | "mock";
  ragSources: RagSource[];
  createdAt?: string | null;
  productId?: string | null;
  shareRole?: "viewer" | "editor" | null;
  readOnly?: boolean;
}

export interface CustomPersonaItem {
  id: string;
  name: string;
  traits: string;
  createdAt?: string | null;
}

export async function listProducts(token: string): Promise<ProductItem[]> {
  const response = await apiFetch(`${API_BASE}/api/v1/products`, {
    headers: await authHeaders(token),
  });
  if (!response.ok) throw new Error("Ürünler yüklenemedi.");
  return response.json();
}

export async function createProduct(
  token: string,
  name: string,
  description = ""
): Promise<ProductItem> {
  const response = await apiFetch(`${API_BASE}/api/v1/products`, {
    method: "POST",
    headers: await authHeaders(token),
    body: JSON.stringify({ name, description }),
  });
  if (!response.ok) {
    await throwIfNotOk(response, "Ürün oluşturulamadı.");
  }
  return response.json();
}

export async function listDocuments(token: string, productId?: string): Promise<DocumentItem[]> {
  const url = new URL(`${API_BASE}/api/v1/documents`);
  if (productId) url.searchParams.set("product_id", productId);
  const response = await apiFetch(url.toString(), {
    headers: await authHeaders(token),
  });
  if (!response.ok) throw new Error("Dokümanlar yüklenemedi.");
  return response.json();
}

export async function uploadDocument(
  token: string,
  productId: string,
  file: File
): Promise<DocumentItem> {
  if (!file || typeof file.size !== "number" || file.size <= 0) {
    throw new Error("Geçerli bir dosya seçin.");
  }

  const filename =
    (typeof file.name === "string" && file.name.trim()) || "document.pdf";

  const body = new FormData();
  body.append("product_id", productId);
  // Explicit filename keeps multipart part typed as a file (not a string field)
  body.append("file", file, filename);

  const response = await apiFetch(`${API_BASE}/api/v1/documents/upload`, {
    method: "POST",
    // Do NOT set Content-Type — browser must add multipart boundary
    headers: { Authorization: `Bearer ${token}` },
    body,
  });
  await throwIfNotOk(response, "Doküman yüklenemedi.");
  return response.json();
}

export async function ingestWebUrl(
  token: string,
  productId: string,
  url: string
): Promise<DocumentItem> {
  const response = await apiFetch(`${API_BASE}/api/v1/documents/ingest-url`, {
    method: "POST",
    headers: await authHeaders(token),
    body: JSON.stringify({ productId, url }),
  });
  await throwIfNotOk(response, "URL corpus’a eklenemedi.");
  return response.json();
}

export async function deleteDocument(token: string, documentId: string): Promise<void> {
  const response = await apiFetch(`${API_BASE}/api/v1/documents/${documentId}`, {
    method: "DELETE",
    headers: await authHeaders(token),
  });
  if (!response.ok) throw new Error("Doküman silinemedi.");
}

export async function listAnalyses(token: string): Promise<AnalysisSummary[]> {
  const response = await apiFetch(`${API_BASE}/api/v1/analyses`, {
    headers: await authHeaders(token),
  });
  if (!response.ok) throw new Error("Geçmiş yüklenemedi.");
  return response.json();
}

export async function getAnalysis(id: string, token: string): Promise<AnalysisDetail> {
  const response = await apiFetch(`${API_BASE}/api/v1/analyses/${id}`, {
    headers: await authHeaders(token),
  });
  if (!response.ok) throw new Error("Analiz bulunamadı.");
  return response.json();
}

export async function deleteAnalysis(token: string, id: string): Promise<void> {
  const response = await apiFetch(`${API_BASE}/api/v1/analyses/${id}`, {
    method: "DELETE",
    headers: await authHeaders(token),
  });
  if (!response.ok) throw new Error("Analiz silinemedi.");
}

export async function listCustomPersonas(token: string): Promise<CustomPersonaItem[]> {
  const response = await apiFetch(`${API_BASE}/api/v1/personas`, {
    headers: await authHeaders(token),
  });
  if (!response.ok) throw new Error("Personalar yüklenemedi.");
  return response.json();
}

export async function createCustomPersona(
  token: string,
  name: string,
  traits = ""
): Promise<CustomPersonaItem> {
  const response = await apiFetch(`${API_BASE}/api/v1/personas`, {
    method: "POST",
    headers: await authHeaders(token),
    body: JSON.stringify({ name, traits }),
  });
  await throwIfNotOk(response, "Persona oluşturulamadı.");
  return response.json();
}

export async function deleteCustomPersona(token: string, id: string): Promise<void> {
  const response = await apiFetch(`${API_BASE}/api/v1/personas/${id}`, {
    method: "DELETE",
    headers: await authHeaders(token),
  });
  if (!response.ok) throw new Error("Persona silinemedi.");
}

export async function compareAnalyses(
  token: string,
  beforeId: string,
  afterId: string,
  locale?: "tr" | "en"
): Promise<CompareResult> {
  const response = await apiFetch(`${API_BASE}/api/v1/analyses/compare`, {
    method: "POST",
    headers: await authHeaders(token),
    body: JSON.stringify({ beforeId, afterId, locale: locale ?? "tr" }),
  });
  await throwIfNotOk(response, "Karşılaştırma başarısız.");
  return response.json();
}

export async function askPersonaFollowup(
  token: string,
  payload: {
    analysisId?: string | null;
    productId?: string | null;
    personaName: string;
    question: string;
    productName?: string;
    productDescription?: string;
    priorPersona?: Record<string, unknown>;
    history?: { role: "user" | "assistant"; content: string }[];
    locale?: "tr" | "en";
  }
): Promise<FollowupResult> {
  const response = await apiFetch(`${API_BASE}/api/v1/followup`, {
    method: "POST",
    headers: await authHeaders(token),
    body: JSON.stringify(payload),
  });
  await throwIfNotOk(response, "Follow-up başarısız.");
  return response.json();
}

export async function fetchPublicStats(): Promise<{
  testsThisWeek: number;
  avgScoreThisWeek: number;
  productsTested: number;
  headline: string;
}> {
  const response = await apiFetch(`${API_BASE}/api/v1/stats/public`);
  if (!response.ok) throw new Error("İstatistik alınamadı.");
  return response.json();
}

export async function fetchPublicDemo(): Promise<{
  success: boolean;
  source: string;
  formData: AnalysisFormData;
  data: AnalysisResult;
  ragSources: RagSource[];
  analysisId: string;
}> {
  try {
    const response = await apiFetch(`${API_BASE}/api/v1/demo`, {
      signal: AbortSignal.timeout(2500),
    });
    if (response.ok) return response.json();
  } catch {
    /* offline fallback */
  }
  const { getLocalDemoPayload } = await import("@/lib/demo-fixture");
  return getLocalDemoPayload();
}

export async function getSharedAnalysis(token: string): Promise<AnalysisDetail> {
  const response = await apiFetch(`${API_BASE}/api/v1/share/${token}`);
  if (!response.ok) throw new Error("Paylaşım bulunamadı.");
  return response.json();
}

export async function listWorkspaceProducts(token: string, workspaceId: string): Promise<ProductItem[]> {
  const response = await apiFetch(`${API_BASE}/api/v1/workspaces/${workspaceId}/products`, {
    headers: await authHeaders(token),
  });
  if (!response.ok) throw new Error("Workspace ürünleri yüklenemedi.");
  return response.json();
}

export async function linkProductToWorkspace(
  token: string,
  workspaceId: string,
  productId: string
): Promise<ProductItem> {
  const response = await apiFetch(`${API_BASE}/api/v1/workspaces/${workspaceId}/products`, {
    method: "POST",
    headers: await authHeaders(token),
    body: JSON.stringify({ productId }),
  });
  await throwIfNotOk(response, "Ürün workspace'e bağlanamadı.");
  return response.json();
}

export async function createShareLink(
  token: string,
  analysisId: string,
  role: "viewer" | "editor" = "viewer"
): Promise<{ token: string; role: string; urlPath: string }> {
  const response = await apiFetch(`${API_BASE}/api/v1/workspaces/share`, {
    method: "POST",
    headers: await authHeaders(token),
    body: JSON.stringify({ analysisId, role }),
  });
  await throwIfNotOk(response, "Paylaşım linki oluşturulamadı.");
  return response.json();
}

export async function listWorkspaces(token: string) {
  const response = await apiFetch(`${API_BASE}/api/v1/workspaces`, {
    headers: await authHeaders(token),
  });
  if (!response.ok) throw new Error("Workspace listesi alınamadı.");
  return response.json() as Promise<
    { id: string; name: string; ownerId: string; role: string; createdAt?: string }[]
  >;
}

export async function createWorkspace(token: string, name: string) {
  const response = await apiFetch(`${API_BASE}/api/v1/workspaces`, {
    method: "POST",
    headers: await authHeaders(token),
    body: JSON.stringify({ name }),
  });
  await throwIfNotOk(response, "Workspace oluşturulamadı.");
  return response.json();
}

export async function listWorkspaceMembers(token: string, workspaceId: string) {
  const response = await apiFetch(`${API_BASE}/api/v1/workspaces/${workspaceId}/members`, {
    headers: await authHeaders(token),
  });
  if (!response.ok) throw new Error("Üyeler yüklenemedi.");
  return response.json() as Promise<
    { id: string; email: string; role: string; status: string; userId?: string }[]
  >;
}

export async function inviteWorkspaceMember(
  token: string,
  workspaceId: string,
  email: string,
  role: "editor" | "viewer"
) {
  const response = await apiFetch(`${API_BASE}/api/v1/workspaces/${workspaceId}/invite`, {
    method: "POST",
    headers: await authHeaders(token),
    body: JSON.stringify({ email, role }),
  });
  await throwIfNotOk(response, "Davet başarısız.");
  return response.json();
}

export async function listPendingInvites(token: string) {
  const response = await apiFetch(`${API_BASE}/api/v1/workspaces/invites/pending`, {
    headers: await authHeaders(token),
  });
  if (!response.ok) throw new Error("Davetler yüklenemedi.");
  return response.json() as Promise<
    {
      id: string;
      workspaceId: string;
      workspaceName: string;
      role: string;
      email: string;
      status: string;
    }[]
  >;
}

export async function acceptWorkspaceInvite(token: string, memberId: string) {
  const response = await apiFetch(`${API_BASE}/api/v1/workspaces/invites/${memberId}/accept`, {
    method: "POST",
    headers: await authHeaders(token),
  });
  await throwIfNotOk(response, "Davet kabul edilemedi.");
  return response.json();
}

export async function declineWorkspaceInvite(token: string, memberId: string) {
  const response = await apiFetch(`${API_BASE}/api/v1/workspaces/invites/${memberId}/decline`, {
    method: "POST",
    headers: await authHeaders(token),
  });
  await throwIfNotOk(response, "Davet reddedilemedi.");
  return response.json();
}

export async function listNotifications(token: string) {
  const response = await apiFetch(`${API_BASE}/api/v1/notifications`, {
    headers: await authHeaders(token),
  });
  if (!response.ok) throw new Error("Bildirimler yüklenemedi.");
  return response.json() as Promise<
    {
      id: string;
      kind: string;
      title: string;
      body: string;
      href?: string | null;
      read: boolean;
      createdAt?: string;
    }[]
  >;
}

export async function markNotificationRead(token: string, id: string) {
  await apiFetch(`${API_BASE}/api/v1/notifications/${id}/read`, {
    method: "POST",
    headers: await authHeaders(token),
  });
}

export async function submitAbAnalysis(
  token: string,
  payload: {
    productName: string;
    pitchA: string;
    pitchB: string;
    labelA?: string;
    labelB?: string;
    targetAudience?: string;
    coreFeatures?: string;
    differentiator?: string;
    selectedPersonas: string[];
    productId?: string | null;
    locale?: "tr" | "en";
  }
) {
  const response = await apiFetch(`${API_BASE}/api/v1/analyze/ab`, {
    method: "POST",
    headers: await authHeaders(token),
    body: JSON.stringify(payload),
  });
  await throwIfNotOk(response, "A/B analizi başarısız.");
  return response.json() as Promise<{
    resultA: AnalysisResult;
    resultB: AnalysisResult;
    labelA: string;
    labelB: string;
    winner: "A" | "B" | "tie";
    source: "openai" | "mock";
    analysisIdA?: string | null;
    analysisIdB?: string | null;
  }>;
}
