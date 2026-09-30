"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" } as const,
};

const DEMO_COMPLETE_PNG = "/design-assets/case-studies/autoremov-demo-complete.png";

/**
 * Section 07 visual — the complete Autoremov hero demo mockup, displayed
 * exactly as exported from the Figma design (user-provided Container.png /
 * Container.jpg): the light card with marketing copy, purple primary
 * button, and the drag-to-reveal before/after slider removing the
 * background from a studio portrait. The trimmed PNG keeps its transparent
 * background so the card floats cleanly on both light and dark themes.
 * The identical JPG export is also shipped in the same assets folder
 * (autoremov-demo-complete.jpg) as the user provided both formats.
 */
export function BeforeAfterBlock() {
  return (
    <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
      <figure className="relative">
        <Image
          src={DEMO_COMPLETE_PNG}
          alt="Autoremov landing page hero — drag-to-reveal before/after slider showing the AI removing the background from a studio portrait while preserving hair detail"
          width={2200}
          height={1031}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 92vw, 790px"
          className="h-auto w-full rounded-[18px] bg-white shadow-[0_24px_60px_-30px_rgba(15,23,42,0.35)] dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.6)]"
          draggable={false}
        />
      </figure>
    </motion.div>
  );
}
