"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { SectionLabel } from "./section-label";
import { Reveal } from "./reveal";
import { ContactForm } from "./contact-form";

const EMAIL = "hello@divyanshu.design";

const LINKS: { label: string; href: string; download?: boolean }[] = [
  { label: "EMAIL", href: `mailto:${EMAIL}` },
  { label: "LINKEDIN", href: "https://www.linkedin.com/" },
  { label: "BEHANCE", href: "https://www.behance.net/" },
  { label: "RESUME DOWNLOAD", href: "/design-assets/divyanshu-singh-resume.pdf", download: true },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      toast({ title: `Email copied — ${EMAIL}` });
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      toast({ title: "Could not copy email — it's " + EMAIL, variant: "destructive" });
    }
  };

  return (
    <section id="connect" className="relative pt-24 md:pt-32 pb-0 overflow-hidden">
      {/* Decorative blobs */}
      <div
        aria-hidden="true"
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[720px] h-[360px] pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(224,106,59,0.14), transparent 72%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container-portfolio relative">
        <div className="flex flex-col items-center text-center pb-24 md:pb-28">
          <Reveal>
            <SectionLabel text="Connect With Me" className="justify-center mb-7" />
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display font-semibold text-ink text-[clamp(2.4rem,5.2vw,4.2rem)] leading-[1.05] tracking-[-0.015em]">
              Let&apos;s build something{" "}
              <span className="font-script font-semibold text-terra text-[clamp(2.7rem,5.8vw,4.7rem)]">
                meaningful
              </span>
              <br />
              together.
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-7 text-[15px] md:text-[17px] leading-[1.65] text-ink-soft max-w-[520px]">
              Open to product design, UX strategy, enterprise UX, and emerging technology
              opportunities.
            </p>
          </Reveal>

          {/* Links + dotted arrow */}
          <Reveal delay={0.3} className="relative mt-16 md:mt-20 w-full">
            {/* Hand-drawn dotted arrow pointing to EMAIL */}
            <motion.svg
              aria-hidden="true"
              viewBox="0 0 220 90"
              fill="none"
              className="hidden md:block absolute -top-[85px] left-1/2 -translate-x-[330px] w-[220px] h-[90px] pointer-events-none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.5, ease: "easeInOut" }}
            >
              <motion.path
                d="M 212 12 C 130 4, 60 26, 42 58 C 36 70, 40 80, 48 84"
                stroke="#5C5F62"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeDasharray="1 9"
                pathLength={1}
              />
              <motion.path
                d="M 56 78 L 47 85 L 43 73"
                stroke="#5C5F62"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 1.2 }}
              />
            </motion.svg>

            <nav
              className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
              aria-label="Contact links"
            >
              {LINKS.map((link) => (
                <span key={link.label} className="inline-flex items-center gap-2">
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    download={link.download ? "divyanshu-singh-resume.pdf" : undefined}
                    className="group relative font-mono-x text-[13px] md:text-[14px] font-medium tracking-[0.14em] text-ink transition-colors hover:text-terra py-1"
                  >
                    <span className="text-terra/70 transition-colors group-hover:text-terra">[</span>{" "}
                    {link.label}{" "}
                    <span className="text-terra/70 transition-colors group-hover:text-terra">]</span>
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-0.5 left-3 right-3 h-[2px] bg-terra rounded-full scale-x-0 origin-center transition-transform duration-300 group-hover:scale-x-100"
                    />
                  </a>
                  {/* copy-email affordance next to the EMAIL link */}
                  {link.label === "EMAIL" && (
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="inline-flex size-7 items-center justify-center rounded-full border border-ink/12 bg-card/70 text-ink-soft transition-all hover:border-terra hover:text-terra hover:shadow-[0_6px_14px_-8px_rgba(224,106,59,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra"
                      aria-label={copied ? "Email address copied" : `Copy email address (${EMAIL}) to clipboard`}
                      aria-live="polite"
                    >
                      {copied ? <Check className="size-3.5 text-leaf" /> : <Copy className="size-3.5" />}
                    </button>
                  )}
                </span>
              ))}
            </nav>
          </Reveal>

          {/* Direct message form */}
          <div className="mt-16 md:mt-20 w-full">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
