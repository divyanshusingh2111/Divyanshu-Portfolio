"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  RESUME_MAX,
  RESUME_MIN,
  removeSpot,
  saveSpot,
  onSpotChange,
  getSpotsSnapshot,
  getServerSpotsSnapshot,
  spotKey,
  type ReadingKind,
  type ReadingSpot,
} from "@/lib/reading-position";

export interface UseReadingPosition {
  /** The spot offered for resume (frozen at mount), null when none. */
  spot: ReadingSpot | null;
  /** Banner visibility (mount-time decision + manual dismissal). */
  showBanner: boolean;
  /** Jump back to the saved scroll position. */
  resume: () => void;
  /** Scroll to the very top and forget the saved position. */
  restart: () => void;
  /** Just hide the banner — the position stays for the index badge. */
  dismiss: () => void;
}

/**
 * Reading-position memory for long-form pages.
 *
 * - The live store is read via useSyncExternalStore (hydration-safe, no
 *   setState-in-effect); the resume offer is frozen at mount (React's
 *   adjust-state-during-render pattern) so active reading never re-nags.
 * - A spot is offered only when it predates this visit (>500ms old) and
 *   sits in the "meaningfully started but not finished" band (6%–94%).
 * - While scrolling: throttled saves (≥1200ms apart) + a final save on
 *   pagehide/visibility-hidden so the position survives tab closes.
 * - Finished pieces (≥94%) never nag with a banner — the index badges them
 *   as "read" instead.
 */
export function useReadingPosition(kind: ReadingKind, slug: string): UseReadingPosition {
  const spots = useSyncExternalStore(onSpotChange, getSpotsSnapshot, getServerSpotsSnapshot);
  const live = spots[spotKey(kind, slug)] ?? null;

  const mountTime = useRef(Date.now());
  const [offered, setOffered] = useState<ReadingSpot | null>(null);
  const [offerClosed, setOfferClosed] = useState(false);

  /* Freeze the resume offer the first time a *pre-existing* spot appears —
     spots written during this visit are never offered back to the reader. */
  if (offered === null && live !== null && live.at < mountTime.current - 500) {
    setOffered(live);
  }

  /* ── scroll: throttled saves to the external store ── */
  useEffect(() => {
    const lastSave = { current: 0 };
    const pending: { pct: number | null; y: number | null } = { pct: null, y: null };

    const flush = () => {
      if (pending.pct === null || pending.y === null) return;
      saveSpot(kind, slug, pending.pct, pending.y);
      pending.pct = null;
      pending.y = null;
    };

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = Math.min(1, window.scrollY / max);
      pending.pct = pct;
      pending.y = window.scrollY;
      const now = Date.now();
      if (now - lastSave.current >= 1200) {
        lastSave.current = now;
        flush();
      }
    };

    const onLeave = () => flush();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", onLeave);
    document.addEventListener("visibilitychange", onLeave);
    return () => {
      flush(); /* save on unmount too — route flip within the app */
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", onLeave);
      document.removeEventListener("visibilitychange", onLeave);
    };
  }, [kind, slug]);

  const showBanner =
    offered !== null &&
    !offerClosed &&
    offered.pct >= RESUME_MIN &&
    offered.pct <= RESUME_MAX;

  const resume = useCallback(() => {
    setOfferClosed(true);
    window.scrollTo({ top: offered?.y ?? 0, behavior: "smooth" });
  }, [offered]);

  const restart = useCallback(() => {
    setOfferClosed(true);
    removeSpot(kind, slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [kind, slug]);

  const dismiss = useCallback(() => setOfferClosed(true), []);

  return { spot: offered, showBanner, resume, restart, dismiss };
}
