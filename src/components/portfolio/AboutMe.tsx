"use client";

import { motion } from "framer-motion";
import { QuoteIcon } from "./icons";
import { TRAITS, STATS, DO_ITEMS } from "@/lib/portfolio/data";
import AnimatedCounter from "./AnimatedCounter";
import SectionHeading from "./SectionHeading";

export default function AboutMe() {
  return (
    <section id="about" className="border-t border-line px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-16 lg:flex-row">
        <div className="flex flex-1 flex-col gap-8">
          <SectionHeading
            id="about"
            label="● ABOUT ME"
            title={
              <>
                I&apos;m Divyanshu, a UX Designer &{" "}
                <span className="font-hand font-bold text-accent">Problem Solver.</span>
              </>
            }
          />

          <div className="flex flex-col gap-4 text-base leading-relaxed text-muted">
            <p>
              I enjoy working on complex problems, turning data into insights, and designing
              intuitive experiences that empower users and drive business forward.
            </p>
            <p>
              From AI-powered dashboards to AR onboarding apps, I love blending technology,
              design and strategy to build products that make a difference.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {TRAITS.map((trait) => (
              <span
                key={trait}
                className="rounded-full border border-line bg-surface px-4 py-2 font-mono text-[11px] shadow-sm transition-colors hover:border-accent/40 hover:bg-accent-soft/40"
              >
                {trait}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="group">
                <p className={`text-3xl font-bold ${stat.color} transition-transform group-hover:-translate-y-0.5`}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 font-mono text-[9px] text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl bg-panel p-8 text-white shadow-md"
          >
            <p className="font-mono text-xs text-[#8f949e]">DESIGN PHILOSOPHY</p>
            <QuoteIcon className="pointer-events-none absolute top-10 right-8 w-16 text-accent opacity-70" />
            <p className="relative mt-8 max-w-[90%] text-lg leading-relaxed">
              &ldquo;Good design is not just how it looks, but how it works and feels.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px w-24 bg-accent" />
              <span className="font-hand text-xl text-accent">Divyanshu</span>
            </div>
          </motion.div>

          <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
            <p className="font-mono text-[9px] font-bold text-muted">● WHAT I DO</p>
            <h3 className="mt-3 text-xl font-bold">
              Areas I bring <span className="font-hand font-bold text-accent">value</span> to:
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {DO_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-lg border border-line bg-bg p-3 transition-colors hover:border-accent/40 hover:bg-accent-soft/40"
                >
                  <span className="text-lg" aria-hidden>{item.emoji}</span>
                  <p className="font-mono text-[11.5px] font-bold">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
