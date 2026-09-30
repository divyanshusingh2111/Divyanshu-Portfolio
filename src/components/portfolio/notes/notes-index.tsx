"use client";

import { useMemo, useState } from "react";
import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Braces, Clock3, LayoutGrid, Rss, Tag, X } from "lucide-react";
import { NOTES, NOTE_CATEGORIES, allNoteTags } from "@/lib/notes";
import type { Note, NoteCategory } from "@/lib/notes/types";
import { onSpotChange, spotKey, getSpotsSnapshot, getServerSpotsSnapshot, type ReadingSpot } from "@/lib/reading-position";
import { SectionLabel } from "../section-label";
import { Reveal } from "../reveal";
import { ReadBadge } from "../read-badge";
import { ThemeToggle } from "../theme-toggle";
import { SubscribeForm } from "../subscribe-form";

type Filter = "All" | NoteCategory;

function firstImageOf(note: Note): string | null {
  const block = note.blocks.find((b) => b.type === "image");
  return block && block.type === "image" ? block.src : null;
}

/** Typographic ornament for notes without an image block. */
function OrnamentArtwork({ label }: { label: string }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center bg-cream-deep dark:bg-night"
      style={{
        backgroundImage:
          "radial-gradient(rgba(30,32,34,0.10) 1.2px, transparent 1.2px)",
        backgroundSize: "22px 22px",
      }}
    >
      <span className="font-script text-[88px] md:text-[110px] font-semibold leading-none text-terra/70 -rotate-3 select-none">
        {label}
      </span>
    </div>
  );
}

export function NotesIndexView() {
  const searchParams = useSearchParams();
  const urlTag = searchParams.get("tag");
  const [filter, setFilter] = useState<Filter>("All");

  /* ── Reading-position badges (external store, hydration-safe) ── */
  const spots = useSyncExternalStore(onSpotChange, getSpotsSnapshot, getServerSpotsSnapshot);
  const [tag, setTag] = useState<string | null>(urlTag);

  // Keep local tag in sync when the ?tag= param changes (e.g. same-route navigation).
  // React's recommended adjust-state-during-render pattern — no effect needed.
  const [prevUrlTag, setPrevUrlTag] = useState(urlTag);
  if (urlTag !== prevUrlTag) {
    setPrevUrlTag(urlTag);
    setTag(urlTag);
  }

  const list = NOTES.filter(
    (n) => (filter === "All" || n.category === filter) && (!tag || n.tags.includes(tag)),
  );
  const featured = list[0];
  const rest = list.slice(1);
  const totalMinutes = NOTES.reduce((sum, n) => sum + n.readingMinutes, 0);
  const tagCounts = allNoteTags();

  const counts = (f: Filter) => (f === "All" ? NOTES.length : NOTES.filter((n) => n.category === f).length);

  /* ── Continue-reading strip: the most recently touched unfinished note ── */
  const continueNote = useMemo(() => {
    let best: { note: Note; spot: ReadingSpot } | null = null;
    for (const n of NOTES) {
      const s = spots[spotKey("note", n.slug)];
      if (!s || s.pct < 0.06 || s.pct > 0.94) continue;
      if (!best || s.at > best.spot.at) best = { note: n, spot: s };
    }
    return best;
  }, [spots]);

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      {/* top bar */}
      <header className="sticky top-0 z-40 border-b border-ink/8 bg-cream/92 backdrop-blur-xl dark:border-white/10">
        <div className="mx-auto flex h-[60px] max-w-[1240px] items-center justify-between gap-3 px-4 md:px-8">
          <Link href="/" className="group flex items-center gap-2.5" aria-label="Back to portfolio home">
            <Image
              src="/design-assets/logo-monogram.png"
              alt="Divyanshu Singh monogram logo"
              width={28}
              height={28}
              className="size-7 object-contain"
              priority
            />
            <span className="font-mono-x text-[10.5px] font-bold tracking-[0.18em] uppercase text-ink">
              Divyanshu <span className="text-terra">Singh</span>
            </span>
          </Link>
          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-card px-3.5 py-2 font-mono-x text-[10px] md:text-[10.5px] font-bold tracking-[0.12em] uppercase text-ink transition-all hover:border-ink/40 hover:shadow-[0_8px_20px_-10px_rgba(30,32,34,0.4)]"
            >
              <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
              <span className="hidden sm:inline">Back to Portfolio</span>
              <span className="sm:hidden">Home</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container-portfolio py-16 md:py-24">
          {/* page header */}
          <Reveal>
            <SectionLabel text="Studio Notes — Journal" className="mb-5" />
            <h1 className="font-display font-semibold text-ink text-[clamp(2.1rem,4vw,3.3rem)] leading-[1.06] tracking-[-0.01em]">
              Notes from the{" "}
              <span className="font-script font-semibold text-terra text-[clamp(2.3rem,4.4vw,3.7rem)]">
                studio.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[620px] text-[14.5px] md:text-[15.5px] leading-[1.7] text-ink-soft">
              Essays and field notes on design systems, research and craft — the thinking behind
              the case studies, written one deliberate note at a time.
            </p>
            <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono-x text-[10px] font-bold tracking-[0.18em] uppercase text-ink-faint">
              <span className="flex items-center gap-1.5">
                <BookOpen className="size-3.5 text-terra" aria-hidden="true" />
                {NOTES.length} notes
              </span>
              <span aria-hidden="true" className="h-3 w-px bg-ink/20 dark:bg-white/20" />
              <span className="flex items-center gap-1.5">
                <Clock3 className="size-3.5 text-terra" aria-hidden="true" />
                {totalMinutes} min total
              </span>
              <span aria-hidden="true" className="h-3 w-px bg-ink/20 dark:bg-white/20" />
              <span>Newest {NOTES[0].dateShort}</span>
            </p>
            <a
              href="/notes/rss.xml"
              className="group mt-4 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-card px-3.5 py-2 font-mono-x text-[10px] font-bold tracking-[0.14em] uppercase text-ink-soft transition-all hover:border-terra/50 hover:text-terra-deep hover:shadow-[0_8px_20px_-12px_rgba(224,106,59,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra dark:border-white/15"
              aria-label="Subscribe to Studio Notes RSS feed"
              title="Studio Notes RSS feed"
            >
              <Rss className="size-3.5 text-terra transition-transform duration-300 group-hover:-rotate-12" aria-hidden="true" />
              RSS feed
            </a>
            <a
              href="/notes/feed.json"
              className="group mt-4 ml-2.5 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-card px-3.5 py-2 font-mono-x text-[10px] font-bold tracking-[0.14em] uppercase text-ink-soft transition-all hover:border-terra/50 hover:text-terra-deep hover:shadow-[0_8px_20px_-12px_rgba(224,106,59,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra dark:border-white/15"
              aria-label="Subscribe to Studio Notes JSON feed"
              title="Studio Notes JSON Feed 1.1 — for readers and integrations"
            >
              <Braces className="size-3.5 text-terra transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
              JSON feed
            </a>
          </Reveal>

          {/* ── Continue-reading strip (reading-position memory) ── */}
          <AnimatePresence initial={false}>
            {continueNote && (
              <motion.div
                key={continueNote.note.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="mt-8"
              >
                <Link
                  href={`/notes/${continueNote.note.slug}`}
                  className="group flex flex-wrap items-center gap-4 rounded-[18px] border border-terra/25 bg-terra-soft/60 px-5 py-4 transition-all hover:border-terra/45 hover:shadow-[0_18px_40px_-24px_rgba(224,106,59,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra dark:bg-terra/10"
                  aria-label={`Continue reading: ${continueNote.note.title} — ${Math.round(continueNote.spot.pct * 100)}% in`}
                >
                  <span
                    aria-hidden="true"
                    className="flex size-10 shrink-0 items-center justify-center rounded-full border border-terra/30 bg-card text-terra transition-transform duration-300 group-hover:scale-105 dark:border-terra/25"
                  >
                    <BookOpen className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 font-mono-x text-[9px] font-bold tracking-[0.2em] uppercase text-terra-deep">
                      <span aria-hidden="true" className="inline-block size-[5px] rounded-full bg-terra motion-safe:animate-pulse" />
                      Continue reading
                    </span>
                    <span className="mt-1 block truncate font-display text-[15.5px] font-semibold text-ink">
                      {continueNote.note.title}
                    </span>
                    <span className="mt-2 flex items-center gap-2.5">
                      <span aria-hidden="true" className="h-[3px] w-28 overflow-hidden rounded-full bg-ink/12 dark:bg-white/15">
                        <span
                          className="block h-full rounded-full bg-terra"
                          style={{ width: `${Math.round(continueNote.spot.pct * 100)}%` }}
                        />
                      </span>
                      <span className="font-mono-x text-[8.5px] font-bold tracking-[0.14em] uppercase text-terra-deep">
                        {Math.round(continueNote.spot.pct * 100)}% · ~{Math.max(1, Math.ceil(continueNote.note.readingMinutes * (1 - continueNote.spot.pct)))} min left
                      </span>
                    </span>
                  </span>
                  <span className="ml-auto inline-flex items-center gap-2 rounded-full bg-night px-4 py-2.5 font-mono-x text-[9.5px] font-bold tracking-[0.14em] uppercase text-white transition-colors group-hover:bg-terra dark:bg-terra dark:hover:bg-terra-deep">
                    Jump back in
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* filter pills */}
          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap gap-2.5" role="group" aria-label="Filter notes by category">
              {(["All", ...NOTE_CATEGORIES] as Filter[]).map((f) => {
                const active = filter === f;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    aria-pressed={active}
                    className={`rounded-full border px-4 py-2 font-mono-x text-[10.5px] font-bold tracking-[0.14em] uppercase transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra ${
                      active
                        ? "border-night bg-night text-white shadow-[0_10px_24px_-12px_rgba(15,23,42,0.5)] dark:border-terra dark:bg-terra"
                        : "border-ink/15 bg-card text-ink-soft hover:border-ink/40 hover:text-ink dark:border-white/15"
                    }`}
                  >
                    {f}
                    <span className={`ml-1.5 ${active ? "text-white/60 dark:text-night/60" : "text-ink-faint"}`}>
                      {counts(f)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* tag cloud — deep-links via /notes?tag=<slug> */}
            <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Filter notes by tag">
              <span className="mr-1 inline-flex items-center gap-1.5 font-mono-x text-[9.5px] font-bold tracking-[0.18em] uppercase text-ink-faint">
                <Tag className="size-3" aria-hidden="true" />
                Tags
              </span>
              {tagCounts.map(({ tag: t, count }) => {
                const active = tag === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTag(active ? null : t)}
                    aria-pressed={active}
                    title={`Show notes tagged “${t}”`}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono-x text-[9.5px] font-bold tracking-[0.1em] lowercase transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra ${
                      active
                        ? "bg-terra text-white shadow-[0_8px_18px_-10px_rgba(224,106,59,0.7)]"
                        : "bg-terra/10 text-terra-deep hover:bg-terra/20 dark:bg-terra/15 dark:text-terra-deep"
                    }`}
                  >
                    {t}
                    <span className={active ? "text-white/60" : "text-terra-deep/60"}>{count}</span>
                  </button>
                );
              })}
              {tag && (
                <button
                  type="button"
                  onClick={() => setTag(null)}
                  className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 font-mono-x text-[9.5px] font-bold tracking-[0.14em] uppercase text-ink-faint transition-all hover:border-ink/40 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra dark:border-white/15"
                  aria-label="Clear tag filter"
                >
                  Clear tag
                  <X className="size-3" aria-hidden="true" />
                </button>
              )}
            </div>
          </Reveal>

          {/* featured + list */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${filter}:${tag ?? ""}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mt-10 md:mt-12"
            >
              {featured ? (
                <>
                  {/* ── Featured (latest of the filtered list) ── */}
                  <Link
                    href={`/notes/${featured.slug}`}
                    className="group grid overflow-hidden rounded-[24px] border border-ink/10 bg-card transition-all hover:border-terra/35 hover:shadow-[0_30px_60px_-30px_rgba(30,32,34,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terra ring-offset-cream lg:grid-cols-[1fr_1.05fr] dark:border-white/12"
                    aria-label={`Read latest note: ${featured.title}`}
                  >
                    <div className="flex min-h-[260px] flex-col p-7 md:p-10">
                      <p className="flex items-center gap-2.5 font-mono-x text-[10px] font-bold tracking-[0.2em] uppercase">
                        <span className="inline-flex items-center rounded-full bg-terra px-2.5 py-1 text-[8.5px] text-white">
                          {tag ? `Tag: ${tag}` : "Latest"}
                        </span>
                        <span className="text-terra-deep">{featured.category}</span>
                      </p>
                      <h2 className="mt-5 font-display text-[22px] md:text-[27px] font-semibold leading-[1.16] tracking-[-0.01em] text-ink transition-colors group-hover:text-terra">
                        {featured.title}
                      </h2>
                      <p className="mt-3.5 text-[13.5px] md:text-[14.5px] leading-[1.65] text-ink-soft">
                        {featured.dek}
                      </p>
                      <ReadBadge className="mt-3.5" spot={spots[spotKey("note", featured.slug)]} />
                      <div className="mt-auto pt-7">
                        <div className="flex flex-wrap gap-2">
                          {featured.tags.slice(0, 3).map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setTag(tag === t ? null : t);
                              }}
                              aria-pressed={tag === t}
                              className="rounded-full border border-border/70 bg-cream px-2.5 py-0.5 font-mono-x text-[9px] tracking-[0.1em] uppercase text-ink-faint transition-all hover:border-terra/60 hover:text-terra-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra dark:bg-night"
                              title={`Filter the index by “${t}”`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                        <p className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4 dark:border-white/10">
                          <span className="font-mono-x text-[9.5px] font-bold tracking-[0.16em] uppercase text-ink-faint">
                            {featured.dateLabel} · {featured.readingMinutes} min read
                          </span>
                          <span className="inline-flex items-center gap-1.5 font-mono-x text-[10px] font-bold tracking-[0.14em] uppercase text-terra-deep">
                            Read the note
                            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="relative min-h-[230px] bg-cream-deep dark:bg-night">
                      {firstImageOf(featured) ? (
                        <Image
                          src={firstImageOf(featured) as string}
                          alt=""
                          fill
                          sizes="(max-width: 1024px) 92vw, 560px"
                          className="object-cover object-top transition-transform duration-[700ms] ease-[cubic-bezier(0.21,0.47,0.32,0.98)] group-hover:scale-[1.03]"
                        />
                      ) : (
                        <OrnamentArtwork label="notes" />
                      )}
                      <span
                        aria-hidden="true"
                        className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-night/80 px-3 py-1.5 font-mono-x text-[9px] font-bold tracking-[0.16em] uppercase text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-terra"
                      >
                        N.01
                        <ArrowUpRight className="size-3" />
                      </span>
                    </div>
                  </Link>

                  {/* ── Remaining notes as editorial rows ── */}
                  {rest.length > 0 && (
                    <div className="mt-8 divide-y divide-ink/10 border-t border-ink/10 md:mt-10 dark:divide-white/10 dark:border-white/10">
                      {rest.map((n, i) => (
                        <motion.div
                          key={n.slug}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.08 + i * 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
                        >
                          <Link
                            href={`/notes/${n.slug}`}
                            className="group -mx-3 grid grid-cols-[64px_1fr_auto] items-center gap-4 rounded-2xl px-3 py-6 transition-colors hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra md:grid-cols-[104px_1fr_auto] md:gap-8 md:py-7"
                          >
                            <div className="min-w-0">
                              <p className="font-mono-x text-[10.5px] font-bold tracking-[0.1em] text-ink">
                                {n.dateShort}
                              </p>
                              <p className="mt-1 hidden font-mono-x text-[8.5px] tracking-[0.16em] uppercase text-ink-faint sm:block">
                                {n.category}
                              </p>
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-display text-[16.5px] md:text-[19px] font-semibold leading-[1.25] text-ink transition-colors group-hover:text-terra">
                                {n.title}
                              </h3>
                              <p className="mt-1.5 line-clamp-2 text-[13px] leading-[1.55] text-ink-soft md:text-[13.5px]">
                                {n.dek}
                              </p>
                              <ReadBadge className="mt-2.5" spot={spots[spotKey("note", n.slug)]} />
                            </div>
                            <div className="flex items-center gap-3 md:gap-5">
                              <span className="hidden font-mono-x text-[9.5px] font-bold tracking-[0.14em] uppercase text-ink-faint sm:inline">
                                {n.readingMinutes} min
                              </span>
                              <span className="inline-flex size-9 items-center justify-center rounded-full border border-ink/10 text-ink transition-all duration-300 group-hover:border-terra group-hover:bg-terra group-hover:text-white dark:border-white/15">
                                <ArrowUpRight className="size-4" />
                              </span>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p className="rounded-2xl border border-dashed border-ink/20 p-10 text-center font-mono-x text-[11px] tracking-[0.1em] uppercase text-ink-faint dark:border-white/15">
                  [ no notes match this filter — try clearing the tag ]
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          {/* ── Bottom CTA: subscribe + case studies cross-link ── */}
          <Reveal delay={0.08}>
            <div className="mt-16 grid gap-6 md:mt-20 lg:grid-cols-[1.05fr_0.95fr]">
              <SubscribeForm />

              <div className="relative overflow-hidden rounded-[22px] border border-ink/10 bg-card p-6 md:p-8 dark:border-white/12">
                <p className="font-mono-x text-[10.5px] font-bold tracking-[0.22em] uppercase text-terra-deep">
                  ● The deep dives
                </p>
                <h3 className="mt-3 font-display text-[19px] md:text-[21px] font-semibold leading-[1.2] tracking-[-0.01em] text-ink">
                  Notes are the thinking. Case studies are the proof.
                </h3>
                <div className="mt-5 flex items-center gap-3">
                  {["klimashift-card", "autoremov-card", "trivira-card"].map((slug) => (
                    <span
                      key={slug}
                      className="relative block size-[54px] overflow-hidden rounded-xl border border-ink/10 shadow-[0_10px_24px_-14px_rgba(30,32,34,0.4)] dark:border-white/15"
                    >
                      <Image
                        src={`/design-assets/${slug}.jpg`}
                        alt=""
                        fill
                        sizes="54px"
                        className="object-cover object-top"
                      />
                    </span>
                  ))}
                  <span className="ml-1 font-mono-x text-[9.5px] leading-[1.5] tracking-[0.12em] uppercase text-ink-faint">
                    3 full
                    <br />
                    case studies
                  </span>
                </div>
                <Link
                  href="/work"
                  className="group mt-6 inline-flex items-center gap-2 rounded-full bg-night px-5 py-3 font-mono-x text-[10.5px] font-bold tracking-[0.14em] uppercase text-white transition-colors hover:bg-terra dark:bg-terra dark:hover:bg-terra-deep"
                >
                  Browse selected work
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </main>

      <footer className="mt-auto border-t border-ink/8 dark:border-white/10">
        <div className="container-portfolio flex flex-wrap items-center justify-between gap-3 py-6">
          <p className="font-mono-x text-[9.5px] tracking-[0.22em] uppercase text-ink-faint">
            © 2026 Divyanshu Singh. All rights reserved.
          </p>
          <p className="hidden items-center gap-2 font-mono-x text-[9.5px] tracking-[0.22em] uppercase text-ink-faint sm:flex">
            <LayoutGrid className="size-3" aria-hidden="true" />
            Studio Notes · Journal
          </p>
        </div>
      </footer>
    </div>
  );
}
