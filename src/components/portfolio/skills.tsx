"use client";

import { motion } from "framer-motion";
import type { ComponentType, SVGProps } from "react";
import { SectionLabel } from "./section-label";
import { Reveal } from "./reveal";
import {
  UserResearchIcon,
  SystemWireframingIcon,
  InteractivePrototypingIcon,
  CognitiveLoadIcon,
  GenerativeUIIcon,
  SpatialInteractionIcon,
} from "./skill-icons";

type TagTone = "mint" | "black" | "peach";

const SKILLS: {
  title: string;
  description: string;
  tag: string;
  tone: TagTone;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
  {
    title: "User Research",
    description:
      "Performing field studies, contextual inquiries, and analytical mapping to validate design parameters using factual user heuristics.",
    tag: "Empirical",
    tone: "mint",
    icon: UserResearchIcon,
  },
  {
    title: "System Wireframing",
    description:
      "Translating messy workflows into high-density wireframes, emphasizing immediate data accessibility and structural balance.",
    tag: "High Demand",
    tone: "black",
    icon: SystemWireframingIcon,
  },
  {
    title: "Interactive Prototyping",
    description:
      "Building advanced, variable-driven responsive prototype simulations to load-test layout flow logic under real-world conditions.",
    tag: "Dynamic UX",
    tone: "black",
    icon: InteractivePrototypingIcon,
  },
  {
    title: "Cognitive Load Mitigation",
    description:
      "Designing layout prioritization structures to shield users from high-density telemetry alert fatigue in real-time systems.",
    tag: "AI Core",
    tone: "peach",
    icon: CognitiveLoadIcon,
  },
  {
    title: "Generative UI Architecture",
    description:
      "Using predictive model parameters to design adaptive component schemas that shift fluidly based on intent heuristics.",
    tag: "AI Heuristic",
    tone: "peach",
    icon: GenerativeUIIcon,
  },
  {
    title: "Spatial Interaction Systems",
    description:
      "Designing gestures, reticle locks, and high-contrast tactile interfaces optimized for technical field operators.",
    tag: "Emerging Tech",
    tone: "mint",
    icon: SpatialInteractionIcon,
  },
];

const TAG_STYLES: Record<TagTone, string> = {
  mint: "bg-leaf-soft text-[#0B6B4F] dark:text-[#3ED598]",
  black: "bg-night text-white",
  peach: "bg-terra-soft text-terra-deep",
};

export function Skills() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-portfolio">
        <Reveal>
          <SectionLabel text="System Vector Matrix" className="mb-5" />
          <h2 className="font-display font-semibold text-ink text-[clamp(2rem,3.8vw,3.2rem)] leading-[1.06] tracking-[-0.01em]">
            UX Foundations &amp; AI-Ready Core
          </h2>
        </Reveal>

        <div className="mt-12 md:mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {SKILLS.map((skill, i) => (
            <motion.article
              key={skill.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="group relative rounded-[22px] bg-card border border-border/60 p-6 md:p-7 shadow-[0_8px_30px_-14px_rgba(30,32,34,0.12)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_-16px_rgba(30,32,34,0.2)] hover:border-terra/30"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex items-center justify-center size-11 rounded-xl bg-terra-soft text-terra transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]">
                  <skill.icon className="size-[21px]" aria-hidden="true" />
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-[10.5px] font-medium tracking-[0.02em] ${TAG_STYLES[skill.tone]}`}
                >
                  {skill.tag}
                </span>
              </div>
              <h3 className="mt-5 font-display font-semibold text-ink text-[17.5px] md:text-[19px] leading-snug">
                {skill.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-[1.6] text-ink-soft">{skill.description}</p>
            </motion.article>
          ))}
        </div>

        {/* Script divider */}
        <Reveal delay={0.1} className="mt-12 md:mt-14">
          <div className="flex items-center gap-5">
            <p className="font-script text-terra text-[22px] md:text-[26px] whitespace-nowrap">
              Optimized for 2026 technical requirements.
            </p>
            <span aria-hidden="true" className="h-px flex-1 bg-ink/12" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
