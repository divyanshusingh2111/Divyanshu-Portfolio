"use client";

import { motion } from "framer-motion";
import { EXPERIENCE } from "@/lib/portfolio/data";
import SectionHeading from "./SectionHeading";

function TimelineRow({
  item,
  index,
}: {
  item: (typeof EXPERIENCE)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative flex flex-col gap-2 pl-8"
    >
      <span
        className={`absolute top-1.5 left-0 size-3 -translate-x-1/2 rounded-full border-2 ${
          item.active ? "border-accent bg-surface" : "border-[#bdbdbd] bg-bg"
        }`}
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xl font-bold sm:text-2xl">
          {item.role}{" "}
          {item.org && (
            <span className="text-base font-normal text-muted">@ {item.org}</span>
          )}
        </p>
        <span
          className={`shrink-0 rounded-full border px-3 py-1 font-mono text-xs font-medium ${
            item.active
              ? "border-[rgba(224,106,59,0.1)] bg-[rgba(224,106,59,0.18)] text-accent"
              : "border-[#bdbdbd] text-faint"
          }`}
        >
          {item.period}
        </span>
      </div>
      <p className="max-w-[720px] leading-relaxed text-faint">{item.description}</p>
    </motion.div>
  );
}

export default function Timeline() {
  return (
    <section id="timeline" className="border-t border-line px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-14">
        <SectionHeading
          id="timeline"
          label="● PROCESS LEDGER"
          title={
            <>
              Work Timeline &amp;{" "}
              <span className="font-hand font-bold text-accent">Experience</span>
            </>
          }
        />

        <div className="relative border-l-2 border-dashed border-line pl-2">
          <div className="flex flex-col gap-14">
            {EXPERIENCE.map((item, i) => (
              <TimelineRow key={item.role + (item.org ?? "")} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
