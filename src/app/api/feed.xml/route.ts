import { PROJECTS } from "@/lib/portfolio/data";

export const runtime = "nodejs";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://divyanshu-portfolio-six.vercel.app"
    : "http://localhost:3000");

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * RSS 2.0 feed generated from the project case-study data. Each project
 * becomes an <item> with a deep-link URL, summary, and the project tags
 * as categories. Content-type is application/rss+xml so feed readers
 * auto-discover it.
 */
export async function GET() {
  const now = new Date().toUTCString();

  const items = PROJECTS.map((p) => {
    const url = `${BASE_URL}/#project=${p.slug}`;
    const pubDate = new Date(`${p.year}-01-01T00:00:00Z`).toUTCString();
    const categories = p.tags
      .map((t) => `      <category>${esc(t)}</category>`)
      .join("\n");
    return `    <item>
      <title>${esc(p.title)} — ${esc(p.subtitle)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(p.summary)}</description>
      <pubDate>${pubDate}</pubDate>
${categories}
    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Divyanshu Singh — Selected Work</title>
    <link>${BASE_URL}/</link>
    <description>Product design case studies — UX strategy, dashboards, design systems, and AI-ready experiences.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${BASE_URL}/api/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
