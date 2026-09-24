"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Status = "idle" | "loading" | "done";

/**
 * Compact Studio Notes signup — used on the journal index and at the end
 * of every article. Posts to the same duplicate-safe /api/newsletter.
 */
export function SubscribeForm({ id }: { id?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;

    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok: boolean; already?: boolean; note?: string; error?: string }
        | null;

      if (res.ok && data?.ok) {
        setStatus("done");
        setEmail("");
        toast({
          title: data.already ? "Already subscribed" : "Subscribed to Studio Notes",
          description: data.note,
        });
      } else {
        setStatus("idle");
        const msg = data?.error ?? "Something went wrong — please try again.";
        setError(msg);
        toast({ title: "Subscription failed", description: msg, variant: "destructive" });
      }
    } catch {
      setStatus("idle");
      setError("Network error — please try again.");
      toast({ title: "Subscription failed", description: "Network error — please try again.", variant: "destructive" });
    }
  };

  return (
    <section
      id={id}
      className="relative overflow-hidden rounded-[22px] border border-ink/10 dark:border-white/10 bg-card p-6 md:p-8"
    >
      {/* corner ornament */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 size-36 rounded-full border-[10px] border-terra-soft dark:border-terra/10"
      />
      <div className="relative">
        <p className="flex items-center gap-2 font-mono-x text-[10.5px] font-bold tracking-[0.22em] uppercase text-terra-deep">
          <Mail className="size-3.5" strokeWidth={2.4} aria-hidden="true" />
          Studio Notes
        </p>
        <h3 className="mt-3 font-display text-[19px] md:text-[21px] font-semibold leading-[1.2] tracking-[-0.01em] text-ink">
          Get the next note in your inbox.
        </h3>
        <p className="mt-1.5 text-[13px] leading-[1.6] text-ink-soft">
          One design note a month — systems, research outtakes, craft. No spam, unsubscribe anytime.
        </p>

        {status === "done" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-5 flex items-center gap-3 rounded-2xl border border-leaf/30 bg-leaf/8 px-4 py-3.5 dark:bg-leaf/10"
            role="status"
          >
            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-leaf/15 text-leaf">
              <Check className="size-4" strokeWidth={2.4} />
            </span>
            <p className="text-[13.5px] font-medium text-ink">
              You&apos;re on the list — the next note finds you first.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mt-5">
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <div className="relative min-w-0 flex-1">
                <label htmlFor={`${id ?? "note"}-subscribe-email`} className="sr-only">
                  Email address for Studio Notes
                </label>
                <input
                  id={`${id ?? "note"}-subscribe-email`}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@studio.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  disabled={status === "loading"}
                  aria-invalid={!!error}
                  aria-describedby={error ? `${id ?? "note"}-subscribe-error` : undefined}
                  className={`h-12 w-full rounded-full border bg-cream px-5 text-[14px] text-ink outline-none transition-all duration-300 placeholder:text-ink-faint focus:ring-4 dark:bg-night ${
                    error
                      ? "border-red-400/70 focus:ring-red-400/15"
                      : "border-ink/12 dark:border-white/12 focus:border-terra/60 focus:ring-terra/12"
                  } disabled:opacity-60`}
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-terra pl-5 pr-4 font-medium text-[14px] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(224,106,59,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra disabled:translate-y-0 disabled:opacity-70"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Subscribing…
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </div>
            {error ? (
              <p
                id={`${id ?? "note"}-subscribe-error`}
                role="alert"
                className="mt-2 pl-1 text-[12px] text-red-500"
              >
                {error}
              </p>
            ) : (
              <p className="mt-2 pl-1 text-[11px] text-ink-faint">
                Read by designers from KlimaShift, Autoremov &amp; Trivira&apos;s networks.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
