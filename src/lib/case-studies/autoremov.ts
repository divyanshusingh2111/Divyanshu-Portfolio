import type { CaseStudy } from "./types";

export const autoremov: CaseStudy = {
  id: "autoremov",
  index: "02",
  title: "Autoremov Platform",
  subtitle: "SaaS platform and Website",
  cover: "/design-assets/autoremov-card.jpg",
  coverAlt: "Autoremov background removal web application interface",
  tags: ["Service", "Image Background", "Web"],
  theme: {
    accent: "#1A73E8",
    accentSoft: "#E8F0FE",
    accentSoftDark: "rgba(123,170,247,0.14)",
    heroBg: "linear-gradient(180deg, #F9FAFB 0%, #EEF4FF 100%)",
    heroBgDark: "linear-gradient(180deg, #0D1524 0%, #101D33 100%)",
    heroText: "#1E2022",
    heroTextDark: "#F1EEE7",
    closingBg: "linear-gradient(160deg, #111827 0%, #1F2937 100%)",
    chrome: "fintech",
  },
  hero: {
    label: "• UPI • FINTECH • UX DESIGN",
    title: "DESIGNING\nPAYMENT\nFOR REAL WOMEN",
    gradientWords: "PAYMENT",
    paragraph:
      "A UX research project exploring why small-business women struggle with digital payments — and designing an app that finally works for them.",
    tags: ["UX Research", "UPI Payments", "Inclusive Design", "Field Study"],
    stats: [
      { value: "350M+", label: "UPI Users in India", tone: "blue" },
      { value: "10B+", label: "Monthly Transactions", tone: "blue" },
      { value: "5", label: "Users Interviewed", tone: "blue" },
      { value: "2026", label: "Research Year", tone: "blue" },
    ],
    image: {
      src: "/design-assets/case-studies/autoremov-hero-phone.jpg", w: 1000, h: 750,
      alt: "Angled phone mockup showing the payment app scanner screen",
      browserUrl: "payment lite · scanner",
      frameTag: "Scan-First",
    },
  },
  meta: [
    { label: "Role", value: "UX Researcher" },
    { label: "Method", value: "Field + Interview" },
    { label: "Year", value: "2026" },
    { label: "Team", value: "Divyanshu · Divyanshi · Kanishka" },
    { label: "Benchmarks", value: "Google Pay · PhonePe" },
  ],
  sections: [
    {
      id: "context",
      label: "02 · CONTEXT & PROBLEM",
      heading: "The problem is not the technology. It is",
      headingAccent: "the design.",
      blocks: [
        {
          type: "text",
          lead: true,
          text: "India has 350M+ UPI users and 10 billion transactions every month. But most of that growth was designed for people who are already comfortable with smartphones — not for the tailor who takes ₹200 orders from her doorstep.",
        },
        {
          type: "stats",
          items: [
            { value: "350M+", label: "UPI users in India", tone: "blue" },
            { value: "10B+", label: "Monthly transactions", tone: "blue" },
            { value: "60%+", label: "Small vendor usage", tone: "blue" },
          ],
        },
        {
          type: "callout",
          title: "PROBLEM STATEMENT",
          tone: "blue",
          text: "Women running small home-based businesses — tailors, boutique owners, knitters — struggle to complete digital payments with confidence. The interface gives unclear feedback, the steps are overwhelming, and when a network delay hits, they have no idea if their money went through or not. And so they work around it: they send ₹10 first to 'test' the number. They ask their husband to check. They avoid unfamiliar features entirely.",
        },
      ],
    },
    {
      id: "users",
      label: "03 · MEET THE USERS",
      heading: "Two women. Two businesses.",
      headingAccent: "The same fear.",
      blocks: [
        {
          type: "text",
          text: "We spoke with women running small income-generating businesses from home. Both use UPI daily. Neither feels fully in control of it.",
        },
        {
          type: "callout",
          title: "Device reality",
          tone: "yellow",
          text: "Budget Android phones with low storage, patchy internet, and small screens. Not flagships.",
        },
        {
          type: "cards",
          columns: 2,
          cards: [
            {
              title: "Rekha, 38",
              eyebrow: "HOME-BASED TAILOR",
              body: "Pain points: afraid money went to the wrong person. 'Processing…' screen causes real anxiety. Avoids anything she doesn't already know.",
              pills: ["Uses UPI daily", "QR scan only", "Low digital literacy"],
            },
            {
              title: "Vinita, 42",
              eyebrow: "BOUTIQUE OWNER",
              body: "Pain points: afraid of sending the wrong amount. Needs a second confirmation before every payment. Won't try new features without someone watching.",
              pills: ["Uses UPI occasionally", "QR + test payments", "Avoids new features"],
            },
          ],
        },
        {
          type: "quote",
          quote: {
            text: "Paise galat jagah chale gaye toh?",
            translation: "What if the money goes to the wrong place?",
            tone: "red",
            bullets: ["'Processing…' screen causes real anxiety", "Avoids anything she doesn't already know"],
          },
        },
        {
          type: "quote",
          quote: {
            text: "Pehle ₹10 bhej ke check kar leti hoon",
            translation: "I always send ₹10 first to make sure it works",
            tone: "red",
            bullets: ["Afraid of sending the wrong amount", "Needs a second confirmation before every payment", "Won't try new features without someone watching"],
          },
        },
      ],
    },
    {
      id: "research",
      label: "04 · RESEARCH APPROACH",
      heading: "We watched them pay. Then we asked",
      headingAccent: "why.",
      blocks: [
        {
          type: "text",
          text: "Three research methods, five users, two competing apps — GPay and PhonePe. We wanted to see what real payment behavior looks like, not what users say they do.",
        },
        {
          type: "cards",
          columns: 3,
          tone: "blue",
          cards: [
            { title: "Contextual Observation", body: "Watched users complete payments in their own space, on their own phones, during real transactions.", icon: "square" },
            { title: "Interviews (5 Users)", body: "One-on-one conversations about past mistakes, workarounds, and what makes them trust an app.", icon: "square" },
            { title: "Task Testing", body: "Asked users to complete the same payment on GPay then PhonePe — and watched where they got stuck.", icon: "square" },
          ],
        },
        {
          type: "subheading",
          text: "Key Findings",
        },
        {
          type: "list",
          items: [
            "QR scan is the primary — and often only — behavior. Everything else is noise.",
            "Users follow habits, not understanding. They don't know how it works — they just know what to tap.",
            "Fear of wrong payment leads to a workaround: the ₹10 test transfer. A fix invented by the user.",
            "Network delay creates real anxiety. A spinning loader with no message feels like something went wrong.",
          ],
          ordered: true,
        },
      ],
    },
    {
      id: "pain",
      label: "05 · PAIN POINTS & INSIGHTS",
      heading: "What breaks trust —",
      headingAccent: "in their words.",
      blocks: [
        {
          type: "quote",
          quote: {
            text: "Payment stuck hai ya ho gaya?",
            translation: "Is the payment stuck, or did it go through?",
            tone: "red",
            meta: "Said during a network delay with no feedback on screen",
          },
        },
        {
          type: "quote",
          quote: {
            text: "Galat number pe paise chale gaye?",
            translation: "Did the money go to the wrong number?",
            tone: "red",
            meta: "After scanning a QR that showed an unfamiliar name",
          },
        },
        {
          type: "pills",
          label: "WHERE THE EXPERIENCE BREAKS DOWN",
          items: ["Too many options on home screen", "Hard to find key actions", "No clear processing state", "Failure messages are confusing", "Hidden actions feel like they don't exist"],
          tone: "red",
        },
        {
          type: "cards",
          columns: 2,
          cards: [
            { title: "App-trained, not digitally skilled", body: "They know which buttons to tap in GPay. Move them to a new app and they're lost — because they never understood the underlying logic." },
            { title: "Trust breaks at two moments", body: "During the processing screen and after a payment failure. These are the two moments the app goes silent when users need it most." },
            { title: "Invisible = nonexistent", body: "If a feature isn't visible on the first screen, it doesn't exist for these users. They won't search. They won't scroll." },
            { title: "Safety beats speed", body: "They will take an extra step if it means confirming the amount and recipient. Speed is not their priority. Certainty is." },
          ],
        },
      ],
    },
    {
      id: "benchmark",
      label: "06 · BENCHMARK — GOOGLE PAY",
      heading: "GPay gets a lot right. But not for",
      headingAccent: "these users.",
      blocks: [
        {
          type: "text",
          text: "Google Pay is the most familiar app our users had. Analyzing it helped us understand what to keep and what to leave behind.",
        },
        {
          type: "image",
          image: {
            src: "/design-assets/case-studies/autoremov-gpay-benchmark.jpg", w: 1000, h: 750,
            alt: "Google Pay home screen with app grid and QR scanner dark view on two phones",
            browserUrl: "google pay · home + scanner",
            frameTag: "Benchmark",
          },
        },
        {
          type: "compare",
          works: [
            "QR scan is front-and-center — aligns with how users actually pay",
            "Familiar interface — most users have some experience with it",
            "Recent contacts are visible — reduces re-entry effort",
          ],
          fails: [
            "Feature overload — home screen has too many options to process",
            "Processing screen shows nothing useful during network delays",
            "Key actions (like check history) are buried, not prominent",
            "Failure messages don't clearly say 'your money was not deducted'",
          ],
        },
      ],
    },
    {
      id: "principles",
      label: "07 · DESIGN PRINCIPLES & DECISIONS",
      heading: "We built around one rule: clarity over",
      headingAccent: "features.",
      blocks: [
        {
          type: "cards",
          columns: 2,
          cards: [
            { title: "Clarity over features", body: "Every screen shows only what the user needs right now. Nothing extra. No suggestions to explore.", tone: "green", icon: "check" },
            { title: "Trust over speed", body: "We added a confirmation step — not removed it. Users feel safer when they can double-check before sending.", tone: "green", icon: "check" },
            { title: "Recognition over memory", body: "Labels, icons, and states are always visible. Users should never have to remember what a button does.", tone: "blue", icon: "square" },
            { title: "Designed for constraints", body: "Works on budget phones, slow connections, small screens. Low storage, low bandwidth — still fully usable.", tone: "blue", icon: "square" },
          ],
        },
        {
          type: "callout",
          title: "KEY DESIGN DECISION — Auto-Scan First Experience",
          tone: "blue",
          text: "The app opens directly to the camera scanner — ready to scan. No home screen to navigate. No menu to open. The most common action (pay via QR) takes zero extra steps.",
        },
        {
          type: "pills",
          label: "Supporting decisions",
          items: ["Clear bottom panel — quick access to activity and history", "Strong exit (Mini Home) — users always know how to get back", "Live transaction status — visible, real-time, no guessing"],
          tone: "blue",
        },
        {
          type: "list",
          label: "",
          ordered: true,
          items: [
            "Scan (Home) — camera opens immediately",
            "Pay Flow — Amount → Confirm → Send",
            "Enter Number — manual fallback option",
            "Activity — all past transactions",
            "Mini Home — safe exit from any screen",
          ],
          tone: "blue",
        },
        {
          type: "flow",
          label: "USER FLOW · SCAN & PAY",
          items: ["Open App", "Scan QR", "Detect amount", "Confirm details", "Processing (with status)", "Success — or — Failure + Retry"],
        },
        {
          type: "gallery",
          images: [
            { src: "/design-assets/case-studies/autoremov-enter-amount.jpg", w: 1000, h: 750, alt: "Enter Amount keypad screen for sending ₹500", browserUrl: "pay app · enter amount", frameTag: "Amount" },
            { src: "/design-assets/case-studies/autoremov-phonepe-limit-error.jpg", w: 1000, h: 750, alt: "PhonePe payment limit error screen showing ₹1,00,000 limit reached", browserUrl: "phonepe · limit error", frameTag: "Failure State" },
            { src: "/design-assets/case-studies/autoremov-payment-failed.jpg", w: 1000, h: 750, alt: "Payment failed screen with red error icon and retry contact options", browserUrl: "pay app · failure", frameTag: "Retry" },
          ],
          columns: 3,
        },
      ],
    },
    {
      id: "impact",
      label: "08 · IMPACT & KEY LEARNINGS",
      heading: "Less steps.",
      headingAccent: "More confidence.",
      blocks: [
        {
          type: "text",
          text: "Removing a single step from the most frequent action isn't minor — it's the difference between a payment someone completes and one they abandon.",
        },
        {
          type: "cards",
          columns: 4,
          cards: [
            { title: "↓ Steps in primary flow", body: "Scan-first removes friction before it starts", tone: "blue", icon: "arrow-down" },
            { title: "↓ Cognitive load", body: "Fewer choices, clearer layout", tone: "blue", icon: "arrow-down" },
            { title: "↑ Trust during processing", body: "Real-time status, no silent loaders", tone: "green", icon: "arrow-up" },
            { title: "↑ Clarity for low-literacy users", body: "Designed for recognition, not recall", tone: "green", icon: "arrow-up" },
          ],
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Simplification is harder than adding features — every feature we removed was a fight. But less — when it's the right less — builds far more trust.",
            "Trust is the core of fintech UX — these users don't need more features. They need to feel like they won't make an irreversible mistake.",
          ],
        },
      ],
    },
  ],
  closing: {
    label: "03 · CLOSING NOTE",
    heading: "Designing for constraints improves usability for everyone",
    text: "Building for slow networks and small screens forced us to make decisions that make the app better for all users. This project was about making digital payments work for women who were never really considered when these apps were designed. We hope it makes the case that inclusion is not optional — it is good design.",
    cards: [
      { title: "Inclusion is not optional", body: "Apps designed for the most constrained users end up clearer for everyone." },
      { title: "Field beats assumptions", body: "Watching real payments revealed workarounds no survey would have found." },
      { title: "Trust is the product", body: "In fintech UX, confidence is the feature that matters most." },
    ],
  },
};
