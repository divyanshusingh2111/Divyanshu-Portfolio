"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Menu, Search, X } from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { usePaletteStore } from "@/lib/palette-store";

const NAV_ITEMS = [
  { label: "Work", href: "#work" },
  { label: "Notes", href: "/notes" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Resume", href: "#resume" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const setPaletteOpen = usePaletteStore((s) => s.setOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* scroll spy for active nav item */
  useEffect(() => {
    const ids = NAV_ITEMS.map((i) => i.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-38% 0px -52% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/85 backdrop-blur-xl shadow-[0_1px_0_rgba(30,32,34,0.06),0_8px_32px_-16px_rgba(30,32,34,0.12)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-portfolio flex items-center justify-between h-[72px] md:h-[84px]">
        {/* Logo + name */}
        <a href="#top" className="flex items-center gap-3 group" aria-label="Divyanshu Singh — home">
          <span className="relative block w-[42px] h-[36px] md:w-[54px] md:h-[46px] shrink-0 transition-transform duration-300 group-hover:rotate-[-4deg] group-hover:scale-105">
            <Image
              src="/design-assets/logo-monogram.png"
              alt="Divyanshu Singh monogram"
              fill
              sizes="54px"
              className="object-contain object-left"
              priority
            />
          </span>
          <span className="hidden sm:flex flex-col leading-none gap-[5px]">
            <span className="font-display font-semibold text-[13px] md:text-[14px] tracking-[0.14em] text-ink">
              DIVYANSHU <span className="text-terra">SINGH</span>
            </span>
            <span className="font-mono-x text-[8.5px] md:text-[9px] tracking-[0.28em] text-ink-faint uppercase">
              UX · PRODUCT · DESIGN FOR IMPACT
            </span>
          </span>
        </a>

        {/* Desktop nav (lg+ — the 5 items + toggles need ≥1024px) */}
        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`relative px-3.5 py-2 text-[14px] font-medium transition-colors group ${
                active === item.href ? "text-ink" : "text-ink-soft hover:text-ink"
              }`}
            >
              {item.label}
              <span
                className={`absolute left-3.5 right-3.5 -bottom-0.5 h-[2px] bg-terra rounded-full origin-left transition-transform duration-300 ${
                  active === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </a>
          ))}
          <ThemeToggle className="ml-2.5 shrink-0" />
          {/* Command palette trigger — compact icon at md, full chip from lg */}
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="ml-1.5 inline-flex items-center gap-1.5 rounded-full border border-ink/12 bg-card/70 text-ink h-11 pl-3.5 pr-3 transition-all duration-300 hover:border-terra/50 hover:text-terra hover:shadow-[0_8px_20px_-10px_rgba(224,106,59,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra"
            aria-label="Open command palette (⌘K) — search case studies, notes, sections and actions"
            aria-keyshortcuts="Meta+K Control+K"
          >
            <Search className="size-[15px]" strokeWidth={2.2} />
            <span className="font-mono-x text-[10.5px] font-bold tracking-[0.08em]">⌘K</span>
          </button>
          <a
            href="#connect"
            className="ml-2 inline-flex items-center gap-2 rounded-full bg-night text-white text-[13.5px] font-medium pl-5 pr-4 h-11 transition-all duration-300 hover:bg-terra hover:shadow-[0_10px_28px_-10px_rgba(224,106,59,0.55)] group"
          >
            Let&apos;s Connect
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </nav>

        {/* Compact actions (below lg): connect pill at md+, theme, palette, menu */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <a
            href="#connect"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-night text-white text-[13.5px] font-medium pl-5 pr-4 h-11 transition-all duration-300 hover:bg-terra hover:shadow-[0_10px_28px_-10px_rgba(224,106,59,0.55)]"
          >
            Let&apos;s Connect
            <ArrowRight className="size-4" />
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="inline-flex items-center justify-center size-11 rounded-full border border-border bg-card/70 text-ink"
            aria-label="Open command palette — search and quick actions"
          >
            <Search className="size-5" />
          </button>
          <button
            className="inline-flex items-center justify-center size-11 rounded-full border border-border bg-card/70 text-ink"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Compact nav (below lg) */}
      <motion.div
        initial={false}
        animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden bg-cream/95 backdrop-blur-xl border-t border-border/60 lg:hidden"
      >
        <nav className="container-portfolio py-4 flex flex-col" aria-label="Mobile">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between py-3.5 text-[15px] font-medium border-b border-border/50 last:border-0 ${
                active === item.href ? "text-terra-deep" : "text-ink"
              }`}
            >
              {item.label}
              {active === item.href && <span className="size-1.5 rounded-full bg-terra" aria-hidden="true" />}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              setPaletteOpen(true);
            }}
            className="flex items-center justify-between py-3.5 text-[15px] font-medium border-b border-border/50 text-ink"
          >
            Search &amp; commands
            <span className="font-mono-x text-[10px] tracking-[0.12em] text-ink-faint uppercase">⌘K</span>
          </button>
          <a
            href="#connect"
            onClick={() => setMobileOpen(false)}
            className="mt-4 mb-2 inline-flex items-center justify-center gap-2 rounded-full bg-night text-white text-[14px] font-medium h-12 md:hidden"
          >
            Let&apos;s Connect
            <ArrowRight className="size-4" />
          </a>
        </nav>
      </motion.div>
    </motion.header>
  );
}
