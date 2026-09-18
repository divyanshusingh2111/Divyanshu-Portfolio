"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECTION_IDS = ["work", "about", "process", "timeline", "education", "skills", "tools", "faq", "contact"];

/**
 * A small floating "section x of y" indicator that appears in the bottom-
 * right corner (above the BackToTop button). Uses IntersectionObserver to
 * track which section is currently in view, same approach as the header
 * scroll-spy. Hidden until the user scrolls past the hero.
 */
export default function SectionIndicator() {
  const [activeIdx, setActiveIdx] = React.useState<number>(-1);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          const idx = SECTION_IDS.indexOf(visible[0].target.id);
          if (idx >= 0) setActiveIdx(idx);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const total = SECTION_IDS.length;
  const current = activeIdx >= 0 ? activeIdx + 1 : 0;
  const sectionName = activeIdx >= 0 ? SECTION_IDS[activeIdx] : "";

  return (
    <AnimatePresence>
      {visible && activeIdx >= 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-end gap-1 pointer-events-none"
          style={{ marginBottom: "3.5rem" }}
          aria-hidden
        >
          <div className="flex items-center gap-2 rounded-full border border-line bg-surface/90 px-3 py-1.5 shadow-sm backdrop-blur">
            <span className="font-mono text-[9px] font-bold text-accent">
              {String(current).padStart(2, "0")}
            </span>
            <span className="font-mono text-[9px] text-faint">/</span>
            <span className="font-mono text-[9px] text-muted">
              {String(total).padStart(2, "0")}
            </span>
          </div>
          <span className="font-mono text-[8px] uppercase tracking-wider text-faint">
            {sectionName}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
