"use client";

import { motion } from "framer-motion";
import { SKILLS } from "@/lib/portfolio/data";
import SectionHeading from "./SectionHeading";

export default function SkillsMatrix() {
  return (
    <section id="skills" className="border-t border-line px-6 py-20 md:px-16">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-10">
        <SectionHeading
          id="skills"
          label="● SYSTEM VECTOR MATRIX"
          title={
            <>
              UX Foundations &amp;{" "}
              <span className="font-hand font-bold text-accent">AI-Ready Core</span>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {SKILLS.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group flex flex-col gap-3 rounded-2xl border border-line bg-surface p-5 shadow-sm transition-colors hover:border-accent/40"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-bg text-ink transition-colors group-hover:bg-accent-soft group-hover:text-accent">
                    <Icon className="size-5" />
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 font-mono text-[9px] font-bold ${skill.badgeStyle}`}
                  >
                    {skill.badge}
                  </span>
                </div>
                <p className="text-base font-medium">{skill.title}</p>
                <p className="text-xs leading-relaxed text-muted">{skill.description}</p>
              </motion.div>
            );
          })}
        </div>

        <p className="self-end font-hand text-2xl text-accent">
          Optimized for 2026 technical requirements.
        </p>
      </div>
    </section>
  );
}
