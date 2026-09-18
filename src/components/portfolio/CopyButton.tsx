"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

type Props = {
  value: string;
  label?: string;
  className?: string;
  size?: "sm" | "md";
};

/** Small button that copies `value` to the clipboard with toast feedback. */
export default function CopyButton({ value, label, className, size = "sm" }: Props) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const onCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        // Fallback for older browsers.
        const ta = document.createElement("textarea");
        ta.value = value;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      toast.success(label ? `${label} copied` : "Copied to clipboard");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Couldn't copy — try selecting manually.");
    }
  };

  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const sz = size === "md" ? "size-9" : "size-7";

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={`Copy ${label ?? "value"} to clipboard`}
      className={`${sz} flex shrink-0 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-accent/40 hover:text-accent ${
        className ?? ""
      }`}
    >
      {copied ? <Check className="size-3.5 text-good" /> : <Copy className="size-3.5" />}
    </button>
  );
}
