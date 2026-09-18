"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";

/**
 * Three-state theme toggle: light → dark → system → light.
 * Preserves the default light design (the portfolio ships with
 * defaultTheme="light"). The toggle is opt-in — a small icon button in
 * the header. Uses next-themes' class strategy + the dark-mode tokens
 * already defined in globals.css.
 */
export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  // Avoid hydration mismatch — render a placeholder until mounted.
  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="flex size-9 items-center justify-center rounded-full border border-line bg-surface"
      >
        <Sun className="size-4" />
      </button>
    );
  }

  const current = theme ?? "system";
  const isDark = resolvedTheme === "dark";

  const cycle = () => {
    if (current === "light") setTheme("dark");
    else if (current === "dark") setTheme("system");
    else setTheme("light");
  };

  const label =
    current === "system"
      ? `Theme: system (currently ${resolvedTheme})`
      : `Theme: ${current}`;

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={label}
      title={label}
      className="flex size-9 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-accent/40 hover:text-accent"
    >
      {current === "system" ? (
        <Monitor className="size-4" />
      ) : isDark ? (
        <Moon className="size-4" />
      ) : (
        <Sun className="size-4" />
      )}
    </button>
  );
}
