"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { SectionLabel } from "./section-label";
import { Reveal } from "./reveal";

const TIMELINE: { role: string; company: string | null; description: string; period: string; current: boolean }[] = [
  {
    role: "Lead UX Designer",
    company: "KlimaShift",
    description:
      "Leading UX strategy and product design for AI-powered energy intelligence systems, operational dashboards, and enterprise workflows.",
    period: "2023 Sep - Present",
    current: true,
  },
  {
    role: "UI/UX Designer",
    company: "Quantumhill IT Service & Consultancy",
    description:
      "Designed enterprise software interfaces and usability-focused operational workflows for consulting and IT services clients.",
    period: "2023 Apr - 2023 Sep",
    current: false,
  },
  {
    role: "UI/UX Designer",
    company: "Learniphi Technology Pvt. Ltd.",
    description:
      "Designed gamified educational systems and enterprise learning experiences focused on engagement and completion optimization.",
    period: "2022 Sep - 2023 Mar",
    current: false,
  },
  {
    role: "Freelance Product & Brand Designer",
    company: null,
    description:
      "Designing digital commerce systems, branding ecosystems, and scalable visual experiences for startups and growing businesses.",
    period: "2020 Aug - Present",
    current: false,
  },
];

const FOCUS_FILTERS = ["AR/AI Experiences", "Brand Identity"];

export function Timeline() {
  const listRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  /* Scroll-linked spine fill — the terracotta line grows as the visitor reads
     through the ledger. Reduced-motion keeps the static spine. */
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 78%", "end 45%"],
  });
  const spineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const spineHeight = useTransform(spineScale, (v) => `${Math.min(Math.max(v, 0), 1) * 100}%`);

  return (
    <section id="process" className="relative py-20 md:py-28">
      <div className="container-portfolio">
        {/* Header row: label+heading left, filters right */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14 md:mb-16">
          <Reveal>
            <SectionLabel text="Process Ledger" className="mb-5" />
            <h2 className="font-display font-semibold text-ink text-[clamp(2rem,3.8vw,3.2rem)] leading-[1.06] tracking-[-0.01em]">
              Work Timeline &amp; Experience
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-wrap gap-2.5">
              {FOCUS_FILTERS.map((filter) => (
                <span
                  key={filter}
                  className="inline-flex items-center gap-2 rounded-xl bg-card border border-border/70 px-4 py-2.5 text-[13px] font-medium text-ink shadow-[0_2px_12px_-6px_rgba(30,32,34,0.1)]"
                >
                  <span aria-hidden="true" className="inline-block size-[11px] rounded-[2.5px] bg-night" />
                  {filter}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Timeline entries */}
        <div className="relative ml-2 md:ml-3" ref={listRef}>
          {/* Spine — base track */}
          <div
            aria-hidden="true"
            className="absolute left-[7px] top-[10px] bottom-[10px] w-px bg-ink/15"
          />
          {/* Spine — scroll-linked terra fill */}
          <motion.div
            aria-hidden="true"
            style={reduceMotion ? undefined : { height: spineHeight }}
            className="absolute left-[6.5px] top-[10px] w-[2px] rounded-full bg-gradient-to-b from-terra via-terra to-terra/70 shadow-[0_0_10px_rgba(224,106,59,0.45)]"
          />

          <ol className="space-y-12 md:space-y-14">
            {TIMELINE.map((entry, i) => (
              <motion.li
                key={`${entry.role}-${entry.company ?? "freelance"}`}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative pl-8 md:pl-12"
              >
                {/* Node */}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-[7px] size-[15px] rounded-full border-[3px] ${
                    entry.current ? "bg-terra border-terra/25" : "bg-card border-ink/25"
                  }`}
                >
                  {entry.current && (
                    <span className="absolute inset-0 rounded-full bg-terra/40 animate-ping" />
                  )}
                </span>

                <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-3">
                  <div className="min-w-0">
                    <h3 className="font-display font-semibold text-ink text-[19px] md:text-[22px] leading-snug">
                      {entry.role}
                      {entry.company && (
                        <>
                          {" "}
                          <span className="font-normal text-ink-soft">@ {entry.company}</span>
                        </>
                      )}
                    </h3>
                    <p className="mt-2.5 text-[14px] md:text-[15px] leading-[1.6] text-ink-soft max-w-[640px]">
                      {entry.description}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 inline-flex items-center rounded-full px-4 py-1.5 text-[11.5px] md:text-xs font-medium whitespace-nowrap ${
                      entry.current
                        ? "bg-terra-soft text-terra-deep border border-terra/25"
                        : "bg-card text-ink-soft border border-border"
                    }`}
                  >
                    {entry.period}
                  </span>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
