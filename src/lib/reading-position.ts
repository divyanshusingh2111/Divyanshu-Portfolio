/**
 * Reading-position memory — a client-side "resume where you left off" store.
 *
 * Keeps the last scroll position (as a 0–1 fraction of the document) for each
 * long-form page (notes + case studies) in localStorage, LRU-trimmed so the
 * map never grows unbounded. Everything is defensive: SSR, private-mode
 * Safari and storage quota errors all degrade to no-ops.
 */

const STORE_KEY = "studio.reading.v2";
const MAX_ENTRIES = 16;

/** A position is only offered for "resume" between these bounds. */
export const RESUME_MIN = 0.06;
export const RESUME_MAX = 0.94;

export interface ReadingSpot {
  /** 0–1 fraction of the document read */
  pct: number;
  /** absolute scrollY in px, saved for exact restore */
  y: number;
  /** epoch ms of the last touch */
  at: number;
}

type Store = Record<string, ReadingSpot>;

export type ReadingKind = "note" | "case";

export function spotKey(kind: ReadingKind, slug: string): string {
  return `${kind}:${slug}`;
}

function parseStore(raw: string | null): Store {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return parsed as Store;
  } catch {
    return {};
  }
}

function loadMap(): Store {
  if (typeof window === "undefined") return {};
  try {
    return parseStore(window.localStorage.getItem(STORE_KEY));
  } catch {
    return {};
  }
}

function persist(map: Store): void {
  if (typeof window === "undefined") return;
  try {
    /* LRU trim — keep the MAX_ENTRIES most recently touched */
    const entries = Object.entries(map);
    if (entries.length > MAX_ENTRIES) {
      entries
        .sort((a, b) => a[1].at - b[1].at)
        .slice(0, entries.length - MAX_ENTRIES)
        .forEach(([k]) => delete map[k]);
    }
    window.localStorage.setItem(STORE_KEY, JSON.stringify(map));
  } catch {
    /* quota or private mode — positions are a nicety, never a blocker */
  }
}

export function readSpot(kind: ReadingKind, slug: string): ReadingSpot | null {
  const spot = loadMap()[spotKey(kind, slug)];
  return spot && typeof spot.pct === "number" && typeof spot.y === "number" ? spot : null;
}

export function saveSpot(kind: ReadingKind, slug: string, pct: number, y: number): void {
  if (typeof window === "undefined") return;
  const map = loadMap();
  map[spotKey(kind, slug)] = {
    pct: Math.max(0, Math.min(1, pct)),
    y: Math.max(0, Math.round(y)),
    at: Date.now(),
  };
  persist(map);
  notifySpotChange();
}

export function removeSpot(kind: ReadingKind, slug: string): void {
  if (typeof window === "undefined") return;
  const map = loadMap();
  delete map[spotKey(kind, slug)];
  persist(map);
  notifySpotChange();
}

/** All saved spots at once — used by index pages to badge cards. */
export function readAllSpots(): Store {
  return loadMap();
}

/* ── share a tiny event so index pages refresh badges when a spot changes ── */

const CHANGE_EVENT = "studio:reading-spot";

export function notifySpotChange(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

/** Subscribe to spot changes (same-tab + cross-tab). Returns unsubscribe. */
export function onSpotChange(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(CHANGE_EVENT, cb);
  window.addEventListener("storage", cb as EventListener);
  return () => {
    window.removeEventListener(CHANGE_EVENT, cb);
    window.removeEventListener("storage", cb as EventListener);
  };
}

/* ── useSyncExternalStore plumbing (identity-stable snapshots) ── */

const EMPTY_STORE: Store = {};
let snapshotCache: Store = EMPTY_STORE;
let snapshotRaw: string | null = null;

/** Identity-stable snapshot for useSyncExternalStore — re-parses only when the
 *  raw localStorage string actually changes, so React never loops. */
export function getSpotsSnapshot(): Store {
  if (typeof window === "undefined") return EMPTY_STORE;
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (raw !== snapshotRaw) {
      snapshotRaw = raw;
      snapshotCache = parseStore(raw);
    }
  } catch {
    /* private mode — keep the last good snapshot */
  }
  return snapshotCache;
}

export function getServerSpotsSnapshot(): Store {
  return EMPTY_STORE;
}
