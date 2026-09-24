"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Status = "idle" | "sending" | "success" | "error";

const inputBase =
  "w-full rounded-[12px] border border-border bg-cream/60 px-4 py-3 text-[14px] text-ink placeholder:text-ink-faint/70 outline-none transition-all duration-200 focus:border-terra/60 focus:bg-card focus:ring-4 focus:ring-terra/10";

const fieldLabel = "font-mono-x text-[10px] font-bold tracking-[0.18em] uppercase text-ink-soft mb-2 block";

export function ContactForm() {
  const { toast } = useToast();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      toast({
        title: "Message sent",
        description: "Thanks for reaching out — I'll get back to you within 24–48 hours.",
      });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mx-auto max-w-[560px] rounded-[22px] border border-leaf/30 bg-leaf-soft p-8 text-center"
        role="status"
      >
        <span className="mx-auto mb-4 inline-flex size-12 items-center justify-center rounded-full bg-leaf/15">
          <Check className="size-6 text-leaf" strokeWidth={2.5} />
        </span>
        <p className="font-display font-semibold text-[19px] text-ink">Message received.</p>
        <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
          Thanks for reaching out — I&apos;ll get back to you within 24–48 hours.
        </p>
        <p className="mt-4 font-script text-[22px] text-leaf">— Divyanshu</p>
        <button
          onClick={() => {
            setStatus("idle");
            setForm({ name: "", email: "", subject: "", message: "" });
          }}
          className="mt-6 font-mono-x text-[11px] font-bold tracking-[0.14em] uppercase text-ink-soft underline decoration-ink/25 underline-offset-4 hover:text-terra hover:decoration-terra transition-colors"
        >
          [ Send another message ]
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mx-auto w-full max-w-[620px] rounded-[22px] border border-border/80 bg-card p-6 md:p-8 shadow-[0_24px_60px_-32px_rgba(30,32,34,0.3)]"
      aria-label="Contact form"
      noValidate
    >
      <div className="flex items-center justify-between gap-4 mb-6">
        <p className="font-mono-x text-[10px] font-bold tracking-[0.2em] uppercase text-ink-faint">
          ● DIRECT MESSAGE
        </p>
        <p className="font-mono-x text-[9.5px] tracking-[0.16em] uppercase text-ink-faint/70 hidden sm:block">
          REPLIES IN 24–48H
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={fieldLabel}>
            Your Name
          </label>
          <input
            id="cf-name"
            name="name"
            required
            minLength={2}
            value={form.name}
            onChange={set("name")}
            placeholder="Jane Cooper"
            className={inputBase}
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="cf-email" className={fieldLabel}>
            Your Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={set("email")}
            placeholder="jane@company.com"
            className={inputBase}
            autoComplete="email"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="cf-subject" className={fieldLabel}>
          Subject <span className="text-ink-faint/60 normal-case tracking-normal">[optional]</span>
        </label>
        <input
          id="cf-subject"
          name="subject"
          value={form.subject}
          onChange={set("subject")}
          placeholder="Product design opportunity"
          className={inputBase}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="cf-message" className={fieldLabel}>
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={4}
          value={form.message}
          onChange={set("message")}
          placeholder="Tell me about your project, timeline, and what you're looking for…"
          className={`${inputBase} resize-y min-h-[110px]`}
        />
        <p className="mt-1.5 text-right font-mono-x text-[9.5px] tracking-wide text-ink-faint/60">
          {form.message.length}/2000
        </p>
      </div>

      <AnimatePresence>
        {status === "error" && error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex items-start gap-2 rounded-[10px] border border-destructive/25 bg-destructive/5 px-4 py-3 text-[13px] text-destructive"
            role="alert"
          >
            <AlertCircle className="size-4 mt-0.5 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-2 inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-terra text-white text-[14px] font-semibold h-12 pl-6 pr-5 transition-all duration-300 hover:bg-terra-deep hover:shadow-[0_14px_36px_-12px_rgba(224,106,59,0.6)] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send Message
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </button>
    </motion.form>
  );
}
