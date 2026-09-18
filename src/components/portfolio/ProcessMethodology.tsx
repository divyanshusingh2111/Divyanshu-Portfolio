"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/portfolio/data";
import SectionHeading from "./SectionHeading";

export default function ProcessMethodology() {
  return (
    <section id="process" className="border-t border-line px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-12">
        <SectionHeading
          id="process"
          label="● METHODOLOGY"
          title={
            <>
              A repeatable path from{" "}
              <span className="font-hand font-bold text-accent">signal to ship.</span>
            </>
          }
          subtitle={
            <p>
              The same four-step loop runs across every engagement — whether it&apos;s a
              2-week sprint or a multi-quarter platform rebuild.
            </p>
          }
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.no}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="card-lift group relative flex flex-col gap-3 rounded-2xl border border-line bg-surface p-6 shadow-sm overflow-hidden"
            >
              {/* Subtle accent corner glow on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-accent-soft opacity-0 blur-2xl transition-opacity group-hover:opacity-100"
              />
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-accent">
                  STEP {step.no}
                </span>
                <span className="font-mono text-[10px] text-muted">{i + 1}/4</span>
              </div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-xs leading-relaxed text-muted">{step.desc}</p>
              <div className="mt-auto h-1 w-full rounded-full bg-line">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${((i + 1) / PROCESS_STEPS.length) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                  className="h-full rounded-full bg-accent"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
