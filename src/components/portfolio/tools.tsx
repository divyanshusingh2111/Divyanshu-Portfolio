"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionLabel } from "./section-label";
import { Reveal } from "./reveal";
import {
  FigmaIcon,
  FramerIcon,
  MiroIcon,
  ClaudeIcon,
  CursorIcon,
  GeminiIcon,
  ChatGPTIcon,
  PhotoshopIcon,
  IllustratorIcon,
  NotebookLMIcon,
  MidjourneyIcon,
} from "./tool-icons";

type ToolIcon = React.ComponentType<{ className?: string }> | null;

type Tool = {
  name: string;
  tag: string;
  icon: ToolIcon;
  /** Optional raster logo used instead of a component icon */
  image?: string;
};

const CREATIVE_TOOLS: Tool[] = [
  { name: "Figma", tag: "Interactive Schemas", icon: FigmaIcon },
  { name: "Wix Studio", tag: "Production Scale", icon: null, image: "/design-assets/wix-logo.png" },
  { name: "Framer", tag: "Functional Animation", icon: FramerIcon },
  { name: "Miro", tag: "Ecosystem Schemas", icon: MiroIcon },
];

const AI_TOOLS: Tool[] = [
  { name: "Claude", tag: "Strategy & Heuristics", icon: ClaudeIcon },
  { name: "Cursor", tag: "Continuous Dev Stack", icon: CursorIcon },
  { name: "Gemini", tag: "AI Engineering", icon: GeminiIcon },
  { name: "ChatGPT", tag: "Ideation Iteration", icon: ChatGPTIcon },
];

const EXTRA_TOOLS: Tool[] = [
  { name: "Photoshop", tag: "Graphic Neuristics", icon: PhotoshopIcon },
  { name: "Illustrator", tag: "Vector Precision", icon: IllustratorIcon },
  { name: "NotebookLM", tag: "System Spec Mining", icon: NotebookLMIcon },
  { name: "Midjourney", tag: "Concept Ideation", icon: MidjourneyIcon },
];

function ToolCard({ tool, index, accent }: { tool: Tool; index: number; accent: "terra" | "leaf" }) {
  const Icon = tool.icon ?? null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group flex items-center gap-4 rounded-[18px] bg-card border border-border/60 pl-4 pr-5 py-4 shadow-[0_6px_24px_-12px_rgba(30,32,34,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_-14px_rgba(30,32,34,0.18)] hover:border-terra/30"
    >
      <span className="inline-flex items-center justify-center size-11 rounded-xl bg-cream-deep shrink-0 overflow-hidden transition-transform duration-300 group-hover:scale-110">
        {tool.image ? (
          <Image src={tool.image} alt={`${tool.name} logo`} width={26} height={26} className="object-contain" />
        ) : Icon ? (
          /* Decorative — the tool name is the adjacent text label; hides the
             role="img" that the brand icon components set without an accname */
          <Icon className="size-[24px]" aria-hidden="true" focusable="false" />
        ) : null}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display font-semibold text-ink text-[15px] leading-tight">
          {tool.name}
        </span>
        <span
          className={`mt-1 inline-block rounded-full px-2.5 py-[3px] text-[10px] font-medium ${
            accent === "terra" ? "bg-terra-soft text-terra-deep" : "bg-leaf-soft text-[#0B6B4F] dark:text-[#3ED598]"
          }`}
        >
          {tool.tag}
        </span>
      </span>
    </motion.div>
  );
}

export function Tools() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-portfolio">
        {/* Section header */}
        <Reveal>
          <SectionLabel text="Operational Infrastructure" className="mb-5" />
          <h2 className="font-display font-semibold text-ink text-[clamp(2rem,3.8vw,3.2rem)] leading-[1.06] tracking-[-0.01em]">
            Design Engines &amp; AI Co-Pilots
          </h2>
          <p className="mt-5 text-[14.5px] md:text-[15.5px] leading-[1.65] text-ink-soft max-w-[640px]">
            Every design implementation is powered by a high-efficiency technology stack. These
            core platforms and cognitive intelligence nodes allow me to deploy layouts at high
            velocity.
          </p>
        </Reveal>

        {/* Tool columns */}
        <div className="mt-12 md:mt-14 grid lg:grid-cols-2 gap-10 lg:gap-12">
          {/* Column 01 — Creative */}
          <div>
            <div className="flex items-end justify-between border-b border-ink/12 pb-4 mb-6">
              <h3 className="font-display font-semibold text-ink text-[16.5px] md:text-[18px]">
                Creative Design &amp; Handoff Platforms
              </h3>
              <span className="font-display font-semibold text-terra text-[28px] md:text-[32px] leading-none">
                01
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {CREATIVE_TOOLS.map((tool, i) => (
                <ToolCard key={tool.name} tool={tool} index={i} accent="terra" />
              ))}
            </div>
          </div>

          {/* Column 02 — AI */}
          <div>
            <div className="flex items-end justify-between border-b border-ink/12 pb-4 mb-6">
              <h3 className="font-display font-semibold text-ink text-[16.5px] md:text-[18px]">
                AI Workflow Accelerators &amp; Co-Pilots
              </h3>
              <span className="font-display font-semibold text-leaf text-[28px] md:text-[32px] leading-none">
                02
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {AI_TOOLS.map((tool, i) => (
                <ToolCard key={tool.name} tool={tool} index={i} accent="leaf" />
              ))}
            </div>
          </div>
        </div>

        {/* Extra tools row */}
        <div className="mt-8 md:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {EXTRA_TOOLS.map((tool, i) => (
            <ToolCard key={tool.name} tool={tool} index={i} accent="terra" />
          ))}
        </div>
      </div>
    </section>
  );
}
