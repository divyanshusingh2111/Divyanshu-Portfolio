import { NextRequest, NextResponse } from "next/server";
import { PROJECTS } from "@/lib/portfolio/data";

export const runtime = "nodejs";

type Params = { params: Promise<{ slug: string }> };

/**
 * Returns the full project JSON for a given slug. This lets SEO crawlers
 * and share-preview bots read the case-study content without rendering the
 * client page. The sitemap already lists the dedicated pages
 * (`/work/<slug>`), and this route gives those links crawlable body
 * content.
 */
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { slug } = await params;
    const project = PROJECTS.find((p) => p.slug === slug.toLowerCase());

    if (!project) {
      return NextResponse.json(
        { error: "Project not found", slug },
        { status: 404 }
      );
    }

    // Strip the icon-rendering fields that don't serialize cleanly.
    const {
      slug: _slug,
      index,
      title,
      subtitle,
      tags,
      thumb,
      year,
      role,
      duration,
      summary,
      challenge,
      approach,
      outcomes,
      gallery,
    } = project;

    return NextResponse.json({
      slug: _slug,
      index,
      title,
      subtitle,
      tags,
      thumb,
      thumbBg: project.thumbBg,
      year,
      role,
      duration,
      summary,
      challenge,
      approach,
      outcomes,
      gallery,
      // Helpful metadata for crawlers + share previews.
      url: `/work/${_slug}`,
      type: "case-study",
      lastModified: new Date().toISOString(),
      readingTimeMinutes: Math.max(
        1,
        Math.round(
          [summary, challenge, ...approach].join(" ").split(/\s+/).filter(Boolean).length / 220
        )
      ),
    });
  } catch (err) {
    console.error("[/api/projects/[slug]] error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/** Support HEAD requests for lightweight uptime checks. */
export async function HEAD(_req: NextRequest, { params }: Params) {
  const { slug } = await params;
  const exists = PROJECTS.some((p) => p.slug === slug.toLowerCase());
  return new Response(null, { status: exists ? 200 : 404 });
}
