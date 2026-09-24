"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Maximize2, Minimize2, X } from "lucide-react";
import type { ImageItem } from "@/lib/case-studies/types";

/* ------------------------------------------------------------------ */
/* Full-screen image viewer for case-study screenshots                 */
/* ------------------------------------------------------------------ */

export function Lightbox({ image, onClose }: { image: ImageItem; onClose: () => void }) {
  const [actualSize, setActualSize] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  /* ESC to close + body scroll lock + initial focus */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const label = image.browserUrl ?? "screenshot";

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Expanded view: ${image.alt}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex flex-col bg-night/88 backdrop-blur-md"
    >
      {/* top chrome */}
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-night/60 px-4 py-3 backdrop-blur-xl md:px-6">
        <p className="min-w-0 truncate font-mono-x text-[10px] font-bold tracking-[0.18em] uppercase text-white/70 md:text-[11px]">
          {label}
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden font-mono-x text-[9px] tracking-[0.2em] uppercase text-white/35 md:inline">
            ESC to close
          </span>
          <button
            type="button"
            onClick={() => setActualSize((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 font-mono-x text-[10px] font-bold tracking-[0.12em] uppercase text-white/80 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
            aria-label={actualSize ? "Fit image to screen" : "View image at actual size"}
            aria-pressed={actualSize}
          >
            {actualSize ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
            <span className="hidden sm:inline">{actualSize ? "Fit" : "100%"}</span>
          </button>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-mono-x text-[10px] font-bold tracking-[0.12em] uppercase text-night transition-transform duration-200 hover:scale-[1.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Close expanded view"
          >
            Close
            <X className="size-3.5" />
          </button>
        </div>
      </div>

      {/* scrollable stage — click empty area closes, click image toggles zoom */}
      <div className="flex-1 overflow-auto scrollbar-thin">
        <div
          className="flex min-h-full p-4 md:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative m-auto select-none"
            style={{ width: actualSize ? (image.w ?? 1200) : "min(92vw, 1100px)" }}
            onClick={(e) => {
              e.stopPropagation();
              setActualSize((v) => !v);
            }}
            role="button"
            tabIndex={0}
            aria-label={actualSize ? "Switch to fit-to-screen view" : "Zoom to actual size"}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActualSize((v) => !v);
              }
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.w ?? 1200}
              height={image.h ?? 800}
              sizes="92vw"
              priority
              draggable={false}
              className={`h-auto w-full rounded-[10px] border border-white/10 bg-white shadow-[0_40px_120px_-30px_rgba(0,0,0,0.85)] ${
                actualSize ? "cursor-zoom-out" : "cursor-zoom-in"
              }`}
            />
            {image.caption && (
              <p className="mt-3 text-center font-mono-x text-[10px] tracking-[0.14em] uppercase text-white/50">
                {image.caption}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
