"use client";

import Link from "next/link";
import {
  Bell,
  FlaskConical,
  GitCompare,
  History,
  LogOut,
  Menu,
  Split,
  User,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/supabase/auth-context";
import { listNotifications, markNotificationRead } from "@/lib/api";
import { PreferencesToggles } from "@/components/layout/preferences-toggles";
import { useT } from "@/lib/i18n/preferences-context";

export function SiteHeader() {
  const { user, loading, signOut, configured, getAccessToken } = useAuth();
  const router = useRouter();
  const t = useT();
  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<
    { id: string; title: string; body: string; href?: string | null; read: boolean }[]
  >([]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      try {
        const token = await getAccessToken();
        if (!token) return;
        const items = await listNotifications(token);
        if (!cancelled) setNotifications(items.filter((n) => !n.read).slice(0, 8));
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, getAccessToken]);

  async function handleSignOut() {
    await signOut();
    setOpen(false);
    router.push("/");
  }

  async function openNotif(id: string, href?: string | null) {
    try {
      const token = await getAccessToken();
      if (token) await markNotificationRead(token, id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch {
      /* ignore */
    }
    setNotifOpen(false);
    if (href) router.push(href);
  }

  const linkClass =
    "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-white hover:text-lab-ink dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white";

  const navLinks = user ? (
    <>
      <Link href="/history" className={linkClass}>
        <History className="h-4 w-4" />
        {t("nav.history")}
      </Link>
      <Link href="/compare" className={linkClass}>
        <GitCompare className="h-4 w-4" />
        {t("nav.compare")}
      </Link>
      <Link href="/ab" className={linkClass}>
        <Split className="h-4 w-4" />
        {t("nav.ab")}
      </Link>
      <Link href="/team" className={linkClass}>
        <Users className="h-4 w-4" />
        {t("nav.team")}
      </Link>
    </>
  ) : null;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-[var(--header-bg)] backdrop-blur-md dark:border-white/10">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-lab-ink text-lab-signal dark:bg-lab-signal dark:text-[#0c1222]">
            <FlaskConical className="h-4 w-4" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight text-lab-ink">
            FirstClick
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex lg:gap-1">
          <PreferencesToggles />
          {!loading && user && (
            <>
              {navLinks}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setNotifOpen((v) => !v)}
                  className="relative inline-flex items-center rounded-lg px-3 py-2 text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-white/10"
                  aria-label={t("nav.notifications")}
                >
                  <Bell className="h-4 w-4" />
                  {notifications.length > 0 && (
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500" />
                  )}
                </button>
                {notifOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-80 rounded-xl border border-[color:var(--border-subtle)] bg-[var(--surface)] p-2 shadow-lg">
                    {notifications.length === 0 ? (
                      <p className="px-3 py-4 text-sm text-slate-500 dark:text-slate-400">
                        {t("nav.noNotifications")}
                      </p>
                    ) : (
                      notifications.map((n) => (
                        <button
                          key={n.id}
                          type="button"
                          onClick={() => openNotif(n.id, n.href)}
                          className="block w-full rounded-lg px-3 py-2 text-left hover:bg-lab-chalk dark:hover:bg-white/5"
                        >
                          <p className="text-sm font-medium text-lab-ink">{n.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{n.body}</p>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
              <span className="hidden items-center gap-1.5 px-2 text-xs text-slate-500 dark:text-slate-400 xl:inline-flex">
                <User className="h-3.5 w-3.5" />
                {user.email}
              </span>
              <button type="button" onClick={handleSignOut} className={linkClass}>
                <LogOut className="h-4 w-4" />
                {t("nav.logout")}
              </button>
            </>
          )}
          {!user && configured && (
            <>
              <Link href="/demo" className={linkClass}>
                {t("nav.demo")}
              </Link>
              <Link href="/login" className={linkClass}>
                {t("nav.login")}
              </Link>
            </>
          )}
          <Link
            href="/analyze"
            className="rounded-lg bg-lab-ink px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700 dark:bg-lab-signal dark:text-[#0c1222] dark:hover:bg-[#d4f85c]"
          >
            {t("nav.startTest")}
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <PreferencesToggles compact />
          <Link
            href="/analyze"
            className="rounded-lg bg-lab-ink px-3 py-2 text-sm font-medium text-white dark:bg-lab-signal dark:text-[#0c1222]"
          >
            {t("nav.testShort")}
          </Link>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-white/10"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[color:var(--border-subtle)] bg-[var(--surface)] px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {!loading && user && (
              <>
                <Link
                  href="/history"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-lab-chalk dark:text-slate-200 dark:hover:bg-white/5"
                >
                  {t("nav.history")}
                </Link>
                <Link
                  href="/compare"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-lab-chalk dark:text-slate-200 dark:hover:bg-white/5"
                >
                  {t("nav.compare")}
                </Link>
                <Link
                  href="/ab"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-lab-chalk dark:text-slate-200 dark:hover:bg-white/5"
                >
                  {t("nav.abPitch")}
                </Link>
                <Link
                  href="/team"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-lab-chalk dark:text-slate-200 dark:hover:bg-white/5"
                >
                  {t("nav.team")}
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-lab-chalk dark:text-slate-200 dark:hover:bg-white/5"
                >
                  {t("nav.logout")}
                </button>
              </>
            )}
            {!user && configured && (
              <>
                <Link
                  href="/demo"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-lab-chalk dark:text-slate-200 dark:hover:bg-white/5"
                >
                  {t("nav.demo")}
                </Link>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-lab-chalk dark:text-slate-200 dark:hover:bg-white/5"
                >
                  {t("nav.login")}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
