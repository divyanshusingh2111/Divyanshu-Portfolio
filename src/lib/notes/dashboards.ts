import type { Note } from "./types";

/**
 * Studio Notes #02 — on designing dashboards as narratives.
 */
export const dashboards: Note = {
  slug: "dashboards-are-narratives",
  title: "Dashboards are narratives, not grids",
  dek: "What rebuilding the same energy dashboard three times taught me about hierarchy, glanceability and the five-second rule.",
  date: "2026-01-27",
  dateLabel: "January 27, 2026",
  dateShort: "Jan 27",
  category: "Craft",
  tags: ["data viz", "hierarchy", "dashboards", "glanceability"],
  readingMinutes: 5,
  blocks: [
    {
      type: "lead",
      text: "I have now designed the same energy dashboard three times. Not because the first two failed — because the question it answered kept changing. That is the actual job of a dashboard designer: **deciding what question gets answered in the first five seconds.**",
    },
    { type: "h2", id: "glance", text: "The five-second glance" },
    {
      type: "p",
      text: "Watch any operator open a dashboard. They do not read it; they scan for a feeling — *is everything okay?* Everything about the layout should serve that single reflex. The number that answers it belongs at the top-left, at the largest type size on the screen, and everything else is a footnote until it is not.",
    },
    {
      type: "list",
      items: [
        "**One hero metric.** If three metrics tie for first place, the product has not decided what the screen is for.",
        "**Trend beats snapshot.** A number alone says nothing; a number with a seven-day sparkline says *direction*.",
        "**Alarm color is a budget.** Red on a dashboard is a fire alarm. Spend it on one, maybe two states — never on decoration.",
      ],
    },
    { type: "h2", id: "hierarchy", text: "Hierarchy is a decision, not a default" },
    {
      type: "p",
      text: "Grid systems make it easy to build dashboards that are *fair* — every widget the same size, every chart the same height. Fairness is the wrong instinct. [Klimashift's](/work/klimashift) building-operations view gives sixty percent of the viewport to energy flow, because that is the operator's actual question, and demotes tickets and assets to glanceable sidebar strips.",
    },
    {
      type: "image",
      src: "/design-assets/case-studies/klimashift-dashboard-home.jpg",
      alt: "KlimaShift dashboard home view with energy flow as the dominant module",
      caption:
        "The home view spends its pixels unevenly on purpose: energy flow gets the stage, operations get the sidebar.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The squint test",
      text: "Squint at your dashboard until text dissolves. If every module has the same visual weight, you have designed a spreadsheet with extra steps.",
    },
    { type: "h2", id: "narratives", text: "The same data, three narratives" },
    {
      type: "p",
      text: "An energy dataset can tell a cost story for finance, a consumption story for facilities, or a carbon story for leadership. Same rows, three dashboards. The mistake is one shared view with toggle-everything filters — it serves everyone and answers no one.",
    },
    {
      type: "p",
      text: "When Klimashift added the AI advisor, the hardest conversation was not about the model. It was agreeing that its insights would live *inside* the narrative column, not in a floating chat widget. Predictions earn trust when they sit next to the numbers that spawned them — bolted-on chat rooms read as guesses.",
    },
    {
      type: "quote",
      text: "A dashboard is an argument about what matters. Design the argument first.",
      cite: "— pinned above my desk since the first Klimashift rebuild",
    },
    { type: "h2", id: "ship", text: "Ship the story first" },
    {
      type: "p",
      text: "The pattern that finally worked: write the five-second sentence before opening the design tool. *When I open this screen, I should immediately know whether my buildings burned more money than usual today.* If the sentence is wrong, no amount of chart polish saves it. If it is right, the layout almost designs itself — and the review conversation changes from \u201cmove this widget\u201d to \u201cis this the right sentence?\u201d, which is the only conversation that matters.",
    },
  ],
};
