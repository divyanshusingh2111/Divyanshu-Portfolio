"use client";

import { useCallback, useRef } from "react";
import { type MotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * Subtle pointer-tracked 3D tilt for cards.
 * - Max ±`max` degrees on both axes, spring-smoothed.
 * - No-op on coarse pointers (touch) and when reduced motion is preferred —
 *   the returned handlers simply never set values, so layout is unaffected.
 */
export function useTilt(max = 4): {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
  ref: React.RefObject<HTMLDivElement | null>;
} {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 260, damping: 24, mass: 0.6 });
  const rotateY = useSpring(0, { stiffness: 260, damping: 24, mass: 0.6 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduceMotion || !ref.current) return;
      const el = ref.current;
      if (el.closest("[data-tilt-disabled]")) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY.set(px * 2 * max);
      rotateX.set(-py * 2 * max);
    },
    [max, reduceMotion, rotateX, rotateY]
  );

  const onMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return { rotateX, rotateY, onMouseMove, onMouseLeave, ref };
}
