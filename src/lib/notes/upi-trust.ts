import type { Note } from "./types";

/**
 * Studio Notes #03 — field research on failed UPI payments (Autoremov outtake).
 */
export const upiTrust: Note = {
  slug: "what-failed-payments-taught-me-about-trust",
  title: "What 47 failed payments taught me about trust",
  dek: "Field notes from the Autoremov research cycle: why users blame themselves when UPI fails, and how interface copy rebuilds confidence.",
  date: "2026-01-12",
  dateLabel: "January 12, 2026",
  dateShort: "Jan 12",
  category: "Research",
  tags: ["field research", "fintech", "writing UX", "trust"],
  readingMinutes: 7,
  blocks: [
    {
      type: "lead",
      text: "For the [Autoremov](/work/autoremov) research cycle, I spent two weeks watching people fail. Not users failing to use the product — users watching money vanish mid-transaction and bracing for impact. UPI fails often enough in India that failure states are not an edge case. **They are the product.**",
    },
    { type: "h2", id: "queue", text: "The queue that became a research lab" },
    {
      type: "p",
      text: "The setup was low-tech: a loan-recovery desk, a chair slightly behind the agent, and consent forms. Forty-seven failed or stuck payments in thirteen days. The failures clustered into four species:",
    },
    {
      type: "list",
      items: [
        "**Ghost pendings** — debit confirmed on the bank side, merchant never confirmed. The receipt exists; the screen says nothing.",
        "**Limit walls** — daily limits hit at the worst moment, mid-payment, with no warning upstream.",
        "**Silent expiry** — the app waited for a confirmation that timed out server-side. To the user, it simply stopped.",
        "**Wrong-input ricochets** — typos in amount or VPA that bounced back with no suggestion of how to fix them.",
      ],
    },
    { type: "h2", id: "blame", text: "Users blame themselves first" },
    {
      type: "p",
      text: "The most consistent finding was emotional, not technical. Given an unexplained failure, people assumed *they* had done something wrong. They apologized to the agent. They re-read their own inputs. Several re-attempted the payment immediately — doubling the debit risk — because waiting inside uncertainty felt worse than losing the money.",
    },
    {
      type: "quote",
      text: "\u201cThe money is gone — please check, sir.\u201d",
      cite: "— Rekha*, micro-loan customer, gesturing at a pending screen (*name changed)",
    },
    {
      type: "p",
      text: "That one sentence, repeated in variation across two weeks, reframed the entire design problem. We were not designing error messages. We were designing **the moment a person decides whether the app is on their side.**",
    },
    { type: "h2", id: "recovery", text: "Writing the recovery" },
    {
      type: "p",
      text: "The redesign came down to four copy principles, each one earned by a specific observed failure:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "**Name the cause before the state.** \u201cYour bank confirmed the debit; the merchant has not confirmed yet\u201d beats \u201cTransaction failed\u201d, even though the second is shorter.",
        "**Say where the money is.** People can tolerate a forty-eight-hour refund window. They cannot tolerate not knowing which pocket it is sitting in.",
        "**Give the next action a verb.** \u201cCheck the status in your UPI app\u201d outperformed \u201cPlease wait\u201d on every re-attempt metric we tracked.",
        "**Never imply user error without proof.** \u201cSomething went wrong\u201d is vaguer — and kinder — than \u201cYou may have entered wrong details\u201d.",
      ],
    },
    {
      type: "image",
      src: "/design-assets/case-studies/autoremov-payment-failed.jpg",
      alt: "Autoremov payment failure recovery screen with cause-first copy",
      caption:
        "The recovery screen: cause first, money location second, exactly one next action. No blame anywhere.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Never say \u201cfailed\u201d for a pending transaction",
      text: "In testing, the word \u201cfailed\u201d on a pending state tripled immediate re-attempts — the single riskiest behavior on the screen, because every re-attempt is a second debit you have to unwind.",
    },
    { type: "h2", id: "changed", text: "What changed" },
    {
      type: "p",
      text: "Recovery-related support contacts dropped by roughly a third after the copy redesign, and completion-after-failure went from effectively zero — people simply abandoned — to a majority within two sessions. The mechanics of UPI did not change. The *sentences* did.",
    },
    {
      type: "p",
      text: "That is the part I keep coming back to: at the edges of a payments product, interface copy is not decoration. It is the difference between a user who feels robbed and a user who feels informed — and trust, once you understand it that way, becomes a designable property.",
    },
  ],
};
