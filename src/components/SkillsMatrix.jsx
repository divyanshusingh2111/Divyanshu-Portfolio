import {
  iconSearch,
  iconConnection,
  iconPrototype,
  iconBrain,
  iconAiMagic,
  iconVrGlasses,
} from "../assets/figma-assets";

const BADGE_STYLES = {
  empirical: "bg-[rgba(16,185,129,0.1)] text-good",
  dark: "bg-ink text-white",
  accentSoft: "bg-[rgba(224,106,59,0.1)] text-accent",
  emerging: "bg-[rgba(16,185,129,0.1)] text-good",
};

const SKILLS = [
  {
    icon: iconSearch,
    badge: "Empirical",
    badgeStyle: BADGE_STYLES.empirical,
    title: "User Research",
    description:
      "Performing field studies, contextual inquiries, and analytical mapping to validate design parameters using factual user heuristics.",
  },
  {
    icon: iconConnection,
    badge: "High Demand",
    badgeStyle: BADGE_STYLES.dark,
    title: "System Wireframing",
    description:
      "Translating messy workflows into high-density wireframes, emphasizing immediate data accessibility and structural balance.",
  },
  {
    icon: iconPrototype,
    badge: "Dynamic UX",
    badgeStyle: BADGE_STYLES.dark,
    title: "Interactive Prototyping",
    description:
      "Building advanced, variable-driven responsive prototype simulations to load-test layout flow logic under actual user testing cycles.",
  },
  {
    icon: iconBrain,
    badge: "AI Core",
    badgeStyle: BADGE_STYLES.accentSoft,
    title: "Cognitive Load Mitigation",
    description:
      "Designing layout prioritization structures to shield users from high-density telemetry alert fatigue in real-time AI cycles.",
  },
  {
    icon: iconAiMagic,
    badge: "AI Heuristic",
    badgeStyle: BADGE_STYLES.accentSoft,
    title: "Generative UI Architecture",
    description:
      "Using predictive model parameters to design adaptive component schemas that shift fluidly based on intent heuristics.",
  },
  {
    icon: iconVrGlasses,
    badge: "Emerging Tech",
    badgeStyle: BADGE_STYLES.emerging,
    title: "Spatial Interaction Systems",
    description:
      "Designing gestures, reticle locks, and high-contrast tactile interfaces optimized for technical field operators.",
  },
];

export default function SkillsMatrix() {
  return (
    <section className="border-t border-line px-6 py-20 md:px-16">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-10">
        <div>
          <p className="mb-4 font-mono text-xs font-bold text-accent">● SYSTEM VECTOR MATRIX</p>
          <h2 className="text-3xl font-bold sm:text-4xl">UX Foundations & AI-Ready Core</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {SKILLS.map((skill) => (
            <div
              key={skill.title}
              className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <img src={skill.icon} alt="" className="size-8" />
                <span className={`rounded-full px-2.5 py-1 font-mono text-[9px] font-bold ${skill.badgeStyle}`}>
                  {skill.badge}
                </span>
              </div>
              <p className="text-base font-medium">{skill.title}</p>
              <p className="text-xs leading-relaxed text-muted">{skill.description}</p>
            </div>
          ))}
        </div>

        <p className="self-end font-hand text-2xl text-accent">
          Optimized for 2026 technical requirements.
        </p>
      </div>
    </section>
  );
}
