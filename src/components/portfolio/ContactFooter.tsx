"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Send, Mail, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { FOOTER_LINKS, CONTACT_EMAIL } from "@/lib/portfolio/data";
import CopyButton from "./CopyButton";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget: string;
};

const BUDGETS = ["< $2k", "$2k – $5k", "$5k – $15k", "$15k +", "Not sure yet"];

export default function ContactFooter() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const [form, setForm] = React.useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
    budget: "",
  });
  const [errors, setErrors] = React.useState<Partial<FormState>>({});

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Please tell me your name.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "That email looks off.";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "A little more detail helps (10+ chars).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // No backend on the static deployment — compose a mailto draft instead.
  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const subject = encodeURIComponent(
      form.subject.trim() || `New project inquiry from ${form.name.trim()}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${form.name.trim()}`,
        `Email: ${form.email.trim()}`,
        form.budget ? `Budget: ${form.budget}` : null,
        "",
        form.message.trim(),
      ]
        .filter((line) => line !== null)
        .join("\n")
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    toast.success("Opening your email client…");
  };

  const set = (k: keyof FormState, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <section id="contact" className="border-t border-line px-6 py-20 md:px-16">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="font-mono text-xs font-bold text-accent">● CONNECT WITH ME</p>
          <h2 className="text-4xl leading-tight font-bold sm:text-6xl">
            Let&apos;s build something{" "}
            <span className="font-hand font-bold text-accent">meaningful</span> together.
          </h2>
          <p className="max-w-[576px] text-lg text-muted">
            Open to product design, UX strategy, enterprise UX, and emerging technology
            opportunities.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-[11px]">
            <span className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5">
              <span className="size-2 rounded-full bg-good animate-soft-pulse" /> Replying within 24h
            </span>
          </div>
        </div>

        {/* Contact form + side info */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
            onSubmit={onSubmit}
            noValidate
            className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="Your name"
                error={errors.name}
              >
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Jane Designer"
                  className="w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-sm outline-none focus:border-accent focus:bg-surface"
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="jane@company.com"
                  className="w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-sm outline-none focus:border-accent focus:bg-surface"
                />
              </Field>
            </div>

            <Field label="Subject">
              <input
                type="text"
                value={form.subject}
                onChange={(e) => set("subject", e.target.value)}
                placeholder="Product design sprint for our analytics app"
                className="w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-sm outline-none focus:border-accent focus:bg-surface"
              />
            </Field>

            <Field label="Project budget (optional)">
              <div className="flex flex-wrap gap-2">
                {BUDGETS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => set("budget", form.budget === b ? "" : b)}
                    className={`rounded-full border px-3 py-1.5 font-mono text-[10px] transition-colors ${
                      form.budget === b
                        ? "border-accent bg-accent-soft text-accent"
                        : "border-line bg-bg text-muted hover:border-accent/40"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Message" error={errors.message}>
              <textarea
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                rows={5}
                placeholder="Tell me about the problem you're trying to solve…"
                className="w-full resize-y rounded-lg border border-line bg-bg px-3 py-2.5 text-sm outline-none focus:border-accent focus:bg-surface"
              />
            </Field>

            <button
              type="submit"
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
            >
              Send message <Send className="size-4" />
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="flex flex-col gap-6"
          >
            <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
              <p className="font-mono text-[9px] font-bold text-muted">● DIRECT CHANNELS</p>
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="group flex items-center justify-between rounded-xl border border-line bg-bg p-3 hover:border-accent/40"
                >
                  <span className="flex items-center gap-2.5">
                    <Mail className="size-4 text-accent" />
                    <span className="text-xs font-bold">{CONTACT_EMAIL}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CopyButton value={CONTACT_EMAIL} label="Email" />
                    <ArrowUpRight className="size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
                  </span>
                </a>
                {FOOTER_LINKS.slice(1, 3).map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-line bg-bg p-3 hover:border-accent/40"
                  >
                    <span className="font-mono text-[11px] font-bold tracking-wide">
                      {link.label}
                    </span>
                    <ArrowUpRight className="size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-panel p-6 text-white">
              <p className="font-mono text-[9px] text-[#8f949e]">● BASED IN</p>
              <p className="mt-2 text-lg font-bold">Dehradun, India</p>
              <p className="mt-1 text-xs text-[#8f949e]">
                Working remotely across IST / CET / EST.
              </p>
              <div className="mt-4 flex items-center gap-2 font-mono text-[10px]">
                <span className="size-2 rounded-full bg-good animate-soft-pulse" />
                Currently online
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer links */}
        <div className="mx-auto flex max-w-[1312px] flex-wrap items-center justify-center gap-x-10 gap-y-4 border-b border-line pb-10 font-mono text-xs font-bold">
          {FOOTER_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-accent transition-colors">
              [ {link.label} ]
            </a>
          ))}
          <a
            href="/api/feed.xml"
            className="hover:text-accent transition-colors"
            title="RSS feed — selected work"
          >
            [ RSS ]
          </a>
          <a
            href="/api/projects"
            className="hover:text-accent transition-colors"
            title="Programmatic API — all projects as JSON"
          >
            [ API ]
          </a>
        </div>

        <div className="mx-auto flex max-w-[1312px] flex-col items-center justify-between gap-2 font-mono text-[10px] text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} DIVYANSHU SINGH. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4">
            <a
              href={
                mounted
                  ? `https://search.google.com/test/rich-results?url=${encodeURIComponent(window.location.href)}`
                  : "https://search.google.com/test/rich-results"
              }
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors"
              title="Validate structured data with Google Rich Results test"
            >
              STRUCTURED DATA
            </a>
            <p>BUILT WITH ALL SKILLS &amp; KNOWLEDGE</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] font-bold text-muted">{label}</span>
      {children}
      {error && <span className="text-[10px] text-destructive">{error}</span>}
    </label>
  );
}
