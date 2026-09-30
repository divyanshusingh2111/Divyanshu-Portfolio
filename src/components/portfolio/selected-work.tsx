"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionLabel } from "./section-label";
import { Reveal } from "./reveal";
import { CASE_STUDY_LIST, type CaseStudy } from "@/lib/case-studies";
import { useTilt } from "@/hooks/use-tilt";

function WorkCard({ project, i }: { project: CaseStudy; i: number }) {
  const { rotateX, rotateY, onMouseMove, onMouseLeave, ref } = useTilt(4);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: i * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{ rotateX, rotateY, transformPerspective: 950 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ y: -6 }}
      className="will-change-transform [transform-style:preserve-3d]"
    >
      <Link
        href={`/work/${project.id}`}
        className="group relative block w-full text-left rounded-[22px] outline-none focus-visible:ring-2 focus-visible:ring-terra/60 focus-visible:ring-offset-4 ring-offset-cream"
        aria-label={`Open ${project.title} case study page — ${project.subtitle}`}
      >
        {/* Card image */}
        <div className="relative overflow-hidden rounded-[20px] aspect-[4/3.1] bg-cream-deep transition-shadow duration-500 group-hover:shadow-[0_24px_48px_-18px_rgba(30,32,34,0.25)]">
          <Image
            src={project.cover}
            alt={project.coverAlt}
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 396px"
            className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.21,0.47,0.32,0.98)] group-hover:scale-[1.045]"
          />
          {/* hover sheen */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-night/10 via-transparent to-white/10 pointer-events-none"
          />
          {/* case study pill */}
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-night/80 text-white pl-3 pr-2.5 py-1.5 font-mono-x text-[9.5px] font-bold tracking-[0.14em] uppercase backdrop-blur-sm opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0">
            Open case study
            <ArrowUpRight className="size-3" />
          </span>
        </div>

        {/* Card meta */}
        <div className="pt-5 pb-2 px-0.5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono-x text-[11px] text-ink-faint tracking-[0.2em] mb-2.5">
                {project.index}
              </p>
              <h3 className="font-display font-semibold text-ink text-[19px] md:text-[21px] leading-tight transition-colors group-hover:text-terra">
                {project.title}
              </h3>
              <p className="mt-1.5 text-[13.5px] text-ink-soft">{project.subtitle}</p>
            </div>
            <span className="mt-8 inline-flex items-center justify-center size-9 rounded-full border border-ink/10 text-ink opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:border-terra group-hover:text-terra shrink-0">
              <ArrowRight className="size-4" />
            </span>
          </div>
          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-card border border-border/70 px-3 py-1 text-[11px] font-medium tracking-[0.02em] text-ink-soft transition-colors group-hover:border-terra/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function SelectedWork() {
  return (
    <section id="work" className="relative py-20 md:py-28">
      <div className="container-portfolio">
        {/* Section header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-16">
          <Reveal>
            <SectionLabel text="Selected Work" className="mb-5" />
            <h2 className="font-display font-semibold text-ink text-[clamp(2.1rem,4vw,3.3rem)] leading-[1.06] tracking-[-0.01em]">
              Crafting experiences
              <br />
              that drive{" "}
              <span className="font-script font-semibold text-terra text-[clamp(2.3rem,4.4vw,3.7rem)]">
                real impact.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-[14px] font-medium text-ink transition-colors hover:text-terra pb-1.5"
            >
              View all projects
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {CASE_STUDY_LIST.map((project, i) => (
            <WorkCard key={project.index} project={project} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
