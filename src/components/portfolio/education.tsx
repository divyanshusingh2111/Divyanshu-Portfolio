"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "./section-label";
import { Reveal } from "./reveal";

const EDUCATION = [
  {
    degree: "M.Des in UX Design",
    school: "DIT University",
    description:
      "Focusing on advanced interaction architectures, data accessibility systems, and strategic enterprise software design patterns.",
    badge: "POSTGRADUATE // 2025 – 2027",
    highlight: true,
  },
  {
    degree: "M.Sc in UX Design & Management",
    school: "PFH University of Applied Sciences",
    description:
      "Enrolled in international postgrad systems. Decoupled after 1 year of study (2023 - 2024) to transition fully into high-impact product leadership at KlimaShift.",
    badge: "INTERNATIONAL SPEC // GÖTTINGEN, GERMANY",
    highlight: false,
  },
  {
    degree: "Bachelor of Design (B.Des) in Industrial Design",
    school: "Uttar Pradesh Institute of Design (UPID), Noida",
    description:
      "Specialized in physical ergonomics, systems modeling, and user-centered design—building a core foundation for translating complex physical-to-digital structures.",
    badge: "UNDERGRADUATE // 2018 – 2022",
    highlight: false,
  },
];

export function Education() {
  return (
    <section id="resume" className="relative py-20 md:py-28">
      <div className="container-portfolio">
        <Reveal>
          <SectionLabel text="Academic Foundations" className="mb-5" />
          <h2 className="font-display font-semibold text-ink text-[clamp(2rem,3.8vw,3.2rem)] leading-[1.06] tracking-[-0.01em]">
            Education
          </h2>
          <p className="mt-5 text-[14.5px] md:text-[15.5px] leading-[1.65] text-ink-soft max-w-[560px]">
            Specialized research workflows crossing human-computer interfaces, industrial design,
            and predictive systems.
          </p>
        </Reveal>

        <div className="relative ml-2 md:ml-3 mt-14 md:mt-16">
          {/* Spine */}
          <div
            aria-hidden="true"
            className="absolute left-[7px] top-[10px] bottom-[10px] w-px bg-ink/15"
          />

          <ol className="space-y-14 md:space-y-16">
            {EDUCATION.map((entry, i) => (
              <motion.li
                key={entry.degree}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative pl-8 md:pl-12"
              >
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-[7px] size-[15px] rounded-full border-[3px] ${
                    entry.highlight ? "bg-terra border-terra/25" : "bg-card border-ink/25"
                  }`}
                />
                <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-3">
                  <div className="min-w-0 max-w-[720px]">
                    <h3 className="font-display font-semibold text-ink text-[19px] md:text-[22px] leading-snug">
                      {entry.degree}
                    </h3>
                    <p className="mt-1.5 text-[14.5px] font-medium text-terra-deep">{entry.school}</p>
                    <p className="mt-2.5 text-[14px] md:text-[15px] leading-[1.6] text-ink-soft">
                      {entry.description}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 inline-flex items-center rounded-md px-3.5 py-1.5 font-mono-x text-[10px] md:text-[10.5px] tracking-[0.06em] uppercase whitespace-nowrap ${
                      entry.highlight
                        ? "bg-[#FFE4D6] text-[#B4370E] dark:bg-[#3A2317] dark:text-[#F5A26F]"
                        : "bg-card text-ink-soft border border-border"
                    }`}
                  >
                    [ {entry.badge} ]
                  </span>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
