import { quoteMarkAccent, timelineRailWork } from "../assets/figma-assets";

const TRAITS = ["Detail-oriented", "System Thinker", "Empathetic", "Collaborative"];

const STATS = [
  { value: "10", color: "text-accent", label: "Projects Completed" },
  { value: "500+", color: "text-good", label: "Users Impacted" },
  { value: "40%", color: "text-ink", label: "Avg. Efficiency Increase" },
  { value: "5+", color: "text-accent", label: "Happy Clients" },
];

const DO_ITEMS = [
  { emoji: "🧭", label: "UX Strategy" },
  { emoji: "🎨", label: "Product Design" },
  { emoji: "📊", label: "Data Visualization" },
  { emoji: "⚙️", label: "Design Systems" },
  { emoji: "🕶️", label: "AR/AI Experiences" },
  { emoji: "🏷️", label: "Brand Identity" },
];

export default function AboutMe() {
  return (
    <section id="about" className="border-t border-line px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-16 lg:flex-row">
        <div className="flex flex-1 flex-col gap-8">
          <p className="font-mono text-xs font-bold text-accent">● ABOUT ME</p>
          <h2 className="text-4xl leading-tight font-bold sm:text-5xl">
            I'm Divyanshu, a UX Designer &{" "}
            <span className="font-hand font-bold text-accent">Problem Solver.</span>
          </h2>

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
                className="rounded-full border border-line bg-white px-4 py-2 font-mono text-[11px] shadow-sm"
              >
                {trait}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="mt-2 font-mono text-[9px] text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <div className="relative overflow-hidden rounded-2xl bg-[#1c1f26] p-8 text-white shadow-md">
            <p className="font-mono text-xs text-[#8f949e]">DESIGN PHILOSOPHY</p>
            <img
              src={quoteMarkAccent}
              alt=""
              className="pointer-events-none absolute top-14 right-8 w-16 opacity-70"
            />
            <p className="relative mt-8 max-w-[90%] text-lg leading-relaxed">
              "Good design is not just how it looks, but how it works and feels."
            </p>
            <img src={timelineRailWork} alt="" className="mt-6 w-32" />
          </div>

          <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
            <p className="font-mono text-[9px] font-bold text-muted">● WHAT I DO</p>
            <h3 className="mt-3 text-xl font-bold">
              Areas I bring <span className="font-hand font-bold text-accent">value</span> to:
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {DO_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-lg border border-line bg-bg p-3"
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
