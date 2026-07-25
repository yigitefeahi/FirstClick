"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Users } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AuthGuard } from "@/components/auth/auth-guard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState, LoadingState } from "@/components/ui/empty-state";
import {
  acceptWorkspaceInvite,
  createWorkspace,
  declineWorkspaceInvite,
  inviteWorkspaceMember,
  linkProductToWorkspace,
  listPendingInvites,
  listProducts,
  listWorkspaceMembers,
  listWorkspaceProducts,
  listWorkspaces,
} from "@/lib/api";
import { useAuth } from "@/lib/supabase/auth-context";
import { useT } from "@/lib/i18n/preferences-context";

type PendingInvite = {
  id: string;
  workspaceId: string;
  workspaceName: string;
  role: string;
  email: string;
  status: string;
};

function TeamContent() {
  const { getAccessToken } = useAuth();
  const t = useT();
  const [workspaces, setWorkspaces] = useState<
    { id: string; name: string; role: string }[]
  >([]);
  const [pending, setPending] = useState<PendingInvite[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [members, setMembers] = useState<
    { id: string; email: string; role: string; status: string }[]
  >([]);
  const [name, setName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"viewer" | "editor">("viewer");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    const token = await getAccessToken();
    if (!token) return;
    const [list, invites] = await Promise.all([
      listWorkspaces(token),
      listPendingInvites(token),
    ]);
    setWorkspaces(list);
    setPending(invites);
    if (list.length === 0) {
      setActiveId("");
      return;
    }
    setActiveId((current) =>
      current && list.some((w) => w.id === current) ? current : list[0].id
    );
  }, [getAccessToken]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await refresh();
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : t("common.errorLoadFailed"));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [refresh]);

  useEffect(() => {
    if (!activeId) {
      setMembers([]);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const token = await getAccessToken();
        if (!token) return;
        const m = await listWorkspaceMembers(token, activeId);
        if (!cancelled) setMembers(m);
      } catch {
        if (!cancelled) setMembers([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [activeId, getAccessToken]);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error(t("common.errorSessionRequired"));
      const ws = await createWorkspace(token, name.trim());
      setName("");
      await refresh();
      setActiveId(ws.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("common.errorCreateFailed"));
    } finally {
      setBusy(false);
    }
  }

  async function handleInvite(e: FormEvent) {
    e.preventDefault();
    if (!activeId || !inviteEmail.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error(t("common.errorSessionRequired"));
      await inviteWorkspaceMember(token, activeId, inviteEmail.trim(), inviteRole);
      setInviteEmail("");
      const m = await listWorkspaceMembers(token, activeId);
      setMembers(m);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("common.errorInviteFailed"));
    } finally {
      setBusy(false);
    }
  }

  async function handleAccept(inviteId: string) {
    setBusy(true);
    setError(null);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error(t("common.errorSessionRequired"));
      const accepted = await acceptWorkspaceInvite(token, inviteId);
      await refresh();
      const invite = pending.find((p) => p.id === inviteId);
      if (invite) setActiveId(invite.workspaceId);
      void accepted;
    } catch (err) {
      setError(err instanceof Error ? err.message : t("common.errorAcceptFailed"));
    } finally {
      setBusy(false);
    }
  }

  async function handleDecline(inviteId: string) {
    setBusy(true);
    setError(null);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error(t("common.errorSessionRequired"));
      await declineWorkspaceInvite(token, inviteId);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("common.errorDeclineFailed"));
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <LoadingState label={t("team.loading")} />;

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
          {error}
        </div>
      )}

      {pending.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-base dark:text-white">{t("team.pendingInvites")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200">
              {pending.map((invite) => (
                <li
                  key={invite.id}
                  className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="text-sm">
                    <p className="font-medium text-lab-ink">{invite.workspaceName}</p>
                    <p className="text-slate-500 dark:text-slate-400">
                      {t("common.role")}: {invite.role} · {invite.email}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      disabled={busy}
                      onClick={() => handleAccept(invite.id)}
                    >
                      {t("common.accept")}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={busy}
                      onClick={() => handleDecline(invite.id)}
                    >
                      {t("common.decline")}
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-base dark:text-white">{t("team.createWorkspace")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="flex flex-col gap-3 sm:flex-row">
            <Input
              placeholder={t("team.workspacePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button type="submit" disabled={busy}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {t("common.create")}
            </Button>
          </form>
        </CardContent>
      </Card>

      {workspaces.length === 0 ? (
        <EmptyState title={t("team.emptyTitle")} description={t("team.emptyDesc")} />
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            {workspaces.map((w) => (
              <button
                key={w.id}
                type="button"
                onClick={() => setActiveId(w.id)}
                className={
                  activeId === w.id
                    ? "rounded-xl bg-[#0c1222] px-3 py-1.5 text-sm text-white dark:bg-lab-signal dark:text-[#0c1222]"
                    : "rounded-xl bg-white px-3 py-1.5 text-sm text-slate-600 ring-1 ring-slate-200 dark:bg-[var(--lab-mist)] dark:text-slate-300 dark:ring-white/10"
                }
              >
                {w.name} · {w.role}
              </button>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-display text-base dark:text-white">{t("team.membersInvite")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleInvite} className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
                <div>
                  <Label htmlFor="invite">{t("auth.email")}</Label>
                  <Input
                    id="invite"
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder={t("team.inviteEmailPlaceholder")}
                  />
                </div>
                <div>
                  <Label htmlFor="role">{t("common.role")}</Label>
                  <select
                    id="role"
                    className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-white/10 dark:bg-surface dark:text-white"
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as "viewer" | "editor")}
                  >
                    <option value="viewer">viewer</option>
                    <option value="editor">editor</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button type="submit" disabled={busy}>
                    {t("common.invite")}
                  </Button>
                </div>
              </form>
              <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200 dark:divide-white/10 dark:border-white/10">
                {members.map((m) => (
                  <li key={m.id} className="flex items-center justify-between px-4 py-3 text-sm">
                    <span className="dark:text-slate-200">{m.email}</span>
                    <div className="flex gap-2">
                      <Badge variant="neutral">{m.role}</Badge>
                      <Badge variant={m.status === "active" ? "success" : "warning"}>
                        {m.status === "active" ? t("common.active") : t("common.pending")}
                      </Badge>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t("team.inviteHint")}</p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

export default function TeamPage() {
  const t = useT();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
          <Link
            href="/analyze"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-700"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("common.backToAnalyze")}
          </Link>
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0c1222] text-lab-signal">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-semibold text-lab-ink dark:text-white">{t("team.title")}</h1>
              <p className="text-slate-500 dark:text-slate-400">{t("team.subtitle")}</p>
            </div>
          </div>
          <AuthGuard>
            <TeamContent />
          </AuthGuard>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
