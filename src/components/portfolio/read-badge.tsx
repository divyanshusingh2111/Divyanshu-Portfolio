"use client";

import { Check } from "lucide-react";
import type { ReadingSpot } from "@/lib/reading-position";

/**
 * Reading-position badge for index cards/rows — the quiet companion of the
 * resume banner. Finished pieces get a leaf "read" chip; in-progress pieces
 * get a mini terra progress bar + "N% read".
 */
export function ReadBadge({ spot, className = "" }: { spot: ReadingSpot | null; className?: string }) {
  if (!spot || spot.pct < 0.06) return null;

  if (spot.pct > 0.94) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full bg-leaf-soft px-2.5 py-1 font-mono-x text-[8.5px] font-bold tracking-[0.16em] uppercase text-leaf-deep ${className}`}
        title="Finished reading — nice."
      >
        <Check className="size-3" aria-hidden="true" />
        read
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2 ${className}`} title={`${Math.round(spot.pct * 100)}% read — resume anytime`}>
      <span aria-hidden="true" className="h-[3px] w-14 overflow-hidden rounded-full bg-ink/12 dark:bg-white/15">
        <span
          className="block h-full rounded-full bg-terra motion-safe:transition-[width] motion-safe:duration-500"
          style={{ width: `${Math.round(spot.pct * 100)}%` }}
        />
      </span>
      <span className="font-mono-x text-[8.5px] font-bold tracking-[0.14em] uppercase text-terra-deep">
        {Math.round(spot.pct * 100)}% read
      </span>
    </span>
  );
}
