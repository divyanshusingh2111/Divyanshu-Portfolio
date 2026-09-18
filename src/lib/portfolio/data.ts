import {
  SearchIcon,
  ConnectionIcon,
  PrototypeIcon,
  BrainIcon,
  AiMagicIcon,
  VrGlassesIcon,
  FigmaMark,
  FramerMark,
  WixMark,
  MiroMark,
  PhotoshopMark,
  IllustratorMark,
  ClaudeMark,
  GeminiMark,
  CursorMark,
  ChatGptMark,
  NotebookLmMark,
  MidjourneyMark,
} from "@/components/portfolio/icons";

export type Project = {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  tags: string[];
  thumb: string;
  thumbBg: string;
  year: string;
  role: string;
  duration: string;
  summary: string;
  challenge: string;
  approach: string[];
  outcomes: { label: string; value: string }[];
  gallery: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "klimashift",
    index: "01",
    title: "KlimaShift",
    subtitle: "AI Energy Intelligence Platform",
    tags: ["Dashboard", "AI", "SaaS"],
    thumb: "/portfolio/work-klimashift.png",
    thumbBg: "bg-bg",
    year: "2024",
    role: "Lead UX Designer",
    duration: "Ongoing",
    summary:
      "An AI-powered energy intelligence platform that turns dense telemetry into decisive operator action across enterprise energy portfolios.",
    challenge:
      "Operators were drowning in real-time alerts with no clear path from signal to action. The system needed to compress cognitive load while increasing decision velocity.",
    approach: [
      "Ran contextual field studies with grid operators to map alert-to-action loops.",
      "Designed an adaptive component system that surfaces only intent-relevant telemetry per role.",
      "Built variable-driven prototypes to load-test information density under live conditions.",
      "Shipped a generative UI layer that restructures dashboards based on predicted operator intent.",
    ],
    outcomes: [
      { label: "Alert fatigue", value: "−62%" },
      { label: "Decision velocity", value: "+40%" },
      { label: "Operator NPS", value: "58" },
      { label: "Rollout", value: "Enterprise" },
    ],
    gallery: ["/portfolio/work-klimashift.png"],
  },
  {
    slug: "autoremov",
    index: "02",
    title: "Autoremov Platform",
    subtitle: "SaaS platform and Website",
    tags: ["Service", "Image Background", "Web"],
    thumb: "/portfolio/work-autoremov.png",
    thumbBg: "bg-gradient-to-b from-card to-bg",
    year: "2023",
    role: "Product & Brand Designer",
    duration: "5 months",
    summary:
      "A high-velocity background-removal SaaS paired with a conversion-led marketing site built for image-heavy commerce workflows.",
    challenge:
      "The product was technically strong but the conversion funnel leaked at the trial-to-paid step due to weak onboarding and unclear value framing.",
    approach: [
      "Re-architected the onboarding flow into a single-screen guided first-run.",
      "Designed a before-after editor surface that proves value within 8 seconds.",
      "Built a marketing system that mirrors the editor's mental model end-to-end.",
      "Shipped a pricing matrix that maps plan features to operator intent, not raw limits.",
    ],
    outcomes: [
      { label: "Trial conversion", value: "+34%" },
      { label: "Activation time", value: "−58%" },
      { label: "Bounce rate", value: "−21%" },
      { label: "MRR growth", value: "2.4×" },
    ],
    gallery: ["/portfolio/work-autoremov.png"],
  },
  {
    slug: "trivira",
    index: "03",
    title: "Trivira Global Branding",
    subtitle: "Branding & Packaging Design",
    tags: ["Branding", "Packaging", "Web"],
    thumb: "/portfolio/work-trivira.png",
    thumbBg: "bg-gradient-to-b from-card to-bg",
    year: "2022",
    role: "Brand & Packaging Designer",
    duration: "4 months",
    summary:
      "An end-to-end global brand identity and packaging system for a premium consumer lifestyle label entering three regional markets.",
    challenge:
      "The brand needed to feel premium and consistent across packaging, digital, and retail — while flexing to three regional visual languages without dilution.",
    approach: [
      "Built a modular identity system with adaptive logo lockups for each market.",
      "Designed a packaging matrix balancing shelf impact with cost-efficient print runs.",
      "Defined motion and tone-of-voice guidelines that translate cleanly across cultures.",
      "Shipped a brand guideline portal for internal teams and external vendors.",
    ],
    outcomes: [
      { label: "Market launch", value: "3 regions" },
      { label: "Shelf recall", value: "+27%" },
      { label: "Brand consistency", value: "94%" },
      { label: "Vendor onboarding", value: "−65%" },
    ],
    gallery: ["/portfolio/work-trivira.png"],
  },
];

export const EXPERIENCE = [
  {
    role: "Lead UX Designer",
    org: "KlimaShift",
    period: "2023 Sep - Present",
    active: true,
    description:
      "Leading UX strategy and product design for AI-powered energy intelligence systems, operational dashboards, and enterprise workflows.",
  },
  {
    role: "UI/UX Designer",
    org: "Quantmhill IT Service & Consultancy",
    period: "2023 Apr - 2023 Sep",
    description:
      "Designed enterprise software interfaces and usability-focused operational workflows for consulting and IT services clients.",
  },
  {
    role: "UI/UX Designer",
    org: "Learniphi Technology Pvt. Ltd.",
    period: "2022 Sep - 2023 Mar",
    description:
      "Designed gamified educational systems and enterprise learning experiences focused on engagement and completion optimization.",
  },
  {
    role: "Freelance Product & Brand Designer",
    org: null,
    period: "2020 Aug - Present",
    description:
      "Designing digital commerce systems, branding ecosystems, and scalable visual experiences for startups and growing businesses.",
  },
];

export const EDUCATION = [
  {
    degree: "M.Des in UX Design",
    tag: "[ POSTGRADUATE // 2025 — 2027 ]",
    active: true,
    description:
      "DIT University. Focusing on advanced interaction architectures, data accessibility systems, and strategic enterprise software design patterns.",
  },
  {
    degree: "M.Sc in UX Design & Management",
    tag: "[ INTERNATIONAL SPEC // GÖTTINGEN, GERMANY ]",
    description:
      "PFH University of Applied Sciences. Enrolled in international postgrad systems. Decoupled after 1 year of study (2023 - 2024) to transition fully into high-impact product leadership at KlimaShift.",
  },
  {
    degree: "Bachelor of Design (B.Des) in Industrial Design",
    tag: "[ UNDERGRADUATE // 2018 — 2022 ]",
    description:
      "Uttar Pradesh Institute of Design (UPID), Noida. Specialized in physical ergonomics, systems modeling, and user-centered design—building a core foundation for translating complex physical-to-digital structures.",
  },
];

export const SKILLS = [
  {
    icon: SearchIcon,
    badge: "Empirical",
    badgeStyle: "bg-[rgba(16,185,129,0.1)] text-good",
    title: "User Research",
    description:
      "Performing field studies, contextual inquiries, and analytical mapping to validate design parameters using factual user heuristics.",
  },
  {
    icon: ConnectionIcon,
    badge: "High Demand",
    badgeStyle: "bg-ink text-white",
    title: "System Wireframing",
    description:
      "Translating messy workflows into high-density wireframes, emphasizing immediate data accessibility and structural balance.",
  },
  {
    icon: PrototypeIcon,
    badge: "Dynamic UX",
    badgeStyle: "bg-ink text-white",
    title: "Interactive Prototyping",
    description:
      "Building advanced, variable-driven responsive prototype simulations to load-test layout flow logic under actual user testing cycles.",
  },
  {
    icon: BrainIcon,
    badge: "AI Core",
    badgeStyle: "bg-[rgba(224,106,59,0.1)] text-accent",
    title: "Cognitive Load Mitigation",
    description:
      "Designing layout prioritization structures to shield users from high-density telemetry alert fatigue in real-time AI cycles.",
  },
  {
    icon: AiMagicIcon,
    badge: "AI Heuristic",
    badgeStyle: "bg-[rgba(224,106,59,0.1)] text-accent",
    title: "Generative UI Architecture",
    description:
      "Using predictive model parameters to design adaptive component schemas that shift fluidly based on intent heuristics.",
  },
  {
    icon: VrGlassesIcon,
    badge: "Emerging Tech",
    badgeStyle: "bg-[rgba(16,185,129,0.1)] text-good",
    title: "Spatial Interaction Systems",
    description:
      "Designing gestures, reticle locks, and high-contrast tactile interfaces optimized for technical field operators.",
  },
];

export const DESIGN_TOOLS = [
  { icon: FigmaMark, name: "Figma", tag: "Interactive Schemas", dark: false, soft: false },
  { icon: FramerMark, name: "Framer", tag: "Functional Animation", dark: true, soft: false },
  { icon: WixMark, name: "Wix Studio", tag: "Production Scale", dark: false, soft: false, rounded: true },
  { icon: MiroMark, name: "Miro", tag: "Ecosystem Schemas", dark: false, soft: true },
  { icon: PhotoshopMark, name: "Photoshop", tag: "Graphic Heuristics", dark: false, soft: true },
  { icon: IllustratorMark, name: "Illustrator", tag: "Vector Precision", dark: false, soft: false },
];

export const AI_TOOLS = [
  { icon: ClaudeMark, name: "Claude", tag: "Strategy & Heuristics", round: true },
  { icon: GeminiMark, name: "Gemini", tag: "AI Engineering" },
  { icon: CursorMark, name: "Cursor", tag: "Continuous Dev Stack" },
  { icon: ChatGptMark, name: "ChatGPT", tag: "Ideation Iteration" },
  { icon: NotebookLmMark, name: "NotebookLM", tag: "System Spec Mining" },
  { icon: MidjourneyMark, name: "Midjourney", tag: "Concept Ideation", soft: true },
];

export const TRAITS = ["Detail-oriented", "System Thinker", "Empathetic", "Collaborative"];

export const STATS = [
  { value: 10, suffix: "", color: "text-accent", label: "Projects Completed" },
  { value: 500, suffix: "+", color: "text-good", label: "Users Impacted" },
  { value: 40, suffix: "%", color: "text-ink", label: "Avg. Efficiency Increase" },
  { value: 5, suffix: "+", color: "text-accent", label: "Happy Clients" },
];

export const DO_ITEMS = [
  { emoji: "🧭", label: "UX Strategy" },
  { emoji: "🎨", label: "Product Design" },
  { emoji: "📊", label: "Data Visualization" },
  { emoji: "⚙️", label: "Design Systems" },
  { emoji: "🕶️", label: "AR/AI Experiences" },
  { emoji: "🏷️", label: "Brand Identity" },
];

// New: process / methodology steps.
export const PROCESS_STEPS = [
  {
    no: "01",
    title: "Discover",
    desc: "Field studies, stakeholder interviews, and heuristic audits to map the real problem — not the symptom.",
  },
  {
    no: "02",
    title: "Define",
    desc: "Synthesize findings into a focused problem frame, success metrics, and an intent-driven component strategy.",
  },
  {
    no: "03",
    title: "Design",
    desc: "Variable-driven wireframes and interactive prototypes load-tested against real operator density.",
  },
  {
    no: "04",
    title: "Ship",
    desc: "Hand-off-grade specs, design tokens, and a living system that survives the next quarter's pivot.",
  },
];

// New: FAQ entries.
export const FAQS = [
  {
    q: "What kind of projects do you take on?",
    a: "Product design, UX strategy, enterprise dashboards, design systems, and emerging AI/AR experiences. I lean toward high-complexity, high-impact work.",
  },
  {
    q: "Are you open to full-time or contract roles?",
    a: "Both. I'm currently Lead UX Designer at KlimaShift and selectively take on contract work that doesn't conflict with that engagement.",
  },
  {
    q: "How do you usually start an engagement?",
    a: "A 60-minute discovery call to align on the problem, constraints, and success metrics. From there I propose a scoped first sprint — never a months-long blind commitment.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Yes — particularly pre-seed and seed-stage teams that need to get from idea to first credible product fast. I can flex between design and lightweight front-end prototyping.",
  },
  {
    q: "What's your typical turnaround for a v1?",
    a: "For a focused product surface, 2–4 weeks end to end — research, wireframes, interactive prototype, and hand-off specs.",
  },
];

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Resume", href: "#contact" },
];

export const CONTACT_EMAIL = "divyanshuv.singh@gmail.com";
export const CONTACT_LINKEDIN = "https://www.linkedin.com/in/divyanshu-singh-2308671b2";
export const CONTACT_BEHANCE = "https://www.behance.net/divyanshu2009f";

export const FOOTER_LINKS = [
  { label: "EMAIL", href: `mailto:${CONTACT_EMAIL}` },
  { label: "LINKEDIN", href: CONTACT_LINKEDIN },
  { label: "BEHANCE", href: CONTACT_BEHANCE },
  { label: "RESUME DOWNLOAD", href: "/resume.pdf" },
];
