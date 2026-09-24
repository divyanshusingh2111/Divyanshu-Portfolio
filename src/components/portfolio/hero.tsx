"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

const heroAnim = (delay: number) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] as const },
});

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  /* Scroll-driven parallax — portrait drifts down, badge/annotation float up,
     blob sinks. Springs keep it buttery; reduced-motion gets a static hero. */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.6 });
  const portraitY = useTransform(progress, [0, 1], [0, 76]);
  const badgeY = useTransform(progress, [0, 1], [0, -52]);
  const annotationY = useTransform(progress, [0, 1], [0, -30]);
  const blobY = useTransform(progress, [0, 1], [0, 120]);

  return (
    <section id="top" ref={heroRef} className="relative overflow-hidden pt-[150px] md:pt-[170px] pb-0 grain">
      {/* Decorative blurred terracotta blob — top left */}
      <motion.div
        aria-hidden="true"
        style={{
          ...(reduceMotion ? {} : { y: blobY }),
          background:
            "radial-gradient(closest-side, rgba(224,106,59,0.32), rgba(224,106,59,0.12) 60%, transparent 100%)",
          filter: "blur(48px)",
          rotate: -18,
        }}
        className="absolute -top-32 -left-40 w-[620px] h-[520px] pointer-events-none"
      />
      {/* Subtle grid dots */}
      <div
        aria-hidden="true"
        className="absolute top-24 right-8 w-[220px] h-[160px] opacity-[0.35] pointer-events-none hidden lg:block"
        style={{
          backgroundImage: "radial-gradient(rgba(30,32,34,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="container-portfolio relative">
        <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-14 lg:gap-8 items-center">
          {/* ── Left column: copy ─────────────────────────── */}
          <div className="relative z-10 max-w-[600px]">
            <motion.p {...heroAnim(0.05)} className="flex items-center gap-2.5 mb-6 md:mb-7">
              <span className="inline-block size-[7px] rounded-full bg-terra" aria-hidden="true" />
              <span className="font-mono-x text-[11px] md:text-xs font-medium tracking-[0.22em] uppercase text-terra-deep">
                Product Designer
              </span>
            </motion.p>

            <motion.h1
              {...heroAnim(0.15)}
              className="font-display font-semibold text-ink text-[clamp(2.75rem,6.2vw,4.6rem)] leading-[1.02] tracking-[-0.015em]"
            >
              Designing{" "}
              <span className="font-script font-semibold text-terra text-[clamp(3rem,7vw,5.2rem)] relative inline-block -mt-1 align-baseline">
                meaningful
              </span>
              <br />
              systems that
              <br />
              create impact.
            </motion.h1>

            <motion.p
              {...heroAnim(0.28)}
              className="mt-6 md:mt-7 text-[15px] md:text-[17px] leading-[1.65] text-ink-soft max-w-[540px]"
            >
              I design digital products, dashboards and experiences that solve real problems and
              drive meaningful change.
            </motion.p>

            <motion.div
              {...heroAnim(0.38)}
              className="mt-6 md:mt-7 flex flex-wrap items-center gap-x-7 gap-y-2.5 text-[13.5px] md:text-[14px] text-ink-soft"
            >
              <span className="inline-flex items-center gap-2.5">
                <span aria-hidden="true" className="inline-block size-[10px] rounded-[2px] bg-terra" />
                Dehradun, India
              </span>
              <span className="inline-flex items-center gap-2.5">
                <span className="relative flex size-2.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-leaf opacity-40 animate-ping" />
                  <span className="relative inline-flex rounded-full size-2.5 bg-leaf" />
                </span>
                Available for new opportunities
              </span>
            </motion.div>

            <motion.div {...heroAnim(0.48)} className="mt-8 md:mt-9 flex flex-wrap items-center gap-5">
              <a
                href="#work"
                className="group inline-flex items-center gap-2.5 rounded-full bg-terra text-white font-medium text-[15px] h-[52px] pl-7 pr-6 transition-all duration-300 hover:shadow-[0_16px_36px_-12px_rgba(224,106,59,0.6)] hover:-translate-y-0.5"
              >
                View my work
                <ArrowRight className="size-[18px] transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="/design-assets/divyanshu-singh-resume.pdf"
                download="divyanshu-singh-resume.pdf"
                className="group inline-flex items-center gap-2 font-medium text-[15px] text-ink pb-1 border-b-[1.5px] border-ink/70 transition-colors hover:text-terra hover:border-terra"
              >
                Download Resume
                <Download className="size-[17px] transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </motion.div>
          </div>

          {/* ── Right column: portrait capsule ────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative mx-auto w-full max-w-[400px] lg:max-w-[440px]"
          >
            {/* Annotation + hand-drawn arrow */}
            <motion.div
              style={reduceMotion ? undefined : { y: annotationY }}
              className="absolute -top-12 md:-top-14 -left-2 md:-left-16 z-20 pointer-events-none select-none"
            >
              <motion.p
                initial={{ opacity: 0, rotate: -6 }}
                animate={{ opacity: 1, rotate: -3 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="font-script text-terra text-[23px] md:text-[27px] leading-[1.15] max-w-[220px]"
              >
                Keep it simple but significant.
              </motion.p>
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.25, duration: 0.7, ease: "easeInOut" }}
                width="120"
                height="92"
                viewBox="0 0 120 92"
                fill="none"
                className="mt-0.5 ml-16 hidden sm:block"
                aria-hidden="true"
              >
                <path
                  d="M6 8 C 48 2, 96 22, 106 48 C 110 60, 104 74, 90 84"
                  stroke="#E06A3B"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  pathLength={1}
                />
                <path
                  d="M82 80 L 91 86 L 94 73"
                  stroke="#E06A3B"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </motion.svg>
            </motion.div>

            {/* Capsule portrait */}
            <motion.div
              style={reduceMotion ? undefined : { y: portraitY }}
              className="relative w-full aspect-[413/528]"
            >
              <div
                className="absolute inset-0 overflow-hidden bg-night"
                style={{ borderRadius: "999px", boxShadow: "0 32px 64px -24px rgba(15,23,42,0.35)" }}
              >
                <Image
                  src="/design-assets/hero-portrait.svg"
                  alt="Portrait of Divyanshu Singh, product designer"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 440px"
                  className="object-cover object-top"
                />
                {/* Soft inner vignette to blend bottom edge */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-night/55 to-transparent"
                />
              </div>

              {/* Floating experience badge */}
              <motion.div
                initial={{ opacity: 0, x: 24, y: 12 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.85, duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="absolute -right-3 md:-right-14 top-[38%] z-20"
              >
                <motion.div
                  style={reduceMotion ? undefined : { y: badgeY }}
                  className="animate-float-soft -rotate-[4deg] rounded-2xl bg-card/95 backdrop-blur px-5 py-4 shadow-[0_18px_44px_-14px_rgba(30,32,34,0.28)] border border-border/40 min-w-[172px]"
                >
                  <p className="font-display font-semibold text-terra text-[30px] md:text-[34px] leading-none">
                    3+
                  </p>
                  <p className="mt-2 text-[12px] leading-snug text-ink-soft max-w-[130px]">
                    Years of design experience
                  </p>
                </motion.div>
              </motion.div>

              {/* Signature */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="absolute -bottom-9 right-10 md:right-16 z-20 pointer-events-none"
              >
                <p className="font-script font-medium text-[32px] md:text-[38px] leading-none text-ink -rotate-3 select-none">
                  Divyanshu
                </p>
              </motion.div>
            </motion.div>

            {/* Corner bracket decoration — bottom right of hero visual */}
            <div aria-hidden="true" className="absolute -bottom-10 -right-6 w-12 h-12 hidden md:block">
              <div className="absolute right-0 bottom-0 w-full h-[1.5px] bg-ink/25" />
              <div className="absolute right-0 bottom-0 h-full w-[1.5px] bg-ink/25" />
            </div>
          </motion.div>
        </div>

        {/* Subtle separator below hero */}
        <div aria-hidden="true" className="mt-10 md:mt-12 h-px bg-ink/8 max-w-full" />
      </div>
    </section>
  );
}
