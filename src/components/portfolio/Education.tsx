"use client";

import { motion } from "framer-motion";
import { EDUCATION } from "@/lib/portfolio/data";
import SectionHeading from "./SectionHeading";

export default function Education() {
  return (
    <section id="education" className="border-t border-line px-6 py-20 md:px-16">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-10">
        <SectionHeading
          id="education"
          label="● ACADEMIC FOUNDATIONS"
          title={
            <>
              <span className="font-hand font-bold text-accent">Education</span>
            </>
          }
          subtitle={
            <p className="max-w-[600px] text-xs text-faint">
              Specialized research workflows crossing human-computer interfaces, industrial
              design, and predictive systems.
            </p>
          }
        />

        <div className="relative border-l-2 border-dashed border-line pl-2">
          <div className="flex flex-col gap-16">
            {EDUCATION.map((item, i) => (
              <motion.div
                key={item.degree}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="relative flex flex-col gap-2 pl-8"
              >
                <span
                  className={`absolute top-1.5 left-0 size-3 -translate-x-1/2 rounded-full border-2 ${
                    item.active ? "border-accent bg-surface" : "border-[#bdbdbd] bg-bg"
                  }`}
                />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xl font-bold sm:text-2xl">{item.degree}</p>
                  <span
                    className={`shrink-0 rounded-full border px-3 py-1 font-mono text-xs font-medium ${
                      item.active
                        ? "border-[rgba(224,106,59,0.1)] bg-[rgba(224,106,59,0.18)] text-accent"
                        : "border-[#bdbdbd] text-faint"
                    }`}
                  >
                    {item.tag}
                  </span>
                </div>
                <p className="max-w-[760px] leading-relaxed text-faint">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
