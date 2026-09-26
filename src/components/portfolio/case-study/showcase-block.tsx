"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Search, Bell, Settings as SettingsIcon, LogOut, Image as ImageIcon, HardDrive, Clock, Plus, ChevronRight } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" } as const,
};

const tabs = [
  { id: "landing", label: "Landing Page" },
  { id: "dashboard", label: "Dashboard" },
  { id: "light", label: "Light Mode" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const featureTags: Record<TabId, string[]> = {
  landing: ["INSTANT TRY", "7-CARD USE-CASE GRID", "FEATURE GRID", "PRICING TOGGLE"],
  dashboard: ["KPI METRIC CARDS", "GRID + LIST VIEW", "SEARCH + FILTER", "NEW IMAGE CTA"],
  light: ["EMPTY STATE", "BATCH MODE", "SUCCESS TOAST", "PALETTE SYNC"],
};

export function ShowcaseBlock() {
  const [active, setActive] = React.useState<TabId>("landing");

  return (
    <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="space-y-4">
      {/* tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`rounded-full px-4 py-2 font-mono-x text-[11px] font-semibold uppercase tracking-wider transition-all ${
              active === t.id
                ? "bg-night text-white"
                : "border border-border bg-card text-ink-soft hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {active === "landing" && <LandingMockup />}
          {active === "dashboard" && <DashboardMockup />}
          {active === "light" && <LightModeMockup />}
        </motion.div>
      </AnimatePresence>

      {/* feature tags */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono-x text-[10px] uppercase tracking-widest text-ink-faint">Notable:</span>
        {featureTags[active].map((t) => (
          <span
            key={t}
            className="rounded-md border border-border bg-card px-2 py-1 font-mono-x text-[10px] uppercase tracking-wider text-ink-faint"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function Frame({ url, children, dark = false }: { url: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-[14px] border shadow-[0_18px_44px_-24px_rgba(15,23,42,0.4)] ${dark ? "border-white/10 bg-night" : "border-ink/10 bg-card"}`}>
      <div className={`flex items-center gap-2 border-b px-3.5 py-2.5 ${dark ? "border-white/10 bg-[#15171c]" : "border-ink/8 bg-cream-deep/60"}`}>
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="block size-2.5 rounded-full bg-[#FF5F57]" />
          <i className="block size-2.5 rounded-full bg-[#FEBC2E]" />
          <i className="block size-2.5 rounded-full bg-[#28C840]" />
        </span>
        <span className={`flex-1 truncate rounded-md px-2.5 py-1 font-mono-x text-[10px] ${dark ? "bg-white/5 text-white/50" : "bg-card text-ink-soft"}`}>
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}

function LandingMockup() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
      <Frame url="autoremov.app">
        <div className="bg-night p-5 text-white sm:p-7">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-terra text-[11px] font-bold text-white">A</span>
              <span className="font-display text-sm font-bold">Autoremov</span>
            </div>
            <div className="hidden gap-4 font-mono-x text-[10px] uppercase tracking-wider text-white/60 sm:flex">
              <span>Features</span><span>Use Cases</span><span>Pricing</span><span>API</span>
            </div>
            <span className="rounded-md bg-terra px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">Try Free</span>
          </div>
          <div className="grid items-center gap-6 sm:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 font-mono-x text-[9.5px] uppercase tracking-wider text-white/70">
                <span className="h-1 w-1 rounded-full bg-leaf" /> AI Precision
              </span>
              <h3 className="mt-3 font-display text-xl font-bold leading-tight sm:text-2xl">Remove Backgrounds Instantly With AI Precision</h3>
              <p className="mt-2 text-[12px] leading-relaxed text-white/60">Bulk upload, compare results side-by-side, export transparent PNGs in one click.</p>
              <div className="mt-3 flex gap-2">
                <span className="rounded-lg bg-terra px-3 py-1.5 text-[11px] font-semibold text-white">Upload Image →</span>
                <span className="rounded-lg border border-white/20 px-3 py-1.5 text-[11px] font-semibold text-white/80">Try Demo</span>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-terra/40 to-[#A855F7]/40" />
              <div className="absolute inset-0 flex items-center justify-center"><div className="h-20 w-20 rounded-full bg-white/80" /></div>
              <div className="absolute bottom-2 left-2 right-2 rounded-md bg-night/70 px-2 py-1 font-mono-x text-[9px] text-white/80 backdrop-blur">Drag to reveal</div>
            </div>
          </div>
        </div>
      </Frame>

      <Frame url="autoremov.app/pricing">
        <div className="bg-cream p-5 sm:p-6">
          <div className="mb-4 text-center">
            <p className="font-mono-x text-[9.5px] uppercase tracking-widest text-terra">Simple, Credit-Based Pricing</p>
            <p className="mt-1.5 font-display text-lg font-bold text-ink">Pay Once, Use Forever</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { n: "Free", p: "$0", c: "#38BDF8", pop: false },
              { n: "Starter", p: "$9", c: "#A855F7", pop: false },
              { n: "Pro", p: "$29", c: "#E06A3B", pop: true },
              { n: "Business", p: "$79", c: "#10B981", pop: false },
            ].map((p) => (
              <div key={p.n} className={`relative rounded-xl border p-3 ${p.pop ? "border-terra bg-terra/5" : "border-border bg-card"}`}>
                {p.pop && <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-terra px-1.5 py-0.5 font-mono-x text-[8px] uppercase tracking-wider text-white">Popular</span>}
                <p className="font-mono-x text-[9px] uppercase tracking-wider text-ink-faint">{p.n}</p>
                <p className="mt-0.5 font-display text-xl font-bold" style={{ color: p.c }}>{p.p}<span className="text-[10px] font-normal text-ink-faint">/mo</span></p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="font-mono-x text-[9.5px] uppercase text-ink">Monthly</span>
            <span className="relative h-4 w-8 rounded-full bg-ink/20"><span className="absolute left-0.5 top-0.5 h-3 w-3 rounded-full bg-ink" /></span>
            <span className="font-mono-x text-[9.5px] uppercase text-ink-faint">Credits</span>
          </div>
        </div>
      </Frame>
    </div>
  );
}

function DashboardMockup() {
  const kpis = [
    { l: "Images Processed", v: "127", i: ImageIcon, c: "#38BDF8" },
    { l: "This Month", v: "43", i: Plus, c: "#A855F7" },
    { l: "Storage Used", v: "2.4 GB", i: HardDrive, c: "#06B6D4" },
    { l: "Avg Time", v: "2.3s", i: Clock, c: "#10B981" },
  ];
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
      <Frame url="autoremov.app/editor" dark>
        <div className="flex bg-night p-4 text-white">
          <div className="mr-3 hidden w-28 shrink-0 space-y-1 sm:block">
            <div className="flex items-center gap-1.5 rounded-md bg-terra/10 px-2 py-1.5 font-mono-x text-[9.5px] uppercase tracking-wider text-terra"><Upload className="h-3 w-3" /> Editor</div>
            {["Library", "Batch", "Exports", "Settings"].map((n) => (
              <div key={n} className="px-2 py-1.5 font-mono-x text-[9.5px] uppercase tracking-wider text-white/40">{n}</div>
            ))}
          </div>
          <div className="flex flex-1 flex-col">
            <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-mono-x text-[10px] uppercase tracking-wider text-white/60">Tools &amp; Settings</span>
              <div className="flex gap-1.5"><Search className="h-3 w-3 text-white/40" /><Bell className="h-3 w-3 text-white/40" /><SettingsIcon className="h-3 w-3 text-white/40" /></div>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-terra/10 text-terra"><Upload className="h-5 w-5" /></div>
              <p className="mt-3 text-[12px] font-medium text-white/80">Upload an image to get started</p>
              <p className="mt-1 text-[10.5px] text-white/40">PNG, JPG, WEBP · up to 20MB</p>
              <button className="mt-3 rounded-lg bg-terra px-3 py-1.5 text-[11px] font-semibold text-white">Choose Image</button>
            </div>
          </div>
        </div>
      </Frame>

      <Frame url="autoremov.app/dashboard" dark>
        <div className="bg-night p-5 text-white">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-terra text-[11px] font-bold text-white">A</span>
              <span className="font-display text-sm font-bold">Autoremov</span>
            </div>
            <div className="flex items-center gap-2 font-mono-x text-[10px] uppercase tracking-wider text-white/50">
              <span>Settings</span>
              <span className="flex items-center gap-1 rounded-md border border-white/15 px-1.5 py-0.5 text-white/70"><LogOut className="h-2.5 w-2.5" /> Logout</span>
            </div>
          </div>
          <p className="mb-4 font-display text-lg font-bold">Dashboard</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {kpis.map((k) => (
              <div key={k.l} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <k.i className="h-3.5 w-3.5" style={{ color: k.c }} />
                <p className="mt-2 font-display text-xl font-bold" style={{ color: k.c }}>{k.v}</p>
                <p className="font-mono-x text-[9px] uppercase tracking-wider text-white/50">{k.l}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between rounded-lg bg-gradient-to-r from-terra/15 to-[#A855F7]/15 p-3">
            <span className="text-[11px] text-white/80">Ready to process more images?</span>
            <span className="rounded-md bg-terra px-2.5 py-1 text-[10px] font-semibold text-white">+ New Image</span>
          </div>
          <div className="mt-3 grid grid-cols-5 gap-1.5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-md" style={{ background: `linear-gradient(135deg, hsl(${i * 36}, 60%, 55%), hsl(${i * 36 + 30}, 60%, 45%))` }} />
            ))}
          </div>
        </div>
      </Frame>
    </div>
  );
}

function LightModeMockup() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Frame url="autoremov.app">
        <div className="bg-cream p-5">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-terra text-[11px] font-bold text-white">A</span>
            <span className="font-display text-sm font-bold text-ink">Autoremov</span>
          </div>
          <h3 className="mt-4 font-display text-xl font-bold leading-tight text-ink">Remove Backgrounds Instantly</h3>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-md" style={{ background: `hsl(${i * 50 + 10}, 65%, 60%)` }} />
            ))}
          </div>
        </div>
      </Frame>
      <Frame url="autoremov.app/about">
        <div className="bg-cream p-5">
          <p className="font-mono-x text-[9.5px] uppercase tracking-widest text-terra">About</p>
          <p className="mt-1.5 font-display text-lg font-bold text-ink">Built for creators</p>
          <p className="mt-2 text-[11.5px] leading-relaxed text-ink-soft">Autoremov started as a side project to make background removal accessible to everyone — from solo sellers to enterprise studios.</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {[{ n: "2.1M", l: "Images" }, { n: "180+", l: "Countries" }, { n: "99.4%", l: "Accuracy" }, { n: "1.8s", l: "Avg time" }].map((s) => (
              <div key={s.l} className="rounded-lg border border-border bg-card p-2.5">
                <p className="font-display text-base font-bold text-ink">{s.n}</p>
                <p className="font-mono-x text-[9px] uppercase tracking-wider text-ink-faint">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </Frame>
      <Frame url="autoremov.app/settings">
        <div className="bg-cream p-5">
          <p className="font-display text-base font-bold text-ink">Settings</p>
          <div className="mt-3 space-y-2.5">
            {[{ l: "Email notifications", on: true }, { l: "Marketing emails", on: false }, { l: "Product updates", on: true }].map((s) => (
              <div key={s.l} className="flex items-center justify-between">
                <span className="text-[11.5px] text-ink/80">{s.l}</span>
                <span className={`relative h-4 w-8 rounded-full ${s.on ? "bg-terra" : "bg-ink/15"}`}>
                  <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all ${s.on ? "left-4" : "left-0.5"}`} />
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-border bg-card p-3">
            <p className="font-mono-x text-[9px] uppercase tracking-wider text-ink-faint">Current Plan</p>
            <div className="mt-0.5 flex items-center justify-between">
              <span className="text-[12px] font-semibold text-ink">Pro · $29/mo</span>
              <ChevronRight className="h-3.5 w-3.5 text-ink-faint" />
            </div>
          </div>
        </div>
      </Frame>
    </div>
  );
}
