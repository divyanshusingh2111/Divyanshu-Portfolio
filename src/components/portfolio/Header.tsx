"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/portfolio/data";
import ThemeToggle from "./ThemeToggle";

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace("#", ""));

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the nav link for the section currently in view.
  React.useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top that is intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Trigger when the section's top crosses ~30% from the viewport top,
        // accounting for the fixed header height.
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0,
      }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-10 border-b border-line bg-[rgba(249,247,243,0.9)] px-6 py-4 backdrop-blur-sm md:px-16 transition-shadow ${
        scrolled ? "shadow-[0_8px_24px_-18px_rgba(15,23,42,0.25)]" : ""
      }`}
    >
      <a href="#top" className="flex items-center gap-2 shrink-0">
        <span className="relative flex size-8 items-center justify-center rounded-full bg-accent-soft">
          <span className="absolute inset-0.5 rounded-full bg-[rgba(224,106,59,0.3)]" />
          <span className="relative font-sans text-[17px]">D</span>
        </span>
        <span className="flex flex-col leading-none">
          <span className="text-[13px]">Divyanshu Singh</span>
          <span className="font-mono text-[9px] text-muted">PORTFOLIO</span>
        </span>
      </a>

      <nav className="hidden gap-8 font-mono text-[11px] font-bold text-muted md:flex">
        {NAV_LINKS.map((link) => {
          const isActive = activeId === link.href.replace("#", "");
          return (
            <a
              key={link.label}
              href={link.href}
              aria-current={isActive ? "true" : undefined}
              className={`nav-underline transition-colors hover:text-ink ${
                isActive ? "text-accent" : ""
              }`}
            >
              {link.label}
            </a>
          );
        })}
      </nav>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <a
          href="#contact"
          className="btn-magnetic hidden sm:flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-bold text-white"
        >
          Let&apos;s Connect <span aria-hidden>→</span>
        </a>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex size-9 items-center justify-center rounded-full border border-line bg-surface"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="absolute left-0 right-0 top-full mx-3 rounded-2xl border border-line bg-surface p-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.href.replace("#", "");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex items-center justify-between rounded-lg px-3 py-2.5 font-mono text-xs font-bold transition-colors hover:bg-bg hover:text-ink ${
                    isActive ? "bg-accent-soft text-accent" : "text-muted"
                  }`}
                >
                  {link.label}
                  {isActive && <span className="size-1.5 rounded-full bg-accent" />}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-xs font-bold text-white"
            >
              Let&apos;s Connect <span aria-hidden>→</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
