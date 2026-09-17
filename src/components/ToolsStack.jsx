import {
  iconFigma,
  iconFramer,
  toolWixIcon,
  iconMiro,
  iconPhotoshop,
  iconIllustrator,
  iconClaude,
  iconGeminiGroup,
  iconCursor,
  iconChatGpt,
  iconNotebookLm,
  iconMidjourney,
} from "../assets/figma-assets";

const DESIGN_TOOLS = [
  { icon: iconFigma, name: "Figma", tag: "Interactive Schemas", dark: false },
  { icon: iconFramer, name: "Framer", tag: "Functional Animation", dark: true },
  { icon: toolWixIcon, name: "Wix Studio", tag: "Production Scale", dark: false, rounded: true },
  { icon: iconMiro, name: "Miro", tag: "Ecosystem Schemas", dark: false, soft: true },
  { icon: iconPhotoshop, name: "Photoshop", tag: "Graphic Heuristics", dark: false, soft: true },
  { icon: iconIllustrator, name: "Illustrator", tag: "Vector Precision", dark: false },
];

const AI_TOOLS = [
  { icon: iconClaude, name: "Claude", tag: "Strategy & Heuristics", round: true },
  { icon: iconGeminiGroup, name: "Gemini", tag: "AI Engineering" },
  { icon: iconCursor, name: "Cursor", tag: "Continuous Dev Stack" },
  { icon: iconChatGpt, name: "ChatGPT", tag: "Ideation Iteration" },
  { icon: iconNotebookLm, name: "NotebookLM", tag: "System Spec Mining" },
  { icon: iconMidjourney, name: "Midjourney", tag: "Concept Ideation", soft: true },
];

function ToolCard({ tool, tagClass }) {
  return (
    <div className="flex items-center gap-3.5 rounded-xl border border-line bg-white p-4 shadow-sm">
      <div
        className={`flex size-7 shrink-0 items-center justify-center overflow-hidden ${
          tool.round ? "rounded-full" : "rounded-md"
        } ${tool.dark ? "bg-ink" : tool.soft ? "bg-card border border-line" : ""}`}
      >
        <img src={tool.icon} alt={tool.name} className="size-6 object-contain" />
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
    <section className="border-t border-line px-6 py-20 md:px-16">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-12">
        <div>
          <p className="mb-4 font-mono text-xs font-bold text-accent">
            ● OPERATIONAL INFRASTRUCTURE
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">Design Engines & AI Co-Pilots</h2>
          <p className="mt-3 max-w-[576px] text-xs leading-relaxed text-muted">
            Every design implementation is powered by a high-efficiency technology stack.
            These core platforms and cognitive intelligence nodes allow me to deploy layouts
            at high velocity.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-line pb-3 font-mono text-xs font-bold">
              <p>Creative Design & Handoff Platforms</p>
              <p className="text-accent">01</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {DESIGN_TOOLS.map((tool) => (
                <ToolCard key={tool.name} tool={tool} tagClass="bg-accent-soft text-accent" />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-line pb-3 font-mono text-xs font-bold">
              <p>AI Workflow Accelerators & Co-Pilots</p>
              <p className="text-good">02</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {AI_TOOLS.map((tool) => (
                <ToolCard
                  key={tool.name}
                  tool={tool}
                  tagClass="bg-[rgba(16,185,129,0.1)] text-good"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
