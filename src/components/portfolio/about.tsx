"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "./section-label";
import { Reveal } from "./reveal";
import { CountUp } from "./count-up";

const TRAITS = ["Detail-oriented", "System Thinker", "Empathetic", "Collaborative"];

const SKILLS = ["UX Strategy", "Product Design", "Data Visualization", "Design Systems"];

const STATS = [
  { value: "10", label: "Projects Completed", color: "text-terra" },
  { value: "500+", label: "Users Impacted", color: "text-leaf" },
  { value: "40%", label: "Avg. Efficiency Increase", color: "text-ink" },
  { value: "5+", label: "Happy Clients", color: "text-terra" },
];

export function About() {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="container-portfolio">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-start">
          {/* ── Left column: bio ───────────────────────────── */}
          <div>
            <Reveal>
              <SectionLabel text="About Me" className="mb-5" />
              <h2 className="font-display font-semibold text-ink text-[clamp(2rem,3.6vw,3rem)] leading-[1.08] tracking-[-0.01em]">
                I&apos;m Divyanshu,
                <br />
                a UX Designer &amp;{" "}
                <span className="font-script font-semibold text-terra text-[clamp(2.2rem,3.9vw,3.3rem)]">
                  Problem Solver.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-7 text-[15px] md:text-[16px] leading-[1.7] text-ink-soft max-w-[560px]">
                I enjoy working on complex problems, turning data into insights, and designing
                intuitive experiences that empower users and drive business forward.
              </p>
              <p className="mt-4 text-[15px] md:text-[16px] leading-[1.7] text-ink-soft max-w-[560px]">
                From AI-powered dashboards to AR onboarding apps, I love blending technology,
                design and strategy to build products that make a difference.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {TRAITS.map((trait) => (
                  <span
                    key={trait}
                    className="inline-flex items-center rounded-full bg-card border border-border/70 px-4 py-[7px] text-[12.5px] font-medium text-ink shadow-[0_2px_10px_-4px_rgba(30,32,34,0.08)] transition-colors hover:border-terra/50 hover:text-terra"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ── Right column: cards ────────────────────────── */}
          <div className="flex flex-col gap-6">
            {/* Design philosophy — dark card */}
            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-[24px] bg-night text-white p-7 md:p-9 shadow-[0_24px_48px_-20px_rgba(15,23,42,0.45)]">
                <div
                  aria-hidden="true"
                  className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(224,106,59,0.25), transparent 70%)",
                  }}
                />
                <p className="font-mono-x text-[10.5px] tracking-[0.24em] uppercase text-white/50 mb-5">
                  Design Philosophy
                </p>
                <blockquote className="relative font-display font-medium text-[19px] md:text-[22px] leading-[1.35] max-w-[400px]">
                  &ldquo;Good design is not just how it looks, but how it works and feels.&rdquo;
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-7 -right-1 font-script text-terra text-[64px] leading-none select-none"
                  >
                    &rdquo;
                  </span>
                </blockquote>
              </div>
            </Reveal>

            {/* What I do — light card */}
            <Reveal delay={0.2}>
              <div className="rounded-[24px] bg-card border border-border/60 p-7 md:p-9 shadow-[0_10px_36px_-16px_rgba(30,32,34,0.14)]">
                <p className="font-mono-x text-[10.5px] tracking-[0.24em] uppercase text-ink-faint mb-5">
                  What I Do
                </p>
                <h3 className="font-display font-semibold text-ink text-[19px] md:text-[21px]">
                  Areas I bring <span className="text-terra">value</span> to:
                </h3>
                <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-4">
                  {SKILLS.map((skill) => (
                    <li key={skill} className="flex items-center gap-3 text-[14px] font-medium text-ink">
                      <span
                        aria-hidden="true"
                        className="inline-block size-[13px] rounded-[3px] bg-night shrink-0"
                      />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── Stats bar ───────────────────────────────────── */}
        <Reveal delay={0.1} className="mt-16 md:mt-20">
          <div className="relative rounded-[24px] bg-card border border-border/60 px-8 md:px-12 py-9 md:py-10 shadow-[0_14px_44px_-18px_rgba(30,32,34,0.16)]">
            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  className={`group text-center lg:text-left ${
                    i > 0 ? "lg:border-l lg:border-border/60 lg:pl-8" : ""
                  }`}
                >
                  <dt className="order-2 mt-2 block text-[12px] md:text-[12.5px] font-medium text-ink-soft transition-colors duration-300 group-hover:text-ink">
                    {stat.label}
                  </dt>
                  <dd
                    className={`order-1 font-display font-semibold text-[34px] md:text-[42px] leading-none origin-center lg:origin-left transition-transform duration-300 ease-out group-hover:scale-[1.06] ${stat.color}`}
                  >
                    <CountUp value={stat.value} />
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
