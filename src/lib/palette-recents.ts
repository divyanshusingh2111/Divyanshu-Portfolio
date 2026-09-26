"use client";

/**
 * Recently-visited destinations, remembered in localStorage and surfaced
 * at the top of the command palette. Case studies and journal notes only —
 * anchor jumps are cheap enough not to need history.
 */
export interface RecentEntry {
  href: string;
  label: string;
  sub?: string;
  kind: "case" | "note";
  ts: number;
}

const KEY = "ds-palette-recents";
const MAX = 4;

export function getRecents(): RecentEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (e): e is RecentEntry =>
          e &&
          typeof e.href === "string" &&
          typeof e.label === "string" &&
          (e.kind === "case" || e.kind === "note")
      )
      .slice(0, MAX);
  } catch {
    return [];
  }
}

export function pushRecent(entry: Omit<RecentEntry, "ts">): void {
  if (typeof window === "undefined") return;
  try {
    const list = getRecents().filter((e) => e.href !== entry.href);
    list.unshift({ ...entry, ts: Date.now() });
    window.localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX)));
  } catch {
    /* private mode / storage disabled — recents are a nice-to-have */
  }
}
