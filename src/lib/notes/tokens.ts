import type { Note } from "./types";

/**
 * Studio Notes #01 — newest note, featured on the journal index.
 * On the token architecture that survived three rebrands.
 */
export const tokens: Note = {
  slug: "one-ramp-three-rebrands",
  title: "One ramp, three rebrands: designing color tokens that survive redesigns",
  dek: "How a five-layer token architecture kept KlimaShift, Autoremov and Trivira visually consistent while their brands kept evolving.",
  date: "2026-02-10",
  dateLabel: "February 10, 2026",
  dateShort: "Feb 10",
  category: "Design Systems",
  tags: ["tokens", "theming", "dark mode", "architecture"],
  readingMinutes: 6,
  featured: true,
  blocks: [
    {
      type: "lead",
      text: "Every design system I have shipped has outlived at least one rebrand. The logos changed, the marketing sites changed, even the office plants changed — but the token architecture underneath kept compiling. That is not luck. It is the result of one rule I learned the hard way: **name colors after their jobs, never after their feelings.**",
    },
    { type: "h2", id: "naming", text: "The problem with naming colors after feelings" },
    {
      type: "p",
      text: "The first design system I maintained had a color called `sunset-orange`. It was the primary action color. Then the brand refreshed, sunset became terracotta, and suddenly four hundred components referenced a color whose name lied about what it looked like. Every rename was a breaking change; every unrenamed usage was a small act of decay.",
    },
    {
      type: "p",
      text: "Names like `calm-blue` or `energy-red` encode the emotional pitch of a brand at a moment in time. Brands are not stable at moments in time. **Your naming layer is the API between design intent and component code** — it deserves the same discipline as any other API: version it, document it, and never let consumers reach past it.",
    },
    { type: "h2", id: "layers", text: "Five layers, one source of truth" },
    {
      type: "p",
      text: "The architecture I use now has five layers. Each layer answers exactly one question, and nothing is allowed to skip a layer:",
    },
    {
      type: "list",
      items: [
        "**Primitive** — the palette itself: `orange-600`, `stone-050`. Raw, meaningless, complete.",
        "**Semantic** — the job: `action`, `surface-raised`, `text-faint`. The only layer components may ever reference.",
        "**Component** — scoped aliases like `button-primary-bg`, for the rare component that genuinely needs to drift.",
        "**Theme** — light, dark, high-contrast: each theme *rebinds* semantics, never redefines primitives.",
        "**Brand** — one small file that maps the current brand onto semantics. Rebrands touch exactly this file.",
      ],
    },
    {
      type: "code",
      lang: "css",
      caption: "Three of the five layers — primitives are never referenced directly by a component.",
      code: `/* 1 — primitive: raw palette, referenced by nothing above layer 2 */
--orange-600: #e06a3b;

/* 2 — semantic: the only layer components are allowed to see */
--action: var(--orange-600);
--action-soft: color-mix(in srgb, var(--action) 10%, white);

/* 4 — theme: rebinding, not redefining */
.dark {
  --surface-raised: #161a21;
  --text-faint: #787d86;
}`,
    },
    {
      type: "callout",
      variant: "insight",
      title: "The rebrand test",
      text: "A rebrand should be a one-file diff. If your rebrand pull request touches component code, the system — not the brand — has the bug.",
    },
    { type: "h2", id: "dark", text: "Dark mode was the stress test" },
    {
      type: "p",
      text: "This portfolio runs on that architecture. The warm cream `#F9F7F3` inverts into a deep charcoal studio in dark mode, and the terracotta accent lifts two steps for contrast — **zero components changed**. The [case study pages](/work) take it further: each project rebinds its own accents while the shell stays identical.",
    },
    {
      type: "image",
      src: "/design-assets/case-studies/klimashift-dashboard-ai-insights.jpg",
      alt: "KlimaShift AI insights dashboard in dark theme",
      caption:
        "Same dashboard system, one rebinding layer: Klimashift's dark theme is a theme file, not a redesign.",
    },
    {
      type: "p",
      text: "The failure mode I see most often is teams treating dark mode as a palette inversion. It is not. Surfaces need different elevation logic; chromatic accents need desaturation; and shadows — the biggest tell of a lazy dark theme — need to become borders. You cannot express any of that by flipping lightness values, which is precisely why the *semantic* layer has to exist between the palette and the product.",
    },
    { type: "h2", id: "retro", text: "What I would do differently" },
    { type: "p", text: "Three regrets from the last three years, in the order they started hurting:" },
    {
      type: "list",
      ordered: true,
      items: [
        "I would add a **contrast budget** to CI on day one. Every semantic token pair gets checked against WCAG AA on every commit — retrofitting that onto a live product is brutal.",
        "I would version the semantic layer from the start. `--action@1` felt like ceremony until the first breaking rename took a week instead of an afternoon.",
        "I would document *why* each semantic token exists. Six months later, \u201cwhat is surface-sunken for?\u201d is the question that quietly kills systems.",
      ],
    },
    {
      type: "quote",
      text: "A token file is a promise to your future team: the next rebrand will be boring. Boring is the goal.",
      cite: "— my notes, after the second rebrand",
    },
    { type: "divider" },
  ],
};
