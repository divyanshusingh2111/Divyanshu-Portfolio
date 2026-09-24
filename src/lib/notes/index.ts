import type { Note, NoteCategory } from "./types";
import { tokens } from "./tokens";
import { dashboards } from "./dashboards";
import { upiTrust } from "./upi-trust";
import { audit } from "./audit";

/** Journal list — MUST stay sorted newest-first (drives prev/next semantics). */
export const NOTES: Note[] = [tokens, dashboards, upiTrust, audit];

export const NOTE_CATEGORIES: NoteCategory[] = [
  "Design Systems",
  "Craft",
  "Research",
  "Process",
];

export function getNote(slug: string): Note | null {
  return NOTES.find((n) => n.slug === slug) ?? null;
}

/** Newest-first list semantics: `newer` is one step towards the top. */
export function getNoteNeighbours(slug: string): {
  note: Note;
  newer: Note | null;
  older: Note | null;
} {
  const i = NOTES.findIndex((n) => n.slug === slug);
  if (i === -1) throw new Error(`Unknown note: ${slug}`);
  return {
    note: NOTES[i],
    newer: i > 0 ? NOTES[i - 1] : null,
    older: i < NOTES.length - 1 ? NOTES[i + 1] : null,
  };
}

export function totalReadingMinutes(): number {
  return NOTES.reduce((sum, n) => sum + n.readingMinutes, 0);
}

/** Every tag used across the journal, with per-tag note counts (count desc, then alpha). */
export function allNoteTags(): { tag: string; count: number }[] {
  const map = new Map<string, number>();
  for (const n of NOTES) {
    for (const t of n.tags) map.set(t, (map.get(t) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export type { Note, NoteCategory };
