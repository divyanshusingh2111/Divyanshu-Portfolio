import type { CaseStudy } from "./types";

export const klimashift: CaseStudy = {
  id: "klimashift",
  index: "01",
  title: "KlimaShift",
  subtitle: "AI Energy Intelligence Platform",
  cover: "/design-assets/klimashift-card.jpg",
  coverAlt: "KlimaShift AI energy intelligence dashboard on a laptop mockup",
  tags: ["Dashboard", "AI", "SaaS"],
  theme: {
    accent: "#E07A5F",
    accentSoft: "#FFE9E0",
    accentSoftDark: "rgba(224,122,95,0.15)",
    heroBg: "linear-gradient(135deg, #1A1D21 0%, #22252A 100%)",
    heroText: "#FFFFFF",
    closingBg: "linear-gradient(135deg, #1E2124 0%, #26292E 100%)",
    chrome: "blueprint",
  },
  hero: {
    label: "CASE STUDY 01 · AI ENERGY MANAGEMENT · ENTERPRISE SAAS",
    title: "KlimaShift",
    paragraph:
      "Architecting an AI-driven enterprise dashboard that transforms raw IoT telemetry from multi-site food retailers into proactive, financial-grade energy intelligence — moving facilities from reactive firefighting to intelligent optimization.",
    tags: ["Enterprise SaaS", "AI/ML Integration", "IoT Telemetry", "Multi-site Operations", "Energy Management"],
    stats: [
      { value: "₹2,03,786", label: "Total Cost Savings", tone: "green" },
      { value: "26 t", label: "CO₂e Carbon Saved", tone: "purple" },
      { value: "40%", label: "HVAC Drift Errors Reduced", tone: "orange" },
      { value: "0.98", label: "Ideal Power Factor Achieved", tone: "blue" },
    ],
  },
  meta: [
    { label: "Role", value: "Lead UX Designer & Systems Architect" },
    { label: "Company", value: "KlimaShift (Full-time)" },
    { label: "Timeline", value: "Sep 2023 — Present · Gurugram" },
    { label: "Backed by", value: "Schneider Electric & Shell Petroleum" },
    { label: "Platform", value: "Enterprise SaaS · Web + Mobile" },
  ],
  sections: [
    {
      id: "problem",
      label: "01 · PROBLEM STATEMENT",
      heading: "The Visibility Gap in Multi-Site Energy",
      headingAccent: "Operations",
      blocks: [
        {
          type: "text",
          lead: true,
          text: "Multi-site food retailers managing 4–10 branches operate in a persistent 'visibility gap.' Facility managers rely on monthly utility bills and anecdotal reports from on-site staff, discovering equipment failures and energy leaks only after significant financial damage. The absence of asset-level telemetry creates systemic operational drift.",
        },
        {
          type: "cards",
          tone: "orange",
          cards: [
            {
              title: "Anomalous Consumption",
              body: "Portfolio-wide opacity hid energy leaks. Sites like Hauz Khas showed highest peak demand with no diagnostic path.",
              icon: "square",
            },
            {
              title: "Reactive Maintenance",
              body: "Freezer failures discovered only after stock compromise — no predictive telemetry to intercept before damage.",
              icon: "square",
            },
            {
              title: "Operational Inefficiencies",
              body: "Phase imbalances and low power factor triggered financial penalties and increased total cost of ownership.",
              icon: "square",
            },
          ],
        },
      ],
    },
    {
      id: "ia",
      label: "02 · INFORMATION ARCHITECTURE",
      heading: "Single Source of Truth —",
      headingAccent: "Navigation Model",
      blocks: [
        {
          type: "text",
          text: "The persistent sidebar navigation creates a deliberate progression from high-level 'Monitoring' to granular 'Execution' — engineered to mitigate alarm fatigue through a structured data hierarchy.",
        },
        {
          type: "cards",
          columns: 4,
          cards: [
            { eyebrow: "Monitoring", title: "Home", body: "Portfolio Command: Total Buildings · Total Assets · Unresolved Tickets · Top Alerts" },
            { eyebrow: "Monitoring", title: "Buildings", body: "Geographic Hierarchy: Map View · Building Info · Controller Status · Scheduling" },
            { eyebrow: "Monitoring", title: "Assets", body: "Appliance Intelligence: Scatter Plot · Asset Details · Alert History · TCO Tracking" },
            { eyebrow: "AI Insight", title: "Avrio Advisor", body: "AI Diagnostics: Building Summary · Hardware Analysis · Bill Analysis · AI Insights", tone: "purple" },
            { eyebrow: "AI Insight", title: "Avrio Tools", body: "Optimization Engine: Phase Balance · Peak Load · Comparative · Scheduling", tone: "purple" },
            { eyebrow: "ROI", title: "Savings", body: "Financial ROI: Cost Savings · Carbon Offset · APFC Savings · Drill-Down", tone: "green" },
            { eyebrow: "Operational", title: "Maintenance", body: "Operational Loop: Ticket Triage · Priority Badges · Expense Tracking · CSV Export", tone: "blue" },
          ],
        },
        {
          type: "pills",
          label: "Legend",
          items: ["■ Monitoring Layer", "■ AI Insight Layer", "■ ROI Layer", "■ Operational Layer"],
          tone: "neutral",
        },
      ],
    },
    {
      id: "onboarding",
      label: "03 · ONBOARDING WORKFLOW",
      heading: "4-Stage Linear",
      headingAccent: "Setup Wizard",
      blocks: [
        {
          type: "text",
          text: "A deliberate wizard pattern ensures standardized data baseline for each new site before it enters the live monitoring loop. 'Skip' and 'Next' controls allow asynchronous data entry while maintaining logical progression.",
        },
        {
          type: "stages",
          items: [
            { stage: "01", title: "Add Building", body: "Entry of foundational metadata: floor area (Sq. Ft.), brand, geographic coordinates.", tone: "orange" },
            { stage: "02", title: "Add Assets", body: "Categorize specific appliances — Deep Fryers, HVAC units, Ovens, Chillers.", tone: "orange" },
            { stage: "03", title: "Add Users", body: "Multi-user assignment with role definitions: Manager, Building Manager, Technician, Admin.", tone: "orange" },
            { stage: "04", title: "Add Utility", body: "Upload historical utility bills for baseline usage analysis and consumption profiles.", tone: "orange" },
          ],
        },
      ],
    },
    {
      id: "advisor",
      label: "04 · AV RIO ADVISOR AI ENGINE",
      heading: "AI-Ranked Building",
      headingAccent: "Diagnostics",
      blocks: [
        {
          type: "text",
          text: "Instead of raw data tables, the 'Building Wise Summary' reduces cognitive load by ranking locations based on issue severity and providing automated optimization paths with specific, actionable language.",
        },
        {
          type: "panel",
          title: "AV RIO ADVISOR – BUILDING WISE SUMMARY",
          badge: "AI ACTIVE",
          rows: [
            { left: "#01 HAUZ KHAS", right: "HIGHEST ENERGY & PEAK DEMAND — Prioritize energy audit; investigate high consumption and peak load drivers.", tone: "red" },
            { left: "#02 SAKET", right: "HIGHEST ENERGY CONSUMPTION — Review HVAC/Operational systems for energy optimization opportunities.", tone: "orange" },
            { left: "#03 GHITORNI", right: "LOWER POWER FACTOR — Investigate reactive loads; consider power factor correction measures.", tone: "purple" },
            { left: "#04 JANAKPURI", right: "ANOMALOUS CONSUMPTION — Review data accuracy; investigate potential metering or operational leaks.", tone: "blue" },
            { left: "#05 BEST PERFORMER", right: "EFFICIENCY BENCHMARK — Replicate this site's settings across portfolio as the reference architecture.", tone: "green" },
          ],
          note: "Alert color taxonomy — Red: Overvoltage / High Temperature · Blue: Undervoltage / Low Temperature · Purple: Inrush Current Anomaly · Green: Earth Leakage Detected.",
        },
      ],
    },
    {
      id: "telemetry",
      label: "05 · ASSET-LEVEL TELEMETRY",
      heading: "Interactive Asset",
      headingAccent: "Intelligence",
      blocks: [
        {
          type: "cards",
          columns: 2,
          cards: [
            {
              title: "Real-Time HVAC Calibration",
              body: "Asset views track technical specs alongside live environmental data. Try adjusting the compressor load — the system provides immediate status feedback to prevent drift errors. Compressor Load 50% Output (18% Idle / 50% Optimal / 100% Max), Thermal Efficiency 72.5%, Carbon Output 360 kg/hr, Current Temp −2°C → Adjusted Target −4°C.",
              pills: ["● BALANCED", "⚡ HVAC-1 · Hauz Khas Branch"],
            },
            {
              title: "Asset Profile + Ticket History",
              body: "The system maintains interconnectivity — embedding Ticket History directly within the asset view so technicians see recurring issues alongside live metrics simultaneously. Deep Freezer — Unit 01 · DF-HK-2019-001 · 8 yrs 5 mos · 2 Active Alerts · Daikin FZ-200 · 2.4 kW. Tickets: T001 Unit Not Cooling [Resolved] · T002 Overvoltage Alert [Open].",
              pills: ["BUSINESS PRIORITY High", "WARRANTY Active"],
            },
          ],
        },
      ],
    },
    {
      id: "optimization",
      label: "06 · AVRIQ TOOLS",
      heading: "Interactive Optimization",
      headingAccent: "Engine",
      blocks: [
        {
          type: "cards",
          columns: 2,
          cards: [
            {
              title: "Phase Load Balancing",
              body: "Before/After visualization of phase distribution. Assets are reallocated across Phase A, B, C to prevent imbalance and neutral current issues. Phase A 45% · 12.4 kW · Phase B 38% · 10.2 kW · Phase C 17% · 4.6 kW — ⚠ Phase A carrying 45% of total load; risk of neutral current overload and financial penalties.",
              pills: ["BEFORE REBALANCE", "AFTER REBALANCE ✓"],
              tone: "orange",
            },
            {
              title: "Peak Load Stagger Strategy",
              body: "Drag assets into staggered timing groups to flatten peak demand curves. An 'Always ON' category exempts critical refrigeration units. Deep Fryer A G1 +0 min · Microwave G2 +30 min · Chiller Unit G3 +60 min · Oven B G2 +30 min · HVAC-1 G1 +0 min. 'Sync Changes' commits to controller automation.",
              pills: ["GROUP 1 · 2 · 3", "ALWAYS ON EXEMPT"],
              tone: "teal",
            },
          ],
        },
      ],
    },
    {
      id: "maintenance",
      label: "07 · MAINTENANCE & TICKET SYSTEM",
      heading: "Closing the Diagnostic",
      headingAccent: "Loop",
      blocks: [
        {
          type: "text",
          text: "The ticketing interface converts AI-flagged anomalies into manageable maintenance tasks: priority color-coding, expense tracking, and CSV export enable cost reconciliation with accounting systems. SLA defaults — High: 1 day · Medium: 3 days · Low: 4 days.",
        },
        {
          type: "panel",
          title: "MAINTENANCE TICKET QUEUE",
          rows: [
            { left: "T001 · OVERDUE", right: "Deep Freezer Not Working — Hauz Khas · Rahul M. · High Priority · ₹200", tone: "red" },
            { left: "T002 · IN PROGRESS", right: "HVAC Phase Imbalance — Saket · Priya K. · Medium Priority · ₹150", tone: "yellow" },
            { left: "T003 · ON HOLD", right: "Overvoltage Alert — Chiller · Janakpuri · Amit S. · High Priority · ₹540", tone: "blue" },
          ],
          note: "Filters: [All] [High] [Overdue] — expense tracking + CSV export for accounting reconciliation.",
        },
      ],
    },
    {
      id: "savings",
      label: "08 · FINANCIAL ROI & SAVINGS",
      heading: "Proving ROI —",
      headingAccent: "Savings Analytics",
      blocks: [
        {
          type: "text",
          text: "The Savings module bridges the gap between optimization actions and financial outcomes — directly aiding Klimashift in client retention and upselling by making energy ROI visible and tangible.",
        },
        {
          type: "stats",
          items: [
            { value: "₹20,345", label: "Total Cost Savings", sub: "Verified against baseline bills", tone: "green" },
            { value: "26 t CO₂e", label: "Total Carbon Saving", sub: "Annual carbon offset achieved", tone: "purple" },
            { value: "₹2,30,345", label: "APFC Savings", sub: "Power factor correction ROI", tone: "cyan" },
            { value: "0.98 PF", label: "Ideal Power Factor", sub: "vs. 0.82 pre-implementation", tone: "orange" },
          ],
        },
        {
          type: "panel",
          title: "ENERGY CHARGE BREAKDOWN — HAUZ KHAS (SAMPLE)",
          rows: [
            { left: "ENERGY CHARGE", right: "₹12,450 — 61% of total bill", tone: "orange" },
            { left: "FIXED CHARGE", right: "₹4,200 — 21% of total bill", tone: "purple" },
            { left: "TIME-OF-DAY (TOD)", right: "₹3,695 — 18% of total bill", tone: "cyan" },
          ],
        },
      ],
    },
    {
      id: "gallery",
      label: "09 · DASHBOARD SCREEN GALLERY",
      heading: "KlimaShift —",
      headingAccent: "Actual Screens",
      blocks: [
        {
          type: "text",
          text: "High-fidelity dashboard screens delivered across the platform — portfolio command, asset intelligence, Avrio Advisor, and the tools ecosystem. Sample deployment: 'Burger Bites' restaurant chain.",
        },
        {
          type: "gallery",
          images: [
            { src: "/design-assets/case-studies/klimashift-dashboard-home.jpg", w: 1200, h: 1355, alt: "KlimaShift home dashboard with KPI cards, portfolio table, distribution donut and map view", browserUrl: "klimashift.app/home", frameTag: "Portfolio Overview" },
            { src: "/design-assets/case-studies/klimashift-dashboard-buildings.jpg", w: 1200, h: 800, alt: "Buildings geographic map view with pins and buildings list table", browserUrl: "klimashift.app/buildings", frameTag: "Geographic Map" },
            { src: "/design-assets/case-studies/klimashift-dashboard-building-detail.jpg", w: 1200, h: 733, alt: "Building detail page with contact card, overview stats and scatter plot", browserUrl: "klimashift.app/assets", frameTag: "Building Detail" },
            { src: "/design-assets/case-studies/klimashift-dashboard-assets.jpg", w: 1200, h: 1160, alt: "Assets dashboard with equipment tables and thumbnails", browserUrl: "klimashift.app/assets/detail", frameTag: "Asset Detail" },
            { src: "/design-assets/case-studies/klimashift-dashboard-ai-advisor.jpg", w: 1200, h: 1952, alt: "Avrio Advisor AI diagnostics energy overview metric grid", browserUrl: "klimashift.app/avrio", frameTag: "AI Diagnostics", tall: true },
            { src: "/design-assets/case-studies/klimashift-dashboard-ai-insights.jpg", w: 1200, h: 711, alt: "AI Insights modal with purple header about high energy consumption", browserUrl: "klimashift.app/avrio/insights", frameTag: "AI Insights" },
            { src: "/design-assets/case-studies/klimashift-dashboard-avrio-tools.jpg", w: 1200, h: 1035, alt: "Avrio Tools with building comparison line charts and seasonal comparisons", browserUrl: "klimashift.app/tools", frameTag: "Avrio Tools", tall: true },
            { src: "/design-assets/case-studies/klimashift-dashboard-savings.jpg", w: 1200, h: 800, alt: "Savings analytics dashboard with stat cards and building details table", browserUrl: "klimashift.app/savings", frameTag: "Financial ROI" },
            { src: "/design-assets/case-studies/klimashift-dashboard-tickets.jpg", w: 1200, h: 1006, alt: "Maintenance ticket queue dashboard with status counters and ticket cards", browserUrl: "klimashift.app/maintenance", frameTag: "Ticket Queue" },
            { src: "/design-assets/case-studies/klimashift-dashboard-onboarding.jpg", w: 1200, h: 800, alt: "Four-step onboarding wizard with Add Building Details form", browserUrl: "klimashift.app/onboarding", frameTag: "Onboarding" },
          ],
        },
      ],
    },
  ],
  closing: {
    label: "10 · KEY LEARNINGS & DESIGN PRINCIPLES",
    heading: "Trust Over Absolute Automation",
    text: "Domain experts don't want magic — they want instruments they can trust. Three principles shaped every system decision.",
    cards: [
      {
        title: "Experts Need Visible Control",
        body: "Domain specialists don't want automation that hides details. They need clear control over system rules and transparent feedback on every automated decision.",
      },
      {
        title: "Hierarchy Mitigates Alarm Fatigue",
        body: "A structured data hierarchy — portfolio → building → asset → sensor — prevents cognitive overload. Users navigate 'down' only when context requires it.",
      },
      {
        title: "ROI Visibility Drives Adoption",
        body: "Connecting optimization actions (Peak Load Stagger) directly to financial outcomes (ToD savings) transformed the app from passive monitoring to active management.",
      },
    ],
  },
};
