"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/portfolio/data";

export default function SelectedWork() {
  const [filter, setFilter] = React.useState<string>("All");

  const tags = React.useMemo(() => {
    const set = new Set<string>();
    PROJECTS.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const filtered = React.useMemo(
    () =>
      filter === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.tags.includes(filter)),
    [filter]
  );

  return (
    <section id="work" className="border-t border-line px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-4 font-mono text-xs font-bold text-accent">● SELECTED WORK</p>
            <h2 className="text-4xl leading-tight font-bold sm:text-5xl">
              Crafting experiences that drive{" "}
              <span className="font-hand font-bold text-accent">real impact.</span>
            </h2>
          </div>
          <a href="#contact" className="flex items-center gap-2 text-sm font-semibold hover:text-accent transition-colors">
            Start a project <span aria-hidden className="font-bold">→</span>
          </a>
        </div>

        {/* Tag filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 font-mono text-[10px] font-bold text-faint">FILTER:</span>
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFilter(t)}
              aria-pressed={filter === t}
              className={`rounded-full border px-3 py-1.5 font-mono text-[10px] font-bold transition-all ${
                filter === t
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-line bg-surface text-muted hover:border-accent/40 hover:text-ink"
              }`}
            >
              {t}
            </button>
          ))}
          <span className="ml-auto font-mono text-[10px] text-faint">
            {filtered.length} / {PROJECTS.length}
          </span>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12, scale: 0.97 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  href={`/work/${project.slug}`}
                  className="card-lift group flex h-full flex-col gap-4 rounded-2xl border border-line bg-surface p-4 shadow-sm text-left"
                >
                  <div className={`relative aspect-[270/190] overflow-hidden rounded-xl border border-line ${project.thumbBg}`}>
                    <img
                      src={project.thumb}
                      alt={project.title}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-surface/90 text-ink opacity-0 transition-opacity group-hover:opacity-100">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-mono text-[11px] font-bold text-muted">{project.index}</p>
                    <p className="text-lg font-bold">{project.title}</p>
                    <p className="text-xs text-muted">{project.subtitle}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 border-t border-line pt-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded px-2 py-0.5 font-mono text-[8.5px] transition-colors ${
                          filter !== "All" && filter === tag
                            ? "bg-accent-soft text-accent"
                            : "bg-card text-muted"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
