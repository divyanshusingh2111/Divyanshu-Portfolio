import { NextResponse } from "next/server";

export const runtime = "nodejs";

type RouteDoc = {
  path: string;
  method: "GET" | "POST" | "HEAD";
  description: string;
  auth?: string;
  example?: string;
};

const ROUTES: RouteDoc[] = [
  {
    path: "/api",
    method: "GET",
    description: "This endpoint — API directory.",
  },
  {
    path: "/api/projects",
    method: "GET",
    description: "List all projects (lightweight metadata — no challenge/approach body).",
  },
  {
    path: "/api/projects/[slug]",
    method: "GET",
    description: "Full case-study JSON for a project (for SEO crawlers + share previews).",
    example: "GET /api/projects/klimashift",
  },
  {
    path: "/api/projects/[slug]",
    method: "HEAD",
    description: "Lightweight existence check for a project slug.",
  },
  {
    path: "/api/projects/[slug]/related",
    method: "GET",
    description: "Projects related to the given slug, ranked by shared tags.",
    example: "GET /api/projects/klimashift/related",
  },
  {
    path: "/api/og",
    method: "GET",
    description: "Dynamic Open Graph image (1200×630 PNG). Supports ?title= & ?subtitle= query params.",
  },
  {
    path: "/api/feed.xml",
    method: "GET",
    description: "RSS 2.0 feed of project case studies. Content-Type: application/rss+xml.",
  },
];

/**
 * GET /api — API directory.
 * Lists the available read-only API routes with methods + descriptions so
 * developers can discover the programmatic interface from the [ API ] footer
 * link.
 */
export async function GET() {
  return NextResponse.json({
    name: "Divyanshu Singh — Product Designer",
    description:
      "Programmatic API for the portfolio. All endpoints are read-only. No auth required.",
    status: "ok",
    time: new Date().toISOString(),
    routes: ROUTES,
    links: {
      self: "/api",
      projects: "/api/projects",
      feed: "/api/feed.xml",
      og: "/api/og",
    },
  });
}
