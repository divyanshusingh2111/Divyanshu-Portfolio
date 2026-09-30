"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useInView } from "framer-motion";

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/**
 * Animates numeric text like "500+", "40%", "10" from 0 when scrolled into view.
 * Respects prefers-reduced-motion by rendering the final value immediately.
 */
export function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const match = value.match(/^(\d+)(.*)$/);
  const num = match ? Number.parseInt(match[1], 10) : NaN;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );

  useEffect(() => {
    if (!Number.isFinite(num) || !inView || reducedMotion) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(num * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, num, duration, reducedMotion]);

  if (!Number.isFinite(num)) return <span ref={ref}>{value}</span>;

  const shown = reducedMotion ? num : display;

  return (
    <span ref={ref}>
      {shown}
      {suffix}
    </span>
  );
}
