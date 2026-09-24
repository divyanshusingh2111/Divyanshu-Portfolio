"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  Link2,
  Linkedin,
  Twitter,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useReadingPosition } from "@/hooks/use-reading-position";
import { BlockRenderer } from "./blocks";
import { ThemeToggle } from "../theme-toggle";
import { ResumeBanner } from "../resume-banner";
import type { Block, CaseStudy, Section } from "@/lib/case-studies/types";

/**
 * True when the resolved theme is dark. `resolvedTheme` is undefined during
 * SSR and the first client render, so both render the light variant first —
 * no hydration mismatch, and it flips reactively once next-themes mounts.
 */
function useIsDark() {
  const { resolvedTheme } = useTheme();
  return resolvedTheme === "dark";
}

/* ------------------------------------------------------------------ */
/* Reading-time estimation                                             */
/* ------------------------------------------------------------------ */

function blockText(block: Block): string {
  switch (block.type) {
    case "text":
      return block.text;
    case "subheading":
      return block.text;
    case "stats":
      return block.items.map((s) => `${s.value} ${s.label} ${s.sub ?? ""}`).join(" ");
    case "cards":
      return block.cards
        .map((c) => [c.title, c.body, c.tag, c.eyebrow, ...(c.pills ?? [])].filter(Boolean).join(" "))
        .join(" ");
    case "pills":
      return block.items.join(" ");
    case "quote":
      return [block.quote.text, block.quote.translation, block.quote.author, block.quote.meta, ...(block.quote.bullets ?? [])]
        .filter(Boolean)
        .join(" ");
    case "callout":
      return [block.title, block.text].filter(Boolean).join(" ");
    case "image":
      return block.image.alt;
    case "gallery":
      return block.images.map((i) => i.alt).join(" ");
    case "stages":
      return block.items.map((s) => `${s.title} ${s.body}`).join(" ");
    case "list":
      return block.items.join(" ");
    case "flow":
      return block.items.join(" ");
    case "panel":
      return [block.title, block.note, ...block.rows.map((r) => `${r.left} ${r.right ?? ""}`)].filter(Boolean).join(" ");
    case "compare":
      return [...block.works, ...block.fails].join(" ");
    case "metadata":
      return block.items.map((m) => `${m.label} ${m.value}`).join(" ");
    default:
      return "";
  }
}

function estimateReadingMinutes(study: CaseStudy): number {
  const texts: string[] = [study.hero.paragraph, study.closing.heading, study.closing.text ?? ""];
  for (const s of study.sections) {
    texts.push(s.label, s.heading, s.headingAccent ?? "");
    for (const b of s.blocks) texts.push(blockText(b));
  }
  const words = texts.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/* ------------------------------------------------------------------ */
/* Sticky chrome bar                                                   */
/* ------------------------------------------------------------------ */

function ChromeBar({ study, next }: { study: CaseStudy; next: CaseStudy }) {
  const blueprint = study.theme.chrome === "blueprint";
  return (
    <div
      className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-colors print:hidden ${
        blueprint
          ? "border-ink/8 bg-cream/92"
          : "border-[rgba(26,115,232,0.14)] bg-[#F9FAFB]/92 dark:border-[rgba(123,170,247,0.18)] dark:bg-[#131722]/92"
      }`}
    >
      <div className="mx-auto flex h-[60px] max-w-[1240px] items-center justify-between gap-3 px-4 md:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/work"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-ink/15 bg-card px-3.5 py-2 font-mono-x text-[10px] md:text-[10.5px] font-bold tracking-[0.12em] uppercase text-ink transition-all hover:border-ink/40 hover:shadow-[0_8px_20px_-10px_rgba(30,32,34,0.4)]"
            aria-label="Back to all work"
          >
            <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">All Work</span>
            <span className="sm:hidden">Work</span>
          </Link>
          <p
            className="hidden md:block truncate font-mono-x text-[10px] font-bold tracking-[0.22em] uppercase"
            style={{ color: study.theme.accent }}
          >
            {blueprint ? "UX DESIGN ARCHITECTURE SYSTEM LOGS" : "UX RESEARCH · FIELD STUDY · PAYMENTS LAB"}
          </p>
        </div>
        <div className="flex min-w-0 shrink-0 items-center gap-2.5">
          <ThemeToggle className="!size-9" />
          <Link
            href={`/work/${next.id}`}
            className="group hidden min-w-0 items-center gap-2 font-mono-x text-[10px] md:text-[10.5px] font-bold tracking-[0.1em] uppercase text-ink-faint transition-colors hover:text-ink sm:inline-flex"
            aria-label={`Next case study: ${next.title}`}
          >
            <span className="hidden lg:inline">Next ·</span>
            <span className="hidden sm:inline max-w-[150px] lg:max-w-[220px] truncate">{next.title}</span>
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function CaseHero({ study }: { study: CaseStudy }) {
  const t = study.theme;
  const dark = useIsDark();
  const heroBg = dark ? (t.heroBgDark ?? t.heroBg) : t.heroBg;
  const heroText = dark ? (t.heroTextDark ?? t.heroText) : t.heroText;
  const words = study.hero.gradientWords?.split(",") ?? [];
  const titleLines = study.hero.title.split("\n");
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      data-print-flip
      className="grain relative overflow-hidden rounded-[22px] p-7 md:p-12 lg:p-14 transition-[background] duration-500"
      style={{ background: heroBg, color: heroText }}
    >
      {/* bokeh + watermark index */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-24 size-[420px] rounded-full opacity-[0.22] blur-[90px] print:hidden" style={{ background: t.accent }} />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-32 size-[380px] rounded-full opacity-[0.14] blur-[100px] print:hidden" style={{ background: t.accent }} />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-4 right-6 select-none font-mono-x font-bold leading-none opacity-[0.08] text-[clamp(4.5rem,11vw,8rem)]"
      >
        {study.index}
      </span>

      <div className="relative grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-14">
        <div>
          <p className="font-mono-x text-[10px] md:text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: t.accent }}>
            {study.hero.label}
          </p>
          <h1 className="mt-5 font-display font-semibold leading-[1.02] tracking-[-0.015em] text-[clamp(2.5rem,5.8vw,4.4rem)]">
            {titleLines.map((line, li) => (
              <span key={li} className="block">
                {line.split(" ").map((w, wi) =>
                  words.includes(w.replace(/[^A-Za-z]/g, "")) ? (
                    <span
                      key={wi}
                      data-print-gradient
                      className="bg-clip-text text-transparent"
                      style={{ backgroundImage: "linear-gradient(94deg, #EA4335, #FBBC05 30%, #34A853 62%, #1A73E8 92%)" }}
                    >
                      {w}{" "}
                    </span>
                  ) : (
                    <span key={wi}>{w} </span>
                  ),
                )}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-[560px] text-[14px] md:text-[15px] leading-[1.7] opacity-80">{study.hero.paragraph}</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {study.hero.tags.map((tag) => (
              <span
                key={tag}
                data-print-chip
                className="rounded-full border px-3.5 py-1.5 text-[11.5px] font-medium tracking-[0.02em]"
                style={{ borderColor: "rgba(255,255,255,0.22)", background: "rgba(255,255,255,0.08)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3.5 content-start">
          {study.hero.stats.map((s, si) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 + si * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="rounded-[14px] border p-4 md:p-5"
              data-print-stat
              style={{ borderColor: "rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.06)" }}
            >
              <p
                className="font-display font-semibold text-[clamp(1.25rem,2.2vw,1.7rem)] leading-none"
                style={{ color: s.tone ? undefined : t.accent }}
              >
                {s.value}
              </p>
              <p className="mt-2 font-mono-x text-[9px] md:text-[9.5px] tracking-[0.14em] uppercase opacity-70">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* optional hero image (angled device mockup) */}
      {study.hero.image && (
        <motion.div
          initial={{ opacity: 0, y: 44, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: -1.25 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative mx-auto mt-12 flex w-full max-w-[540px] justify-center"
        >
          <div className="animate-float-soft w-full">
            <div className="overflow-hidden rounded-[16px] border border-ink/10 bg-card shadow-[0_36px_80px_-30px_rgba(15,23,42,0.5)]">
              <div className="flex items-center gap-2 border-b border-ink/8 px-3.5 py-2.5">
                <span className="flex gap-1.5" aria-hidden="true">
                  <i className="block size-2.5 rounded-full bg-[#FF5F57]" />
                  <i className="block size-2.5 rounded-full bg-[#FEBC2E]" />
                  <i className="block size-2.5 rounded-full bg-[#28C840]" />
                </span>
                <span className="flex-1 truncate rounded-md bg-cream-deep px-2.5 py-1 font-mono-x text-[10px] text-ink-soft tracking-wide">
                  {study.hero.image.browserUrl ?? "localhost"}
                </span>
                {study.hero.image.frameTag && (
                  <span className="hidden sm:inline-block shrink-0 rounded-full bg-night px-2.5 py-1 font-mono-x text-[9px] tracking-[0.12em] text-white uppercase">
                    {study.hero.image.frameTag}
                  </span>
                )}
              </div>
              <Image
                src={study.hero.image.src}
                alt={study.hero.image.alt}
                width={study.hero.image.w ?? 1000}
                height={study.hero.image.h ?? 750}
                priority
                sizes="(max-width: 720px) 92vw, 540px"
                className="h-auto w-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Share row                                                           */
/* ------------------------------------------------------------------ */

function ShareRow({ study, minutes, sectionCount }: { study: CaseStudy; minutes: number; sectionCount: number }) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast({ title: "Case study link copied to clipboard" });
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      toast({ title: "Could not copy link — please copy it from the address bar", variant: "destructive" });
    }
  };

  const shareTo = (kind: "linkedin" | "x") => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${study.title} — ${study.subtitle} · Case study by Divyanshu Singh`);
    const target =
      kind === "linkedin"
        ? `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        : `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    window.open(target, "_blank", "noopener,noreferrer,width=680,height=560");
  };

  const btn =
    "group inline-flex items-center gap-2 rounded-full border border-ink/12 bg-card px-3.5 py-2 font-mono-x text-[10px] font-bold tracking-[0.12em] uppercase text-ink-soft transition-all hover:border-ink/35 hover:text-ink hover:shadow-[0_8px_20px_-12px_rgba(30,32,34,0.45)]";

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <p className="font-mono-x text-[10px] tracking-[0.18em] uppercase text-ink-faint">
        {minutes} min read · {sectionCount} sections · {study.meta[0]?.value}
        <span className="ml-3 hidden items-center gap-1.5 md:inline-flex">
          <kbd className="kbd-chip !h-[18px] !min-w-[18px] !text-[9px]">←</kbd>
          <kbd className="kbd-chip !h-[18px] !min-w-[18px] !text-[9px]">→</kbd>
          <span className="tracking-[0.14em]">to switch case</span>
        </span>
      </p>
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="sr-only">Share this case study</span>
        <button type="button" onClick={copyLink} className={btn} aria-label="Copy link to this case study">
          {copied ? <Check className="size-3.5 text-leaf" /> : <Link2 className="size-3.5" />}
          {copied ? "Copied" : "Copy Link"}
        </button>
        <button type="button" onClick={() => shareTo("linkedin")} className={btn} aria-label="Share on LinkedIn">
          <Linkedin className="size-3.5" />
          <span className="hidden sm:inline">LinkedIn</span>
        </button>
        <button type="button" onClick={() => shareTo("x")} className={btn} aria-label="Share on X">
          <Twitter className="size-3.5" />
          <span className="hidden sm:inline">Share on X</span>
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section view                                                        */
/* ------------------------------------------------------------------ */

function SectionView({ section, study, index }: { section: Section; study: CaseStudy; index: number }) {
  const t = study.theme;
  const dark = useIsDark();
  return (
    <section id={`cs-${section.id}`} data-cs-section={index} className="relative scroll-mt-24">
      <div aria-hidden="true" className="absolute -top-9 left-0 hidden h-px w-full bg-ink/10 md:block" />
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <p
          className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono-x text-[10px] md:text-[10.5px] font-bold tracking-[0.18em] uppercase"
          style={{ color: t.accent, borderColor: `${t.accent}55`, background: dark ? (t.accentSoftDark ?? t.accentSoft) : t.accentSoft }}
        >
          {section.label}
        </p>
        <h2 className="mt-5 max-w-[820px] font-display font-semibold leading-[1.08] tracking-[-0.01em] text-[clamp(1.55rem,3.2vw,2.35rem)] text-ink">
          {section.heading}
          {section.headingAccent && (
            <>
              {" "}
              <span style={{ color: t.accent }}>{section.headingAccent}</span>
            </>
          )}
        </h2>
      </motion.div>
      <div className="mt-8 flex flex-col gap-7">
        {section.blocks.map((block, i) => (
          <BlockRenderer key={i} block={block} theme={study.theme} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Closing                                                             */
/* ------------------------------------------------------------------ */

function Closing({ study }: { study: CaseStudy }) {
  const t = study.theme;
  return (
    <div data-print-flip className="relative overflow-hidden rounded-[22px] p-7 md:p-12" style={{ background: t.closingBg, color: t.heroText }}>
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-24 size-[320px] rounded-full opacity-20 blur-[90px] print:hidden" style={{ background: t.accent }} />
      <p className="font-mono-x text-[10px] md:text-[10.5px] font-bold tracking-[0.22em] uppercase" style={{ color: t.accent }}>
        {study.closing.label}
      </p>
      <h2 className="mt-4 max-w-[720px] font-display font-semibold text-[clamp(1.7rem,3.6vw,2.6rem)] leading-[1.06]">
        {study.closing.heading}
      </h2>
      {study.closing.text && <p className="mt-5 max-w-[680px] text-[14.5px] leading-[1.7] opacity-80">{study.closing.text}</p>}
      <div className="mt-9 grid gap-4 md:grid-cols-3">
        {study.closing.cards.map((c) => (
          <div key={c.title} data-print-stat className="rounded-[14px] border p-6" style={{ borderColor: "rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-2.5">
              <span className="size-2.5 rounded-[2px]" style={{ background: t.accent }} aria-hidden="true" />
              <p className="font-display font-semibold text-[15.5px]">{c.title}</p>
            </div>
            <p className="mt-2.5 text-[13px] leading-[1.6] opacity-75">{c.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-6" style={{ borderColor: "rgba(255,255,255,0.14)" }}>
        <p className="font-mono-x text-[9px] md:text-[10px] tracking-[0.3em] uppercase opacity-50">
          CASE · DATASET RECOVERY TERMINATED · VERIFICATION
        </p>
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 font-mono-x text-[11px] font-bold tracking-[0.14em] uppercase transition-opacity hover:opacity-80"
          style={{ color: t.accent }}
        >
          Return to all work
          <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Prev / next navigation                                              */
/* ------------------------------------------------------------------ */

function NavCard({
  href,
  eyebrow,
  title,
  subtitle,
  cover,
  coverAlt,
  direction,
  accent,
}: {
  href: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cover: string;
  coverAlt: string;
  direction: "prev" | "next";
  accent: string;
}) {
  return (
    <Link
      href={href}
      style={{ "--nav-accent": accent } as CSSProperties}
      className={`group flex w-full min-w-0 items-center gap-5 rounded-[18px] border border-ink/10 bg-card p-6 text-left shadow-[0_14px_36px_-24px_rgba(15,23,42,0.35)] transition-all hover:border-ink/25 hover:shadow-[0_20px_48px_-24px_rgba(15,23,42,0.45)] ${
        direction === "next" ? "sm:justify-between" : ""
      }`}
    >
      {direction === "prev" && (
        <span className="relative inline-flex size-11 md:size-12 shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink transition-all duration-300 group-hover:border-ink group-hover:text-ink">
          <ArrowLeft className="size-5" />
          <kbd className="kbd-chip absolute -bottom-2.5 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true">←</kbd>
        </span>
      )}
      <div className="flex min-w-0 items-center gap-4 sm:gap-5">
        <span className="relative hidden sm:block size-16 md:size-20 shrink-0 overflow-hidden rounded-[12px]">
          <Image src={cover} alt={coverAlt} fill sizes="80px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        </span>
        <div className="min-w-0">
          <p className="font-mono-x text-[10px] font-bold tracking-[0.18em] uppercase text-ink-faint">{eyebrow}</p>
          <p className="mt-1.5 font-display font-semibold text-[18px] md:text-[21px] text-ink truncate transition-colors duration-300 group-hover:text-(color:--nav-accent)">
            {title}
          </p>
          <p className="mt-0.5 text-[13px] text-ink-soft truncate">{subtitle}</p>
        </div>
      </div>
      {direction === "next" && (
        <span
          className="relative inline-flex size-11 md:size-12 shrink-0 items-center justify-center rounded-full bg-night text-white transition-all duration-300 group-hover:rotate-0"
          style={{ background: accent }}
        >
          <ArrowRight className="size-5" />
          <kbd className="kbd-chip absolute -bottom-2.5 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true">→</kbd>
        </span>
      )}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Main page view                                                      */
/* ------------------------------------------------------------------ */

export function CaseStudyPageView({
  study,
  next,
  prev,
}: {
  study: CaseStudy;
  next: CaseStudy;
  prev: CaseStudy | null;
}) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const reading = useReadingPosition("case", study.id);

  const minutes = useMemo(() => estimateReadingMinutes(study), [study]);

  /* Keyboard navigation: ← previous case study, → next case study */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }
      /* don't hijack arrows while the image lightbox is open */
      if (document.querySelector('[role="dialog"]')) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        router.push(`/work/${next.id}`);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        router.push(prev ? `/work/${prev.id}` : "/work");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, next, prev]);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      const sections = document.querySelectorAll<HTMLElement>("[data-cs-section]");
      let active = 0;
      sections.forEach((s, i) => {
        if (s.getBoundingClientRect().top <= 180) active = i;
      });
      setActiveSection(active);
      setShowTop(window.scrollY > 700);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    raf = requestAnimationFrame(measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const goToSection = (id: string) => {
    document.getElementById(`cs-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream print-case">
      <a
        href="#case-top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-night focus:px-5 focus:py-2.5 focus:font-mono-x focus:text-[11px] focus:tracking-[0.14em] focus:text-white focus:uppercase"
      >
        Skip to case study content
      </a>

      {/* reading progress */}
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left print:hidden"
        style={{ background: study.theme.accent, transform: `scaleX(${progress})`, transition: "transform 90ms linear" }}
      />

      <ChromeBar study={study} next={next} />

      <main id="case-top" className="flex-1">
        <div className="relative container-portfolio pb-20 pt-8 md:pt-12">
          {/* side scroll-spy */}
          <nav aria-label="Case study sections" className="absolute right-6 lg:right-10 top-40 bottom-24 z-20 hidden xl:block w-[210px] print:hidden">
            <div className="sticky top-24">
              <p className="mb-3 font-mono-x text-[9px] tracking-[0.26em] uppercase text-ink-faint">On this page</p>
              <ul className="max-h-[52vh] space-y-0.5 overflow-y-auto scrollbar-thin pr-1">
                {study.sections.map((s, i) => (
                  <li key={s.id}>
                    <button
                      onClick={() => goToSection(s.id)}
                      className={`flex w-full items-baseline gap-2 rounded-lg px-3 py-1.5 text-left transition-colors ${
                        activeSection === i ? "bg-ink/5" : "hover:bg-ink/5"
                      }`}
                    >
                      <span
                        className="font-mono-x text-[10px] font-bold tracking-wide"
                        style={{ color: activeSection === i ? study.theme.accent : "#8F949E" }}
                      >
                        {s.label.split("·")[0].trim()}
                      </span>
                      <span className={`truncate text-[11px] leading-snug ${activeSection === i ? "text-ink font-medium" : "text-ink-faint"}`}>
                        {s.label.split("·").slice(1).join("·").trim()}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t border-ink/10 pt-3.5">
                <p className="font-mono-x text-[10px] font-bold tracking-[0.18em] uppercase text-ink">
                  {Math.round(progress * 100)}% <span className="text-ink-faint">read</span>
                </p>
                <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-ink/10">
                  <div className="h-full origin-left rounded-full" style={{ background: study.theme.accent, transform: `scaleX(${progress})`, transition: "transform 90ms linear" }} />
                </div>
                <p className="mt-2 font-mono-x text-[9px] tracking-[0.16em] uppercase text-ink-faint">
                  ~{Math.max(0, Math.ceil(minutes * (1 - progress)))} min left
                </p>
              </div>
            </div>
          </nav>

          {/* content column */}
          <div className="case-content mx-auto w-full max-w-[900px] xl:pr-[110px]">
            <CaseHero study={study} />

            {/* meta bar */}
            <motion.dl
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mt-5 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
            >
              {study.meta.map((m) => (
                <div key={m.label} className="rounded-[12px] border border-ink/10 bg-card px-4 py-3.5">
                  <dt className="font-mono-x text-[9px] tracking-[0.16em] uppercase text-ink-faint">{m.label}</dt>
                  <dd className="mt-1 text-[12.5px] font-semibold text-ink leading-snug">{m.value}</dd>
                </div>
              ))}
            </motion.dl>

            {/* share + reading meta */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-5 rounded-[14px] border border-ink/10 bg-card/60 px-5 py-4 print:hidden"
            >
              <ShareRow study={study} minutes={minutes} sectionCount={study.sections.length} />
            </motion.div>

            {/* sections */}
            <div className="mt-16 md:mt-20 flex flex-col gap-16 md:gap-24 pb-4">
              {study.sections.map((section, i) => (
                <SectionView key={section.id} section={section} study={study} index={i} />
              ))}
            </div>

            <div className="mt-6">
              <Closing study={study} />
            </div>

            {/* prev / next */}
            <nav aria-label="More case studies" className="mt-10 grid gap-5 sm:grid-cols-2 print:hidden">
              {prev ? (
                <NavCard
                  href={`/work/${prev.id}`}
                  eyebrow={`← Previous · ${prev.index}`}
                  title={prev.title}
                  subtitle={prev.subtitle}
                  cover={prev.cover}
                  coverAlt={prev.coverAlt}
                  direction="prev"
                  accent={prev.theme.accent}
                />
              ) : (
                <NavCard
                  href="/work"
                  eyebrow="All case studies"
                  title="Selected Work Index"
                  subtitle="Crafting experiences that drive real impact."
                  cover={study.cover}
                  coverAlt={study.coverAlt}
                  direction="prev"
                  accent="#E06A3B"
                />
              )}
              <NavCard
                href={`/work/${next.id}`}
                eyebrow={`Next case study · ${next.index}`}
                title={next.title}
                subtitle={next.subtitle}
                cover={next.cover}
                coverAlt={next.coverAlt}
                direction="next"
                accent={next.theme.accent}
              />
            </nav>

            <p className="mt-10 text-center font-mono-x text-[9.5px] tracking-[0.22em] uppercase text-ink-faint">
              © 2026 Divyanshu Singh — {study.title} Case File
            </p>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-ink/8">
        <div className="container-portfolio flex flex-wrap items-center justify-between gap-3 py-6">
          <p className="font-mono-x text-[9.5px] tracking-[0.22em] uppercase text-ink-faint">
            © 2026 Divyanshu Singh. All rights reserved.
          </p>
          <p className="hidden font-mono-x text-[9.5px] tracking-[0.22em] uppercase text-ink-faint sm:block">
            Built with all skills &amp; knowledge
          </p>
          <Link
            href="/"
            className="font-mono-x text-[9.5px] font-bold tracking-[0.22em] uppercase text-ink-soft transition-colors hover:text-terra"
          >
            ← Portfolio home
          </Link>
        </div>
      </footer>

      {/* back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="back-to-top"
            type="button"
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`fixed right-6 z-40 inline-flex size-12 items-center justify-center rounded-full bg-night text-white shadow-[0_16px_36px_-12px_rgba(15,23,42,0.55)] transition-all duration-300 hover:bg-terra focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra print:hidden ${
              reading.showBanner ? "bottom-[118px]" : "bottom-6"
            }`}
            aria-label="Back to top of case study"
          >
            <ArrowUp className="size-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Resume-reading banner (position memory) ── */}
      <AnimatePresence>
        {reading.showBanner && reading.spot && (
          <ResumeBanner
            pct={reading.spot.pct}
            kindLabel="case study"
            accent={study.theme.accent}
            onResume={reading.resume}
            onRestart={reading.restart}
            onDismiss={reading.dismiss}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
