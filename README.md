# Divyanshu Singh — Portfolio

Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + shadcn/ui + Framer Motion.
Single-page portfolio with the original Figma design ("Portfolio Work",
node `4:456`): hero, selected work with full case-study modals, about, process,
timeline, education, skills, tools, FAQ, and a contact section.

## Run it

```bash
bun install       # or npm install
bun run dev       # http://localhost:3000
```

Production build:

```bash
bun run build     # .next/
bun run start     # serve the build locally
```

Lint: `bun run lint` (ESLint). Types: `bunx tsc --noEmit`.

## Features

- Full case studies (challenge / approach / outcomes) in deep-linkable modals
  (`#project=<slug>`), with tag filters, prev/next, TOC, share + copy-JSON
- Command palette (Cmd/Ctrl+K), keyboard help (?), G-then-X jump shortcuts
- Light / dark / system theme (token-based, original light design unchanged)
- Scroll progress, scroll-spy nav, section indicator, back-to-top
- Contact form composes a mailto draft (no backend needed)
- Read-only API: `/api`, `/api/projects`, `/api/projects/[slug]`,
  `/api/projects/[slug]/related`, `/api/og` (dynamic 1200×630 OG image),
  `/api/feed.xml` (RSS)
- SEO: dynamic `robots.txt` + `sitemap.xml`, JSON-LD (Person + CreativeWork),
  OpenGraph/Twitter metadata

## Content & assets

- All images live in `public/portfolio/` (exported from Figma), resume at
  `public/resume.pdf`
- Contact details and links are centralized in `src/lib/portfolio/data.ts`
- Base URL: set `NEXT_PUBLIC_BASE_URL` to override (defaults to the Vercel
  deployment URL in production, localhost in dev)

## Deploy

Live at <https://divyanshu-portfolio-six.vercel.app> — the repo
([divyanshusingh2111/Divyanshu-Portfolio](https://github.com/divyanshusingh2111/Divyanshu-Portfolio))
is connected to Vercel with the **Next.js** framework preset: **every push to
`main` auto-deploys to production** (other branches get preview deployments).

To test a production build locally:

```bash
bun run build && bun run start   # http://localhost:3000
```
