"use client";

import { useMemo, useState } from "react";
import { Braces, Check, Copy, Download, FileText, Mail, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { renderWelcomeEmail } from "@/lib/emails/welcome";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

/**
 * Studio Ledger — welcome-email preview.
 *
 * Renders the exact HTML/text a fresh subscriber would receive (see
 * lib/emails/welcome.ts) inside a sandboxed iframe, with copy + download
 * affordances so the template can be pasted into any ESP or sent manually.
 */
export function WelcomeEmailPreview() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"html" | "text">("html");
  const [copied, setCopied] = useState<"html" | "text" | null>(null);

  const email = useMemo(() => renderWelcomeEmail("reader@example.com"), []);

  const copy = async (what: "html" | "text") => {
    try {
      await navigator.clipboard.writeText(what === "html" ? email.html : email.text);
      setCopied(what);
      window.setTimeout(() => setCopied(null), 2000);
      toast({ title: what === "html" ? "Email HTML copied" : "Plain text copied" });
    } catch {
      toast({ title: "Could not copy — try the download instead", variant: "destructive" });
    }
  };

  const download = () => {
    try {
      const blob = new Blob([email.html], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "studio-notes-welcome.html";
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: "Downloaded studio-notes-welcome.html" });
    } catch {
      toast({ title: "Could not start the download", variant: "destructive" });
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden items-center gap-1.5 rounded-full border border-ink/12 px-3.5 py-1.5 font-mono-x text-[10px] font-bold tracking-[0.14em] uppercase text-ink-soft transition-colors hover:border-terra/40 hover:text-terra-deep md:inline-flex dark:border-white/15"
        title="Preview the welcome email sent to new subscribers"
      >
        <Mail className="size-3.5" aria-hidden="true" />
        Welcome email
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[880px] gap-0 overflow-hidden border border-ink/12 bg-card p-0 dark:border-white/15 [&>button]:z-10">
          {/* email-client chrome */}
          <DialogHeader className="space-y-0 border-b border-ink/10 bg-cream-deep/60 px-6 pt-6 pb-4 text-left dark:border-white/10 dark:bg-night/60">
            <p className="flex items-center gap-2 font-mono-x text-[9.5px] font-bold tracking-[0.2em] uppercase text-terra-deep">
              <span aria-hidden="true" className="inline-block size-[6px] rounded-full bg-terra" />
              New-subscriber welcome · preview
            </p>
            <DialogTitle className="mt-2 font-display text-[18px] font-semibold leading-snug text-ink dark:text-white">
              {email.subject}
            </DialogTitle>
            <DialogDescription className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono-x text-[10px] tracking-[0.08em] text-ink-faint">
              <span>
                to: <span className="text-ink-soft dark:text-ink">reader@example.com</span>
              </span>
              <span aria-hidden="true" className="hidden h-3 w-px bg-ink/20 sm:block dark:bg-white/20" />
              <span className="hidden sm:inline">preheader: {email.preheader}</span>
            </DialogDescription>
          </DialogHeader>

          {/* toolbar */}
          <div className="flex flex-wrap items-center gap-2 border-b border-ink/10 px-6 py-3 dark:border-white/10">
            <div role="group" aria-label="Preview mode" className="flex rounded-full border border-ink/12 p-0.5 dark:border-white/15">
              {(["html", "text"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  aria-pressed={mode === m}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono-x text-[9.5px] font-bold tracking-[0.14em] uppercase transition-all ${
                    mode === m ? "bg-night text-white dark:bg-terra" : "text-ink-faint hover:text-ink dark:hover:text-white"
                  }`}
                >
                  {m === "html" ? <Braces className="size-3" aria-hidden="true" /> : <FileText className="size-3" aria-hidden="true" />}
                  {m === "html" ? "HTML" : "Plain text"}
                </button>
              ))}
            </div>
            <div className="ml-auto flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => copy(mode)}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/12 px-3.5 py-1.5 font-mono-x text-[9.5px] font-bold tracking-[0.14em] uppercase text-ink-soft transition-all hover:border-terra/40 hover:text-terra-deep dark:border-white/15"
              >
                {copied === mode ? <Check className="size-3.5 text-leaf" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
                {copied === mode ? "Copied" : `Copy ${mode === "html" ? "HTML" : "text"}`}
              </button>
              {mode === "html" && (
                <button
                  type="button"
                  onClick={download}
                  className="inline-flex items-center gap-1.5 rounded-full bg-night px-3.5 py-1.5 font-mono-x text-[9.5px] font-bold tracking-[0.14em] uppercase text-white transition-colors hover:bg-terra dark:bg-terra dark:hover:bg-terra-deep"
                >
                  <Download className="size-3.5" aria-hidden="true" />
                  Download
                </button>
              )}
            </div>
          </div>

          {/* body */}
          {mode === "html" ? (
            <div className="max-h-[62vh] overflow-y-auto bg-cream-deep/40 p-4 sm:p-6 dark:bg-night/50">
              <iframe
                title="Welcome email HTML preview"
                srcDoc={email.html}
                sandbox=""
                className="mx-auto block h-[560px] w-full max-w-[600px] rounded-[14px] border border-ink/10 bg-white shadow-[0_24px_60px_-30px_rgba(30,32,34,0.35)] dark:border-white/15"
              />
              <p className="mx-auto mt-4 max-w-[600px] text-center font-mono-x text-[9px] tracking-[0.16em] uppercase text-ink-faint">
                Rendered in a sandboxed iframe — exactly what an inbox sees
              </p>
            </div>
          ) : (
            <div className="max-h-[62vh] overflow-y-auto p-4 sm:p-6">
              <pre className="mx-auto max-w-[600px] whitespace-pre-wrap rounded-[14px] border border-ink/10 bg-night p-5 font-mono-x text-[11px] leading-[1.7] text-white/85 dark:border-white/15">
                {email.text}
              </pre>
              <p className="mx-auto mt-4 max-w-[600px] text-center font-mono-x text-[9px] tracking-[0.16em] uppercase text-ink-faint">
                The plain-text sibling — for clients that strip styling
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
