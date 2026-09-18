"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  User,
  BookOpen,
  Hash,
  Share2,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { PROJECTS, type Project } from "@/lib/portfolio/data";

const TOC_ITEMS = [
  { id: "challenge", label: "Challenge" },
  { id: "approach", label: "Approach" },
  { id: "outcomes", label: "Outcomes" },
];

function estimateReadingMinutes(p: Project): number {
  const words = [p.summary, p.challenge, ...p.approach]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function Meta({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-surface p-3">
      <p className="flex items-center gap-1.5 font-mono text-[8.5px] text-muted">
        {icon}
        {label}
      </p>
      <p className="mt-1 text-xs font-bold text-ink">{value}</p>
    </div>
  );
}

export default function CaseStudyPage({ project }: { project: Project }) {
  const readingMin = React.useMemo(() => estimateReadingMinutes(project), [project]);
  const [shared, setShared] = React.useState(false);
  const shareTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(
    () => () => {
      if (shareTimer.current) clearTimeout(shareTimer.current);
    },
    []
  );

  const onShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: project.title, url });
        return;
      }
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setShared(true);
      toast.success("Case-study link copied");
      if (shareTimer.current) clearTimeout(shareTimer.current);
      shareTimer.current = setTimeout(() => setShared(false), 1800);
    } catch {
      toast.error("Couldn't copy link");
    }
  };

  const idx = PROJECTS.findIndex((p) => p.slug === project.slug);
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const others = PROJECTS.filter((p) => p.slug !== project.slug);

  const onTocClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="mx-auto w-full max-w-[1100px] px-6 pt-28 pb-20 md:px-10">
      {/* Back + share */}
      <div className="mb-10 flex items-center justify-between gap-4">
        <Link
          href="/#work"
          className="flex items-center gap-2 font-mono text-[11px] font-bold text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-3.5" /> ALL WORK
        </Link>
        <button
          type="button"
          onClick={onShare}
          aria-label="Share this case study"
          className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 font-mono text-[10px] font-bold text-muted transition-colors hover:border-accent/40 hover:text-accent"
        >
          {shared ? <Check className="size-3.5 text-good" /> : <Share2 className="size-3.5" />}
          {shared ? "COPIED" : "SHARE"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_160px] gap-0">
        <article className="min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="flex items-center gap-2 font-mono text-xs font-bold">
              <span className="text-accent">● CASE STUDY</span>
              <span className="text-muted">{project.index}</span>
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-card px-2 py-0.5 font-mono text-[9px] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="mt-4 text-4xl leading-tight font-bold sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-2 text-lg text-muted">{project.subtitle}</p>
            <p className="mt-4 max-w-[680px] leading-relaxed text-muted">{project.summary}</p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
              <Meta icon={<Calendar className="size-3.5" />} label="Year" value={project.year} />
              <Meta icon={<User className="size-3.5" />} label="Role" value={project.role} />
              <Meta
                icon={<Clock className="size-3.5" />}
                label="Duration"
                value={project.duration}
              />
              <Meta
                icon={<BookOpen className="size-3.5" />}
                label="Read"
                value={`${readingMin} min`}
              />
              <Meta label="Status" value="Shipped" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="mt-10 overflow-hidden rounded-2xl border border-line"
          >
            <img
              src={project.thumb}
              alt={project.title}
              className="w-full object-cover"
            />
          </motion.div>

          <motion.section
            id="challenge"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-12 scroll-mt-28"
          >
            <p className="font-mono text-[10px] font-bold text-accent">● THE CHALLENGE</p>
            <p className="mt-3 max-w-[680px] text-lg leading-relaxed text-ink">
              {project.challenge}
            </p>
          </motion.section>

          <motion.section
            id="approach"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-12 scroll-mt-28"
          >
            <p className="font-mono text-[10px] font-bold text-accent">● THE APPROACH</p>
            <ol className="mt-4 flex max-w-[680px] flex-col gap-4">
              {project.approach.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft font-mono text-[10px] font-bold text-accent">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed text-muted">{step}</span>
                </li>
              ))}
            </ol>
          </motion.section>

          <motion.section
            id="outcomes"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-12 scroll-mt-28"
          >
            <p className="font-mono text-[10px] font-bold text-accent">● OUTCOMES</p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {project.outcomes.map((o) => (
                <div
                  key={o.label}
                  className="rounded-xl border border-line bg-surface p-4 text-center"
                >
                  <p className="text-2xl font-bold text-accent">{o.value}</p>
                  <p className="mt-1 font-mono text-[8.5px] text-muted">{o.label}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-16"
          >
            <p className="font-mono text-[10px] font-bold text-accent">● RELATED PROJECTS</p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  className="card-lift group flex items-center gap-3 rounded-xl border border-line bg-surface p-3 text-left"
                >
                  <img
                    src={p.thumb}
                    alt={p.title}
                    className="size-12 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{p.title}</p>
                    <p className="truncate text-[10px] text-muted">{p.subtitle}</p>
                  </div>
                  <ArrowUpRight className="ml-auto size-4 shrink-0 text-muted transition-colors group-hover:text-accent" />
                </Link>
              ))}
            </div>
          </motion.section>

          <div className="mt-12 flex flex-wrap gap-3 border-t border-line pt-8">
            <Link
              href="/#contact"
              className="flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-transform hover:scale-[1.02]"
            >
              Start a similar project <span aria-hidden>→</span>
            </Link>
            <Link
              href="/#work"
              className="flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 text-sm font-bold"
            >
              <ArrowLeft className="size-4" /> Back to all work
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-2 font-mono text-[9px] text-faint">
            <span className="flex items-center gap-1.5">
              <Clock className="size-3" /> Last updated {project.year} · {readingMin} min read
            </span>
            <span className="flex items-center gap-1.5">
              <Hash className="size-3" /> {project.slug}
            </span>
          </div>
        </article>

        {/* Sticky TOC on large screens */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 border-l border-line bg-surface/40 px-5 py-8">
            <p className="font-mono text-[9px] font-bold text-faint">● CONTENTS</p>
            <nav className="mt-3 flex flex-col gap-1.5">
              {TOC_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => onTocClick(e, item.id)}
                  className="group flex items-center gap-2 font-mono text-[10px] text-muted hover:text-accent"
                >
                  <Hash className="size-3 text-faint group-hover:text-accent" />
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-6 rounded-lg border border-line bg-bg p-3">
              <p className="font-mono text-[8.5px] text-faint">READ TIME</p>
              <p className="mt-1 text-base font-bold text-accent">{readingMin} min</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Prev / next band */}
      <nav className="mt-16 grid grid-cols-1 gap-3 border-t border-line pt-8 sm:grid-cols-2">
        <Link
          href={`/work/${prev.slug}`}
          className="card-lift group flex items-center gap-4 rounded-xl border border-line bg-surface p-4 text-left"
        >
          <ArrowLeft className="size-4 shrink-0 text-muted transition-colors group-hover:text-accent" />
          <div className="min-w-0">
            <p className="font-mono text-[9px] text-faint">PREVIOUS</p>
            <p className="truncate text-sm font-bold">{prev.title}</p>
          </div>
        </Link>
        <Link
          href={`/work/${next.slug}`}
          className="card-lift group flex items-center justify-end gap-4 rounded-xl border border-line bg-surface p-4 text-right"
        >
          <div className="min-w-0">
            <p className="font-mono text-[9px] text-faint">NEXT</p>
            <p className="truncate text-sm font-bold">{next.title}</p>
          </div>
          <ArrowRight className="size-4 shrink-0 text-muted transition-colors group-hover:text-accent" />
        </Link>
      </nav>
    </main>
  );
}
