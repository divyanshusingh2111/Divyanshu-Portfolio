"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { NAV_LINKS, PROJECTS, SKILLS, CONTACT_EMAIL, CONTACT_LINKEDIN, CONTACT_BEHANCE } from "@/lib/portfolio/data";

type Item = {
  label: string;
  hint: string;
  href: string;
  group: string;
};

const ITEMS: Item[] = [
  ...NAV_LINKS.map((l) => ({ label: l.label, hint: "Jump to section", href: l.href, group: "Navigate" })),
  { label: "Top", hint: "Back to hero", href: "#top", group: "Navigate" },
  { label: "FAQ", hint: "Frequently asked", href: "#faq", group: "Navigate" },
  ...PROJECTS.map((p) => ({
    label: p.title,
    hint: p.subtitle,
    href: "#work",
    group: "Projects",
  })),
  ...SKILLS.map((s) => ({
    label: s.title,
    hint: s.badge,
    href: "#about",
    group: "Skills",
  })),
  { label: "Email", hint: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, group: "Connect" },
  { label: "LinkedIn", hint: "Open profile", href: CONTACT_LINKEDIN, group: "Connect" },
  { label: "Behance", hint: "Open portfolio", href: CONTACT_BEHANCE, group: "Connect" },
];

export default function CommandPalette() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    if (href.startsWith("http") || href.startsWith("mailto")) {
      window.open(href, "_blank", "noreferrer");
    } else {
      // Small timeout so the dialog closes first.
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }, 60);
    }
  };

  const groups = React.useMemo(() => {
    const map = new Map<string, Item[]>();
    ITEMS.forEach((it) => {
      if (!map.has(it.group)) map.set(it.group, []);
      map.get(it.group)!.push(it);
    });
    return Array.from(map.entries());
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden p-0 max-w-[600px] top-[20vh] translate-y-0">
        <DialogTitle className="sr-only">Quick navigation</DialogTitle>
        <DialogDescription className="sr-only">
          Search portfolio sections, projects, skills, and contact links.
        </DialogDescription>
        <CommandPrimitive className="flex flex-col">
          <div className="flex items-center gap-2 border-b border-line px-4">
            <Search className="size-4 text-muted" />
            <CommandPrimitive.Input
              placeholder="Search sections, projects, skills…"
              className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-faint"
            />
            <kbd className="hidden sm:inline-flex items-center rounded border border-line bg-bg px-1.5 py-0.5 font-mono text-[9px] text-muted">
              ESC
            </kbd>
          </div>
          <CommandPrimitive.List className="max-h-[360px] overflow-y-auto p-2">
            <CommandPrimitive.Empty className="py-10 text-center font-mono text-xs text-muted">
              No matches found.
            </CommandPrimitive.Empty>
            {groups.map(([group, items]) => (
              <CommandPrimitive.Group
                key={group}
                heading={group}
                className="text-faint font-mono text-[9px] font-bold [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2"
              >
                {items.map((it) => (
                  <CommandPrimitive.Item
                    key={`${group}-${it.label}`}
                    value={`${it.label} ${it.hint} ${group}`}
                    onSelect={() => go(it.href)}
                    className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-2.5 aria-selected:bg-bg aria-selected:text-ink"
                  >
                    <span className="flex flex-col">
                      <span className="text-sm font-bold">{it.label}</span>
                      <span className="font-mono text-[10px] text-muted">{it.hint}</span>
                    </span>
                    <span className="font-mono text-[10px] text-accent">↵</span>
                  </CommandPrimitive.Item>
                ))}
              </CommandPrimitive.Group>
            ))}
          </CommandPrimitive.List>
        </CommandPrimitive>
      </DialogContent>
    </Dialog>
  );
}
