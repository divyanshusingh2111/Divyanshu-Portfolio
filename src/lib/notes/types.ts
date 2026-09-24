export type NoteCategory = "Design Systems" | "Research" | "Craft" | "Process";

/**
 * Editorial block model for Studio Notes articles.
 * Inline text supports a tiny markup: **bold**, *italic*, `code`,
 * and [label](href) for internal (/…) or external (https://…) links.
 */
export type NoteBlock =
  | { type: "lead"; text: string }
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; variant: "tip" | "insight" | "warning"; title: string; text: string }
  | { type: "code"; lang: string; code: string; caption?: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "divider" };

export interface Note {
  slug: string;
  title: string;
  /** subtitle / standfirst shown under the title */
  dek: string;
  /** ISO date, yyyy-mm-dd — the list is sorted newest-first */
  date: string;
  /** human date, e.g. "February 10, 2026" */
  dateLabel: string;
  /** short date for list rows, e.g. "Feb 10" */
  dateShort: string;
  category: NoteCategory;
  tags: string[];
  readingMinutes: number;
  featured?: boolean;
  blocks: NoteBlock[];
}

export function noteHeadings(note: Note): { id: string; text: string }[] {
  return note.blocks.flatMap((b) => (b.type === "h2" ? [{ id: b.id, text: b.text }] : []));
}
