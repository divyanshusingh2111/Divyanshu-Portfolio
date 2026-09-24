import { Suspense } from "react";
import type { Metadata } from "next";
import { NotesIndexView } from "@/components/portfolio/notes/notes-index";

export const metadata: Metadata = {
  title: "Studio Notes — Journal | Divyanshu Singh",
  description:
    "Essays and field notes on design systems, research and craft from the desk of Divyanshu Singh — color token architecture, dashboard narratives, UPI trust research and pre-ship audits.",
  keywords: [
    "Studio Notes",
    "Design Journal",
    "Design Systems",
    "UX Research",
    "Divyanshu Singh",
    "Product Design",
  ],
  openGraph: {
    title: "Studio Notes — Journal | Divyanshu Singh",
    description:
      "Essays and field notes on design systems, research and craft — the thinking behind the case studies.",
    type: "website",
  },
  alternates: {
    types: {
      "application/rss+xml": [
        { url: "/notes/rss.xml", title: "Studio Notes — RSS" },
      ],
      "application/feed+json": [
        { url: "/notes/feed.json", title: "Studio Notes — JSON Feed" },
      ],
    },
  },
};

export default function NotesIndexPage() {
  return (
    <Suspense fallback={null}>
      <NotesIndexView />
    </Suspense>
  );
}
