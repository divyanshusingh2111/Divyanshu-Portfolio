"use client";

import { motion } from "framer-motion";
import { DESIGN_TOOLS, AI_TOOLS } from "@/lib/portfolio/data";
import SectionHeading from "./SectionHeading";

type Tool = {
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  name: string;
  tag: string;
  dark?: boolean;
  soft?: boolean;
  rounded?: boolean;
  round?: boolean;
};

function ToolCard({ tool, tagClass }: { tool: Tool; tagClass: string }) {
  const Icon = tool.icon;
  return (
    <div className="tool-card flex items-center gap-3.5 rounded-xl border border-line bg-surface p-4 shadow-sm">
      <div
        className={`tool-icon-wrap flex size-7 shrink-0 items-center justify-center overflow-hidden transition-colors ${
          tool.round ? "rounded-full" : "rounded-md"
        } ${tool.dark ? "bg-ink" : tool.soft ? "bg-card border border-line" : ""}`}
      >
        <Icon className="size-6 object-contain" />
      </div>
      <div>
        <p className="font-mono text-xs font-bold">{tool.name}</p>
        <span className={`mt-1 inline-block rounded px-1.5 py-0.5 font-mono text-[8.3px] ${tagClass}`}>
          {tool.tag}
        </span>
      </div>
    </div>
  );
}

export default function ToolsStack() {
  return (
    <section id="tools" className="border-t border-line px-6 py-20 md:px-16">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-12">
        <SectionHeading
          id="tools"
          label="● OPERATIONAL INFRASTRUCTURE"
          title={
            <>
              Design Engines &amp;{" "}
              <span className="font-hand font-bold text-accent">AI Co-Pilots</span>
            </>
          }
          subtitle={
            <p className="max-w-[576px] text-xs leading-relaxed text-muted">
              Every design implementation is powered by a high-efficiency technology stack.
              These core platforms and cognitive intelligence nodes allow me to deploy layouts
              at high velocity.
            </p>
          }
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center justify-between border-b border-line pb-3 font-mono text-xs font-bold">
              <p>Creative Design &amp; Handoff Platforms</p>
              <p className="text-accent">01</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {DESIGN_TOOLS.map((tool) => (
                <ToolCard key={tool.name} tool={tool as Tool} tagClass="bg-accent-soft text-accent" />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center justify-between border-b border-line pb-3 font-mono text-xs font-bold">
              <p>AI Workflow Accelerators &amp; Co-Pilots</p>
              <p className="text-good">02</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {AI_TOOLS.map((tool) => (
                <ToolCard
                  key={tool.name}
                  tool={tool as Tool}
                  tagClass="bg-[rgba(16,185,129,0.1)] text-good"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
