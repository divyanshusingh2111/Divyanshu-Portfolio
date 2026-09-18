"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { FAQS } from "@/lib/portfolio/data";
import SectionHeading from "./SectionHeading";

export default function FAQ() {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-line px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto flex max-w-[1100px] flex-col gap-10">
        <SectionHeading
          id="faq"
          label="● FAQ"
          title={
            <>
              Questions, briefly{" "}
              <span className="font-hand font-bold text-accent">answered.</span>
            </>
          }
        />

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className={`group relative overflow-hidden rounded-2xl border bg-surface transition-colors ${
                  isOpen ? "border-accent/40 shadow-[0_12px_30px_-18px_rgba(15,23,42,0.18)]" : "border-line"
                }`}
              >
                {/* Accent left bar that grows on open */}
                <span
                  aria-hidden
                  className={`absolute left-0 top-0 bottom-0 w-0.5 bg-accent transition-transform duration-300 ${
                    isOpen ? "scale-y-100" : "scale-y-0"
                  } origin-top`}
                />
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-bg/50 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex size-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isOpen ? "bg-accent-soft text-accent" : "bg-bg text-faint"
                      }`}
                    >
                      <HelpCircle className="size-3.5" />
                    </span>
                    <span className="text-base font-bold sm:text-lg">{faq.q}</span>
                  </span>
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full transition-all ${
                      isOpen ? "bg-accent text-white rotate-180" : "bg-bg text-ink"
                    }`}
                  >
                    {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 pl-[4.5rem] text-sm leading-relaxed text-muted">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
