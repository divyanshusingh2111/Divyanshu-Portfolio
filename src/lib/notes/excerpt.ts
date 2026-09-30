import type { Note, NoteBlock } from "@/lib/notes/types";

/** Convert the tiny inline markup (**bold**, *italic*, `code`, [label](href)) to plain text. */
export function inlineToText(s: string): string {
  return s
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1");
}

/** First ~3 text blocks of the article as a teaser description. */
export function noteExcerpt(note: Note): string {
  const parts: string[] = [];
  for (const b of note.blocks as NoteBlock[]) {
    if (parts.length >= 3) break;
    if (b.type === "lead" || b.type === "p") {
      parts.push(inlineToText(b.text));
    } else if (b.type === "list" && parts.length < 2) {
      const first = inlineToText(b.items[0] ?? "");
      if (first) parts.push(first);
    }
  }
  const text = parts.join(" ");
  return text.length > 420 ? text.slice(0, 417).trimEnd() + "…" : text;
}
