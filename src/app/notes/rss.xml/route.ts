import { NOTES } from "@/lib/notes";
import { noteExcerpt } from "@/lib/notes/excerpt";

export const dynamic = "force-static";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const latest = NOTES[0];
  const items = NOTES.map((n) => {
    const url = `${SITE}/notes/${n.slug}`;
    const pubDate = new Date(`${n.date}T09:00:00+05:30`).toUTCString();
    return `    <item>
      <title>${esc(n.title)}</title>
      <link>${esc(url)}</link>
      <guid isPermaLink="true">${esc(url)}</guid>
      <description>${esc(noteExcerpt(n))}</description>
      <category>${esc(n.category)}</category>
      ${n.tags.map((t) => `<category>${esc(t)}</category>`).join("\n      ")}
      <pubDate>${pubDate}</pubDate>
    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Studio Notes — Divyanshu Singh</title>
    <link>${esc(SITE)}/notes</link>
    <atom:link href="${esc(SITE)}/notes/rss.xml" rel="self" type="application/rss+xml"/>
    <description>Essays and field notes on design systems, research and craft — the thinking behind the case studies, by Divyanshu Singh.</description>
    <language>en</language>
    <copyright>© 2026 Divyanshu Singh. All rights reserved.</copyright>
    <lastBuildDate>${new Date(`${latest.date}T09:00:00+05:30`).toUTCString()}</lastBuildDate>
    <generator>Studio Notes Journal</generator>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
