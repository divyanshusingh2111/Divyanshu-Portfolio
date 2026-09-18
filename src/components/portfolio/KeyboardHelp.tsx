"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Keyboard, X } from "lucide-react";
import { useTheme } from "next-themes";

type Shortcut = {
  keys: string[];
  label: string;
  group: string;
};

const SHORTCUTS: Shortcut[] = [
  { keys: ["⌘", "K"], label: "Open quick navigation", group: "Navigation" },
  { keys: ["?"], label: "Toggle this help overlay", group: "Navigation" },
  { keys: ["Shift", "/"], label: "Open quick navigation (alias)", group: "Navigation" },
  { keys: ["Esc"], label: "Close any dialog / modal", group: "Navigation" },
  { keys: ["T"], label: "Cycle theme (light → dark → system)", group: "Theme" },
  { keys: ["←", "→"], label: "Switch project in case-study modal", group: "Sections" },
  { keys: ["G", "W"], label: "Jump to Work", group: "Jump to" },
  { keys: ["G", "A"], label: "Jump to About", group: "Jump to" },
  { keys: ["G", "P"], label: "Jump to Process", group: "Jump to" },
  { keys: ["G", "C"], label: "Jump to Contact", group: "Jump to" },
  { keys: ["G", "F"], label: "Jump to FAQ", group: "Jump to" },
];

const JUMP_MAP: Record<string, string> = {
  w: "#work",
  a: "#about",
  p: "#process",
  c: "#contact",
  f: "#faq",
};

export default function KeyboardHelp() {
  const [open, setOpen] = React.useState(false);
  const gPressed = React.useRef(false);
  const gTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      // Toggle help with "?" (Shift+/ on most layouts)
      if (e.key === "?" && !isTyping) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "Escape") {
        setOpen(false);
        gPressed.current = false;
        return;
      }

      // "G then X" jump shortcuts — only when not typing and no modifier.
      if (isTyping || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();

      // "T" cycles theme: light → dark → system → light.
      if (k === "t" && !gPressed.current) {
        e.preventDefault();
        const current = theme ?? "light";
        const next = current === "light" ? "dark" : current === "dark" ? "system" : "light";
        setTheme(next);
        return;
      }

      if (k === "g") {
        gPressed.current = true;
        if (gTimer.current) clearTimeout(gTimer.current);
        gTimer.current = setTimeout(() => {
          gPressed.current = false;
        }, 900);
        return;
      }
      if (gPressed.current && JUMP_MAP[k]) {
        e.preventDefault();
        const el = document.querySelector(JUMP_MAP[k]);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
        gPressed.current = false;
        if (gTimer.current) clearTimeout(gTimer.current);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (gTimer.current) clearTimeout(gTimer.current);
    };
  }, [theme, setTheme]);

  const groups = React.useMemo(() => {
    const map = new Map<string, Shortcut[]>();
    SHORTCUTS.forEach((s) => {
      if (!map.has(s.group)) map.set(s.group, []);
      map.get(s.group)!.push(s);
    });
    return Array.from(map.entries());
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Show keyboard shortcuts"
        className="hidden md:flex fixed bottom-6 left-6 z-40 size-9 items-center justify-center rounded-full border border-line bg-surface/90 text-muted shadow-sm backdrop-blur hover:border-accent/40 hover:text-accent"
      >
        <Keyboard className="size-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-line bg-bg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-line bg-surface px-6 py-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Keyboard className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold">Keyboard shortcuts</p>
                    <p className="font-mono text-[9px] text-muted">
                      Press <kbd className="rounded bg-bg px-1">?</kbd> anytime to toggle
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close shortcuts"
                  className="flex size-8 items-center justify-center rounded-full border border-line bg-bg hover:bg-card"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-6">
                {groups.map(([group, items]) => (
                  <div key={group} className="mb-5 last:mb-0">
                    <p className="mb-3 font-mono text-[9px] font-bold text-faint">
                      ● {group.toUpperCase()}
                    </p>
                    <ul className="flex flex-col gap-2">
                      {items.map((s, i) => (
                        <li
                          key={`${group}-${i}`}
                          className="flex items-center justify-between gap-3"
                        >
                          <span className="text-sm text-muted">{s.label}</span>
                          <span className="flex items-center gap-1">
                            {s.keys.map((k, j) => (
                              <kbd
                                key={j}
                                className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-[10px] font-bold text-ink shadow-sm"
                              >
                                {k}
                              </kbd>
                            ))}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
