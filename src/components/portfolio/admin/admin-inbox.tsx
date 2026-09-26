"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  CheckCheck,
  ChevronDown,
  Download,
  Inbox,
  Loader2,
  LogOut,
  Mail,
  MailOpen,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { WelcomeEmailPreview } from "./welcome-email-preview";

type AdminMessage = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  createdAt: string;
};

type AdminSubscriber = { id: string; email: string; createdAt: string };

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function fullDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * The Studio Ledger inbox — contact-form messages + Studio Notes list.
 * All data flows through the cookie-gated /api/admin/* endpoints.
 */
export function AdminInbox() {
  const router = useRouter();

  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [subscribers, setSubscribers] = useState<AdminSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const confirmTimer = useRef<number | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const [msgRes, subRes] = await Promise.all([
        fetch("/api/admin/messages", { cache: "no-store" }),
        fetch("/api/admin/subscribers", { cache: "no-store" }),
      ]);
      if (msgRes.status === 401 || subRes.status === 401) {
        router.refresh();
        return;
      }
      const msgData = (await msgRes.json()) as { ok: boolean; messages?: AdminMessage[] };
      const subData = (await subRes.json()) as { ok: boolean; subscribers?: AdminSubscriber[] };
      if (!msgData.ok || !subData.ok) throw new Error("load failed");
      setMessages(msgData.messages ?? []);
      setSubscribers(subData.subscribers ?? []);
    } catch {
      setLoadError("Could not reach the ledger — refresh to retry.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void load();
  }, [load]);

  // "/" focuses the ledger search from anywhere on the page.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/") return;
      const t = e.target;
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || (t as HTMLElement | null)?.isContentEditable) return;
      e.preventDefault();
      searchRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(
    () => () => {
      if (confirmTimer.current) window.clearTimeout(confirmTimer.current);
    },
    []
  );

  const stats = useMemo(() => {
    const unread = messages.filter((m) => !m.read).length;
    return { total: messages.length, unread, subs: subscribers.length };
  }, [messages, subscribers]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return messages.filter((m) => {
      if (filter === "unread" && m.read) return false;
      if (!q) return true;
      return (
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        (m.subject ?? "").toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
      );
    });
  }, [messages, filter, query]);

  const toggleRead = useCallback(
    async (m: AdminMessage) => {
      const next = !m.read;
      setMessages((prev) => prev.map((x) => (x.id === m.id ? { ...x, read: next } : x)));
      try {
        const res = await fetch(`/api/admin/messages/${m.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ read: next }),
        });
        if (!res.ok) throw new Error();
      } catch {
        setMessages((prev) => prev.map((x) => (x.id === m.id ? { ...x, read: !next } : x)));
        toast({ title: "Could not update — try again", variant: "destructive" });
      }
    },
    []
  );

  const markAllRead = useCallback(async () => {
    const unread = messages.filter((m) => !m.read);
    if (unread.length === 0) return;
    setMessages((prev) => prev.map((m) => ({ ...m, read: true })));
    const results = await Promise.allSettled(
      unread.map((m) =>
        fetch(`/api/admin/messages/${m.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ read: true }),
        })
      )
    );
    if (results.some((r) => r.status === "rejected" || (r.status === "fulfilled" && !r.value.ok))) {
      toast({ title: "Some messages did not update — refreshing", variant: "destructive" });
      void load();
    } else {
      toast({ title: `Marked ${unread.length} message${unread.length === 1 ? "" : "s"} as read` });
    }
  }, [messages, load]);

  const removeMessage = useCallback(
    async (id: string) => {
      const snapshot = messages;
      setMessages((prev) => prev.filter((m) => m.id !== id));
      setConfirmDelete(null);
      try {
        const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error();
        toast({ title: "Message deleted" });
      } catch {
        setMessages(snapshot);
        toast({ title: "Could not delete — try again", variant: "destructive" });
      }
    },
    [messages]
  );

  const armDelete = useCallback((id: string) => {
    if (confirmTimer.current) window.clearTimeout(confirmTimer.current);
    setConfirmDelete(id);
    confirmTimer.current = window.setTimeout(() => setConfirmDelete(null), 2600);
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => null);
    toast({ title: "Locked the ledger" });
    router.refresh();
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      {/* top bar */}
      <header className="sticky top-0 z-40 border-b border-ink/8 bg-cream/92 backdrop-blur-xl dark:border-white/10">
        <div className="mx-auto flex h-[60px] max-w-[1040px] items-center justify-between gap-3 px-4 md:px-8">
          <Link href="/" className="group flex items-center gap-2.5" aria-label="Back to portfolio home">
            <Image
              src="/design-assets/logo-monogram.png"
              alt="Divyanshu Singh monogram logo"
              width={28}
              height={28}
              className="size-7 object-contain"
              priority
            />
            <span className="hidden font-mono-x text-[10px] font-bold tracking-[0.2em] uppercase text-terra-deep sm:inline">
              ● Studio Ledger — Private
            </span>
            <span className="font-mono-x text-[10px] font-bold tracking-[0.2em] uppercase text-terra-deep sm:hidden">
              ● Ledger
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <WelcomeEmailPreview />
            <a
              href="/api/admin/export?type=messages"
              className="hidden items-center gap-1.5 rounded-full border border-ink/12 px-3.5 py-1.5 font-mono-x text-[10px] font-bold tracking-[0.14em] uppercase text-ink-soft transition-colors hover:border-terra/40 hover:text-terra-deep md:inline-flex dark:border-white/15"
            >
              <Download className="size-3.5" aria-hidden="true" />
              CSV
            </a>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-full bg-night px-3.5 py-1.5 font-mono-x text-[10px] font-bold tracking-[0.14em] uppercase text-white transition-colors hover:bg-ink dark:bg-terra dark:hover:bg-terra-deep"
            >
              <LogOut className="size-3.5" aria-hidden="true" />
              Lock
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1040px] flex-1 px-4 pb-20 pt-10 md:px-8 md:pt-14">
        {/* heading + stats */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="flex items-center gap-2.5 font-mono-x text-[10.5px] font-bold tracking-[0.22em] uppercase text-terra-deep">
              <span aria-hidden="true" className="inline-block size-[7px] rounded-full bg-terra" />
              Contact &amp; Studio Notes
            </p>
            <h1 className="mt-4 font-display text-[clamp(2rem,4.4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-ink">
              The inbox<span className="text-terra">.</span>
            </h1>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Messages", value: stats.total, cls: "text-ink" },
              { label: "Unread", value: stats.unread, cls: "text-terra-deep" },
              { label: "Subscribers", value: stats.subs, cls: "text-leaf" },
            ].map((s) => (
              <div
                key={s.label}
                className="min-w-[104px] rounded-[18px] border border-ink/10 bg-card px-4 py-3.5 dark:border-white/12"
              >
                <p className={`font-display text-[26px] font-semibold leading-none ${s.cls}`}>{s.value}</p>
                <p className="mt-2 font-mono-x text-[9.5px] font-bold tracking-[0.16em] uppercase text-ink-faint">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* loading */}
        {loading && (
          <div className="mt-10 space-y-3" aria-live="polite">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-[92px] animate-pulse rounded-[18px] border border-ink/8 bg-card dark:border-white/10"
              />
            ))}
            <p className="pt-1 text-center font-mono-x text-[10.5px] tracking-[0.18em] uppercase text-ink-faint">
              Opening the ledger…
            </p>
          </div>
        )}

        {loadError && !loading && (
          <div className="mt-12 rounded-[20px] border border-red-200 bg-red-50 p-6 text-center dark:border-red-500/20 dark:bg-red-500/10">
            <p className="text-[14px] text-red-600 dark:text-red-300">{loadError}</p>
            <button
              onClick={() => void load()}
              className="mt-4 rounded-full bg-night px-5 py-2 font-mono-x text-[10.5px] font-bold tracking-[0.14em] uppercase text-white dark:bg-terra"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !loadError && (
          <>
            {/* filter + search + actions row */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-4 dark:border-white/10">
              <div className="flex flex-wrap items-center gap-2">
                {(
                  [
                    { key: "all", label: "All", count: stats.total },
                    { key: "unread", label: "Unread", count: stats.unread },
                  ] as const
                ).map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    aria-pressed={filter === f.key}
                    className={`rounded-full px-4 py-1.5 font-mono-x text-[10.5px] font-bold tracking-[0.14em] uppercase transition-all ${
                      filter === f.key
                        ? "bg-night text-white dark:bg-terra"
                        : "border border-ink/15 text-ink-soft hover:border-ink/35 hover:text-ink dark:border-white/15"
                    }`}
                  >
                    {f.label} {f.count}
                  </button>
                ))}
                {stats.unread > 0 && (
                  <button
                    onClick={() => void markAllRead()}
                    className="inline-flex items-center gap-1.5 rounded-full border border-terra/35 bg-terra-soft px-4 py-1.5 font-mono-x text-[10.5px] font-bold tracking-[0.14em] uppercase text-terra-deep transition-colors hover:border-terra/60 dark:bg-terra/10"
                  >
                    <CheckCheck className="size-3.5" aria-hidden="true" />
                    Mark all read
                  </button>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {query.trim() && (
                  <p
                    className="rounded-full bg-cream-deep px-3 py-1 font-mono-x text-[9.5px] font-bold tracking-[0.14em] uppercase text-ink-faint dark:bg-white/8 dark:text-ink-faint"
                    aria-live="polite"
                  >
                    {visible.length} of {filter === "unread" ? stats.unread : stats.total} shown
                  </p>
                )}
                <div className="relative">
                  <Search
                    className="pointer-events-none absolute left-3.5 top-1/2 size-3.5 -translate-y-1/2 text-ink-faint"
                    aria-hidden="true"
                  />
                  <input
                    ref={searchRef}
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search the ledger…"
                    aria-label="Search messages by name, email or text"
                    className="w-full min-w-[200px] rounded-full border border-ink/12 bg-card py-2 pl-9 pr-10 font-mono-x text-[11px] text-ink placeholder:text-ink-faint focus:border-terra/60 focus:outline-none focus:ring-2 focus:ring-terra/25 dark:border-white/15 dark:[&::-webkit-search-cancel-button]:hidden md:w-[270px]"
                  />
                  {query ? (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      aria-label="Clear search"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-ink-faint transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-terra"
                    >
                      <X className="size-3.5" aria-hidden="true" />
                    </button>
                  ) : (
                    <span
                      aria-hidden="true"
                      className="kbd-chip absolute right-2.5 top-1/2 -translate-y-1/2 hidden md:inline-flex"
                    >
                      /
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* messages */}
            {visible.length === 0 ? (
              <div className="mt-14 flex flex-col items-center py-10 text-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-cream-deep dark:bg-white/5">
                  {query.trim() ? (
                    <Search className="size-7 text-ink-faint" aria-hidden="true" />
                  ) : (
                    <Inbox className="size-7 text-ink-faint" aria-hidden="true" />
                  )}
                </span>
                <p className="mt-5 font-script text-[26px] text-terra">
                  {query.trim() ? "nothing matches." : "quiet in here."}
                </p>
                <p className="mt-2 max-w-[340px] text-[13.5px] leading-[1.6] text-ink-soft">
                  {query.trim()
                    ? "No messages match that search — try a shorter term or clear the field."
                    : filter === "unread"
                      ? "Every message has been read — nice work."
                      : "No messages yet. The contact form will deliver here."}
                </p>
              </div>
            ) : (
              <ul className="mt-6 space-y-3.5">
                <AnimatePresence initial={false}>
                  {visible.map((m) => {
                    const isOpen = expanded === m.id;
                    return (
                      <motion.li
                        key={m.id}
                        layout
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
                      >
                        <article
                          className={`group overflow-hidden rounded-[18px] border transition-all ${
                            m.read
                              ? "border-ink/10 bg-card dark:border-white/12"
                              : "border-terra/25 bg-terra-soft/40 dark:border-terra/20 dark:bg-terra/5"
                          }`}
                        >
                          <button
                            onClick={() => setExpanded(isOpen ? null : m.id)}
                            aria-expanded={isOpen}
                            className="flex w-full items-start gap-3.5 px-4 py-4 text-left md:px-5"
                          >
                            <span
                              aria-hidden="true"
                              className={`mt-1.5 inline-block size-2.5 shrink-0 rounded-full border-[2.5px] transition-colors ${
                                m.read ? "border-ink/15 bg-transparent" : "border-terra bg-terra"
                              }`}
                            />
                            <span className="min-w-0 flex-1">
                              <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                <span className="font-display text-[16px] font-semibold text-ink">
                                  {m.name}
                                </span>
                                <span className="truncate font-mono-x text-[11.5px] text-ink-soft">
                                  {m.email}
                                </span>
                                {!m.read && (
                                  <span className="rounded-full bg-terra px-2 py-0.5 font-mono-x text-[8.5px] font-bold tracking-[0.14em] uppercase text-white">
                                    New
                                  </span>
                                )}
                              </span>
                              {m.subject && (
                                <span className="mt-1 block text-[13.5px] font-medium text-ink">
                                  {m.subject}
                                </span>
                              )}
                              <span
                                className={`mt-1.5 block text-[13px] leading-[1.55] text-ink-soft ${
                                  isOpen ? "" : "line-clamp-2"
                                }`}
                              >
                                {m.message}
                              </span>
                            </span>
                            <span className="flex shrink-0 flex-col items-end gap-1.5">
                              <span className="font-mono-x text-[9.5px] font-bold tracking-[0.12em] uppercase text-ink-faint">
                                {timeAgo(m.createdAt)}
                              </span>
                              <ChevronDown
                                aria-hidden="true"
                                className={`size-4 text-ink-faint transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                              />
                            </span>
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                key="detail"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.26, ease: [0.21, 0.47, 0.32, 0.98] }}
                              >
                                <div className="border-t border-ink/8 px-4 py-4 md:px-5 dark:border-white/10">
                                  <p className="whitespace-pre-wrap text-[13.5px] leading-[1.7] text-ink">
                                    {m.message}
                                  </p>
                                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                    <p className="font-mono-x text-[9.5px] tracking-[0.14em] uppercase text-ink-faint">
                                      {fullDate(m.createdAt)}
                                    </p>
                                    <div className="flex items-center gap-2">
                                      <a
                                        href={`mailto:${m.email}?subject=${encodeURIComponent(
                                          m.subject ? `Re: ${m.subject}` : `Hello ${m.name}`
                                        )}`}
                                        className="inline-flex items-center gap-1.5 rounded-full bg-night px-4 py-1.5 font-mono-x text-[10px] font-bold tracking-[0.12em] uppercase text-white transition-colors hover:bg-ink dark:bg-terra dark:hover:bg-terra-deep"
                                      >
                                        <ArrowUpRight className="size-3.5" aria-hidden="true" />
                                        Reply
                                      </a>
                                      <button
                                        onClick={() => void toggleRead(m)}
                                        disabled={busyId === m.id}
                                        className="inline-flex items-center gap-1.5 rounded-full border border-ink/12 px-4 py-1.5 font-mono-x text-[10px] font-bold tracking-[0.12em] uppercase text-ink-soft transition-colors hover:border-ink/35 hover:text-ink disabled:opacity-50 dark:border-white/15"
                                      >
                                        {m.read ? (
                                          <>
                                            <MailOpen className="size-3.5" aria-hidden="true" />
                                            Unread
                                          </>
                                        ) : (
                                          <>
                                            <Check className="size-3.5" aria-hidden="true" />
                                            Read
                                          </>
                                        )}
                                      </button>
                                      <button
                                        onClick={() =>
                                          confirmDelete === m.id ? void removeMessage(m.id) : armDelete(m.id)
                                        }
                                        aria-label={
                                          confirmDelete === m.id ? "Confirm delete message" : "Delete message"
                                        }
                                        className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 font-mono-x text-[10px] font-bold tracking-[0.12em] uppercase transition-all ${
                                          confirmDelete === m.id
                                            ? "border-red-400 bg-red-500 text-white"
                                            : "border-ink/12 text-ink-soft hover:border-red-300 hover:text-red-500 dark:border-white/15"
                                        }`}
                                      >
                                        {confirmDelete === m.id ? (
                                          <>
                                            <Loader2 className="hidden" aria-hidden="true" />
                                            Sure?
                                          </>
                                        ) : (
                                          <>
                                            <Trash2 className="size-3.5" aria-hidden="true" />
                                            Delete
                                          </>
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </article>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
            )}

            {/* subscribers */}
            <section className="mt-16" aria-labelledby="subs-heading">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-ink/10 pb-4 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <h2 id="subs-heading" className="font-display text-[20px] font-semibold text-ink">
                    Studio Notes list
                  </h2>
                  <span className="rounded-full bg-leaf-soft px-3 py-1 font-mono-x text-[10px] font-bold tracking-[0.14em] uppercase text-[#0B6B4F] dark:text-[#3ED598]">
                    {stats.subs} reading
                  </span>
                </div>
                <a
                  href="/api/admin/export?type=subscribers"
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink/12 px-4 py-1.5 font-mono-x text-[10px] font-bold tracking-[0.14em] uppercase text-ink-soft transition-colors hover:border-terra/40 hover:text-terra-deep dark:border-white/15"
                >
                  <Download className="size-3.5" aria-hidden="true" />
                  Export CSV
                </a>
              </div>

              {subscribers.length === 0 ? (
                <p className="mt-6 font-mono-x text-[11px] tracking-[0.12em] uppercase text-ink-faint">
                  [ no subscribers yet — the signup forms will deliver here ]
                </p>
              ) : (
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {subscribers.map((s) => (
                    <li
                      key={s.id}
                      className="flex items-center justify-between gap-3 rounded-[14px] border border-ink/10 bg-card px-4 py-3 dark:border-white/12"
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <Mail className="size-4 shrink-0 text-ink-faint" aria-hidden="true" />
                        <span className="truncate font-mono-x text-[12.5px] text-ink">{s.email}</span>
                      </span>
                      <span className="shrink-0 font-mono-x text-[9.5px] tracking-[0.12em] uppercase text-ink-faint">
                        {timeAgo(s.createdAt)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}

        <p className="mt-14 text-center font-mono-x text-[9.5px] tracking-[0.18em] uppercase text-ink-faint">
          Studio Ledger · private area · <span className="text-terra-deep">not indexed</span>
        </p>
      </main>
    </div>
  );
}
