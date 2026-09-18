"use client";

import * as React from "react";
import { Link2, Check } from "lucide-react";
import { toast } from "sonner";

type Props = {
  id?: string;
  label?: string; // e.g. "● SELECTED WORK"
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

/**
 * Section heading with an optional mono label, a title, and a hover-revealed
 * "copy link to this section" button. Preserves the portfolio's section
 * heading look (mono label + bold title + hand-accent span).
 */
export default function SectionHeading({
  id,
  label,
  title,
  subtitle,
  align = "left",
  className,
}: Props) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const onCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!id) return;
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      toast.success("Section link copied");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Couldn't copy link");
    }
  };

  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  return (
    <div
      className={`group/heading flex flex-col gap-3 ${
        align === "center" ? "items-center text-center" : "items-start"
      } ${className ?? ""}`}
    >
      {label && (
        <p className="font-mono text-xs font-bold text-accent">{label}</p>
      )}
      <div className="relative flex items-center gap-2">
        <h2 className="text-4xl leading-tight font-bold sm:text-5xl">{title}</h2>
        {id && (
          <button
            type="button"
            onClick={onCopy}
            aria-label="Copy link to this section"
            className="ml-1 flex size-7 items-center justify-center rounded-full border border-line bg-surface text-muted opacity-0 transition-all hover:border-accent/40 hover:text-accent focus-visible:opacity-100 group-hover/heading:opacity-100"
          >
            {copied ? (
              <Check className="size-3.5 text-good" />
            ) : (
              <Link2 className="size-3.5" />
            )}
          </button>
        )}
      </div>
      {subtitle && (
        <div className="max-w-[640px] text-sm text-muted">{subtitle}</div>
      )}
    </div>
  );
}
