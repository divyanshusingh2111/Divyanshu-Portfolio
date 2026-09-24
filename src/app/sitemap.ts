import type { MetadataRoute } from "next";
import { CASE_STUDY_ORDER } from "@/lib/case-studies";
import { NOTES } from "@/lib/notes";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${SITE}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE}/work`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...CASE_STUDY_ORDER.map((slug) => ({
      url: `${SITE}/work/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE}/notes`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...NOTES.map((n) => ({
      url: `${SITE}/notes/${n.slug}`,
      lastModified: new Date(n.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
