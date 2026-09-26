"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MoveHorizontal, Upload, Play, Sparkles } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" } as const,
};

/**
 * Drag-to-reveal before/after comparison slider — self-contained block.
 * Renders a stylized SVG portrait (with background → transparent cutout) so
 * it needs no external image asset. Used in the Autoremov value-proof section.
 */
export function BeforeAfterBlock() {
  const [pos, setPos] = React.useState(55);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const dragging = React.useRef(false);

  const updateFromClientX = React.useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, p)));
  }, []);

  React.useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const x = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      updateFromClientX(x);
    };
    const onUp = () => (dragging.current = false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [updateFromClientX]);

  return (
    <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
      <div className="relative overflow-hidden rounded-[18px] border border-ink/10 bg-night p-5 md:p-7">
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 -top-20 size-60 rounded-full bg-terra/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -right-20 size-60 rounded-full bg-[#A855F7]/20 blur-3xl" />

        <div className="relative flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 font-mono-x text-[9.5px] uppercase tracking-wider text-white/70">
              <Sparkles className="h-3 w-3 text-[#fbbf24]" /> Live Demo
            </span>
            <h3 className="mt-2.5 font-display text-xl font-bold leading-tight text-white sm:text-2xl">
              Remove Backgrounds Instantly with AI Precision
            </h3>
            <p className="mt-2 max-w-md text-[13px] leading-relaxed text-white/60">
              Create clean transparent cutouts for e-commerce, creative, agencies, and personal
              use — in one click.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="flex items-center gap-1.5 rounded-lg bg-terra px-3 py-2 text-[11px] font-semibold text-white">
              <Upload className="h-3.5 w-3.5" /> Upload Image +
            </span>
            <span className="flex items-center gap-1.5 rounded-lg border border-white/20 px-3 py-2 text-[11px] font-semibold text-white/80">
              <Play className="h-3.5 w-3.5" /> Try Demo
            </span>
          </div>
        </div>

        <div
          ref={containerRef}
          className="group relative mt-6 aspect-[4/3] cursor-ew-resize select-none overflow-hidden rounded-2xl sm:aspect-[16/10]"
          onMouseDown={(e) => {
            dragging.current = true;
            updateFromClientX(e.clientX);
          }}
          onTouchStart={(e) => {
            dragging.current = true;
            updateFromClientX(e.touches[0].clientX);
          }}
        >
          {/* AFTER (transparent cutout) — full */}
          <div className="checkerboard absolute inset-0" />
          <SubjectImage variant="cutout" className="absolute inset-0" />

          {/* BEFORE (with background) — clipped to pos% */}
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
            <div className="absolute inset-0 h-full" style={{ width: `${100 / (pos / 100)}%`, maxWidth: "none" }}>
              <SubjectImage variant="original" className="h-full w-full" />
            </div>
          </div>

          {/* labels */}
          <span className="pointer-events-none absolute left-3 top-3 rounded-md bg-night/80 px-2 py-1 font-mono-x text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
            Before
          </span>
          <span className="pointer-events-none absolute right-3 top-3 rounded-md bg-terra px-2 py-1 font-mono-x text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
            After · Removed
          </span>

          {/* handle */}
          <div
            className="pointer-events-none absolute bottom-0 top-0 w-[2px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)]"
            style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
          >
            <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-night shadow-lg ring-1 ring-black/10">
              <MoveHorizontal className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between font-mono-x text-[10px] uppercase tracking-wider text-white/45">
          <span>← drag handle to reveal</span>
          <span>2.3s avg · 99.4% accuracy</span>
        </div>
      </div>
    </motion.div>
  );
}

/* Stylized SVG portrait — two variants so the slider has real visual contrast. */
function SubjectImage({
  variant,
  className,
}: {
  variant: "original" | "cutout";
  className?: string;
}) {
  if (variant === "original") {
    return (
      <div className={className}>
        <svg viewBox="0 0 600 600" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="ba-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f4a261" />
              <stop offset="55%" stopColor="#e76f51" />
              <stop offset="100%" stopColor="#9d2a2f" />
            </linearGradient>
            <radialGradient id="ba-light" cx="50%" cy="32%" r="60%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="600" height="600" fill="url(#ba-bg)" />
          <rect width="600" height="600" fill="url(#ba-light)" />
          <circle cx="120" cy="120" r="80" fill="#fff" opacity="0.12" />
          <circle cx="500" cy="470" r="120" fill="#2a9d8f" opacity="0.18" />
          <Subject />
        </svg>
      </div>
    );
  }
  return (
    <div className={className}>
      <svg viewBox="0 0 600 600" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <ellipse cx="300" cy="595" rx="120" ry="14" fill="#000" opacity="0.12" />
        <Subject />
      </svg>
    </div>
  );
}

function Subject() {
  return (
    <g>
      <path d="M150 600 C160 470 230 430 300 430 C370 430 440 470 450 600 Z" fill="#2b2d42" />
      <path d="M150 600 C160 470 230 430 300 430 C370 430 440 470 450 600 Z" fill="#000" opacity="0.18" />
      <rect x="278" y="380" width="44" height="70" rx="20" fill="#d9a06b" />
      <path d="M210 300 C210 220 250 170 300 170 C350 170 392 220 392 300 C392 360 360 400 300 400 C240 400 210 360 210 300 Z" fill="#3a2a1f" />
      <ellipse cx="300" cy="290" rx="78" ry="92" fill="#e8b58a" />
      <path d="M222 270 C230 200 360 200 378 270 C378 230 350 180 300 180 C250 180 222 230 222 270 Z" fill="#3a2a1f" />
      <ellipse cx="272" cy="290" rx="7" ry="9" fill="#2b2d42" />
      <ellipse cx="328" cy="290" rx="7" ry="9" fill="#2b2d42" />
      <rect x="260" y="268" width="24" height="4" rx="2" fill="#3a2a1f" />
      <rect x="316" y="268" width="24" height="4" rx="2" fill="#3a2a1f" />
      <path d="M300 295 L294 325 L306 325 Z" fill="#d49a6a" opacity="0.6" />
      <path d="M282 345 Q300 358 318 345 Q300 352 282 345 Z" fill="#c75b5b" />
      <circle cx="262" cy="318" r="12" fill="#e76f51" opacity="0.25" />
      <circle cx="338" cy="318" r="12" fill="#e76f51" opacity="0.25" />
      <circle cx="224" cy="320" r="5" fill="#f4a261" />
    </g>
  );
}
