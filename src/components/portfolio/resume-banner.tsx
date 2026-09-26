"use client";

import { motion } from "framer-motion";
import { ArrowUp, RotateCcw, X } from "lucide-react";

interface ResumeBannerProps {
  /** 0–1 fraction read */
  pct: number;
  onResume: () => void;
  onRestart: () => void;
  onDismiss: () => void;
  /** optional accent override (case-study themes) — defaults to terra */
  accent?: string;
  /** context word shown in the eyebrow, e.g. "note" / "case study" */
  kindLabel: string;
}

/**
 * Floating "resume where you left off" card — the UI face of the
 * reading-position memory. Bottom-centered, progress ring, two actions.
 */
export function ResumeBanner({ pct, onResume, onRestart, onDismiss, accent, kindLabel }: ResumeBannerProps) {
  const pctLabel = Math.round(pct * 100);
  const ringR = 19;
  const ringC = 2 * Math.PI * ringR;
  const isTerra = !accent;

  return (
    <motion.section
      role="region"
      aria-label={`Resume reading this ${kindLabel}`}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
      className="fixed inset-x-4 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-[60] mx-auto flex max-w-[520px] items-center gap-3.5 rounded-[20px] border border-ink/12 bg-card/97 p-3.5 shadow-[0_24px_60px_-24px_rgba(30,32,34,0.45)] backdrop-blur-xl sm:gap-4 sm:p-4 print:hidden dark:border-white/15 dark:bg-night/95"
    >
      {/* progress ring */}
      <div className="relative shrink-0 select-none" aria-hidden="true">
        <svg width="52" height="52" viewBox="0 0 52 52" className="-rotate-90">
          <circle cx="26" cy="26" r={ringR} fill="none" strokeWidth="4" className="stroke-ink/10 dark:stroke-white/12" />
          <circle
            cx="26"
            cy="26"
            r={ringR}
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={ringC}
            strokeDashoffset={ringC * (1 - pct)}
            className={isTerra ? "stroke-terra" : undefined}
            style={accent ? { stroke: accent } : undefined}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-mono-x text-[10.5px] font-bold text-ink dark:text-white">
          {pctLabel}
          <span className="text-[7px] text-ink-faint">%</span>
        </span>
      </div>

      {/* copy */}
      <div className="min-w-0 flex-1">
        <p
          className={`flex items-center gap-2 font-mono-x text-[9px] font-bold tracking-[0.2em] uppercase ${
            isTerra ? "text-terra-deep" : "text-ink-soft"
          }`}
        >
          <span
            aria-hidden="true"
            className={`inline-block size-[5px] rounded-full ${isTerra ? "bg-terra motion-safe:animate-pulse" : ""}`}
            style={accent ? { background: accent } : undefined}
          />
          Resume the {kindLabel}
        </p>
        <p className="mt-1 truncate font-display text-[14.5px] font-semibold leading-tight text-ink dark:text-white">
          You stopped at {pctLabel}% —{" "}
          <span className="font-script text-[16px] font-semibold normal-case tracking-normal text-terra">
            the good part&apos;s ahead
          </span>
          .
        </p>
      </div>

      {/* actions */}
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onResume}
          className="group inline-flex items-center gap-2 rounded-full bg-night px-4 py-2.5 font-mono-x text-[10px] font-bold tracking-[0.12em] uppercase text-white transition-all hover:bg-terra focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra dark:bg-terra dark:hover:bg-terra-deep"
        >
          <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
          <span className="hidden sm:inline">Jump back</span>
          <span className="sm:hidden">Jump</span>
        </button>
        <button
          type="button"
          onClick={onRestart}
          aria-label="Start this piece from the top instead"
          title="Start over"
          className="hidden size-[38px] items-center justify-center rounded-full border border-ink/15 text-ink-faint transition-all hover:border-ink/40 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra sm:inline-flex dark:border-white/15 dark:hover:text-white"
        >
          <RotateCcw className="size-3.5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss the resume suggestion"
          className="inline-flex size-[38px] items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-ink/5 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra dark:hover:bg-white/10 dark:hover:text-white"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </motion.section>
  );
}
