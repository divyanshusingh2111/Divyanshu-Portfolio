"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" } as const,
};

/**
 * Interactive dual-pricing cost calculator — the exact UI element the case
 * study credits as its highest-leverage decision. Drag the volume slider and
 * watch subscription vs credit top-up recompute live, with a "cheapest" flag
 * and a savings readout.
 */
export function CalculatorBlock() {
  const [images, setImages] = React.useState(50);
  const [mode, setMode] = React.useState<"subscription" | "credits">("subscription");

  const subBase = 29;
  const subIncluded = 100;
  const subExtra = 0.25;
  const creditRate = 0.45;

  const subCost = images <= subIncluded ? subBase : subBase + (images - subIncluded) * subExtra;
  const creditCost = images * creditRate;
  const cheaper = subCost <= creditCost ? "subscription" : "credits";
  const saving = Math.abs(subCost - creditCost);

  return (
    <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
      <div className="rounded-[18px] border border-ink/10 bg-card p-6 shadow-[0_14px_36px_-22px_rgba(15,23,42,0.3)] md:p-7">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-terra-soft text-terra">
            <Calculator className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="font-mono-x text-[10px] uppercase tracking-wider text-ink-faint">Interactive</p>
            <p className="font-display text-base font-bold text-ink">Cost Calculator</p>
          </div>
        </div>

        <p className="mt-3 text-[12.5px] leading-relaxed text-ink-soft">
          Drag to estimate monthly cost across both pricing models. The dual-model UX had to make
          this instant.
        </p>

        {/* mode toggle */}
        <div className="mt-5 grid grid-cols-2 gap-2">
          <button
            onClick={() => setMode("subscription")}
            className={`rounded-xl border px-3 py-2 text-left transition-all ${
              mode === "subscription"
                ? "border-[#A855F7] bg-[#A855F7]/5"
                : "border-border hover:bg-cream-deep/50"
            }`}
          >
            <span className="font-mono-x text-[9px] uppercase tracking-wider text-ink-faint">
              Subscription
            </span>
            <span
              className="block text-[13px] font-semibold"
              style={{ color: mode === "subscription" ? "#A855F7" : undefined }}
            >
              ${subBase}/mo base
            </span>
          </button>
          <button
            onClick={() => setMode("credits")}
            className={`rounded-xl border px-3 py-2 text-left transition-all ${
              mode === "credits" ? "border-[#38BDF8] bg-[#38BDF8]/5" : "border-border hover:bg-cream-deep/50"
            }`}
          >
            <span className="font-mono-x text-[9px] uppercase tracking-wider text-ink-faint">
              Credit Top-up
            </span>
            <span
              className="block text-[13px] font-semibold"
              style={{ color: mode === "credits" ? "#38BDF8" : undefined }}
            >
              ${creditRate} / image
            </span>
          </button>
        </div>

        {/* volume slider */}
        <div className="mt-5">
          <div className="mb-2 flex items-baseline justify-between">
            <span className="font-mono-x text-[10px] uppercase tracking-wider text-ink-faint">
              Images / month
            </span>
            <span className="font-display text-2xl font-bold text-ink">{images}</span>
          </div>
          <input
            type="range"
            min={5}
            max={400}
            step={5}
            value={images}
            onChange={(e) => setImages(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-cream-deep accent-terra"
          />
          <div className="mt-1 flex justify-between font-mono-x text-[9px] text-ink-faint">
            <span>5</span>
            <span>200</span>
            <span>400</span>
          </div>
        </div>

        {/* result */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border bg-cream-deep/40 p-3">
            <p className="font-mono-x text-[9px] uppercase tracking-wider text-ink-faint">Subscription</p>
            <p className="mt-1 font-display text-2xl font-bold text-[#A855F7]">${subCost.toFixed(2)}</p>
            {cheaper === "subscription" && (
              <span className="mt-1 inline-flex items-center gap-1 rounded bg-leaf-soft px-1.5 py-0.5 font-mono-x text-[9px] uppercase text-leaf-deep">
                ✓ Cheapest
              </span>
            )}
          </div>
          <div className="rounded-xl border border-border bg-cream-deep/40 p-3">
            <p className="font-mono-x text-[9px] uppercase tracking-wider text-ink-faint">Credits</p>
            <p className="mt-1 font-display text-2xl font-bold text-[#38BDF8]">${creditCost.toFixed(2)}</p>
            {cheaper === "credits" && (
              <span className="mt-1 inline-flex items-center gap-1 rounded bg-leaf-soft px-1.5 py-0.5 font-mono-x text-[9px] uppercase text-leaf-deep">
                ✓ Cheapest
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl bg-terra-soft px-3 py-2.5">
          <span className="font-mono-x text-[10px] uppercase tracking-wider text-ink-soft">You save</span>
          <span className="font-display text-lg font-bold text-terra">${saving.toFixed(2)}/mo</span>
        </div>
      </div>
    </motion.div>
  );
}
