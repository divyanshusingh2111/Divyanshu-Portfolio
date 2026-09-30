import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BookOpen, LayoutGrid } from "lucide-react";
import { ThemeToggle } from "@/components/portfolio/theme-toggle";

/**
 * Branded 404 — "lost between the frames". Follows the studio design
 * language: cream canvas, mono eyebrow, display heading with a script
 * accent, and the same pill actions used across the site.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      {/* top bar */}
      <header className="sticky top-0 z-40 border-b border-ink/8 bg-cream/92 backdrop-blur-xl dark:border-white/10">
        <div className="mx-auto flex h-[60px] max-w-[1240px] items-center justify-between gap-3 px-4 md:px-8">
          <Link href="/" className="group flex items-center gap-2.5" aria-label="Back to portfolio home">
            <Image
              src="/design-assets/logo-monogram.png"
              alt="Divyanshu Singh monogram logo"
              width={28}
              height={28}
              className="size-7 object-contain"
              priority
            />
            <span className="hidden font-mono-x text-[11px] font-bold tracking-[0.18em] uppercase text-ink sm:inline">
              Divyanshu <span className="text-terra">Singh</span>
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="relative mx-auto flex w-full max-w-[860px] flex-1 flex-col items-center justify-center px-4 py-20 text-center md:py-28">
        {/* dotted grid backdrop */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 h-[340px] -translate-y-1/2 opacity-[0.35] dark:opacity-[0.15]"
          style={{
            backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

        <p className="relative flex items-center gap-2.5 font-mono-x text-[10.5px] font-bold tracking-[0.22em] uppercase text-terra-deep">
          <span aria-hidden="true" className="inline-block size-[7px] rounded-full bg-terra" />
          Error 404 — Page not found
        </p>

        {/* giant faded index watermark */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-8 select-none font-display text-[clamp(7rem,22vw,13rem)] font-bold leading-none tracking-[-0.04em] text-ink/6 dark:text-white/6"
        >
          404
        </span>

        <h1 className="relative mt-7 font-display text-[clamp(2.4rem,6.5vw,4.2rem)] font-semibold leading-[1.04] tracking-[-0.015em] text-ink">
          Lost between
          <br />
          the <span className="font-script font-semibold text-terra">frames.</span>
        </h1>

        <p className="relative mt-6 max-w-[460px] text-[14.5px] md:text-[15.5px] leading-[1.7] text-ink-soft">
          This screen never made it past the wireframe — the URL may be mistyped,
          or the page moved during a redesign of the studio.
        </p>

        <p className="relative mt-3 font-script text-[21px] leading-tight text-ink-soft/80 dark:text-ink-faint">
          no hard feelings — happens to the best flows.
        </p>

        {/* actions */}
        <div className="relative mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-night px-6 py-3 font-display text-[14.5px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-14px_rgba(15,23,42,0.5)] dark:bg-terra dark:hover:bg-terra-deep"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to the portfolio
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-card px-6 py-3 font-display text-[14.5px] font-semibold text-ink transition-all hover:border-ink/40 dark:border-white/15"
          >
            <LayoutGrid className="size-4" aria-hidden="true" />
            Case studies
          </Link>
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-card px-6 py-3 font-display text-[14.5px] font-semibold text-ink transition-all hover:border-ink/40 dark:border-white/15"
          >
            <BookOpen className="size-4" aria-hidden="true" />
            Studio Notes
          </Link>
        </div>

        <p className="relative mt-10 font-mono-x text-[9.5px] tracking-[0.18em] uppercase text-ink-faint">
          or press <span className="kbd-chip">⌘K</span> <span className="kbd-chip">/</span> to search the studio
        </p>

        <p className="relative mt-2 flex items-center gap-1.5 font-mono-x text-[9.5px] tracking-[0.14em] uppercase text-ink-faint/80">
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
          three case studies · four notes · one inbox
        </p>
      </main>

      <footer className="mt-auto border-t border-ink/8 dark:border-white/10">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-3 px-4 py-6 md:px-8">
          <p className="font-mono-x text-[9.5px] tracking-[0.22em] uppercase text-ink-faint">
            © 2026 Divyanshu Singh. All rights reserved.
          </p>
          <p className="hidden font-mono-x text-[9.5px] tracking-[0.22em] uppercase text-ink-faint sm:block">
            404 · Off-canvas
          </p>
        </div>
      </footer>
    </div>
  );
}
