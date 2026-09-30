"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Copy, Lightbulb, Sparkles, TriangleAlert } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { NoteBlock } from "@/lib/notes/types";

/* ------------------------------------------------------------------ */
/* Inline markup — **bold**, *italic*, `code`, [label](href)           */
/* ------------------------------------------------------------------ */

const INLINE_PATTERN = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

export function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(INLINE_PATTERN).filter((p) => p.length > 0);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="note-inline-code">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("[")) {
      const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (m) {
        const [, label, href] = m;
        if (/^https?:\/\//.test(href)) {
          return (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-terra underline decoration-terra/35 underline-offset-[3px] transition-colors hover:decoration-terra"
            >
              {label}
            </a>
          );
        }
        return (
          <Link
            key={i}
            href={href}
            className="font-medium text-terra underline decoration-terra/35 underline-offset-[3px] transition-colors hover:decoration-terra"
          >
            {label}
          </Link>
        );
      }
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return (
        <em key={i} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/* ------------------------------------------------------------------ */
/* Code block with copy button                                         */
/* ------------------------------------------------------------------ */

function CodeBlock({ lang, code, caption }: { lang: string; code: string; caption?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast({ title: "Snippet copied to clipboard" });
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      toast({ title: "Could not copy", variant: "destructive" });
    }
  };

  return (
    <figure className="my-8 print:break-inside-avoid">
      <div className="overflow-hidden rounded-[18px] border border-night/60 dark:border-white/10 bg-night shadow-[0_16px_40px_-20px_rgba(15,23,42,0.45)] print:bg-white print:shadow-none">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4.5 py-2.5">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-terra/70" />
            </span>
            <span className="font-mono-x text-[10px] font-bold tracking-[0.18em] uppercase text-white/50">
              {lang}
            </span>
          </div>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 font-mono-x text-[10px] font-bold tracking-[0.12em] uppercase text-white/60 transition-all hover:border-terra/60 hover:text-terra focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra print:hidden"
            aria-label="Copy code snippet to clipboard"
          >
            {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="scrollbar-thin overflow-x-auto p-5 md:p-6">
          <code className="font-mono-x text-[12.5px] md:text-[13px] leading-[1.75] text-[#e8e6e0]">
            {code}
          </code>
        </pre>
      </div>
      {caption ? (
        <figcaption className="mt-2.5 text-center font-mono-x text-[10.5px] tracking-[0.06em] text-ink-faint">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Callout variants (reuses the tone system so tints invert in dark)   */
/* ------------------------------------------------------------------ */

const CALLOUTS = {
  tip: {
    tone: "tone-green",
    label: "TIP",
    icon: Lightbulb,
  },
  insight: {
    tone: "tone-accent",
    label: "INSIGHT",
    icon: Sparkles,
  },
  warning: {
    tone: "tone-yellow",
    label: "WATCH OUT",
    icon: TriangleAlert,
  },
} as const;

function Callout({
  variant,
  title,
  text,
}: {
  variant: keyof typeof CALLOUTS;
  title: string;
  text: string;
}) {
  const c = CALLOUTS[variant];
  const Icon = c.icon;
  return (
    <aside
      className={`my-8 rounded-[18px] border p-5 md:p-6 print:break-inside-avoid ${c.tone}`}
      style={{
        backgroundColor: "var(--tone-soft)",
        borderColor: "var(--tone-border)",
      }}
    >
      <div className="flex items-start gap-3.5">
        <span
          aria-hidden="true"
          className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: "var(--tone-text)", color: "var(--tone-on)" }}
        >
          <Icon className="size-4" strokeWidth={2.2} />
        </span>
        <div className="min-w-0">
          <p
            className="font-mono-x text-[10px] font-bold tracking-[0.2em] uppercase"
            style={{ color: "var(--tone-text)" }}
          >
            {c.label} — {title}
          </p>
          <p className="mt-1.5 text-[14px] md:text-[14.5px] leading-[1.7] text-ink-soft">
            {renderInline(text)}
          </p>
        </div>
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* Block dispatcher                                                    */
/* ------------------------------------------------------------------ */

export function NoteBlockView({ block, num }: { block: NoteBlock; num?: number }) {
  switch (block.type) {
    case "lead":
      return <p className="drop-cap my-7 text-[16.5px] md:text-[17.5px] leading-[1.85] text-ink">{renderInline(block.text)}</p>;

    case "p":
      return <p className="my-5 text-[15px] md:text-[15.5px] leading-[1.85] text-ink-soft">{renderInline(block.text)}</p>;

    case "h2":
      return (
        <h2
          id={block.id}
          className="mb-5 mt-14 scroll-mt-28 font-display text-[23px] md:text-[26px] font-semibold leading-[1.2] tracking-[-0.01em] text-ink print:break-after-avoid"
        >
          {typeof num === "number" && (
            <span
              aria-hidden="true"
              className="mr-3 inline-block align-[0.14em] font-mono-x text-[13px] font-bold tracking-[0.08em] text-terra"
            >
              {String(num).padStart(2, "0")}
            </span>
          )}
          {renderInline(block.text)}
        </h2>
      );

    case "list":
      return block.ordered ? (
        <ol className="my-6 space-y-3.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3.5 text-[15px] leading-[1.75] text-ink-soft">
              <span
                aria-hidden="true"
                className="mt-[3px] inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-terra-soft font-mono-x text-[10px] font-bold text-terra-deep dark:bg-terra/15 dark:text-terra"
              >
                {i + 1}
              </span>
              <span className="min-w-0">{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      ) : (
        <ul className="my-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[15px] leading-[1.75] text-ink-soft">
              <span aria-hidden="true" className="mt-[10px] size-1.5 shrink-0 rounded-full bg-terra" />
              <span className="min-w-0">{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <figure className="my-10 border-l-[3px] border-terra pl-6 md:pl-8">
          <blockquote className="font-script text-[26px] md:text-[30px] font-medium leading-[1.28] text-ink">
            {renderInline(block.text)}
          </blockquote>
          {block.cite ? (
            <figcaption className="mt-3 font-mono-x text-[10px] tracking-[0.16em] uppercase text-ink-faint">
              {block.cite}
            </figcaption>
          ) : null}
        </figure>
      );

    case "callout":
      return <Callout variant={block.variant} title={block.title} text={block.text} />;

    case "code":
      return <CodeBlock lang={block.lang} code={block.code} caption={block.caption} />;

    case "image":
      return (
        <figure className="my-9 print:break-inside-avoid">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] border border-ink/10 bg-cream-deep shadow-[0_20px_50px_-28px_rgba(30,32,34,0.35)] dark:border-white/10 print:shadow-none">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              sizes="(max-width: 760px) 92vw, 680px"
              className="object-cover object-top"
            />
          </div>
          {block.caption ? (
            <figcaption className="mt-3 text-center text-[12px] leading-[1.6] text-ink-faint">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );

    case "divider":
      return (
        <div aria-hidden="true" className="my-14 flex items-center justify-center gap-2.5">
          <span className="size-1.5 rounded-full bg-terra/50" />
          <span className="size-1.5 rounded-full bg-terra/70" />
          <span className="size-1.5 rounded-full bg-terra" />
        </div>
      );

    default:
      return null;
  }
}
