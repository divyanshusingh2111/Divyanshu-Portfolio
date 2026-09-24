"use client";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  ArrowUpRight,
  BookOpen,
  Copy,
  Download,
  GitBranch,
  GraduationCap,
  Grid2x2,
  History,
  Home,
  Keyboard,
  LayoutGrid,
  Link2,
  Mail,
  Moon,
  NotebookPen,
  Send,
  Sun,
  User,
} from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useCommandState } from "cmdk";
import { usePaletteStore } from "@/lib/palette-store";
import { CASE_STUDY_LIST } from "@/lib/case-studies";
import { NOTES } from "@/lib/notes";
import { getRecents, pushRecent, type RecentEntry } from "@/lib/palette-recents";
import { toast } from "@/hooks/use-toast";

const EMAIL = "hello@divyanshu.design";
const RESUME_HREF = "/design-assets/divyanshu-singh-resume.pdf";
const LINKEDIN_URL = "https://www.linkedin.com/";
const BEHANCE_URL = "https://www.behance.net/";

/**
 * Predictable word-substring filter (replaces cmdk's loose default fuzzy
 * matcher, where e.g. "dark" would rank "Branding" items above "dark theme").
 * Every search term must appear as a substring; tiers — leading position
 * (primary keyword) > word-boundary hit > plain substring — so e.g. "dark"
 * ranks the theme action (value starts with "dark") above a note whose tags
 * merely contain "dark mode".
 */
function paletteFilter(value: string, search: string): number {
  const v = value.toLowerCase();
  const terms = search.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return 1;
  let score = 0;
  for (const term of terms) {
    if (!v.includes(term)) return 0;
    if (v.startsWith(term)) score += 4;
    else if (v.includes(` ${term}`)) score += 2;
    else score += 1;
  }
  return score;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Reveal-the-match chip: when a search term hits the item's search value
 * (e.g. a tag or category keyword) but none of its visible text, show the
 * term so the item's presence never looks unexplained.
 */
function MatchChip({ value, visible }: { value: string; visible: string }) {
  const search = useCommandState((s) => s.search);
  const terms = useMemo(
    () => search.toLowerCase().split(/\s+/).filter((t) => t.length > 1),
    [search]
  );
  if (terms.length === 0) return null;
  const v = value.toLowerCase();
  const vis = visible.toLowerCase();
  const hidden = terms.filter((t) => v.includes(t) && !vis.includes(t)).slice(0, 2);
  if (hidden.length === 0) return null;
  return (
    <span className="inline-flex shrink-0 items-center rounded-full bg-terra/10 px-2 py-0.5 font-mono-x text-[9px] font-bold tracking-[0.06em] lowercase text-terra-deep dark:bg-terra/15 dark:text-terra-deep">
      ↳ {hidden.join(" · ")}
    </span>
  );
}

/**
 * Live search-term highlighting for palette item labels — wraps every
 * occurrence of a query term in a terracotta <mark>. Reads the current
 * query straight from cmdk's store, so items restyle as you type.
 */
function HighlightText({ text, className }: { text: string; className?: string }) {
  const search = useCommandState((s) => s.search);
  const terms = useMemo(
    () => search.toLowerCase().split(/\s+/).filter(Boolean),
    [search]
  );
  if (terms.length === 0) return <span className={className}>{text}</span>;
  const pattern = terms.map(escapeRegExp).sort((a, b) => b.length - a.length).join("|");
  const parts = text.split(new RegExp(`(${pattern})`, "gi"));
  return (
    <span className={className}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark
            key={i}
            className="rounded-[4px] bg-terra/15 px-[3px] -mx-[3px] text-terra-deep dark:bg-terra/25 dark:text-terra"
          >
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </span>
  );
}

const SECTIONS: { label: string; hint: string; hash: string; icon: React.ElementType }[] = [
  { label: "Selected Work", hint: "Case studies", hash: "#work", icon: LayoutGrid },
  { label: "About Me", hint: "Bio & philosophy", hash: "#about", icon: User },
  { label: "Process Ledger", hint: "Work timeline & experience", hash: "#process", icon: GitBranch },
  { label: "Education", hint: "Academic foundations", hash: "#resume", icon: GraduationCap },
  { label: "Connect With Me", hint: "Contact & direct message", hash: "#connect", icon: Send },
];

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable;
}

/**
 * Recently-visited group — mounted fresh every time the dialog opens
 * (Radix unmounts content on close), so the localStorage read in the
 * lazy state initializer always reflects the latest history.
 */
function RecentGroup({ onGo }: { onGo: (href: string) => void }) {
  const [recents] = useState<RecentEntry[]>(() => getRecents());
  if (recents.length === 0) return null;
  return (
    <CommandGroup heading="Recent">
      {recents.map((r) => (
        <CommandItem
          key={r.href}
          value={`${r.label} ${r.sub ?? ""} recent history visited ${r.kind}`}
          onSelect={() => onGo(r.href)}
          className="py-2.5 rounded-xl data-[selected=true]:bg-cream-deep dark:data-[selected=true]:bg-night data-[selected=true]:text-ink"
        >
          <History className="size-4 text-ink-faint" />
          <span className="min-w-0 flex-1">
            <HighlightText text={r.label} className="block truncate font-medium text-[14px] text-ink" />
            {r.sub && <HighlightText text={r.sub} className="block truncate text-[12px] text-ink-faint" />}
          </span>
          <CommandShortcut>
            <span className="font-mono-x text-[9px] tracking-[0.12em] uppercase text-ink-faint/70">
              {r.kind}
            </span>
          </CommandShortcut>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}

export function CommandPalette() {
  const open = usePaletteStore((s) => s.open);
  const setOpen = usePaletteStore((s) => s.setOpen);
  const toggle = usePaletteStore((s) => s.toggle);
  const setHelpOpen = usePaletteStore((s) => s.setHelpOpen);
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const onHome = pathname === "/";

  /* ── Global shortcuts: ⌘K / Ctrl+K toggles, "/" opens (when not typing) ── */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggle();
      } else if (e.key === "/" && !isTypingTarget(e.target)) {
        // don't steal "/" from the case-page lightbox or other dialogs
        const dialogOpen = document.querySelector('[role="dialog"][data-state="open"]');
        if (!dialogOpen) {
          e.preventDefault();
          setOpen(true);
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggle, setOpen]);

  /* ── Helpers ── */
  const go = useCallback(
    (href: string) => {
      setOpen(false);
      if (href.startsWith("#") && onHome) {
        document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
        return;
      }
      window.setTimeout(() => {
        window.location.assign(href.startsWith("#") ? `/${href}` : href);
      }, 40);
    },
    [onHome, setOpen]
  );

  /* navigate + remember in the palette's recent-items memory */
  const goRecorded = useCallback(
    (href: string, label: string, sub: string, kind: "case" | "note") => {
      pushRecent({ href, label, sub, kind });
      go(href);
    },
    [go]
  );

  const openShortcuts = useCallback(() => {
    setOpen(false);
    window.setTimeout(() => setHelpOpen(true), 80);
  }, [setOpen, setHelpOpen]);

  const toggleTheme = useCallback(() => {
    setOpen(false);
    const root = document.documentElement;
    root.classList.add("theme-fade");
    window.setTimeout(() => root.classList.remove("theme-fade"), 480);
    setTheme(isDark ? "light" : "dark");
  }, [isDark, setTheme, setOpen]);

  const copyEmail = useCallback(async () => {
    setOpen(false);
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast({ title: `Email copied — ${EMAIL}` });
    } catch {
      toast({ title: `Could not copy — it's ${EMAIL}`, variant: "destructive" });
    }
  }, [setOpen]);

  const copyPageLink = useCallback(async () => {
    setOpen(false);
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: "Page link copied to clipboard" });
    } catch {
      toast({ title: "Could not copy link", variant: "destructive" });
    }
  }, [setOpen]);

  const downloadResume = useCallback(() => {
    setOpen(false);
    const a = document.createElement("a");
    a.href = RESUME_HREF;
    a.download = "divyanshu-singh-resume.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast({ title: "Resume download started" });
  }, [setOpen]);

  const openExternal = useCallback(
    (url: string) => {
      setOpen(false);
      window.open(url, "_blank", "noopener,noreferrer");
    },
    [setOpen]
  );

  const mailto = useCallback(() => {
    setOpen(false);
    window.location.assign(`mailto:${EMAIL}`);
  }, [setOpen]);

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Command palette"
      description="Search case studies, sections and quick actions"
      showCloseButton={false}
      className="top-[14%] translate-y-0 max-w-[600px] w-[calc(100%-2.5rem)] sm:w-full gap-0 rounded-[20px] border border-ink/10 dark:border-white/10 bg-card dark:bg-card p-0 overflow-hidden shadow-[0_40px_90px_-30px_rgba(15,23,42,0.45)]"
    >
      <Command
        className="[&_[cmdk-group-heading]]:font-mono-x [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:tracking-[0.22em] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-terra-deep [&_[cmdk-group-heading]]:pt-3"
        shouldFilter
        filter={paletteFilter}
      >
        <CommandInput
          placeholder="Search case studies, sections, actions…"
          className="font-mono-x text-[13px] tracking-[0.02em]"
        />
        <CommandList className="max-h-[min(52vh,420px)] py-1.5">
          <CommandEmpty className="py-8 text-center">
            <span className="font-mono-x text-[12px] text-ink-faint tracking-[0.08em]">
              [ no matches — try “klima”, “resume”, “notes” or “theme” ]
            </span>
          </CommandEmpty>

          {/* ── Recently visited ── */}
          <RecentGroup onGo={go} />

          {/* ── Quick actions (lead group — cmdk never reorders groups across
              scores, so the most-searched commands live nearest the top) ── */}
          <CommandGroup heading="Quick Actions">
            <CommandItem
              value="dark light theme toggle switch mode night studio"
              onSelect={toggleTheme}
              className="py-2.5 rounded-xl data-[selected=true]:bg-cream-deep dark:data-[selected=true]:bg-night data-[selected=true]:text-ink"
            >
              {isDark ? <Sun className="size-4 text-ink-soft" /> : <Moon className="size-4 text-ink-soft" />}
              <HighlightText
                text={`Switch to ${isDark ? "light" : "dark"} theme`}
                className="font-medium text-[14px]"
              />
              <CommandShortcut>{isDark ? "Light" : "Night"} Studio</CommandShortcut>
            </CommandItem>
            <CommandItem
              value="keyboard shortcuts help keys cheatsheet sheet"
              onSelect={openShortcuts}
              className="py-2.5 rounded-xl data-[selected=true]:bg-cream-deep dark:data-[selected=true]:bg-night data-[selected=true]:text-ink"
            >
              <Keyboard className="size-4 text-ink-soft" />
              <HighlightText text="Keyboard shortcuts" className="font-medium text-[14px]" />
              <CommandShortcut>?</CommandShortcut>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator className="my-1" />

          {/* ── Case studies ── */}
          <CommandGroup heading="Case Studies">
            {CASE_STUDY_LIST.map((study) => (
              <CommandItem
                key={study.id}
                value={`${study.index} ${study.title} ${study.subtitle} ${study.tags.join(" ")} case study`}
                onSelect={() => goRecorded(`/work/${study.id}`, study.title, study.subtitle, "case")}
                className="py-2.5 rounded-xl data-[selected=true]:bg-cream-deep dark:data-[selected=true]:bg-night data-[selected=true]:text-ink"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex size-6 shrink-0 items-center justify-center rounded-md bg-night text-white font-mono-x text-[10px] font-bold dark:bg-terra"
                >
                  {study.index}
                </span>
                <span className="min-w-0 flex-1">
                  <HighlightText
                    text={study.title}
                    className="block font-display font-medium text-[14px] text-ink truncate"
                  />
                  <span className="flex min-w-0 items-center gap-1.5">
                    <HighlightText
                      text={study.subtitle}
                      className="block text-[12px] text-ink-soft truncate"
                    />
                    <MatchChip
                      value={`${study.index} ${study.title} ${study.subtitle} ${study.tags.join(" ")} case study`}
                      visible={`${study.title} ${study.subtitle}`}
                    />
                  </span>
                </span>
                <CommandShortcut>
                  <ArrowUpRight className="size-4 text-ink-faint" />
                </CommandShortcut>
              </CommandItem>
            ))}
            <CommandItem
              value="all work index projects overview"
              onSelect={() => goRecorded("/work", "All Work", "Project index", "case")}
              className="py-2.5 rounded-xl data-[selected=true]:bg-cream-deep dark:data-[selected=true]:bg-night data-[selected=true]:text-ink"
            >
              <Grid2x2 className="size-4 text-ink-soft" />
              <HighlightText text="All Work" className="font-medium text-[14px]" />
              <span className="text-[12px] text-ink-faint">— project index</span>
              <CommandShortcut>
                <ArrowUpRight className="size-4 text-ink-faint" />
              </CommandShortcut>
            </CommandItem>
          </CommandGroup>

          {/* ── Studio Notes journal ── */}
          <CommandGroup heading="Notes">
            {NOTES.map((n) => (
              <CommandItem
                key={n.slug}
                value={`${n.title} ${n.category} ${n.tags.join(" ")} note studio essay journal`}
                onSelect={() =>
                  goRecorded(`/notes/${n.slug}`, n.title, `${n.category} · ${n.readingMinutes} min read`, "note")
                }
                className="py-2.5 rounded-xl data-[selected=true]:bg-cream-deep dark:data-[selected=true]:bg-night data-[selected=true]:text-ink"
              >
                <NotebookPen className="size-4 text-ink-soft" />
                <span className="min-w-0 flex-1">
                  <HighlightText
                    text={n.title}
                    className="block truncate font-display font-medium text-[14px] text-ink"
                  />
                  <span className="flex min-w-0 items-center gap-1.5">
                    <HighlightText
                      text={`${n.category} · ${n.readingMinutes} min read`}
                      className="block truncate text-[12px] text-ink-soft"
                    />
                    <MatchChip
                      value={`${n.title} ${n.category} ${n.tags.join(" ")} note studio essay journal`}
                      visible={`${n.title} ${n.category} · ${n.readingMinutes} min read`}
                    />
                  </span>
                </span>
                <CommandShortcut>
                  <ArrowUpRight className="size-4 text-ink-faint" />
                </CommandShortcut>
              </CommandItem>
            ))}
            <CommandItem
              value="all notes index journal studio writing essays blog"
              onSelect={() => goRecorded("/notes", "All Notes", "Studio Notes journal", "note")}
              className="py-2.5 rounded-xl data-[selected=true]:bg-cream-deep dark:data-[selected=true]:bg-night data-[selected=true]:text-ink"
            >
              <BookOpen className="size-4 text-ink-soft" />
              <HighlightText text="All Notes" className="font-medium text-[14px]" />
              <span className="text-[12px] text-ink-faint">— journal index</span>
              <CommandShortcut>
                <ArrowUpRight className="size-4 text-ink-faint" />
              </CommandShortcut>
            </CommandItem>
          </CommandGroup>

          {/* ── Portfolio sections ── */}
          <CommandGroup heading="Sections">
            {SECTIONS.map((s) => (
              <CommandItem
                key={s.hash}
                value={`${s.label} ${s.hint} section`}
                onSelect={() => go(s.hash)}
                className="py-2.5 rounded-xl data-[selected=true]:bg-cream-deep dark:data-[selected=true]:bg-night data-[selected=true]:text-ink"
              >
                <s.icon className="size-4 text-ink-soft" />
                <HighlightText text={s.label} className="font-medium text-[14px]" />
                <HighlightText
                  text={s.hint}
                  className="hidden sm:inline text-[12px] text-ink-faint truncate"
                />
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator className="my-1" />

          {/* ── More actions ── */}
          <CommandGroup heading="More Actions">
            <CommandItem
              value="copy email address clipboard contact hello"
              onSelect={copyEmail}
              className="py-2.5 rounded-xl data-[selected=true]:bg-cream-deep dark:data-[selected=true]:bg-night data-[selected=true]:text-ink"
            >
              <Copy className="size-4 text-ink-soft" />
              <HighlightText text="Copy email address" className="font-medium text-[14px]" />
              <CommandShortcut className="max-w-[140px] truncate">{EMAIL}</CommandShortcut>
            </CommandItem>
            <CommandItem
              value="email me send message mail contact"
              onSelect={mailto}
              className="py-2.5 rounded-xl data-[selected=true]:bg-cream-deep dark:data-[selected=true]:bg-night data-[selected=true]:text-ink"
            >
              <Mail className="size-4 text-ink-soft" />
              <HighlightText text="Email me" className="font-medium text-[14px]" />
            </CommandItem>
            <CommandItem
              value="download resume pdf cv portfolio"
              onSelect={downloadResume}
              className="py-2.5 rounded-xl data-[selected=true]:bg-cream-deep dark:data-[selected=true]:bg-night data-[selected=true]:text-ink"
            >
              <Download className="size-4 text-ink-soft" />
              <HighlightText text="Download resume" className="font-medium text-[14px]" />
              <CommandShortcut>PDF</CommandShortcut>
            </CommandItem>
            <CommandItem
              value="copy link to current page share url"
              onSelect={copyPageLink}
              className="py-2.5 rounded-xl data-[selected=true]:bg-cream-deep dark:data-[selected=true]:bg-night data-[selected=true]:text-ink"
            >
              <Link2 className="size-4 text-ink-soft" />
              <HighlightText text="Copy link to this page" className="font-medium text-[14px]" />
            </CommandItem>
            <CommandItem
              value="linkedin profile social network"
              onSelect={() => openExternal(LINKEDIN_URL)}
              className="py-2.5 rounded-xl data-[selected=true]:bg-cream-deep dark:data-[selected=true]:bg-night data-[selected=true]:text-ink"
            >
              <span className="inline-flex size-4 items-center justify-center text-[11px] font-bold text-ink-soft" aria-hidden="true">
                in
              </span>
              <HighlightText text="Open LinkedIn" className="font-medium text-[14px]" />
              <CommandShortcut>
                <ArrowUpRight className="size-4 text-ink-faint" />
              </CommandShortcut>
            </CommandItem>
            <CommandItem
              value="behance portfolio design gallery social"
              onSelect={() => openExternal(BEHANCE_URL)}
              className="py-2.5 rounded-xl data-[selected=true]:bg-cream-deep dark:data-[selected=true]:bg-night data-[selected=true]:text-ink"
            >
              <span className="inline-flex size-4 items-center justify-center text-[11px] font-bold text-ink-soft" aria-hidden="true">
                Bē
              </span>
              <HighlightText text="Open Behance" className="font-medium text-[14px]" />
              <CommandShortcut>
                <ArrowUpRight className="size-4 text-ink-faint" />
              </CommandShortcut>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator className="my-1" />

          <CommandItem
            value="home portfolio top divyanshu singh"
            onSelect={() => go("/")}
            className="py-2.5 rounded-xl data-[selected=true]:bg-cream-deep dark:data-[selected=true]:bg-night data-[selected=true]:text-ink"
          >
            <Home className="size-4 text-ink-soft" />
            <HighlightText text="Portfolio home" className="font-medium text-[14px]" />
            <CommandShortcut>/</CommandShortcut>
          </CommandItem>
        </CommandList>

        {/* Footer hint strip */}
        <div
          aria-hidden="true"
          className="flex items-center justify-between gap-3 border-t border-ink/8 dark:border-white/10 px-4 py-2.5"
        >
          <p className="font-mono-x text-[9.5px] tracking-[0.16em] uppercase text-ink-faint">
            ↑↓ navigate · ↵ select · esc close
            <span className="hidden sm:inline"> · ? shortcuts</span>
          </p>
          <p className="font-mono-x text-[9.5px] tracking-[0.16em] uppercase text-terra/80">
            ⌘K
          </p>
        </div>
      </Command>
    </CommandDialog>
  );
}
