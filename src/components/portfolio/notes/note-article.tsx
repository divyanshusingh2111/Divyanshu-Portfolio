"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, ChevronDown, Clock3, Link2, LayoutGrid, Linkedin, Rss } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useReadingPosition } from "@/hooks/use-reading-position";
import type { Note } from "@/lib/notes/types";
import { noteHeadings } from "@/lib/notes/types";
import { ThemeToggle } from "../theme-toggle";
import { Reveal } from "../reveal";
import { NoteBlockView } from "./note-blocks";
import { SubscribeForm } from "../subscribe-form";
import { ResumeBanner } from "../resume-banner";

interface NoteArticleViewProps {
  note: Note;
  newer: Note | null;
  older: Note | null;
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable;
}

export function NoteArticleView({ note, newer, older }: NoteArticleViewProps) {
  const router = useRouter();
  const articleRef = useRef<HTMLDivElement>(null);
  const toc = useMemo(() => noteHeadings(note), [note]);
  const [activeId, setActiveId] = useState<string>(toc[0]?.id ?? "");
  const reading = useReadingPosition("note", note.slug);

  /* ── Reading progress (spring-smoothed) ── */
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  /* ── TOC scroll-spy ── */
  useEffect(() => {
    if (toc.length === 0) return;
    const els = toc
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => !!el);
    if (els.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-16% 0px -68% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [toc]);

  /* ── Keyboard: ← older, → newer ── */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      if (isTypingTarget(e.target)) return;
      const overlay = document.querySelector('[role="dialog"][data-state="open"]');
      if (overlay) return;
      e.preventDefault();
      if (e.key === "ArrowRight") {
        router.push(newer ? `/notes/${newer.slug}` : "/notes");
      } else {
        router.push(older ? `/notes/${older.slug}` : "/notes");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [newer, older, router]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: "Note link copied to clipboard" });
    } catch {
      toast({ title: "Could not copy link", variant: "destructive" });
    }
  };

  /* Full share URL is built at click time (window-dependent values must not
     run during render — SSR/client href would mismatch). The static href
     keeps the anchor usable without JS. */
  const shareUrl = () =>
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `${note.title} — a Studio Note by Divyanshu Singh`
    )}&url=${encodeURIComponent(window.location.href)}`;

  const onShare = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(shareUrl(), "_blank", "noopener,noreferrer");
  };

  /* LinkedIn share URL is built at click time (same window-dependent pattern). */
  const shareToLinkedIn = () =>
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;

  const onShareLinkedIn = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(shareToLinkedIn(), "_blank", "noopener,noreferrer");
  };

  /* h2 blocks get numbered 01, 02 … for both heading + TOC (pure computation) */
  const h2Numbers = useMemo(() => {
    const map = new Map<number, number>();
    let n = 0;
    note.blocks.forEach((block, i) => {
      if (block.type === "h2") {
        n += 1;
        map.set(i, n);
      }
    });
    return map;
  }, [note]);

  const rendered = note.blocks.map((block, i) => (
    <NoteBlockView key={i} block={block} num={h2Numbers.get(i)} />
  ));

  return (
    <div className="print-note flex min-h-screen flex-col bg-cream print:min-h-0 print:bg-white">
      {/* reading progress */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-terra to-terra-deep print:hidden"
        style={{ scaleX: progress }}
      />

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
            <Link
              href="/work"
              className="hidden items-center gap-1.5 rounded-full border border-ink/15 bg-card px-3.5 py-2 font-mono-x text-[10px] font-bold tracking-[0.12em] uppercase text-ink transition-all hover:border-ink/40 sm:inline-flex"
            >
              <LayoutGrid className="size-3.5" />
              Work
            </Link>
            <Link
              href="/notes"
              className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-card px-3.5 py-2 font-mono-x text-[10px] md:text-[10.5px] font-bold tracking-[0.12em] uppercase text-ink transition-all hover:border-ink/40 hover:shadow-[0_8px_20px_-10px_rgba(30,32,34,0.4)]"
            >
              <BookOpen className="size-3.5" />
              <span className="hidden sm:inline">All Notes</span>
              <span className="sm:hidden">Notes</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <article className="container-portfolio py-14 md:py-20 print:max-w-full print:px-0 print:py-0">
          {/* ── Hero ── */}
          <Reveal>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2.5 font-mono-x text-[10.5px] font-bold tracking-[0.2em] uppercase">
              <Link href="/notes" className="text-ink-faint transition-colors hover:text-terra">
                Studio Notes
              </Link>
              <span aria-hidden="true" className="text-ink-faint">/</span>
              <span className="text-terra-deep">{note.category}</span>
            </nav>
            <h1 className="mt-5 max-w-[820px] font-display text-[clamp(1.85rem,4vw,2.75rem)] font-semibold leading-[1.12] tracking-[-0.015em] text-ink">
              {note.title}
            </h1>
            <p className="mt-5 max-w-[640px] text-[15.5px] md:text-[16.5px] leading-[1.7] text-ink-soft">
              {note.dek}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-ink/10 py-4 dark:border-white/10">
              <span className="flex items-center gap-3">
                <Image
                  src="/design-assets/hero-portrait.jpg"
                  alt=""
                  width={36}
                  height={36}
                  className="size-9 rounded-full border border-ink/10 object-cover object-top dark:border-white/15"
                />
                <span className="font-display text-[13.5px] font-semibold text-ink">
                  Divyanshu Singh
                  <span className="ml-2 font-mono-x text-[9.5px] font-bold tracking-[0.16em] uppercase text-ink-faint">
                    Product Designer
                  </span>
                </span>
              </span>
              <span aria-hidden="true" className="hidden h-4 w-px bg-ink/15 sm:block dark:bg-white/15" />
              <span className="font-mono-x text-[10.5px] tracking-[0.14em] uppercase text-ink-faint">
                {note.dateLabel}
              </span>
              <span aria-hidden="true" className="hidden h-4 w-px bg-ink/15 sm:block dark:bg-white/15" />
              <span className="flex items-center gap-1.5 font-mono-x text-[10.5px] tracking-[0.14em] uppercase text-ink-faint">
                <Clock3 className="size-3.5" aria-hidden="true" />
                {note.readingMinutes} min read
              </span>
            </div>
          </Reveal>

          {/* ── Body: TOC sidebar + prose ── */}
          <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-[216px_minmax(0,1fr)] lg:gap-14 print:block">
            {/* desktop TOC */}
            <aside className="hidden lg:block print:hidden" aria-label="Table of contents">
              <div className="sticky top-24">
                <p className="font-mono-x text-[10px] font-bold tracking-[0.22em] uppercase text-ink-faint">
                  On this page
                </p>
                <ul className="mt-4 space-y-0.5">
                  {toc.map((t, i) => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        aria-current={activeId === t.id ? "true" : undefined}
                        className={`flex items-start gap-2.5 border-l-2 py-1.5 pl-3.5 pr-2 transition-all duration-300 ${
                          activeId === t.id
                            ? "border-terra text-ink"
                            : "border-ink/12 text-ink-faint hover:border-ink/30 hover:text-ink-soft dark:border-white/12"
                        }`}
                      >
                        <span className="mt-px font-mono-x text-[10px] font-bold text-terra-deep">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[12.5px] leading-[1.45]">{t.text}</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-ink/10 pt-4 dark:border-white/10">
                  <p className="flex items-center gap-2 font-mono-x text-[9.5px] tracking-[0.14em] uppercase text-ink-faint">
                    <span className="kbd-chip">←</span>
                    <span className="kbd-chip">→</span>
                    flip notes
                  </p>
                </div>
              </div>
            </aside>

            {/* prose column */}
            <div ref={articleRef} className="min-w-0 max-w-[680px] print:max-w-full">
              {/* mobile TOC */}
              {toc.length > 0 && (
                <details className="group mb-9 rounded-[16px] border border-ink/10 bg-card px-5 py-4 lg:hidden print:hidden dark:border-white/12">
                  <summary className="flex cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center gap-2.5 font-mono-x text-[10px] font-bold tracking-[0.2em] uppercase text-terra-deep">
                      <span aria-hidden="true" className="inline-block size-[6px] rounded-full bg-terra" />
                      On this page
                    </span>
                    <ChevronDown className="size-4 text-ink-faint transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <ul className="mt-3 space-y-1">
                    {toc.map((t, i) => (
                      <li key={t.id}>
                        <a
                          href={`#${t.id}`}
                          className="flex items-baseline gap-2.5 rounded-lg px-2 py-1.5 text-[13.5px] text-ink-soft transition-colors hover:bg-cream-deep hover:text-ink dark:hover:bg-white/5"
                        >
                          <span className="font-mono-x text-[10px] font-bold text-terra-deep">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {t.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              )}

              {rendered}

              {/* ── Share row ── */}
              <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-ink/10 pt-7 dark:border-white/10 print:mt-8 print:border-ink/20">
                <p className="mr-1 font-mono-x text-[9.5px] font-bold tracking-[0.2em] uppercase text-ink-faint print:hidden">
                  Enjoyed this?
                </p>
                <button
                  type="button"
                  onClick={copyLink}
                  className="group inline-flex items-center gap-2 rounded-full bg-night px-4 py-2.5 font-mono-x text-[10px] font-bold tracking-[0.12em] uppercase text-white transition-all hover:bg-terra focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra dark:bg-terra print:hidden"
                >
                  <Link2 className="size-3.5 transition-transform duration-300 group-hover:-rotate-12" />
                  Copy link
                </button>
                <a
                  href="https://twitter.com/intent/tweet"
                  onClick={onShare}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-card px-4 py-2.5 font-mono-x text-[10px] font-bold tracking-[0.12em] uppercase text-ink transition-all hover:border-ink/40 dark:border-white/15 print:hidden"
                >
                  Share on X
                  <ArrowUpRight className="size-3.5" />
                </a>
                <a
                  href="https://www.linkedin.com/sharing/share-offsite/"
                  onClick={onShareLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/li inline-flex items-center gap-2 rounded-full border border-ink/15 bg-card px-4 py-2.5 font-mono-x text-[10px] font-bold tracking-[0.12em] uppercase text-ink transition-all hover:border-ink/40 dark:border-white/15 print:hidden"
                  aria-label="Share this note on LinkedIn"
                >
                  <Linkedin className="size-3.5 text-ink-soft transition-colors group-hover/li:text-[#0A66C2] dark:text-white/70" aria-hidden="true" />
                  <span className="hidden sm:inline">LinkedIn</span>
                  <span className="sm:hidden">Share</span>
                </a>
                <a
                  href="/notes/rss.xml"
                  className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-card px-4 py-2.5 font-mono-x text-[10px] font-bold tracking-[0.12em] uppercase text-ink-soft transition-all hover:border-terra/50 hover:text-terra-deep dark:border-white/15 print:hidden"
                  aria-label="Subscribe to the Studio Notes RSS feed"
                  title="Studio Notes RSS feed"
                >
                  <Rss className="size-3.5 text-terra transition-transform duration-300 group-hover:-rotate-12" aria-hidden="true" />
                  RSS
                </a>
                <div className="ml-auto flex flex-wrap gap-2">
                  {note.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/notes?tag=${encodeURIComponent(tag)}`}
                      className="inline-flex items-center rounded-full border border-border/70 bg-card px-3 py-1 text-[10.5px] font-medium tracking-[0.02em] text-ink-soft transition-all hover:border-terra/60 hover:text-terra-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra"
                      title={`Browse notes tagged “${tag}”`}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* ── Author card ── */}
              <div className="mt-9 flex items-start gap-4 rounded-[20px] border border-ink/10 bg-card p-6 dark:border-white/12">
                <Image
                  src="/design-assets/hero-portrait.jpg"
                  alt="Portrait of Divyanshu Singh"
                  width={64}
                  height={64}
                  className="size-14 shrink-0 rounded-2xl border border-ink/10 object-cover object-top dark:border-white/15"
                />
                <div className="min-w-0">
                  <p className="font-mono-x text-[9.5px] font-bold tracking-[0.2em] uppercase text-terra-deep">
                    Written by
                  </p>
                  <p className="mt-1 font-display text-[16px] font-semibold text-ink">Divyanshu Singh</p>
                  <p className="mt-1.5 text-[13px] leading-[1.65] text-ink-soft">
                    Product designer crafting data-heavy products for energy, fintech and health.
                    Writing here about the systems, research and craft behind the{" "}
                    <Link href="/work" className="font-medium text-terra underline decoration-terra/35 underline-offset-[3px] hover:decoration-terra">
                      case studies
                    </Link>
                    .
                  </p>
                </div>
              </div>

              {/* ── Subscribe CTA ── */}
              <div className="mt-6 print:hidden">
                <SubscribeForm id="note-subscribe" />
              </div>

              {/* ── Prev / next ── */}
              <div className="mt-12 grid gap-4 sm:grid-cols-2 print:hidden">
                {older ? (
                  <Link
                    href={`/notes/${older.slug}`}
                    className="group rounded-[18px] border border-ink/10 bg-card p-5 transition-all hover:border-terra/40 hover:shadow-[0_16px_36px_-20px_rgba(224,106,59,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra dark:border-white/12"
                  >
                    <p className="flex items-center gap-2 font-mono-x text-[9.5px] font-bold tracking-[0.18em] uppercase text-ink-faint">
                      <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
                      Older note
                    </p>
                    <p className="mt-2.5 font-display text-[15.5px] font-semibold leading-[1.3] text-ink transition-colors group-hover:text-terra">
                      {older.title}
                    </p>
                    <p className="mt-2 font-mono-x text-[9.5px] tracking-[0.14em] uppercase text-ink-faint">
                      {older.dateShort} · {older.readingMinutes} min
                    </p>
                  </Link>
                ) : (
                  <Link
                    href="/notes"
                    className="group rounded-[18px] border border-ink/10 bg-card p-5 transition-all hover:border-ink/30 dark:border-white/12"
                  >
                    <p className="flex items-center gap-2 font-mono-x text-[9.5px] font-bold tracking-[0.18em] uppercase text-ink-faint">
                      <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
                      That&apos;s the archive
                    </p>
                    <p className="mt-2.5 font-display text-[15.5px] font-semibold text-ink transition-colors group-hover:text-terra">
                      Start from the newest note
                    </p>
                    <p className="mt-2 font-mono-x text-[9.5px] tracking-[0.14em] uppercase text-ink-faint">
                      Studio Notes index
                    </p>
                  </Link>
                )}

                {newer ? (
                  <Link
                    href={`/notes/${newer.slug}`}
                    className="group rounded-[18px] border border-ink/10 bg-card p-5 text-right transition-all hover:border-terra/40 hover:shadow-[0_16px_36px_-20px_rgba(224,106,59,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra dark:border-white/12"
                  >
                    <p className="flex items-center justify-end gap-2 font-mono-x text-[9.5px] font-bold tracking-[0.18em] uppercase text-ink-faint">
                      Newer note
                      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </p>
                    <p className="mt-2.5 font-display text-[15.5px] font-semibold leading-[1.3] text-ink transition-colors group-hover:text-terra">
                      {newer.title}
                    </p>
                    <p className="mt-2 font-mono-x text-[9.5px] tracking-[0.14em] uppercase text-ink-faint">
                      {newer.dateShort} · {newer.readingMinutes} min
                    </p>
                  </Link>
                ) : (
                  <a
                    href="#note-subscribe"
                    className="group rounded-[18px] border border-terra/30 bg-terra-soft p-5 text-right transition-all hover:border-terra/50 dark:bg-terra/10"
                  >
                    <p className="flex items-center justify-end gap-2 font-mono-x text-[9.5px] font-bold tracking-[0.18em] uppercase text-terra-deep">
                      You&apos;re at the newest
                      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </p>
                    <p className="mt-2.5 font-display text-[15.5px] font-semibold leading-[1.3] text-ink">
                      The next note lands in your inbox first
                    </p>
                    <p className="mt-2 font-mono-x text-[9.5px] tracking-[0.14em] uppercase text-ink-faint">
                      Via Studio Notes — free
                    </p>
                  </a>
                )}
              </div>

              <p className="mt-6 text-center font-mono-x text-[9.5px] tracking-[0.14em] uppercase text-ink-faint print:hidden">
                <span className="kbd-chip">←</span> <span className="kbd-chip">→</span>{" "}
                <span className="ml-1.5">switch notes</span>
              </p>
            </div>
          </div>
        </article>
      </main>

      <footer className="mt-auto border-t border-ink/8 dark:border-white/10">
        <div className="container-portfolio flex flex-wrap items-center justify-between gap-3 py-6">
          <p className="font-mono-x text-[9.5px] tracking-[0.22em] uppercase text-ink-faint">
            © 2026 Divyanshu Singh. All rights reserved.
          </p>
          <p className="hidden font-mono-x text-[9.5px] tracking-[0.22em] uppercase text-ink-faint sm:block">
            Studio Notes · Journal
          </p>
        </div>
      </footer>

      {/* ── Resume-reading banner (position memory) ── */}
      <AnimatePresence>
        {reading.showBanner && reading.spot && (
          <ResumeBanner
            pct={reading.spot.pct}
            kindLabel="note"
            onResume={reading.resume}
            onRestart={reading.restart}
            onDismiss={reading.dismiss}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
