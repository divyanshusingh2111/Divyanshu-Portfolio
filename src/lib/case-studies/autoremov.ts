import type { CaseStudy } from "./types";

export const autoremov: CaseStudy = {
  id: "autoremov",
  index: "02",
  title: "Autoremov",
  subtitle: "AI Background Removal SaaS",
  cover: "/design-assets/autoremov-card.jpg",
  coverAlt: "Autoremov AI background removal SaaS landing page with before/after comparison hero",
  tags: ["AI SaaS", "Full-Stack UX", "Design System"],
  theme: {
    accent: "#3B82F6",
    accentSoft: "#E8F0FE",
    accentSoftDark: "rgba(59,130,246,0.16)",
    heroBg: "linear-gradient(135deg, #0B1120 0%, #1E293B 100%)",
    heroText: "#FFFFFF",
    closingBg: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
    chrome: "blueprint",
  },
  hero: {
    label: "CASE STUDY 02 · AI SAAS · FULL-STACK DESIGN & DEV · FREELANCE 2024",
    labelPills: [
      { text: "CASE STUDY 02", tone: "blue" },
      { text: "AI SAAS · FULL-STACK DESIGN & DEV", tone: "purple" },
      { text: "FREELANCE 2024", tone: "cyan" },
    ],
    title: "Autoremov",
    paragraph:
      "Designing and building the complete web presence for an AI-powered background removal SaaS — from zero to 25+ pages across 7 audience segments, a full design system, functional product editor, and dual-model pricing UX — all in 8 weeks.",
    tags: ["AI SaaS", "Full-Stack UX", "Design System", "7-Segment Architecture", "React + TypeScript", "Dark / Light Mode"],
    stats: [
      { value: "25+", label: "Pages Designed & Built", tone: "blue" },
      { value: "7", label: "Audience Segment Pages", tone: "purple" },
      { value: "50+", label: "Design System Components", tone: "cyan" },
      { value: "8wk", label: "End-to-End Delivery", tone: "green" },
      { value: "100+", label: "ID Format Presets", tone: "orange" },
      { value: "2", label: "Theme Modes (Dark/Light)", tone: "red" },
    ],
    footerStrip: {
      label: "COMPETITIVE AUDIT",
      items: ["Remove.bg", "Clipping Magic", "Canva", "Slazzer", "PhotoRoom"],
    },
  },
  meta: [
    { label: "Role", value: "Freelance UX/UI Designer & Frontend Developer" },
    { label: "Client", value: "Autoremov · AI Background Removal SaaS" },
    { label: "Timeline", value: "8 Weeks · Full Project Delivery" },
    { label: "Scope", value: "End-to-End Design · Design System · 25+ Pages" },
    { label: "Tools", value: "Figma · React · TypeScript · Tailwind · Framer Motion" },
    { label: "Year", value: "2024 · Freelance Engagement" },
  ],
  sections: [
    {
      id: "problems",
      label: "01 · FOUR CORE PROBLEMS",
      heading: "Each Problem Demanded a Separate",
      headingAccent: "Design Solution",
      blocks: [
        {
          type: "text",
          lead: true,
          text: "The brief surfaced distinct UX challenges that a generic template approach would have failed entirely. Every problem required its own design architecture, not a shared skin.",
        },
        {
          type: "cards",
          columns: 4,
          tone: "blue",
          cards: [
            { title: "No Web Presence", body: "Autoremov had a working AI product but zero marketing site. Zero pages, zero brand, zero way to communicate value to any buyer persona.", icon: "square" },
            { title: "Complex Dual Pricing Model", body: "Monthly subscription credits AND one-time top-up packs. Most SaaS pricing pages can't handle this cleanly — the UX had to make both intuitive side-by-side.", icon: "square" },
            { title: "7 Very Different Audiences", body: "E-commerce, photographers, designers, social media, marketing teams, press rooms, institutions — each with entirely different jobs-to-be-done.", icon: "square" },
            { title: "Bulk Editor UX Challenge", body: "Power users process hundreds of images at once. The editor needed single images, multi-select batches, per-image download, and ZIP export — without overwhelming beginners.", icon: "square" },
          ],
        },
      ],
    },
    {
      id: "process",
      label: "02 · 8-WEEK DESIGN PROCESS — 4 PHASES",
      heading: "One Designer. Full Stack.",
      headingAccent: "Zero Compromise.",
      blocks: [
        { type: "text", text: "Eight weeks. Four phases. Handling UX research, IA, visual design, design system creation, and React/TypeScript implementation end-to-end." },
        {
          type: "phases",
          items: [
            {
              weeks: "1–2",
              name: "Discover",
              steps: [
                "Stakeholder kickoff — brand positioning, target users, revenue model",
                "Competitive audit — Remove.bg, Clipping Magic, Canva, Slazzer",
                "User persona mapping across 7 audience segments",
                "Information architecture — site map, user flows, page priority matrix",
              ],
            },
            {
              weeks: "2–3",
              name: "Define",
              steps: [
                "Dual pricing model mapping — subscription plans vs credit packs",
                "7-segment page architecture — one data-driven template",
                "Design principles — token-first system, dark/light parity",
                "Wireframes — landing, editor, pricing and dashboard skeletons",
              ],
            },
            {
              weeks: "3–6",
              name: "Design",
              steps: [
                "Design system — 50+ components, 12 colour tokens, 8 spacing steps",
                "Landing page — 8 sections with interactive before/after hero",
                "Product editor — single image and batch modes, export flows",
                "Pricing system — subscription, credit packs, cost calculator",
              ],
            },
            {
              weeks: "6–8",
              name: "Develop",
              steps: [
                "React + TypeScript build — component architecture and routing",
                "Tailwind token mapping — design tokens to utility classes",
                "Framer Motion — scroll reveals, transitions, AnimatePresence",
                "QA & ship — responsive + dark/light verification across 25+ pages",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "design-system",
      label: "03 · DESIGN SYSTEM — BUILT BEFORE ANY PAGE",
      heading: "The Foundation Everything",
      headingAccent: "Inherits From",
      blocks: [
        { type: "text", text: "50+ components, 12 colour tokens, 8 spacing steps, 2 theme modes. Lock the system first — then build the pages." },
        {
          type: "tokens",
          tokens: [
            { name: "--electric-blue", hex: "#3B82F6", usage: "Primary interactive, CTAs, links" },
            { name: "--neon-purple", hex: "#8B5CF6", usage: "Gradient partner, accents" },
            { name: "--cyan-glow", hex: "#06B6D4", usage: "Tertiary highlight, API page" },
            { name: "--dark-bg", hex: "#0F172A", usage: "Dark mode page background" },
            { name: "--rich-dark", hex: "#1E293B", usage: "Dark mode card surface" },
          ],
          typeRamp: [
            { label: "DISPLAY", text: "Autoremov", level: "display" },
            { label: "HEADING 1", text: "Remove Background", level: "h1" },
            { label: "HEADING 2", text: "AI-Powered Cutouts", level: "h2" },
            { label: "BODY", text: "Process thousands of images in seconds", level: "body" },
            { label: "LABEL / MONO", text: "UPLOAD · PROCESS · EXPORT", level: "mono" },
          ],
        },
        {
          type: "stats",
          items: [
            { value: "50+", label: "Components", tone: "blue" },
            { value: "12", label: "Colour Tokens", tone: "purple" },
            { value: "8", label: "Spacing Steps", tone: "cyan" },
            { value: "2", label: "Theme Modes", tone: "green" },
          ],
        },
      ],
    },
    {
      id: "deliverables",
      label: "04 · COMPLETE DELIVERABLES — 25+ PAGES",
      heading: "From Zero to Full Product",
      headingAccent: "Web Presence",
      blocks: [
        {
          type: "cards",
          columns: 3,
          tone: "blue",
          cards: [
            { title: "Design System", body: "50+ components, 12 colour tokens, 8 spacing steps, 2 theme modes (dark/light)", icon: "square" },
            { title: "Landing Page", body: "8 sections — hero, features, use cases, pricing toggle, API, gallery, testimonials", icon: "square" },
            { title: "Product Editor", body: "Multi-image batch processing, ZIP download, comparison slider, dark/light mode", icon: "square" },
            { title: "7 Use Case Pages", body: "E-commerce, Designers, Photographers, Social Media, Marketing, Press, ID Photos", icon: "square" },
            { title: "Full Pricing System", body: "Subscription plans, credit top-up store, interactive cost calculator, plan comparison", icon: "square" },
            { title: "12 Supporting Pages", body: "About, API docs, Gallery, Blog, Help, Integrations, Contact, Auth, Dashboard, Settings", icon: "square" },
          ],
        },
      ],
    },
    {
      id: "live-screens",
      label: "05 · LIVE SCREENS — ACTUAL DELIVERED PRODUCT",
      heading: "The Final Product —",
      headingAccent: "Shipped & Live",
      blocks: [
        { type: "text", text: "Every screen was designed to solve a specific problem for a specific user. Dark/light mode responsive throughout. These are the actual delivered pages." },
        {
          type: "gallery",
          columns: 2,
          images: [
            { src: "/design-assets/case-studies/autoremov-landing.jpg", alt: "Autoremov landing page hero in light mode with the before/after comparison slider", w: 1600, h: 1129, browserUrl: "autoremov.com", frameTag: "LIGHT MODE" },
            { src: "/design-assets/case-studies/autoremov-pricing.jpg", alt: "Autoremov credit-based pricing section with plan cards", w: 1600, h: 1236, browserUrl: "autoremov.com", frameTag: "CREDIT PRICING" },
          ],
        },
        {
          type: "annotations",
          items: [
            { label: "HERO + INSTANT TRY", text: "Live upload CTA above fold — demonstrates value before any scroll. Side-by-side before/after portrait." },
            { label: "7-CARD USE CASE GRID", text: "E-commerce · Designers · Photographers · Social Media · Marketing · Press · ID Photos — segment-first nav." },
            { label: "FEATURE GRID", text: "Icons + captions — Instant, Precise, Scalable, API-ready. Social proof numbers embedded in-line." },
            { label: "PRICING TOGGLE", text: "Subscription / Credit-based in one view. Cost calculator below answers the model comparison objection." },
          ],
        },
        { type: "subheading", text: "Dashboard · Grid View & List View" },
        {
          type: "gallery",
          columns: 2,
          images: [
            { src: "/design-assets/case-studies/autoremov-dashboard-grid.jpg", alt: "Autoremov dashboard in grid view with KPI metric cards and image thumbnails", w: 1200, h: 1546, browserUrl: "autoremov.com/dashboard", frameTag: "GRID VIEW" },
            { src: "/design-assets/case-studies/autoremov-dashboard-list.jpg", alt: "Autoremov dashboard in list view with file names, dates and sizes", w: 1200, h: 1380, browserUrl: "autoremov.com/dashboard", frameTag: "LIST VIEW" },
          ],
        },
        {
          type: "annotations",
          items: [
            { label: "4 KPI METRIC CARDS", text: "127 Images Processed · 43 This Month · 2.4 GB Storage · 2.3s Avg Time — at-a-glance usage health." },
            { label: "GRID / LIST TOGGLE", text: "Grid mode for visual scanning of processed images; List mode for file management with names and sizes." },
            { label: "SEARCH + FILTER", text: "Instant search across image library. Filter by status/date. Both modes respond to the same query state." },
            { label: "NEW IMAGE CTA BANNER", text: "Persistent mid-page prompt — 'Ready to process more images?' — reduces the path to the next job to 1 click." },
          ],
        },
        { type: "subheading", text: "Product Editor · Single Image & Batch Mode" },
        {
          type: "gallery",
          columns: 2,
          images: [
            { src: "/design-assets/case-studies/autoremov-editor-single.jpg", alt: "Autoremov product editor in single image mode with tools sidebar and empty upload canvas", w: 1200, h: 931, browserUrl: "autoremov.com/editor", frameTag: "SINGLE IMAGE" },
            { src: "/design-assets/case-studies/autoremov-editor-batch.jpg", alt: "Autoremov product editor in batch mode with processed thumbnails strip and success toast", w: 1200, h: 815, browserUrl: "autoremov.com/editor", frameTag: "BATCH MODE" },
          ],
        },
        {
          type: "annotations",
          items: [
            { label: "SPLIT PANEL LAYOUT", text: "Tools & Settings sidebar (280px) + full-bleed canvas. Every control accessible without canvas overlap." },
            { label: "EXPORT OPTIONS", text: "Download PNG · JPG · ZIP · Save to Gallery · Share — all visible in left panel before processing starts." },
            { label: "HORIZONTAL BATCH STRIP", text: "Processed images pinned to bottom edge as thumbnail tiles. Per-image download + bulk ZIP — canvas always visible." },
            { label: "SUCCESS TOAST", text: "'Background removed successfully!' green toast confirms processing without interrupting the canvas workflow." },
          ],
        },
        { type: "subheading", text: "Pricing System · Subscription & Credit-Based" },
        {
          type: "gallery",
          columns: 2,
          images: [
            { src: "/design-assets/case-studies/autoremov-pricing-plans.jpg", alt: "Autoremov subscription pricing page with plan cards and comparison table", w: 1100, h: 5861, browserUrl: "autoremov.com/pricing", frameTag: "SUBSCRIPTION PLANS", tall: true },
            { src: "/design-assets/case-studies/autoremov-pricing-credits.jpg", alt: "Autoremov credit pack store with pack sizes and volume discounts", w: 1100, h: 5071, browserUrl: "autoremov.com/pricing/credits", frameTag: "CREDIT PACKS", tall: true },
          ],
        },
        {
          type: "annotations",
          items: [
            { label: "PAY ONCE USE FOREVER", text: "Headline positions credit model as ownership vs. recurring cost — reduces commitment anxiety for one-off users." },
            { label: "PLAN COMPARISON TABLE", text: "Starter · Basic · Pro · Business · Custom — features matrix lets users self-qualify without sales contact." },
            { label: "CREDIT PACK STORE", text: "10 to 1K credits — 8 pack sizes with volume discount. 'Popular' badge on 50-credit tier drives mid-tier selection." },
            { label: "COST CALCULATOR", text: "Interactive slider: 'How many images per month?' → auto-calculates cheapest option. Removes pricing decision friction." },
          ],
        },
        { type: "subheading", text: "Settings System & About Page" },
        {
          type: "gallery",
          columns: 2,
          images: [
            { src: "/design-assets/case-studies/autoremov-settings-notifications.jpg", alt: "Autoremov settings page with notification preference toggles", w: 1200, h: 837, browserUrl: "autoremov.com/settings/notifications", frameTag: "NOTIFICATIONS" },
            { src: "/design-assets/case-studies/autoremov-settings-billing.jpg", alt: "Autoremov settings page with billing and subscription management", w: 1200, h: 821, browserUrl: "autoremov.com/settings/billing", frameTag: "BILLING" },
          ],
        },
        {
          type: "image",
          image: { src: "/design-assets/case-studies/autoremov-about.jpg", alt: "Autoremov about page with mission statement and company stats", w: 1100, h: 5856, browserUrl: "autoremov.com/about", frameTag: "ABOUT PAGE", tall: true },
        },
        {
          type: "annotations",
          items: [
            { label: "SETTINGS SIDEBAR NAV", text: "Profile · Notifications · Security · Billing · Preferences — standard account hierarchy. Active state in brand purple." },
            { label: "BILLING & SUBSCRIPTION", text: "Pro Plan $29/mo with Active badge. Manage Subscription + Payment Methods in one view — zero navigation required." },
            { label: "ABOUT — MISSION + TEAM", text: "50K+ images, 50M+ processed, 150+ integrations, 99.9% uptime. Journey timeline + team cards with gradient portraits." },
          ],
        },
      ],
    },
    {
      id: "decisions",
      label: "06 · 4 NON-OBVIOUS DESIGN DECISIONS",
      heading: "Each Decision Driven by a Problem —",
      headingAccent: "Not a Visual Preference",
      blocks: [
        { type: "text", text: "These are the choices that are easy to miss from the outside but are load-bearing for conversion and usability." },
        {
          type: "decisions",
          items: [
            {
              id: "D.01",
              title: "Editorial bento mosaic over a photo grid",
              problem: "Standard 3-column photo grids look like stock photo libraries. They don't communicate the value of the product or tell a story about the user.",
              solution: "Two-row asymmetric CSS grid — 7+5 columns row 1, 3+6+3 on row 2 — with stats and captions embedded directly on images as overlays. Each image is a different aspect ratio so nothing aligns predictably.",
              outcome: "Pages feel editorial and curated rather than templated. Layout changes across use cases because column spans adapt to the gradient.",
            },
            {
              id: "D.02",
              title: "Subscription + top-up in one unified pricing UI",
              problem: "SaaS pricing pages assume one business model. Autoremov needed monthly subscriptions AND one-time credit packs — bolting a toggle on late usually buries the second model and confuses the math.",
              solution: "A segmented control at the top of the pricing page switches the entire card row. Below it, an interactive cost calculator turns 'which model is right for me?' into a 5-second slider drag.",
              outcome: "Users self-qualify into the right pricing model without sales contact — the calculator answers the comparison objection before it forms.",
            },
            {
              id: "D.03",
              title: "Horizontal tile strip for batch editor workflow",
              problem: "Batch workflows usually hide processed files behind navigation or modals — breaking the canvas-first editing loop exactly when power users are most productive.",
              solution: "Processed images pin to the bottom edge as a horizontal thumbnail strip with per-image download, selection state and bulk ZIP export. The canvas never leaves view.",
              outcome: "Power users process hundreds of images without losing context, while the strip doubles as progressive disclosure for beginners.",
            },
            {
              id: "D.04",
              title: "Audience-first use case page architecture",
              problem: "Seven audiences with entirely different jobs-to-be-done normally means seven bespoke pages — inconsistent quality, 7× the maintenance, and no shared analytics pattern.",
              solution: "One data-driven template: each segment page pulls its own hero, gallery, copy and CTAs from a shared schema while keeping an identical architecture.",
              outcome: "Consistent quality across all 7 segments. Adding an 8th segment becomes a data entry task, not a design project.",
            },
          ],
        },
      ],
    },
    {
      id: "demo",
      label: "07 · INTERACTIVE BEFORE/AFTER DEMO",
      heading: "The Landing Page Centrepiece —",
      headingAccent: "Instant Value Proof",
      blocks: [
        { type: "text", text: "I designed a drag-to-reveal comparison slider directly on the homepage hero — demonstrating the AI's effectiveness in the first 3 seconds, before the user scrolls. Drag the handle to see the separation:" },
        { type: "beforeAfter" },
      ],
    },
    {
      id: "stack",
      label: "08 · TOOLS, STACK & REFLECTION",
      heading: "What Shipped —",
      headingAccent: "and What It Taught Me",
      blocks: [
        {
          type: "stackReflection",
          stack: [
            { name: "Figma", description: "High-fidelity design, design system, prototyping", color: "#A855F7" },
            { name: "React 18", description: "Component architecture, routing, state management", color: "#3B82F6" },
            { name: "TypeScript", description: "Type-safe props, data models, route params", color: "#22D3EE" },
            { name: "Tailwind CSS", description: "Design token mapping, responsive utilities", color: "#2DD4BF" },
            { name: "Framer Motion", description: "Scroll animations, page transitions, AnimatePresence", color: "#EC4899" },
            { name: "Unsplash API", description: "Contextual photography for all 7 use case categories", color: "#34D399" },
          ],
          reflections: [
            { label: "WHAT WORKED", color: "#34D399", body: "The segment-first architecture — building 7 audience pages as one data-driven template — meant consistent quality across all segments without 7× the design work. The credit calculator was the highest-leverage UI element: handled 'subscription vs. top-up?' without copywriting." },
            { label: "WHAT I'D DO DIFFERENTLY", color: "#FACC15", body: "I'd establish design system tokens in Figma before writing any component code. The CSS custom property mapping evolved as pages were built, requiring token refactoring mid-project. Locked token set first = no dark mode rework." },
            { label: "KEY LEARNING", color: "#5B9BFF", body: "A single pricing model assumption can invalidate an entire pricing page design. Discovering Autoremov needed both subscription and pay-per-use during week 2 required a full redesign. Pricing UX conversations must be the very first design conversation — not a feature discovery." },
          ],
        },
      ],
    },
  ],
};
