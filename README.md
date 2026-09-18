# Divyanshu Singh — Portfolio

Vite + React 19 + Tailwind CSS v4 + Motion (Framer Motion) + React Router.
Ported from the Figma file "Portfolio Work" (homepage frame, node `4:456`).

## Run it

```bash
cd portfolio
npm install
npm run dev       # http://localhost:5173
```

Production build:

```bash
npm run build      # outputs to dist/
npm run preview    # serve the build locally to sanity-check it
```

## Verify

- `npm run build` completes with no errors (already confirmed here — 442 modules, ~407KB JS gzip 129KB).
- Visually compare `npm run dev` against the Figma frame `4:456` in the file (`https://www.figma.com/design/bq4p7jP27KCJsittmfR9IO/Portfolio-Work?node-id=4-456`).
- Nav links (`Work`, `About`, `Process`, `Resume`) scroll to their matching `id`; project cards route to `/work/klimashift`, `/work/autoremov`, `/work/trivira`.

## Assets

All images/icons live in `src/assets/img/` and are re-exported from
`src/assets/figma-assets.js` (originally exported from the Figma file, downloaded
and committed — no external CDN dependencies). The hero photo is served at full
quality; work thumbnails are sized to ~2x their display size for sharp retina
rendering. `public/og-image.png` is the 1200×630 social-share card.

## What's built vs. what's next

This covers the **homepage only** — hero, selected work, about, work timeline,
education, skills matrix, tools stack, contact/footer. The Figma file also has
four more full-page frames (`Trivira`, `Autoremov`, `Document`, `Klimashift`)
that read as individual case-study pages linked from the "Selected Work" cards.
Those aren't built yet — `/work/klimashift`, `/work/autoremov`, `/work/trivira`
currently render a placeholder page so the links don't 404. Say the word and
I'll port those next, one at a time.

## Deliberate deviations from the raw Figma export

- **Fonts**: Figma's export uses literal class names like `font-['Inter:Bold']`
  (not real CSS). Mapped to actual `font-sans`/`font-mono`/`font-hand`
  (Inter / JetBrains Mono / Caveat, loaded via Google Fonts) + weight utilities.
- **Layout**: the raw export is absolute-positioned pixel soup (fine for a
  static Figma frame, brittle and non-responsive as real code). Rebuilt with
  flexbox/grid that holds the same fonts, sizes, colors, spacing and border
  radii, but reflows on mobile instead of breaking.
- **Animations**: Figma's prototype export loops the reveal animations
  infinitely (`repeat: Infinity`) — that's a side-effect of how Figma's own
  preview loops, not a real production pattern. Implemented as one-time
  entrance transitions instead (fade/slide on load, subtle float on the stat
  card) so the page doesn't visibly jitter forever.

## Deploy

The repo ([divyanshusingh2111/Divyanshu-Portfolio](https://github.com/divyanshusingh2111/Divyanshu-Portfolio))
is connected to Vercel — pushes to the `production` branch deploy automatically
to <https://divyanshu-portfolio-six.vercel.app> (the production branch is set
in the Vercel dashboard; other branches get preview deployments). Vite is
auto-detected (npm install + vite build → dist/); client-side routing fallback
for `/work/*` deep links comes from `vercel.json`.
