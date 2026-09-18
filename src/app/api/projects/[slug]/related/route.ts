import { NextRequest, NextResponse } from "next/server";
import { PROJECTS } from "@/lib/portfolio/data";

export const runtime = "nodejs";

type Params = { params: Promise<{ slug: string }> };

/**
 * Returns projects related to the given slug, ranked by the number of
 * shared tags (descending). Projects with no shared tags are still
 * included as fallbacks (after the tag-matched ones) so the response is
 * never empty (unless there's only one project total).
 *
 * Example: /api/projects/klimashift/related
 * → Autoremov (0 shared), Trivira (0 shared)
 * (KlimaShift has Dashboard/AI/SaaS; none match Autoremov's Service/
 * Image Background/Web or Trivira's Branding/Packaging/Web — so they're
 * returned as fallbacks in their original order.)
 */
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { slug } = await params;
    const current = PROJECTS.find((p) => p.slug === slug.toLowerCase());

    if (!current) {
      return NextResponse.json(
        { error: "Project not found", slug },
        { status: 404 }
      );
    }

    const others = PROJECTS.filter((p) => p.slug !== current.slug);

    // Score each other project by the number of shared tags.
    const scored = others
      .map((p) => {
        const sharedTags = current.tags.filter((t) => p.tags.includes(t));
        return { project: p, sharedTags, score: sharedTags.length };
      })
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        // Tie-break: keep original order.
        return PROJECTS.indexOf(a.project) - PROJECTS.indexOf(b.project);
      });

    const data = scored.map(({ project, sharedTags, score }) => ({
      slug: project.slug,
      index: project.index,
      title: project.title,
      subtitle: project.subtitle,
      tags: project.tags,
      thumb: project.thumb,
      year: project.year,
      url: `/#project=${project.slug}`,
      sharedTags,
      relevanceScore: score,
    }));

    return NextResponse.json({
      slug: current.slug,
      count: data.length,
      related: data,
    });
  } catch (err) {
    console.error("[/api/projects/[slug]/related] error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
