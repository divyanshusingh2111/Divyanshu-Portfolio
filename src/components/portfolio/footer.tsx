"use client";

import { Newsletter } from "./newsletter";

export function Footer() {
  return (
    <footer className="relative border-t border-ink/10 mt-auto">
      <div className="container-portfolio">
        {/* Studio Notes newsletter strip */}
        <Newsletter />

        {/* Legal bar */}
        <div className="border-t border-ink/10 dark:border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-7 pb-[max(28px,env(safe-area-inset-bottom))]">
            <p className="font-mono-x text-[9.5px] md:text-[10px] tracking-[0.2em] uppercase text-ink-faint text-center sm:text-left">
              © 2026 Divyanshu Singh. All rights reserved.
            </p>
            <a
              href="#top"
              className="group inline-flex items-center gap-1.5 font-mono-x text-[9.5px] md:text-[10px] tracking-[0.2em] uppercase text-ink-faint hover:text-terra transition-colors duration-200 py-1.5 px-2 -mx-2 rounded-sm hover:bg-terra/5"
              aria-label="Return to top of portfolio"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 12 12"
                className="w-3 h-3 transition-transform duration-200 group-hover:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 10.5v-6" />
                <path d="M3.2 6.8 6 4l2.8 2.8" />
                <path d="M1.5 1.5h9" />
              </svg>
              Back to top
            </a>
            <p className="font-mono-x text-[9.5px] md:text-[10px] tracking-[0.2em] uppercase text-ink-faint text-center sm:text-right">
              Built with all skills &amp; knowledge
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
