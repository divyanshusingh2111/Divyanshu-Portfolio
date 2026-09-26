"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Loader2, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Reveal } from "./reveal";

type Status = "idle" | "loading" | "done";

/**
 * "Studio Notes" newsletter strip — lives in the Footer above the legal bar.
 * POSTs to /api/newsletter; duplicate emails are treated as success.
 */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState<number | null>(null);

  /* subscriber count for light social proof (shown once it clears a floor) */
  useEffect(() => {
    let cancelled = false;
    fetch("/api/newsletter")
      .then((r) => r.json())
      .then((d: { ok?: boolean; count?: number }) => {
        if (!cancelled && d?.ok && typeof d.count === "number") setCount(d.count);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

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
      toast({
        title: "Subscription failed",
        description: "Network error — please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Reveal className="w-full">
      <div className="border-t border-ink/10 dark:border-white/10">
        <div className="py-10 md:py-12 grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-14 items-center">
          {/* Copy */}
          <div className="flex items-start gap-4">
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-terra-soft dark:bg-terra/15 text-terra"
            >
              <Mail className="size-[17px]" strokeWidth={2.1} />
            </span>
            <div className="min-w-0">
              <p className="font-mono-x text-[10.5px] font-bold tracking-[0.22em] uppercase text-terra-deep mb-2.5">
                ● Studio Notes
              </p>
              <h2 className="font-display font-semibold text-ink text-[22px] md:text-[26px] leading-[1.15] tracking-[-0.01em]">
                Design systems notes, case study outtakes &amp; tool experiments.
              </h2>
              <p className="mt-2 text-[13.5px] leading-[1.6] text-ink-soft max-w-[480px]">
                One thoughtful email a month — no spam, unsubscribe anytime.
              </p>
              <p className="mt-3.5">
                <Link
                  href="/notes"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-ink/12 bg-card px-3.5 py-1.5 font-mono-x text-[9.5px] font-bold tracking-[0.14em] uppercase text-ink-soft transition-all hover:border-terra/50 hover:text-terra dark:border-white/12"
                >
                  Browse the journal
                  <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} noValidate className="w-full">
            {status === "done" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="flex items-center gap-3.5 rounded-2xl border border-leaf/30 bg-leaf/8 dark:bg-leaf/10 px-5 py-4"
                role="status"
              >
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-leaf/15 text-leaf">
                  <Check className="size-[18px]" strokeWidth={2.4} />
                </span>
                <div className="min-w-0">
                  <p className="font-display font-semibold text-ink text-[15px]">You&apos;re on the list.</p>
                  <p className="text-[12.5px] text-ink-soft mt-0.5">
                    Watch your inbox for the next Studio Notes dispatch.
                  </p>
                </div>
              </motion.div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1 min-w-0">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address for Studio Notes newsletter
                    </label>
                    <input
                      id="newsletter-email"
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
                      aria-describedby={error ? "newsletter-error" : undefined}
                      className={`w-full h-[52px] rounded-full border bg-card px-5 text-[14.5px] text-ink placeholder:text-ink-faint outline-none transition-all duration-300 focus:ring-4 ${
                        error
                          ? "border-red-400/70 focus:ring-red-400/15"
                          : "border-ink/12 dark:border-white/12 focus:border-terra/60 focus:ring-terra/12"
                      } disabled:opacity-60`}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-terra text-white font-medium text-[14.5px] h-[52px] pl-6 pr-5 shrink-0 transition-all duration-300 hover:shadow-[0_14px_30px_-12px_rgba(224,106,59,0.6)] hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="size-[17px] animate-spin" />
                        Subscribing…
                      </>
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="size-[17px] transition-transform duration-300 group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </div>
                {error ? (
                  <p id="newsletter-error" role="alert" className="mt-2.5 text-[12.5px] text-red-500 pl-1">
                    {error}
                  </p>
                ) : (
                  <p className="mt-2.5 text-[11.5px] text-ink-faint pl-1">
                    {count !== null && count >= 10
                      ? `Join ${count} designers already reading Studio Notes.`
                      : "Join designers from KlimaShift, Autoremov & Trivira's networks."}
                  </p>
                )}
              </>
            )}
          </form>
        </div>
      </div>
    </Reveal>
  );
}
