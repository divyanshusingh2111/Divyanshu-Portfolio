import { NOTES } from "@/lib/notes";
import { noteExcerpt } from "@/lib/notes/excerpt";

export const dynamic = "force-static";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/**
 * JSON Feed 1.1 — https://jsonfeed.org/version/1.1
 * The machine-friendly sibling of /notes/rss.xml: same content, same order,
 * structured for feed readers and client-side integrations.
 */
export function GET() {
  const items = NOTES.map((n) => ({
    id: `${SITE}/notes/${n.slug}`,
    url: `${SITE}/notes/${n.slug}`,
    title: n.title,
    summary: noteExcerpt(n),
    date_published: new Date(`${n.date}T09:00:00+05:30`).toISOString(),
    date_modified: new Date(`${n.date}T09:00:00+05:30`).toISOString(),
    tags: [n.category, ...n.tags],
    authors: [{ name: "Divyanshu Singh", url: SITE }],
  }));

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "Studio Notes — Divyanshu Singh",
    home_page_url: `${SITE}/notes`,
    feed_url: `${SITE}/notes/feed.json`,
    description:
      "Essays and field notes on design systems, research and craft — the thinking behind the case studies, by Divyanshu Singh.",
    language: "en",
    authors: [{ name: "Divyanshu Singh", url: SITE }],
    items,
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
