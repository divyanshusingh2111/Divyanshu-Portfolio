import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/portfolio/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ??
    (process.env.NODE_ENV === "production" ? "https://divyanshu-portfolio-six.vercel.app" : "http://localhost:3000");
  const now = new Date();

  // Home page with all the main sections.
  const home: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  // Dedicated case-study pages.
  const projects: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  // Section anchors (so crawlers discover the in-page sections).
  const sections = [
    "work",
    "about",
    "process",
    "timeline",
    "education",
    "skills",
    "tools",
    "faq",
    "contact",
  ];
  const sectionEntries: MetadataRoute.Sitemap = sections.map((s) => ({
    url: `${baseUrl}/#${s}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...home, ...projects, ...sectionEntries];
}
