"use client";

import { useRef } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

/**
 * Sun/Moon theme toggle.
 * - `resolvedTheme` is undefined during SSR + first client render, so both
 *   passes render the light (Sun) variant — no hydration mismatch.
 * - Adds a short-lived `theme-fade` class on <html> so the switch cross-fades
 *   colors instead of snapping (see globals.css).
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isDark = resolvedTheme === "dark";

  const toggle = () => {
    // orchestrate the cross-fade
    const root = document.documentElement;
    root.classList.add("theme-fade");
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    fadeTimer.current = setTimeout(() => root.classList.remove("theme-fade"), 480);
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      onKeyDown={(e) => e.stopPropagation()}
      className={`relative inline-flex size-11 items-center justify-center overflow-hidden rounded-full border border-ink/12 bg-card/70 text-ink transition-all duration-300 hover:border-terra/50 hover:text-terra hover:shadow-[0_8px_20px_-10px_rgba(224,106,59,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra ${className}`}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!isDark ? (
          <motion.span
            key="sun"
            initial={{ y: 14, opacity: 0, rotate: -40 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -14, opacity: 0, rotate: 40 }}
            transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="inline-flex"
          >
            <Sun className="size-[18px]" strokeWidth={2.2} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ y: 14, opacity: 0, rotate: 40 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -14, opacity: 0, rotate: -40 }}
            transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="inline-flex"
          >
            <Moon className="size-[18px]" strokeWidth={2.2} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
