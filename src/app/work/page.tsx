import type { Metadata } from "next";
import { WorkIndexView } from "@/components/portfolio/case-study/work-index";

export const metadata: Metadata = {
  title: "Selected Work — Case Studies | Divyanshu Singh",
  description:
    "Crafting experiences that drive real impact. Case studies: KlimaShift AI Energy Intelligence Platform, Autoremov AI Background Removal SaaS and Trivira Global Branding.",
  keywords: [
    "Divyanshu Singh",
    "Case Studies",
    "UX Design",
    "Product Design",
    "KlimaShift",
    "Autoremov",
    "Trivira",
  ],
  openGraph: {
    title: "Selected Work — Case Studies | Divyanshu Singh",
    description:
      "Crafting experiences that drive real impact — deep case studies spanning AI enterprise SaaS and brand-led e-commerce.",
    type: "website",
  },
};

export default function WorkIndexPage() {
  return <WorkIndexView />;
}
