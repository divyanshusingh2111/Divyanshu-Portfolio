"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionLabel } from "../section-label";
import { Reveal } from "../reveal";
import { ReadBadge } from "../read-badge";
import { ThemeToggle } from "../theme-toggle";
import { CASE_STUDY_LIST } from "@/lib/case-studies";
import { onSpotChange, spotKey, getSpotsSnapshot, getServerSpotsSnapshot } from "@/lib/reading-position";

export function WorkIndexView() {
  /* ── Reading-position badges (external store, hydration-safe) ── */
  const spots = useSyncExternalStore(onSpotChange, getSpotsSnapshot, getServerSpotsSnapshot);

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {/* top bar */}
      <header className="sticky top-0 z-40 border-b border-ink/8 bg-cream/92 backdrop-blur-xl">
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
            <SectionLabel text="Selected Work" className="mb-5" />
            <h1 className="font-display font-semibold text-ink text-[clamp(2.1rem,4vw,3.3rem)] leading-[1.06] tracking-[-0.01em]">
              Crafting experiences
              <br />
              that drive{" "}
              <span className="font-script font-semibold text-terra text-[clamp(2.3rem,4.4vw,3.7rem)]">
                real impact.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-[620px] text-[14.5px] md:text-[15.5px] leading-[1.7] text-ink-soft">
              Three deep case studies — from an AI energy-intelligence platform backed by Schneider
              Electric &amp; Shell, to inclusive UPI payment research, to a ₹64L nutraceutical brand
              build. Every project links to a full, dedicated case page.
            </p>
          </Reveal>

          {/* cards */}
          <div className="mt-14 grid gap-10 md:gap-8 lg:grid-cols-3">
            {CASE_STUDY_LIST.map((project, i) => (
              <motion.div
                key={project.index}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <Link
                  href={`/work/${project.id}`}
                  className="group relative block w-full rounded-[22px] outline-none focus-visible:ring-2 focus-visible:ring-terra/60 focus-visible:ring-offset-4 ring-offset-cream"
                  aria-label={`Open ${project.title} case study page — ${project.subtitle}`}
                >
                  {/* Card image */}
                  <div className="relative overflow-hidden rounded-[20px] aspect-[4/3.1] bg-cream-deep transition-shadow duration-500 group-hover:shadow-[0_24px_48px_-18px_rgba(30,32,34,0.25)]">
                    <Image
                      src={project.cover}
                      alt={project.coverAlt}
                      fill
                      priority={i === 0}
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 396px"
                      className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.21,0.47,0.32,0.98)] group-hover:scale-[1.045]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-0 transition-opacity duration-500 bg-gradient-to-t from-night/10 via-transparent to-white/10 pointer-events-none group-hover:opacity-100"
                    />
                    {/* index badge */}
                    <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-card/90 px-3 py-1 font-mono-x text-[10px] font-bold tracking-[0.16em] uppercase text-ink backdrop-blur-sm">
                      {project.index}
                    </span>
                    {/* open pill */}
                    <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-night/80 text-white pl-3 pr-2.5 py-1.5 font-mono-x text-[9.5px] font-bold tracking-[0.14em] uppercase backdrop-blur-sm opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0">
                      Open case study
                      <ArrowUpRight className="size-3" />
                    </span>
                  </div>

                  {/* Card meta */}
                  <div className="pt-5 pb-2 px-0.5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="font-display font-semibold text-ink text-[19px] md:text-[21px] leading-tight transition-colors group-hover:text-terra">
                          {project.title}
                        </h2>
                        <p className="mt-1.5 text-[13.5px] text-ink-soft">{project.subtitle}</p>
                      </div>
                      <span className="mt-1 inline-flex items-center justify-center size-9 rounded-full border border-ink/10 text-ink opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:border-terra group-hover:text-terra shrink-0">
                        <ArrowRight className="size-4" />
                      </span>
                    </div>

                    {/* stat preview */}
                    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ink/8 pt-4">
                      {project.hero.stats.slice(0, 2).map((s) => (
                        <p key={s.label} className="flex items-baseline gap-2">
                          <span className="font-display font-semibold text-[16px] text-ink">{s.value}</span>
                          <span className="font-mono-x text-[9px] tracking-[0.14em] uppercase text-ink-faint">{s.label}</span>
                        </p>
                      ))}
                      <span className="ml-auto hidden items-center font-mono-x text-[9px] tracking-[0.14em] uppercase text-ink-faint sm:flex">
                        {project.sections.length} sections
                      </span>
                    </div>

                    {/* reading-position badge */}
                    <ReadBadge className="mt-3" spot={spots[spotKey("case", project.id)]} />

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-card border border-border/70 px-3 py-1 text-[11px] font-medium tracking-[0.02em] text-ink-soft"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* bottom cta */}
          <Reveal delay={0.1}>
            <div className="mt-16 md:mt-20 flex flex-wrap items-center justify-between gap-5 rounded-[18px] border border-ink/10 bg-card px-6 py-6 md:px-8">
              <p className="max-w-[480px] font-display font-semibold text-[17px] md:text-[19px] text-ink leading-snug">
                Curious how these systems were designed?
                <span className="text-ink-soft"> The full portfolio has the process behind them.</span>
              </p>
              <Link
                href="/#work"
                className="group inline-flex items-center gap-2 rounded-full bg-night px-5 py-3 font-mono-x text-[11px] font-bold tracking-[0.14em] uppercase text-white transition-colors hover:bg-terra"
              >
                Explore full portfolio
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
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
        </div>
      </footer>
    </div>
  );
}
