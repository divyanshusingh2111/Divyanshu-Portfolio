"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePaletteStore } from "@/lib/palette-store";

interface ShortcutRow {
  keys: string[];
  note?: string;
  desc: string;
}

const GROUPS: { title: string; hint: string; items: ShortcutRow[] }[] = [
  {
    title: "Everywhere",
    hint: "Works on any page",
    items: [
      { keys: ["⌘", "K"], note: "or Ctrl K", desc: "Open or close the command palette" },
      { keys: ["/"], desc: "Quick-open the command palette" },
      { keys: ["?"], desc: "Toggle this shortcut sheet" },
      { keys: ["Esc"], desc: "Close any overlay — palette, lightbox, dialogs" },
    ],
  },
  {
    title: "Reading",
    hint: "On case studies & notes",
    items: [
      { keys: ["→"], desc: "Next case study, or newer note" },
      { keys: ["←"], desc: "Previous case study, or older note" },
      { keys: ["↑", "↓", "↵"], desc: "Navigate and select inside the palette" },
    ],
  },
];

/**
 * Global keyboard-shortcut cheat sheet — opens with "?" anywhere
 * (also from the command palette's Actions group).
 */
export function ShortcutHelp() {
  const helpOpen = usePaletteStore((s) => s.helpOpen);
  const setHelpOpen = usePaletteStore((s) => s.setHelpOpen);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "?") return;
      const t = e.target;
      if (
        t instanceof HTMLElement &&
        (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)
      ) {
        return;
      }
      if (helpOpen) {
        setHelpOpen(false);
        return;
      }
      /* don't collide with the palette, lightbox or other dialogs
         (a closing cmdk root lingers briefly — only block on open dialogs) */
      const overlayOpen = document.querySelector('[role="dialog"][data-state="open"]');
      if (overlayOpen) return;
      e.preventDefault();
      setHelpOpen(true);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [helpOpen, setHelpOpen]);

  return (
    <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
      <DialogContent className="top-[14%] translate-y-0 max-w-[540px] w-[calc(100%-2.5rem)] sm:w-full gap-0 overflow-hidden rounded-[22px] border border-ink/10 bg-card p-0 shadow-[0_40px_90px_-30px_rgba(15,23,42,0.45)] dark:border-white/10">
        <DialogHeader className="border-b border-ink/8 px-6 pb-4 pt-6 dark:border-white/10">
          <p className="flex items-center gap-2.5 font-mono-x text-[10.5px] font-bold tracking-[0.22em] uppercase text-terra-deep">
            <span aria-hidden="true" className="inline-block size-[7px] rounded-full bg-terra" />
            Shortcuts
          </p>
          <DialogTitle className="mt-2.5 text-left font-display text-[21px] md:text-[23px] font-semibold leading-[1.15] tracking-[-0.01em] text-ink">
            Keyboard-first, on purpose.
          </DialogTitle>
          <DialogDescription className="text-left text-[13px] leading-[1.55] text-ink-soft">
            The whole site is reachable without a mouse — search, themes, reading, everything.
          </DialogDescription>
        </DialogHeader>

        <div className="scrollbar-thin max-h-[52vh] overflow-y-auto px-6 py-5">
          {GROUPS.map((group) => (
            <section key={group.title} className="mb-5 last:mb-0">
              <p className="flex items-baseline justify-between gap-3">
                <span className="font-mono-x text-[10px] font-bold tracking-[0.2em] uppercase text-ink">
                  {group.title}
                </span>
                <span className="font-mono-x text-[9px] tracking-[0.12em] uppercase text-ink-faint">
                  {group.hint}
                </span>
              </p>
              <ul className="mt-2 divide-y divide-ink/6 dark:divide-white/8">
                {group.items.map((item) => (
                  <li
                    key={item.desc}
                    className="flex items-center justify-between gap-4 py-2.5"
                  >
                    <p className="text-[13.5px] leading-[1.5] text-ink-soft">{item.desc}</p>
                    <span className="flex shrink-0 items-center gap-1.5">
                      {item.keys.map((k) => (
                        <kbd key={k} className="kbd-chip">
                          {k}
                        </kbd>
                      ))}
                      {item.note && (
                        <span className="font-mono-x text-[9.5px] tracking-[0.08em] uppercase text-ink-faint">
                          {item.note}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-ink/8 px-6 py-3.5 dark:border-white/10">
          <p className="font-mono-x text-[9.5px] tracking-[0.16em] uppercase text-ink-faint">
            Press ? anytime to reopen
          </p>
          <p className="font-mono-x text-[9.5px] tracking-[0.16em] uppercase text-terra-deep">
            Esc closes
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
