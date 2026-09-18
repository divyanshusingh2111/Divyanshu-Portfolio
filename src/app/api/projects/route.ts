import { NextResponse } from "next/server";
import { PROJECTS } from "@/lib/portfolio/data";

export const runtime = "nodejs";

/**
 * Returns metadata for all projects (lightweight — no challenge/approach
 * body text). Useful for programmatic access, sitemap generation, and
 * share-preview aggregators. For the full case-study body, use
 * /api/projects/[slug].
 */
export async function GET() {
  const data = PROJECTS.map((p) => ({
    slug: p.slug,
    index: p.index,
    title: p.title,
    subtitle: p.subtitle,
    tags: p.tags,
    thumb: p.thumb,
    year: p.year,
    role: p.role,
    duration: p.duration,
    summary: p.summary,
    outcomes: p.outcomes,
    url: `/#project=${p.slug}`,
    api: `/api/projects/${p.slug}`,
  }));

  return NextResponse.json({
    count: data.length,
    projects: data,
    generated: new Date().toISOString(),
  });
}
