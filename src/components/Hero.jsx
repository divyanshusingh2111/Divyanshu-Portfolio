import { motion } from "motion/react";
import { heroPortrait, heroSketchArrow, downloadIcon } from "../assets/figma-assets";

export default function Hero() {
  return (
    <section
      id="top"
      className="mx-auto flex max-w-[1440px] flex-col items-center gap-16 px-6 pt-40 pb-24 md:flex-row md:px-16 md:pt-48"
    >
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex max-w-[632px] flex-1 flex-col gap-10"
      >
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-accent" />
          <p className="font-mono text-xs font-bold tracking-wide text-accent">PRODUCT DESIGNER</p>
        </div>

        <h1 className="text-[52px] leading-[1.05] font-bold text-ink sm:text-[64px] md:text-[74px]">
          Designing{" "}
          <span className="font-hand font-normal text-accent">meaningful</span>{" "}
          systems that create impact.
        </h1>

        <p className="max-w-[576px] text-lg leading-relaxed text-muted">
          I design digital products, dashboards and experiences that solve real problems and
          drive meaningful change.
        </p>

        <div className="flex flex-wrap items-center gap-6 font-mono text-[11.5px]">
          <span className="flex items-center gap-1.5 text-muted">
            <span aria-hidden>📍</span> Dehradun, India
          </span>
          <span className="flex items-center gap-1.5 text-muted">
            <span className="size-2 rounded-full bg-good" /> Available for new opportunities
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-8">
          <a
            href="#work"
            className="flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-transform hover:scale-[1.02]"
          >
            View my work <span aria-hidden>→</span>
          </a>
          <a
            href="/resume.pdf"
            className="flex items-center gap-2 border-b border-ink pb-0.5 text-sm font-bold text-ink"
          >
            Download Resume
            <img src={downloadIcon} alt="" className="size-5" />
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        className="relative w-full max-w-[420px] shrink-0"
      >
        <img
          src={heroSketchArrow}
          alt=""
          className="pointer-events-none absolute -top-16 -left-10 w-40 -rotate-6 opacity-80 hidden md:block"
        />

        <div className="relative aspect-[413/528] w-full overflow-hidden rounded-[206px]">
          <img
            src={heroPortrait}
            alt="Portrait of Divyanshu Singh"
            className="size-full object-cover object-bottom"
          />
        </div>

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-6 -right-6 w-[166px] rotate-2 rounded-xl border border-[rgba(15,23,42,0.06)] bg-white p-4 shadow-lg"
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
    </section>
  );
}
