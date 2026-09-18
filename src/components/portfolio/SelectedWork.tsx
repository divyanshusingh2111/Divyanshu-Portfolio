"use client";

import * as React from "react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight, X, Calendar, User, Clock, ChevronLeft, ChevronRight, BookOpen, Hash, Share2, Check, ArrowUp, Braces } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/portfolio/data";
import { toast } from "sonner";

const TOC_ITEMS = [
  { id: "challenge", label: "Challenge" },
  { id: "approach", label: "Approach" },
  { id: "outcomes", label: "Outcomes" },
];

const DEEP_LINK_PREFIX = "project=";

function estimateReadingMinutes(p: Project): number {
  const words =
    [p.summary, p.challenge, ...p.approach].join(" ").split(/\s+/).filter(Boolean).length;
  // ~220 wpm is a comfortable read for design case-study prose.
  return Math.max(1, Math.round(words / 220));
}

function buildProjectUrl(slug: string): string {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}${window.location.pathname}#${DEEP_LINK_PREFIX}${slug}`;
}

export default function SelectedWork() {
  const [active, setActive] = React.useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = React.useState<number>(-1);
  const [filter, setFilter] = React.useState<string>("All");
  const hydratedRef = React.useRef(false);

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

  const openProject = React.useCallback((p: Project, idx: number) => {
    setActive(p);
    setActiveIndex(idx);
  }, []);

  const goNext = React.useCallback(
    (dir: number) => {
      if (activeIndex < 0) return;
      const len = filtered.length;
      if (len === 0) return;
      const next = (activeIndex + dir + len) % len;
      setActive(filtered[next]);
      setActiveIndex(next);
    },
    [activeIndex, filtered]
  );

  // Deep-link: auto-open a project modal if the URL hash is #project=<slug>.
  React.useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash.startsWith(DEEP_LINK_PREFIX)) return;
      const slug = hash.slice(DEEP_LINK_PREFIX.length).toLowerCase();
      const idx = PROJECTS.findIndex((p) => p.slug === slug);
      if (idx >= 0) {
        // Reset filter so the project is visible and the prev/next cycles
        // through the full list.
        setFilter("All");
        openProject(PROJECTS[idx], idx);
      }
    };
    openFromHash();
    hydratedRef.current = true;
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [openProject]);

  // When a project opens, update the URL hash so it's shareable.
  React.useEffect(() => {
    if (!hydratedRef.current) return;
    const desired = active ? `${DEEP_LINK_PREFIX}${active.slug}` : "";
    const current = window.location.hash.replace(/^#/, "");
    if (current === desired) return;
    if (desired) {
      window.history.replaceState(null, "", `#${desired}`);
    } else if (current.startsWith(DEEP_LINK_PREFIX)) {
      // Clean the hash when the modal closes, without leaving a stray "#".
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, [active]);

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
            View all projects <span aria-hidden className="font-bold">→</span>
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
              <motion.button
                key={project.title}
                type="button"
                onClick={() => openProject(project, i)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12, scale: 0.97 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="card-lift group flex flex-col gap-4 rounded-2xl border border-line bg-surface p-4 shadow-sm text-left"
              >
                <div className={`relative aspect-[270/190] overflow-hidden rounded-xl border border-line ${project.thumbBg}`}>
                  { }
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
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal
        project={active}
        onClose={() => {
          setActive(null);
          setActiveIndex(-1);
        }}
        onPrev={() => goNext(-1)}
        onNext={() => goNext(1)}
        canNavigate={filtered.length > 1}
        onOpenProject={(p) => openProject(p, PROJECTS.findIndex((x) => x.slug === p.slug))}
      />
    </section>
  );
}

function ProjectModal({
  project,
  onClose,
  onPrev,
  onNext,
  canNavigate,
  onOpenProject,
}: {
  project: Project | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  canNavigate: boolean;
  onOpenProject: (p: Project) => void;
}) {
  React.useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && canNavigate) onPrev();
      else if (e.key === "ArrowRight" && canNavigate) onNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose, onPrev, onNext, canNavigate]);

  if (!project) return null;

  return (
    <ModalContent
      project={project}
      onClose={onClose}
      onPrev={onPrev}
      onNext={onNext}
      canNavigate={canNavigate}
      onOpenProject={onOpenProject}
    />
  );
}

function ModalContent({
  project,
  onClose,
  onPrev,
  onNext,
  canNavigate,
  onOpenProject,
}: {
  project: Project;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  canNavigate: boolean;
  onOpenProject: (p: Project) => void;
}) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [progressPct, setProgressPct] = React.useState(0);

  useMotionValueEvent(progress, "change", (v) => {
    setProgressPct(Math.round(Math.min(1, Math.max(0, v)) * 100));
  });

  // Reset scroll position when switching projects.
  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [project.slug]);

  const readingMin = React.useMemo(() => estimateReadingMinutes(project), [project]);
  const [shared, setShared] = React.useState(false);
  const shareTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch tag-matched related projects from the API so the order reflects
  // shared-tag relevance (rather than just original order).
  const [related, setRelated] = React.useState<
    Array<{ slug: string; title: string; subtitle: string; thumb: string; sharedTags: string[] }>
  >([]);

  React.useEffect(() => {
    let cancelled = false;
    fetch(`/api/projects/${project.slug}/related`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (cancelled || !d?.related) return;
        setRelated(
          d.related.map((r: { slug: string; title: string; subtitle: string; thumb: string; sharedTags: string[] }) => ({
            slug: r.slug,
            title: r.title,
            subtitle: r.subtitle,
            thumb: r.thumb,
            sharedTags: r.sharedTags,
          }))
        );
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [project.slug]);

  React.useEffect(() => {
    setShared(false);
  }, [project.slug]);

  React.useEffect(
    () => () => {
      if (shareTimer.current) clearTimeout(shareTimer.current);
    },
    []
  );

  const onShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = buildProjectUrl(project.slug);
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

  const [jsonCopied, setJsonCopied] = React.useState(false);
  const jsonTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    setJsonCopied(false);
  }, [project.slug]);

  React.useEffect(
    () => () => {
      if (jsonTimer.current) clearTimeout(jsonTimer.current);
    },
    []
  );

  const onCopyJson = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      // Fetch the canonical JSON from the API so it matches what crawlers
      // see (includes url, readingTimeMinutes, lastModified, etc.).
      const res = await fetch(`/api/projects/${project.slug}`, { cache: "no-store" });
      if (!res.ok) throw new Error("fetch failed");
      const data = await res.json();
      const text = JSON.stringify(data, null, 2);
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setJsonCopied(true);
      toast.success("Project JSON copied to clipboard");
      if (jsonTimer.current) clearTimeout(jsonTimer.current);
      jsonTimer.current = setTimeout(() => setJsonCopied(false), 1800);
    } catch {
      toast.error("Couldn't copy JSON");
    }
  };

  const onTocClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const container = scrollRef.current;
    const target = container?.querySelector(`#${id}`);
    if (container && target) {
      container.scrollTo({
        top: (target as HTMLElement).offsetTop - 16,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-t-3xl sm:rounded-3xl border border-line bg-bg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Reading progress bar at the very top of the modal */}
        <motion.div
          style={{ scaleX: progress }}
          className="absolute top-0 left-0 right-0 z-20 h-1 origin-left bg-accent"
          aria-hidden
        />
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-bg/95 px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold text-accent">{project.index}</span>
            <span className="font-mono text-[11px] text-muted">/ CASE STUDY</span>
            {progressPct > 0 && progressPct < 100 && (
              <span className="ml-1 hidden sm:flex items-center gap-1 reading-pill">
                {progressPct}%
              </span>
            )}
            {progressPct > 0 && progressPct < 100 && readingMin > 1 && (
              <span className="ml-0.5 hidden md:flex items-center gap-1 font-mono text-[9px] text-faint">
                <Clock className="size-2.5" />
                {Math.max(1, Math.ceil(readingMin * (1 - progressPct / 100)))} min left
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onShare}
              aria-label="Copy link to this case study"
              className="flex size-9 items-center justify-center rounded-full border border-line bg-surface hover:border-accent/40 hover:text-accent"
            >
              {shared ? <Check className="size-4 text-good" /> : <Share2 className="size-4" />}
            </button>
            <button
              type="button"
              onClick={onCopyJson}
              aria-label="Copy project JSON"
              title="Copy full case-study JSON (for developers)"
              className="flex size-9 items-center justify-center rounded-full border border-line bg-surface hover:border-accent/40 hover:text-accent"
            >
              {jsonCopied ? <Check className="size-4 text-good" /> : <Braces className="size-4" />}
            </button>
            {canNavigate && (
              <>
                <button
                  type="button"
                  onClick={onPrev}
                  aria-label="Previous project"
                  className="flex size-9 items-center justify-center rounded-full border border-line bg-surface hover:border-accent/40 hover:text-accent"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  aria-label="Next project"
                  className="flex size-9 items-center justify-center rounded-full border border-line bg-surface hover:border-accent/40 hover:text-accent"
                >
                  <ChevronRight className="size-4" />
                </button>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="flex size-9 items-center justify-center rounded-full border border-line bg-surface hover:bg-card"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="relative max-h-[calc(92vh-64px)] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_140px] gap-0">
          <div className="px-6 py-6 sm:px-8 sm:py-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-card px-2 py-0.5 font-mono text-[8.5px] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="text-3xl font-bold sm:text-4xl">{project.title}</h3>
            <p className="mt-2 text-base text-muted">{project.subtitle}</p>
            <p className="mt-4 max-w-[640px] text-sm leading-relaxed text-muted">{project.summary}</p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
              <Meta icon={<Calendar className="size-3.5" />} label="Year" value={project.year} />
              <Meta icon={<User className="size-3.5" />} label="Role" value={project.role} />
              <Meta icon={<Clock className="size-3.5" />} label="Duration" value={project.duration} />
              <Meta icon={<BookOpen className="size-3.5" />} label="Read" value={`${readingMin} min`} />
              <Meta label="Status" value="Shipped" />
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-line">
              { }
              <img src={project.thumb} alt={project.title} className="w-full object-cover" />
            </div>

            <div id="challenge" className="mt-8 scroll-mt-20">
              <p className="font-mono text-[10px] font-bold text-accent">● THE CHALLENGE</p>
              <p className="mt-3 max-w-[640px] leading-relaxed text-ink">{project.challenge}</p>
            </div>

            <div id="approach" className="mt-8 scroll-mt-20">
              <p className="font-mono text-[10px] font-bold text-accent">● THE APPROACH</p>
              <ol className="mt-3 flex flex-col gap-3">
                {project.approach.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-soft font-mono text-[9px] font-bold text-accent">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-muted">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div id="outcomes" className="mt-8 scroll-mt-20">
              <p className="font-mono text-[10px] font-bold text-accent">● OUTCOMES</p>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
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
            </div>

            <div className="mt-12">
              <p className="font-mono text-[10px] font-bold text-accent">● RELATED PROJECTS</p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {(related.length > 0
                  ? related
                  : PROJECTS.filter((p) => p.slug !== project.slug).map((p) => ({
                      slug: p.slug,
                      title: p.title,
                      subtitle: p.subtitle,
                      thumb: p.thumb,
                      sharedTags: [],
                    }))
                ).map((p) => {
                  const proj = PROJECTS.find((x) => x.slug === p.slug);
                  return (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => proj && onOpenProject(proj)}
                      className="card-lift group flex items-center gap-3 rounded-xl border border-line bg-surface p-3 text-left"
                    >
                      { }
                      <img
                        src={p.thumb}
                        alt={p.title}
                        className="size-12 shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">{p.title}</p>
                        <p className="truncate text-[10px] text-muted">{p.subtitle}</p>
                        {p.sharedTags.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {p.sharedTags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="rounded bg-accent-soft px-1 py-0.5 font-mono text-[7px] font-bold text-accent"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <ArrowUpRight className="ml-auto size-4 shrink-0 text-muted transition-colors group-hover:text-accent" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                onClick={() => {
                  onClose();
                  toast.success("Let's talk about a project like this one.");
                }}
                className="flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-xs font-bold text-white"
              >
                Start a similar project <span aria-hidden>→</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-xs font-bold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2 rounded-full border border-line bg-bg px-5 py-3 text-xs font-bold text-muted hover:text-ink"
              >
                <ArrowUp className="size-3.5" /> Back to top
              </button>
              <a
                href="#work"
                onClick={onClose}
                className="flex items-center gap-2 rounded-full border border-line bg-bg px-5 py-3 text-xs font-bold text-muted hover:text-ink"
              >
                <ArrowUpRight className="size-3.5" /> Back to all work
              </a>
            </div>

            {/* Last-updated + reading-time footer line */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4 font-mono text-[9px] text-faint">
              <span className="flex items-center gap-1.5">
                <Clock className="size-3" /> Last updated {project.year} · {readingMin} min read
              </span>
              <span className="flex items-center gap-1.5">
                <Hash className="size-3" /> {project.slug}
              </span>
            </div>
          </div>

          {/* Mini table of contents — sticky on large screens, hidden on small. */}
          <aside className="hidden lg:block border-l border-line bg-surface/40 px-5 py-8">
            <div className="sticky top-8">
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
        </div>
      </motion.div>
    </div>
  );
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
