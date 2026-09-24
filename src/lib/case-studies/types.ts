import type { ReactNode } from "react";

export type CaseStudyId = "klimashift" | "autoremov" | "trivira";

/** Tone presets reused across blocks; maps to per-case-study theme accents. */
export type Tone =
  | "accent"
  | "blue"
  | "red"
  | "green"
  | "yellow"
  | "purple"
  | "teal"
  | "orange"
  | "cyan"
  | "neutral";

export interface StatItem {
  value: string;
  label: string;
  sub?: string;
  tone?: Tone;
}

export interface CardItem {
  title?: string;
  body?: string;
  tag?: string;
  tone?: Tone;
  /** small marker label above title, e.g. "#01 Hauz Khas" */
  eyebrow?: string;
  pills?: string[];
  icon?: "square" | "check" | "x" | "arrow-down" | "arrow-up" | "dot";
}

export interface QuoteData {
  text: string;
  translation?: string;
  author?: string;
  meta?: string;
  bullets?: string[];
  tone?: Tone;
}

export interface ImageItem {
  src: string;
  alt: string;
  /** intrinsic width hint for correct aspect-ratio placeholder */
  w?: number;
  h?: number;
  /** browser chrome label, e.g. "klimashift.app/home" */
  browserUrl?: string;
  /** tag chip shown over/next to the frame, e.g. "PORTFOLIO OVERVIEW" */
  frameTag?: string;
  caption?: string;
  /** tall images render narrower with internal scroll */
  tall?: boolean;
}

export type Block =
  | { type: "text"; text: string; tone?: Tone; lead?: boolean }
  | { type: "subheading"; text: string; tone?: Tone }
  | { type: "stats"; items: StatItem[]; variant?: "grid" | "hero" }
  | { type: "cards"; cards: CardItem[]; columns?: 2 | 3 | 4; tone?: Tone }
  | { type: "pills"; items: string[]; label?: string; tone?: Tone }
  | { type: "quote"; quote: QuoteData }
  | { type: "callout"; title?: string; text: string; tone?: Tone; icon?: string }
  | { type: "image"; image: ImageItem }
  | { type: "gallery"; images: ImageItem[]; columns?: 2 | 3 }
  | { type: "stages"; items: { stage: string; title: string; body: string; tone?: Tone }[] }
  | { type: "list"; items: string[]; ordered?: boolean; tone?: Tone }
  | { type: "flow"; items: string[]; label?: string }
  | { type: "panel"; title: string; badge?: string; rows: { left: string; right?: string; tone?: Tone }[]; note?: string; tone?: Tone }
  | { type: "compare"; works: string[]; fails: string[] }
  | { type: "metadata"; items: { label: string; value: string }[] };

export interface Section {
  id: string;
  /** e.g. "01 · PROBLEM STATEMENT" */
  label: string;
  /** heading may contain an accent part rendered in the theme color */
  heading: string;
  /** accent-highlighted tail of the heading, rendered in theme/script color */
  headingAccent?: string;
  blocks: Block[];
}

export interface CaseStudyTheme {
  /** case page accent for labels/pills/links */
  accent: string;
  accentSoft: string;
  /** dark-mode soft tint for section label pills (defaults to accentSoft) */
  accentSoftDark?: string;
  /** hero card background (css value, can be gradient) */
  heroBg: string;
  /** hero card text color */
  heroText: string;
  /** dark-mode hero background (defaults to heroBg) */
  heroBgDark?: string;
  /** dark-mode hero text color (defaults to heroText) */
  heroTextDark?: string;
  /** closing card background */
  closingBg: string;
  /** chrome bar style: "blueprint" (klima/trivira) | "fintech" (autoremov) */
  chrome: "blueprint" | "fintech";
}

export interface CaseStudy {
  id: "klimashift" | "autoremov" | "trivira";
  /** index shown on the work card, e.g. "01" */
  index: string;
  title: string;
  subtitle: string;
  cover: string;
  coverAlt: string;
  tags: string[];
  theme: CaseStudyTheme;
  /** hero */
  hero: {
    label: string;
    title: string;
    /** words rendered with gradient (autoremov "PAYMENT") — comma separated */
    gradientWords?: string;
    paragraph: string;
    tags: string[];
    stats: StatItem[];
    image?: ImageItem;
  };
  /** meta bar under hero */
  meta: { label: string; value: string }[];
  sections: Section[];
  closing: {
    label: string;
    heading: string;
    text?: string;
    cards: CardItem[];
    tone?: Tone;
  };
}

export interface BlockRendererProps {
  block: Block;
  theme: CaseStudyTheme;
  children?: ReactNode;
}
