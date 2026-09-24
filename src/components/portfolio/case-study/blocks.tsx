"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Maximize2, Minimize2, X } from "lucide-react";
import { Lightbox } from "./lightbox";
import type {
  Block,
  CardItem,
  CaseStudyTheme,
  ImageItem,
  StatItem,
  Tone,
} from "@/lib/case-studies/types";

/* ------------------------------------------------------------------ */
/* Tone color system (matches source case-study pages)                */
/* ------------------------------------------------------------------ */

interface ToneColor {
  /** CSS class that scopes the --tone-* custom properties */
  cls: string;
  /** var() references — resolved from .tone-* class (light/dark aware) */
  text: string;
  soft: string;
  border: string;
  /** readable text color on top of a solid `text` background */
  on: string;
}

/* Tone values live in globals.css (.tone-* / .dark .tone-*) so they invert in dark mode */
const TONES: Record<Tone, ToneColor> = {
  accent: { cls: "tone-accent", text: "var(--tone-text)", soft: "var(--tone-soft)", border: "var(--tone-border)", on: "var(--tone-on)" },
  blue: { cls: "tone-blue", text: "var(--tone-text)", soft: "var(--tone-soft)", border: "var(--tone-border)", on: "var(--tone-on)" },
  red: { cls: "tone-red", text: "var(--tone-text)", soft: "var(--tone-soft)", border: "var(--tone-border)", on: "var(--tone-on)" },
  green: { cls: "tone-green", text: "var(--tone-text)", soft: "var(--tone-soft)", border: "var(--tone-border)", on: "var(--tone-on)" },
  yellow: { cls: "tone-yellow", text: "var(--tone-text)", soft: "var(--tone-soft)", border: "var(--tone-border)", on: "var(--tone-on)" },
  purple: { cls: "tone-purple", text: "var(--tone-text)", soft: "var(--tone-soft)", border: "var(--tone-border)", on: "var(--tone-on)" },
  teal: { cls: "tone-teal", text: "var(--tone-text)", soft: "var(--tone-soft)", border: "var(--tone-border)", on: "var(--tone-on)" },
  orange: { cls: "tone-orange", text: "var(--tone-text)", soft: "var(--tone-soft)", border: "var(--tone-border)", on: "var(--tone-on)" },
  cyan: { cls: "tone-cyan", text: "var(--tone-text)", soft: "var(--tone-soft)", border: "var(--tone-border)", on: "var(--tone-on)" },
  neutral: { cls: "tone-neutral", text: "var(--tone-text)", soft: "var(--tone-soft)", border: "var(--tone-border)", on: "var(--tone-on)" },
};

export function toneColor(tone: Tone | undefined): ToneColor {
  return TONES[tone ?? "neutral"];
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
};

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function CardIcon({ icon, tone }: { icon?: CardItem["icon"]; tone?: Tone }) {
  const c = toneColor(tone);
  if (icon === "check")
    return (
      <span className="inline-flex size-6 items-center justify-center rounded-full" style={{ background: c.soft }}>
        <Check className="size-3.5" style={{ color: c.text }} strokeWidth={3} />
      </span>
    );
  if (icon === "x")
    return (
      <span className="inline-flex size-6 items-center justify-center rounded-full" style={{ background: c.soft }}>
        <X className="size-3.5" style={{ color: c.text }} strokeWidth={3} />
      </span>
    );
  if (icon === "dot")
    return <span className="size-2.5 rounded-full shrink-0" style={{ background: c.text }} />;
  return <span className="size-2.5 rounded-[2px] shrink-0" style={{ background: c.text }} />;
}

export function StatTile({ stat }: { stat: StatItem }) {
  const c = toneColor(stat.tone);
  return (
    <div className={`${c.cls} rounded-2xl border border-ink/10 bg-card/70 backdrop-blur-sm p-5 md:p-6 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35)]`}>
      <p className="font-display font-semibold text-[clamp(1.6rem,2.6vw,2.1rem)] leading-none tracking-tight" style={{ color: c.text }}>
        {stat.value}
      </p>
      <p className="mt-2.5 font-mono-x text-[10px] md:text-[10.5px] tracking-[0.16em] text-ink-soft uppercase">{stat.label}</p>
      {stat.sub && <p className="mt-1.5 text-[12.5px] leading-snug text-ink-soft/80">{stat.sub}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Browser-framed image                                                */
/* ------------------------------------------------------------------ */

export function BrowserFrame({ image }: { image: ImageItem }) {
  const [expanded, setExpanded] = useState(false);
  const [zoom, setZoom] = useState(false);
  const tall = image.tall;
  return (
    <figure className="group/frame">
      <div className="overflow-hidden rounded-[14px] border border-ink/10 bg-card shadow-[0_18px_44px_-24px_rgba(15,23,42,0.4)]">
        {/* Chrome bar */}
        <div className="flex items-center gap-2 border-b border-ink/8 px-3.5 py-2.5">
          <span className="flex gap-1.5 shrink-0" aria-hidden="true">
            <i className="block size-2.5 rounded-full bg-[#FF5F57]" />
            <i className="block size-2.5 rounded-full bg-[#FEBC2E]" />
            <i className="block size-2.5 rounded-full bg-[#28C840]" />
          </span>
          <span className="flex-1 min-w-0 truncate rounded-md bg-cream-deep px-2.5 py-1 font-mono-x text-[10px] md:text-[11px] text-ink-soft tracking-wide">
            {image.browserUrl ?? "localhost"}
          </span>
          {image.frameTag && (
            <span className="hidden sm:inline-block shrink-0 rounded-full bg-night px-2.5 py-1 font-mono-x text-[9px] tracking-[0.12em] text-white uppercase">
              {image.frameTag}
            </span>
          )}
          {tall && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="shrink-0 inline-flex items-center gap-1 rounded-full border border-ink/10 bg-card px-2.5 py-1 font-mono-x text-[9px] tracking-[0.1em] text-ink-soft uppercase hover:border-ink/30 hover:text-ink transition-colors"
              aria-label={expanded ? "Collapse screenshot" : "Expand screenshot"}
            >
              {expanded ? <Minimize2 className="size-3" /> : <Maximize2 className="size-3" />}
              {expanded ? "Collapse" : "Expand"}
            </button>
          )}
        </div>
        {/* Image — click opens the full-screen lightbox */}
        <div
          className={`relative overflow-y-auto scrollbar-thin ${
            tall && !expanded ? "max-h-[70vh]" : ""
          }`}
        >
          <button
            type="button"
            onClick={() => setZoom(true)}
            aria-label={`View ${image.alt} at full size`}
            className="relative block w-full cursor-zoom-in"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.w ?? 1200}
              height={image.h ?? 800}
              sizes="(max-width: 720px) 92vw, 640px"
              className="!relative h-auto w-full"
              draggable={false}
            />
            {/* full-size hover affordance */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3 right-3 inline-flex translate-y-1 items-center gap-1.5 rounded-full bg-night/80 pl-3 pr-2.5 py-1.5 font-mono-x text-[9.5px] font-bold tracking-[0.12em] uppercase text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover/frame:translate-y-0 group-hover/frame:opacity-100"
            >
              <Maximize2 className="size-3" />
              Full size
            </span>
          </button>
          {tall && !expanded && (
            <button
              onClick={() => setExpanded(true)}
              className="sticky bottom-3 left-1/2 -translate-x-1/2 mb-3 inline-flex items-center gap-1.5 rounded-full bg-night/90 px-4 py-2 text-[12px] font-medium text-white shadow-lg backdrop-blur hover:bg-night transition-colors"
            >
              <ChevronDown className="size-3.5" />
              Scroll or expand full page
            </button>
          )}
        </div>
      </div>
      <AnimatePresence>{zoom && <Lightbox image={image} onClose={() => setZoom(false)} />}</AnimatePresence>
      {image.caption && (
        <figcaption className="mt-3 text-center font-mono-x text-[10.5px] tracking-[0.1em] text-ink-faint uppercase">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Card grid                                                           */
/* ------------------------------------------------------------------ */

function CardsBlock({ cards, columns = 3, tone }: { cards: CardItem[]; columns?: 2 | 3 | 4; tone?: Tone }) {
  const c = toneColor(tone);
  const colCls =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`grid gap-5 ${colCls}`}>
      {cards.map((card, i) => {
        const cc = toneColor(card.tone ?? tone);
        return (
          <motion.div
            key={card.title ?? card.eyebrow ?? i}
            {...fadeUp}
            transition={{ duration: 0.55, delay: i * 0.07 }}
            className={`${cc.cls} flex flex-col rounded-[16px] border bg-card p-6 shadow-[0_12px_32px_-20px_rgba(15,23,42,0.25)] dark:shadow-[0_12px_32px_-20px_rgba(0,0,0,0.6)]`}
            style={{ borderColor: cc.border }}
          >
            {card.eyebrow && (
              <p className="mb-2 font-mono-x text-[10.5px] tracking-[0.14em] uppercase" style={{ color: cc.text }}>
                {card.eyebrow}
              </p>
            )}
            {card.title && (
              <h4 className="flex items-start gap-2.5 font-display font-semibold text-[17px] leading-snug text-ink">
                <span className="mt-[7px]">
                  <CardIcon icon={card.icon} tone={card.tone ?? tone} />
                </span>
                {card.title}
              </h4>
            )}
            {card.body && <p className="mt-2.5 text-[13.5px] leading-[1.6] text-ink-soft">{card.body}</p>}
            {card.pills && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {card.pills.map((p) => (
                  <span
                    key={p}
                    className={`${cc.cls} rounded-full border px-2.5 py-0.5 text-[11px] font-medium text-ink`}
                    style={{ background: cc.soft, borderColor: cc.border }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            )}
            {card.tag && (
              <p className="mt-auto pt-4 font-mono-x text-[9.5px] tracking-[0.12em] uppercase" style={{ color: cc.text }}>
                {card.tag}
              </p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Master block renderer                                               */
/* ------------------------------------------------------------------ */

export function BlockRenderer({ block, theme }: { block: Block; theme: CaseStudyTheme }) {
  switch (block.type) {
    case "text":
      return (
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className={`max-w-[760px] text-[14.5px] md:text-[15.5px] leading-[1.75] ${
            block.lead ? "text-ink text-[16px] md:text-[17px]" : "text-ink-soft"
          }`}
          style={block.tone ? { color: toneColor(block.tone).text } : undefined}
        >
          {block.text}
        </motion.p>
      );

    case "subheading":
      return (
        <motion.h4 {...fadeUp} transition={{ duration: 0.5 }} className="font-display font-semibold text-[18px] md:text-[20px] text-ink">
          {block.text}
        </motion.h4>
      );

    case "stats":
      return (
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className={`grid gap-4 ${block.variant === "hero" ? "grid-cols-2" : "grid-cols-2 lg:grid-cols-4"}`}
        >
          {block.items.map((s) => (
            <StatTile key={s.label} stat={s} />
          ))}
        </motion.div>
      );

    case "cards":
      return <CardsBlock cards={block.cards} columns={block.columns} tone={block.tone} />;

    case "pills": {
      const c = toneColor(block.tone);
      return (
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="flex flex-wrap items-center gap-2.5">
          {block.label && (
            <span className="mr-1 font-mono-x text-[10.5px] tracking-[0.16em] uppercase text-ink-faint">{block.label}</span>
          )}
          {block.items.map((item) => (
            <span
              key={item}
              className={`${c.cls} inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium text-ink`}
              style={{ background: c.soft, borderColor: c.border }}
            >
              <span className="size-2 rounded-[2px]" style={{ background: c.text }} aria-hidden="true" />
              {item}
            </span>
          ))}
        </motion.div>
      );
    }

    case "quote": {
      const q = block.quote;
      const c = toneColor(q.tone);
      return (
        <motion.blockquote
          {...fadeUp}
          transition={{ duration: 0.55 }}
          className={`${c.cls} relative max-w-[760px] rounded-[16px] border p-6 md:p-7`}
          style={{ background: c.soft, borderColor: c.border }}
        >
          <p className="font-display font-semibold text-[17px] md:text-[19px] leading-snug text-ink">
            &ldquo;{q.text}&rdquo;
          </p>
          {q.translation && <p className="mt-2 text-[13.5px] italic text-ink-soft">{q.translation}</p>}
          {q.bullets && (
            <ul className="mt-4 space-y-2">
              {q.bullets.map((b) => (
                <li key={b} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-soft">
                  <span className="mt-[9px] size-1.5 shrink-0 rounded-full" style={{ background: c.text }} aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          )}
          {(q.author || q.meta) && (
            <footer className="mt-4 font-mono-x text-[11px] tracking-[0.12em] uppercase text-ink-soft">
              {q.author}
              {q.author && q.meta ? " · " : ""}
              <span style={{ color: c.text }}>{q.meta}</span>
            </footer>
          )}
        </motion.blockquote>
      );
    }

    case "callout": {
      const c = toneColor(block.tone);
      return (
        <motion.aside
          {...fadeUp}
          transition={{ duration: 0.55 }}
          className={`${c.cls} flex max-w-[760px] gap-4 rounded-[16px] border p-6`}
          style={{ background: c.soft, borderColor: c.border }}
        >
          <span className="mt-1 size-3 shrink-0 rounded-[3px]" style={{ background: c.text }} aria-hidden="true" />
          <div>
            {block.title && (
              <p className="font-display font-semibold text-[16px] text-ink">
                {block.title}
              </p>
            )}
            <p className={`text-[14px] leading-[1.65] ${block.title ? "mt-1.5 text-ink-soft" : "text-ink"}`}>{block.text}</p>
          </div>
        </motion.aside>
      );
    }

    case "image":
      return (
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="max-w-[880px] min-w-0">
          <BrowserFrame image={block.image} />
        </motion.div>
      );

    case "gallery":
      return (
        <div className={`grid gap-6 ${block.columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"}`}>
          {block.images.map((img, i) => (
            <motion.div key={img.src} {...fadeUp} transition={{ duration: 0.6, delay: (i % 2) * 0.08 }} className="min-w-0">
              <BrowserFrame image={img} />
            </motion.div>
          ))}
        </div>
      );

    case "stages":
      return (
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {block.items.map((st) => {
            const c = toneColor(st.tone);
            return (
              <div key={st.title} className={`${c.cls} relative rounded-[16px] border border-ink/10 bg-card p-6 shadow-[0_12px_32px_-20px_rgba(15,23,42,0.25)] dark:shadow-[0_12px_32px_-20px_rgba(0,0,0,0.6)]`}>
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex size-8 items-center justify-center rounded-full font-mono-x text-[11px] font-bold"
                    style={{ background: c.text, color: c.on }}
                  >
                    {st.stage}
                  </span>
                  <p className="font-display font-semibold text-[15.5px] text-ink leading-tight">{st.title}</p>
                </div>
                <p className="mt-3 text-[13px] leading-[1.6] text-ink-soft">{st.body}</p>
              </div>
            );
          })}
        </motion.div>
      );

    case "list":
      return (
        <motion.ul {...fadeUp} transition={{ duration: 0.55 }} className="max-w-[760px] space-y-3">
          {block.items.map((item, i) => {
            const c = toneColor(block.tone);
            return (
              <li key={item} className="flex gap-3.5">
                <span
                  className={`${c.cls} inline-flex size-6 shrink-0 items-center justify-center rounded-full font-mono-x text-[11px] font-bold`}
                  style={{ background: c.soft, color: c.text }}
                >
                  {block.ordered ? String(i + 1).padStart(2, "0") : "■"}
                </span>
                <span className="text-[14px] leading-[1.6] text-ink-soft">
                  {renderLead(item)}
                </span>
              </li>
            );
          })}
        </motion.ul>
      );

    case "flow":
      return (
        <motion.div {...fadeUp} transition={{ duration: 0.55 }} className="flex flex-wrap items-center gap-2">
          {block.label && (
            <span className="w-full font-mono-x text-[10.5px] tracking-[0.16em] uppercase text-ink-faint mb-1.5">{block.label}</span>
          )}
          {block.items.map((item, i) => (
            <span key={item} className="flex items-center gap-2">
              <span
                className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-[12.5px] font-medium ${
                  i === 0 || i === block.items.length - 1
                    ? "text-white"
                    : "border text-ink"
                }`}
                style={i === 0 || i === block.items.length - 1 ? { background: theme.accent } : { borderColor: "rgba(30,32,34,0.14)" }}
              >
                {item}
              </span>
              {i < block.items.length - 1 && (
                <span className="text-ink-faint" aria-hidden="true">
                  →
                </span>
              )}
            </span>
          ))}
        </motion.div>
      );

    case "panel": {
      const c = toneColor(block.tone);
      return (
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className={`${c.cls} max-w-[880px] overflow-hidden rounded-[16px] border bg-card shadow-[0_14px_36px_-22px_rgba(15,23,42,0.3)] dark:shadow-[0_14px_36px_-22px_rgba(0,0,0,0.65)]`}
          style={{ borderColor: c.border }}
        >
          <div className="flex items-center justify-between gap-3 border-b border-ink/8 px-5 py-3">
            <p className="font-mono-x text-[11px] font-bold tracking-[0.1em] uppercase text-ink">■ {block.title}</p>
            {block.badge && (
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono-x text-[9.5px] font-bold tracking-[0.12em] uppercase text-white" style={{ background: "#16A34A" }}>
                <span className="size-1.5 rounded-full bg-white" aria-hidden="true" />
                {block.badge}
              </span>
            )}
          </div>
          <ul className="divide-y divide-ink/6">
            {block.rows.map((row) => {
              const rc = toneColor(row.tone);
              return (
                <li key={row.left} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-3.5">
                  <p className="font-mono-x text-[11px] md:text-[12px] font-bold tracking-wide text-ink">
                    {row.left}
                  </p>
                  <p className={`${rc.cls} text-[13px] leading-relaxed text-ink-soft max-w-[560px] text-right`} style={row.tone ? { color: rc.text } : undefined}>
                    {row.right}
                  </p>
                </li>
              );
            })}
          </ul>
          {block.note && (
            <p className="border-t border-ink/8 bg-cream/60 px-5 py-3 text-[12.5px] text-ink-soft">{block.note}</p>
          )}
        </motion.div>
      );
    }

    case "compare":
      return (
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-[16px] border border-[rgba(22,163,74,0.25)] bg-[#F0FDF4] p-6 dark:border-[rgba(74,222,128,0.3)] dark:bg-[#0c2a1c]">
            <p className="flex items-center gap-2 font-display font-semibold text-[16px] text-[#16A34A] dark:text-[#4ade80]">
              <span className="inline-flex size-6 items-center justify-center rounded-full bg-white dark:bg-white/12"><Check className="size-3.5 text-[#16A34A] dark:text-[#4ade80]" strokeWidth={3} /></span>
              What works
            </p>
            <ul className="mt-4 space-y-2.5">
              {block.works.map((w) => (
                <li key={w} className="flex gap-2.5 text-[13.5px] leading-[1.55] text-ink-soft">
                  <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-[#16A34A] dark:bg-[#4ade80]" aria-hidden="true" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[16px] border border-[rgba(230,57,70,0.22)] bg-[#FEF2F2] p-6 dark:border-[rgba(248,126,137,0.3)] dark:bg-[#2b1417]">
            <p className="flex items-center gap-2 font-display font-semibold text-[16px] text-[#E63946] dark:text-[#f87e89]">
              <span className="inline-flex size-6 items-center justify-center rounded-full bg-white dark:bg-white/12"><X className="size-3.5 text-[#E63946] dark:text-[#f87e89]" strokeWidth={3} /></span>
              What fails our users
            </p>
            <ul className="mt-4 space-y-2.5">
              {block.fails.map((f) => (
                <li key={f} className="flex gap-2.5 text-[13.5px] leading-[1.55] text-ink-soft">
                  <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-[#E63946] dark:bg-[#f87e89]" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      );

    case "metadata":
      return (
        <motion.dl {...fadeUp} transition={{ duration: 0.6 }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {block.items.map((m) => (
            <div key={m.label} className="rounded-[14px] border border-ink/10 bg-card p-4.5 px-5 py-4">
              <dt className="font-mono-x text-[9.5px] tracking-[0.16em] uppercase text-ink-faint">{m.label}</dt>
              <dd className="mt-1.5 text-[13.5px] font-semibold text-ink leading-snug">{m.value}</dd>
            </div>
          ))}
        </motion.dl>
      );

    default:
      return null;
  }
}

/** Renders "Lead — rest" list items with a bold lead part. */
export function renderLead(text: string) {
  const dash = text.indexOf(" — ");
  if (dash > 0) {
    return (
      <>
        <strong className="font-semibold text-ink">{text.slice(0, dash)}</strong>
        {text.slice(dash)}
      </>
    );
  }
  return text;
}
