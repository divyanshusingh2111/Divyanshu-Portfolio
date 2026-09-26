import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { CASE_STUDIES, CASE_STUDY_ORDER } from "@/lib/case-studies";
import type { CaseStudyId } from "@/lib/case-studies";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Divyanshu Singh — case study cover";

/** Load brand fonts converted to TTF (satori can't read woff2). */
async function loadFonts() {
  const dir = path.join(process.cwd(), "src", "fonts", "og");
  const [clash, mono, inter] = await Promise.all([
    readFile(path.join(dir, "clash-display-600.ttf")),
    readFile(path.join(dir, "space-mono-400.ttf")),
    readFile(path.join(dir, "inter-400.ttf")),
  ]);
  return [
    { name: "Clash Display", data: clash, weight: 600 as const, style: "normal" as const },
    { name: "Space Mono", data: mono, weight: 400 as const, style: "normal" as const },
    { name: "Inter", data: inter, weight: 400 as const, style: "normal" as const },
  ];
}

/** Themed OG layout per case study (mirrors each case page's brand chrome). */
const THEMES: Record<
  CaseStudyId,
  { bg: string; fg: string; soft: string; line: string }
> = {
  klimashift: { bg: "#16191D", fg: "#FFFFFF", soft: "#8F949E", line: "rgba(255,255,255,0.14)" },
  autoremov: { bg: "#F9FAFB", fg: "#1E2022", soft: "#5C5F62", line: "rgba(30,32,34,0.12)" },
  trivira: { bg: "#1B4D3E", fg: "#FFFFFF", soft: "#B7CDC2", line: "rgba(255,255,255,0.16)" },
};

export default async function CaseStudyOGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = CASE_STUDIES[slug as CaseStudyId] ?? CASE_STUDIES.klimashift;
  const t = THEMES[study.id];
  const fonts = await loadFonts();
  const stats = study.hero.stats.slice(0, 2);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: t.bg,
          color: t.fg,
          padding: "72px 80px 0 80px",
          position: "relative",
        }}
      >
        {/* accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 10,
            background: `linear-gradient(90deg, ${study.theme.accent} 0%, ${study.theme.accent}66 70%, transparent 100%)`,
          }}
        />

        {/* eyebrow row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* accent dot as CSS shape — avoids dynamic font fetch for ● */}
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              background: study.theme.accent,
              display: "flex",
            }}
          />
          <div
            style={{
              fontFamily: "Space Mono",
              fontSize: 22,
              letterSpacing: 5,
              color: t.soft,
              display: "flex",
            }}
          >
            {`Case Study ${study.index} — Divyanshu Singh`}
          </div>
        </div>

        {/* title — explicit lines + adaptive size (long titles must not overflow) */}
        <div
          style={{
            marginTop: 44,
            display: "flex",
            flexDirection: "column",
            maxWidth: 1020,
          }}
        >
          {(() => {
            const lines = study.hero.title.split("\n");
            const maxLen = Math.max(...lines.map((l) => l.length));
            const fontSize =
              lines.length >= 3 ? 64 : lines.length === 2 ? 78 : maxLen > 16 ? 78 : 96;
            return lines.map((line, i) => (
              <div
                key={i}
                style={{
                  fontFamily: "Clash Display",
                  fontSize,
                  fontWeight: 600,
                  lineHeight: 1.04,
                  letterSpacing: -1.5,
                  display: "flex",
                }}
              >
                {line}
              </div>
            ));
          })()}
        </div>

        {/* subtitle */}
        <div
          style={{
            marginTop: 22,
            fontFamily: "Inter",
            fontSize: 32,
            color: t.soft,
            maxWidth: 860,
          }}
        >
          {study.subtitle}
        </div>

        {/* stat chips */}
        <div style={{ marginTop: 46, display: "flex", gap: 18 }}>
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 12,
                border: `1px solid ${t.line}`,
                borderRadius: 14,
                padding: "16px 26px",
              }}
            >
              <div
                style={{
                  fontFamily: "Clash Display",
                  fontSize: 40,
                  fontWeight: 600,
                  color: study.theme.accent,
                  display: "flex",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "Space Mono",
                  fontSize: 17,
                  letterSpacing: 2,
                  color: t.soft,
                  display: "flex",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* footer strip */}
        <div
          style={{
            marginTop: "auto",
            marginBottom: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${t.line}`,
            padding: "26px 0 40px 0",
          }}
        >
          <div
            style={{
              fontFamily: "Space Mono",
              fontSize: 19,
              letterSpacing: 4,
              color: t.soft,
              display: "flex",
            }}
          >
            {"UX — Product — Design for Impact"}
          </div>
          <div
            style={{
              fontFamily: "Space Mono",
              fontSize: 19,
              letterSpacing: 4,
              color: study.theme.accent,
              display: "flex",
            }}
          >
            {study.tags.join(" / ")}
          </div>
        </div>

        {/* giant index watermark */}
        <div
          style={{
            position: "absolute",
            top: 8,
            right: 56,
            fontFamily: "Space Mono",
            fontSize: 190,
            color: t.fg,
            opacity: 0.08,
            display: "flex",
          }}
        >
          {study.index}
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}

export function generateStaticParams() {
  return CASE_STUDY_ORDER.map((slug) => ({ slug }));
}
