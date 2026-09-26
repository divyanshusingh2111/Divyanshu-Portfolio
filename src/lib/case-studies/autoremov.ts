import type { CaseStudy } from "./types";

/**
 * Autoremov — recreated from the Gauravkumar260/resources Autoremov.svg/.png
 * design reference. A full-stack case study: 25+ pages, 7 audience segments,
 * a design system, a functional editor, and a dual-model pricing UX, all in
 * 8 weeks. Drives the generic CaseStudyPageView + BlockRenderer, with three
 * custom interactive blocks (beforeAfter, calculator, showcase).
 */
export const autoremov: CaseStudy = {
  id: "autoremov",
  index: "02",
  title: "Autoremov Platform",
  subtitle: "AI Background Removal SaaS · Full-Stack",
  cover: "/design-assets/autoremov-card.jpg",
  coverAlt: "Autoremov AI background removal platform — landing page and editor",
  tags: ["AI SaaS", "Design System", "React", "Full-Stack"],
  theme: {
    accent: "#E06A3B",
    accentSoft: "#FCF0EB",
    accentSoftDark: "rgba(224,106,59,0.16)",
    heroBg: "linear-gradient(135deg, #0F1117 0%, #181B20 100%)",
    heroBgDark: "linear-gradient(135deg, #0a0c10 0%, #11141a 100%)",
    heroText: "#FFFFFF",
    heroTextDark: "#F1EEE7",
    closingBg: "linear-gradient(135deg, #11141a 0%, #1b1f27 100%)",
    chrome: "blueprint",
  },
  hero: {
    label: "CASE STUDY 02 · AI BACKGROUND REMOVAL · FULL-STACK DESIGN & DEV",
    title: "Autoremov",
    paragraph:
      "Designing and building the complete web presence for an AI-powered background removal SaaS — from zero to 25+ pages across 7 audience segments, a full design system, functional product editor, and dual-model pricing UX — all in 8 weeks.",
    tags: [
      "At a Glance",
      "Full Stack UX",
      "Design System",
      "Segment Architecture",
      "React + TypeScript",
      "Dark + Light Mode",
    ],
    stats: [
      { value: "25+", label: "Pages Across Segments", tone: "blue" },
      { value: "7", label: "Audience Personas", tone: "purple" },
      { value: "50+", label: "Design System Components", tone: "cyan" },
      { value: "8wk", label: "Timeline", tone: "green" },
      { value: "100+", label: "Iterations Delivered", tone: "orange" },
      { value: "2", label: "Pricing Models", tone: "red" },
    ],
  },
  meta: [
    { label: "Role", value: "Freelance UX/UI Designer & Frontend Developer" },
    { label: "Client", value: "Autoremov, AI Background Removal SaaS" },
    { label: "Timeline", value: "8 Weeks · Full Delivery" },
    { label: "Scope", value: "End-to-End Design + Design System · 25+ Pages" },
    { label: "Tools", value: "Figma · React · TypeScript · Tailwind · Framer Motion" },
    { label: "Year", value: "2024 · Freelance" },
  ],
  sections: [
    {
      id: "problems",
      label: "01 · FOUR CORE PROBLEMS",
      heading: "Each Problem Demanded a Separate",
      headingAccent: "Design Solution.",
      blocks: [
        {
          type: "pills",
          label: "Competitive Audit",
          tone: "neutral",
          items: ["Remove.bg", "Clipping Magic", "Canva", "Slazzer", "PhotoRoom"],
        },
        {
          type: "text",
          lead: true,
          text: "The brief surfaced distinct UX challenges that a generic template approach would have failed entirely. Every problem required its own design architecture, not a shared skin.",
        },
        {
          type: "cards",
          columns: 2,
          cards: [
            {
              eyebrow: "01",
              title: "No Web Presence",
              body: "Autoremov had a working AI product but zero marketing site. Zero pages, zero brand, zero way to communicate value to any buyer persona.",
              tag: "Discovery",
              tone: "blue",
              icon: "square",
            },
            {
              eyebrow: "02",
              title: "Complex Dual Pricing Model",
              body: "Monthly subscription credits AND one-time top-up packs. Most SaaS pricing pages can't handle this cleanly — the UX had to make both intuitive side-by-side.",
              tag: "Pricing UX",
              tone: "purple",
              icon: "square",
            },
            {
              eyebrow: "03",
              title: "7 Very Different Audiences",
              body: "E-commerce, photographers, designers, social media, marketing teams, press rooms, institutions — each with entirely different jobs-to-be-done.",
              tag: "Segmentation",
              tone: "green",
              icon: "square",
            },
            {
              eyebrow: "04",
              title: "Bulk Editor UX Challenge",
              body: "Power users process hundreds of images at once. The editor needed single-image, multi-select batches, per-image download, and ZIP export — without overwhelming beginners.",
              tag: "Power Flows",
              tone: "orange",
              icon: "square",
            },
          ],
        },
      ],
    },
    {
      id: "process",
      label: "02 · 8-WEEK DESIGN PROCESS · 4 PHASES",
      heading: "One Designer. Full Stack.",
      headingAccent: "Zero Compromise.",
      blocks: [
        {
          type: "text",
          text: "Eight weeks. Four phases. Handling UX research, IA, visual design, design system creation, and React/TypeScript implementation end-to-end.",
        },
        {
          type: "stages",
          items: [
            { stage: "W1–2", title: "Discover", body: "Stakeholder kickoff, persona mapping across 7 segments, competitive audit, information architecture.", tone: "blue" },
            { stage: "W2–3", title: "Define", body: "Jobs-to-be-done framework, content model & taxonomy, dual-pricing UX strategy, accessibility & responsive breakpoints.", tone: "purple" },
            { stage: "W3–5", title: "Design", body: "Design system (50+ components, 12 tokens), landing centrepiece, 7 audience pages on one data-driven template, full pricing system.", tone: "cyan" },
            { stage: "W5–8", title: "Develop", body: "Token-mapped Tailwind, React + TypeScript component library, Framer Motion animations, functional batch editor with ZIP export.", tone: "orange" },
          ],
        },
        {
          type: "list",
          ordered: true,
          tone: "neutral",
          items: [
            "Stakeholder kickoff — brand positioning, target users, revenue model.",
            "User persona mapping across 7 audience segments.",
            "Competitive audit — Remove.bg, Clipping Magic, Canva, Slazzer.",
            "Information architecture — site map, user flows, page priority matrix.",
          ],
        },
      ],
    },
    {
      id: "foundation",
      label: "03 · DESIGN SYSTEM · BUILT BEFORE ANY PAGE",
      heading: "The Foundation Everything",
      headingAccent: "Inherits From.",
      blocks: [
        {
          type: "text",
          text: "50+ components, 12 colour tokens, 8 spacing steps, 2 theme modes. Lock the system first — then build the pages.",
        },
        {
          type: "panel",
          title: "System Tokens",
          badge: "12 TOKENS",
          tone: "accent",
          rows: [
            { left: "--electric-blue  #38BDF8", right: "Primary interactive, CTAs, links", tone: "blue" },
            { left: "--neon-purple  #A855F7", right: "Gradient partner, accents", tone: "purple" },
            { left: "--cyan-glow  #06B6D4", right: "Tertiary highlight, API page", tone: "cyan" },
            { left: "--dark-bg  #0F172A", right: "Dark mode page background", tone: "neutral" },
            { left: "--rich-dark  #1E293B", right: "Dark mode card surface", tone: "neutral" },
          ],
          note: "Type ramp — Display: Autoremov · H1: Remove Background · H2: AI-Powered Cutouts · Body: Process thousands in seconds · Labels: UPLOAD · PROCESS · EXPORT",
        },
        {
          type: "stats",
          items: [
            { value: "50+", label: "Components", tone: "accent" },
            { value: "12", label: "Colour Tokens", tone: "blue" },
            { value: "8", label: "Spacing Steps", tone: "purple" },
            { value: "2", label: "Theme Modes", tone: "green" },
          ],
        },
      ],
    },
    {
      id: "deliverables",
      label: "04 · COMPLETE DELIVERABLES · 25+ PAGES",
      heading: "From Zero to Full Product",
      headingAccent: "Web Presence.",
      blocks: [
        {
          type: "cards",
          columns: 3,
          cards: [
            { eyebrow: "Foundation", title: "Design System", body: "50+ components, 12 colour tokens, 8 spacing steps, 2 theme modes (dark/light).", tag: "Shipped", tone: "accent", icon: "check" },
            { eyebrow: "Marketing", title: "Landing Page", body: "8 sections — hero, features, use cases, pricing toggle, API gallery, testimonials.", tag: "Shipped", tone: "blue", icon: "check" },
            { eyebrow: "Product", title: "Product Editor", body: "Multi-image batch processing, ZIP download, comparison slider, dark/light mode.", tag: "Shipped", tone: "purple", icon: "check" },
            { eyebrow: "Segments", title: "7 Use Case Pages", body: "E-commerce, Designers, Photographers, Social Media, Marketing, Press, ID Photos.", tag: "Shipped", tone: "green", icon: "check" },
            { eyebrow: "Pricing", title: "Full Pricing System", body: "Subscription plans, credit top-up store, interactive cost calculator, plan comparison.", tag: "Shipped", tone: "orange", icon: "check" },
            { eyebrow: "Support", title: "12 Supporting Pages", body: "About, API docs, Gallery, Blog, Help, Integrations, Contact, Auto, Dashboard, Settings.", tag: "Shipped", tone: "cyan", icon: "check" },
          ],
        },
      ],
    },
    {
      id: "showcase",
      label: "05 · LIVE SCREENS · ACTUAL DELIVERED PRODUCT",
      heading: "The Final Product —",
      headingAccent: "Shipped & Live.",
      blocks: [
        {
          type: "text",
          text: "Every screen was designed to solve a specific problem for a specific user. Dark/Light mode responsive throughout. These are the actual delivered pages.",
        },
        { type: "showcase" },
      ],
    },
    {
      id: "decisions",
      label: "06 · NON-OBVIOUS DESIGN DECISIONS",
      heading: "Each Decision Driven by a Problem —",
      headingAccent: "Not a Visual Preference.",
      blocks: [
        {
          type: "text",
          text: "These are the choices that are easy to miss from the outside but are load-bearing for conversion and usability.",
        },
        {
          type: "cards",
          columns: 2,
          cards: [
            { eyebrow: "0.01", title: "Editorial bento mosaic over a photo grid", body: "Problem — standard 3-column photo grids look like stock photo libraries. They don't communicate the product's value or tell a story about the user.", tag: "Layout", tone: "accent", icon: "dot" },
            { eyebrow: "0.02", title: "Subscription + top-up in one unified pricing UI", body: "Solution — two-row asymmetric CSS grid (7→5 columns row 1, 3→6→3 on row 2) with stats and captions embedded directly on images as overlays.", tag: "Pricing", tone: "purple", icon: "dot" },
            { eyebrow: "0.03", title: "Horizontal tile strip for batch editor workflow", body: "Outcome — power users keep their place in the queue while scanning dozens of cutouts. Single-image + batch share the same canvas.", tag: "Editor", tone: "blue", icon: "dot" },
            { eyebrow: "0.04", title: "Audience-first use case page architecture", body: "Outcome — one data-driven template renders seven audience pages from structured frontmatter. Quality stays consistent; copy differs.", tag: "Architecture", tone: "green", icon: "dot" },
          ],
        },
      ],
    },
    {
      id: "value-proof",
      label: "07 · INTERACTIVE BEFORE/AFTER HERO",
      heading: "The Landing Page Centrepiece —",
      headingAccent: "Instant Value Proof.",
      blocks: [
        {
          type: "text",
          text: "I designed a drag-to-reveal comparison slider directly on the homepage hero — demonstrating the AI's effectiveness in the first 3 seconds, before the user scrolls. Drag the handle to see the separation.",
        },
        { type: "beforeAfter" },
        {
          type: "callout",
          title: "Dual-model pricing, made instant",
          text: "The cost calculator was the highest-leverage UI element I handled — subscription vs. top-up without copywriting. Drag the volume to see which model wins.",
          tone: "accent",
        },
        { type: "calculator" },
      ],
    },
    {
      id: "tech-stack",
      label: "08 · TECH STACK",
      heading: "Full-Stack Design &",
      headingAccent: "Development.",
      blocks: [
        {
          type: "text",
          text: "One designer, one stack, shipped end-to-end. These are the platforms and cognitive intelligence nodes that powered every implementation.",
        },
        {
          type: "panel",
          title: "Operational Infrastructure",
          badge: "6 TOOLS",
          tone: "accent",
          rows: [
            { left: "Figma", right: "High-fidelity design, design system, prototyping", tone: "accent" },
            { left: "React 18", right: "Component architecture, routing, state management", tone: "blue" },
            { left: "TypeScript", right: "Type-safe props, data models, route params", tone: "purple" },
            { left: "Tailwind CSS", right: "Design token mapping, responsive utilities", tone: "cyan" },
            { left: "Framer Motion", right: "Scroll animations, page transitions, micro-interactions", tone: "green" },
            { left: "Unsplash API", right: "Contextual photography for all 7 use-case galleries", tone: "orange" },
          ],
        },
      ],
    },
  ],
  closing: {
    label: "REFLECTION",
    heading: "What worked, what I'd redo, what I learned.",
    text: "Honest notes on what landed, what I'd do differently, and the key learning I'm carrying into the next engagement.",
    cards: [
      {
        title: "What Worked",
        body: "The segment-first architecture — building 7 audience pages as one data-driven template — meant consistent quality across all segments without 7× the design work. The credit calculator was the highest-leverage UI element; subscription vs. top-up without copywriting.",
        tone: "green",
      },
      {
        title: "What I'd Do Differently",
        body: "I'd establish design system tokens in Figma before writing any component code. The CSS custom property mapping evolved as pages were built, requiring token refactoring mid-project. Locked token set earlier = no dark mode rework.",
        tone: "yellow",
      },
      {
        title: "Key Learning",
        body: "A simple pricing model assumption can invalidate an entire pricing page design. Discovering Autoremov needed both subscription and pay-per-use during week 2 required full redesign. Pricing UX conversations must be the very first design conversation — not a feature discovery.",
        tone: "accent",
      },
    ],
    tone: "accent",
  },
};
