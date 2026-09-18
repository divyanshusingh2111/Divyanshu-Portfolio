"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { DownloadIcon, SketchArrowIcon } from "./icons";

export default function Hero() {
  const sectionRef = React.useRef<HTMLElement>(null);
  // Subtle scroll-linked parallax on the portrait column. The range is small
  // (±18px) so it reads as depth, not as a moving element.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, 24]);
  const arrowRotate = useTransform(scrollYProgress, [0, 1], [-6, 4]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="hero-mesh relative mx-auto flex max-w-[1440px] flex-col items-center gap-16 px-6 pt-40 pb-24 md:flex-row md:px-16 md:pt-48"
    >
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex max-w-[632px] flex-1 flex-col gap-10"
      >
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-accent animate-soft-pulse" />
          <p className="font-mono text-xs font-bold tracking-wide text-accent">
            PRODUCT DESIGNER
          </p>
        </div>

        <h1 className="text-[52px] leading-[1.05] font-bold text-ink sm:text-[64px] md:text-[74px]">
          Designing{" "}
          <span className="font-hand font-normal text-accent">meaningful</span>{" "}
          systems that create impact.
        </h1>

        <p className="max-w-[576px] text-lg leading-relaxed text-muted">
          I design digital products, dashboards and experiences that solve real
          problems and drive meaningful change.
        </p>

        <div className="flex flex-wrap items-center gap-6 font-mono text-[11.5px]">
          <span className="flex items-center gap-1.5 text-muted">
            <span aria-hidden>📍</span> Dehradun, India
          </span>
          <span className="flex items-center gap-1.5 text-muted">
            <span className="size-2 rounded-full bg-good animate-soft-pulse" />{" "}
            Available for new opportunities
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-8">
          <a
            href="#work"
            className="btn-magnetic link-sheen flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-white shadow-sm"
          >
            View my work <span aria-hidden>→</span>
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic flex items-center gap-2 border-b border-ink pb-0.5 text-sm font-bold text-ink"
          >
            Download Resume
            <DownloadIcon className="size-5 text-accent" />
          </a>
        </div>
      </motion.div>

      <motion.div
        style={{ y: portraitY }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        className="relative w-full max-w-[420px] shrink-0"
      >
        <motion.div style={{ rotate: arrowRotate }}>
          <SketchArrowIcon
            className="pointer-events-none absolute -top-16 -left-10 w-40 text-accent opacity-80 hidden md:block"
            aria-hidden
          />
        </motion.div>

        <div className="portrait-glow relative aspect-[413/528] w-full overflow-hidden rounded-[206px] shadow-[0_30px_60px_-30px_rgba(15,23,42,0.4)]">
          { }
          <img
            src="/portfolio/hero-portrait.png"
            alt="Portrait of Divyanshu Singh"
            className="size-full object-cover object-bottom"
          />
          {/* Soft accent ring overlay */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[206px] ring-1 ring-inset ring-[rgba(224,106,59,0.15)]"
          />
        </div>

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ y: badgeY }}
          className="absolute -top-6 -right-6 w-[166px] rotate-2 rounded-xl border border-[rgba(15,23,42,0.06)] bg-surface p-4 shadow-lg"
        >
          <p className="text-[28px] font-normal leading-none text-accent">3+</p>
          <p className="mt-2 text-[10px] font-bold leading-tight text-ink">
            Years of design experience
          </p>
        </motion.div>

        <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-hand text-2xl text-ink">
          Divyanshu
        </p>
      </motion.div>

      {/* Scroll-to-explore indicator — fades out after the user scrolls. */}
      <ScrollHint />
    </section>
  );
}

function ScrollHint() {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) setVisible(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      aria-hidden
    >
      <span className="font-mono text-[9px] font-bold tracking-widest text-muted">
        SCROLL
      </span>
      <span className="relative flex h-8 w-5 justify-center rounded-full border border-line">
        <motion.span
          animate={{ y: [3, 14, 3], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="mt-1 size-1 rounded-full bg-accent"
        />
      </span>
    </motion.div>
  );
}
