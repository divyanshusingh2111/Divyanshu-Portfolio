import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Divyanshu Singh — Product Designer";

async function loadFonts() {
  const dir = path.join(process.cwd(), "src", "fonts", "og");
  const [clash, caveat, mono, inter] = await Promise.all([
    readFile(path.join(dir, "clash-display-600.ttf")),
    readFile(path.join(dir, "caveat-600.ttf")),
    readFile(path.join(dir, "space-mono-400.ttf")),
    readFile(path.join(dir, "inter-400.ttf")),
  ]);
  return [
    { name: "Clash Display", data: clash, weight: 600 as const, style: "normal" as const },
    { name: "Caveat", data: caveat, weight: 600 as const, style: "normal" as const },
    { name: "Space Mono", data: mono, weight: 400 as const, style: "normal" as const },
    { name: "Inter", data: inter, weight: 400 as const, style: "normal" as const },
  ];
}

export default async function HomeOGImage() {
  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#F9F7F3",
          color: "#1E2022",
          padding: "76px 84px 0 84px",
          position: "relative",
        }}
      >
        {/* terra accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 10,
            background:
              "linear-gradient(90deg, #E06A3B 0%, #E06A3B66 70%, transparent 100%)",
          }}
        />

        {/* eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 20, height: 20, borderRadius: 10, background: "#E06A3B", display: "flex" }} />
          <div
            style={{
              fontFamily: "Space Mono",
              fontSize: 23,
              letterSpacing: 6,
              color: "#5C5F62",
              display: "flex",
            }}
          >
            {"Product Designer — Dehradun, India"}
          </div>
        </div>

        {/* headline */}
        <div
          style={{
            marginTop: 52,
            fontFamily: "Clash Display",
            fontSize: 92,
            fontWeight: 600,
            lineHeight: 1.04,
            letterSpacing: -2,
            display: "flex",
            flexDirection: "column",
            maxWidth: 980,
          }}
        >
          <div style={{ display: "flex" }}>Designing</div>
          <div style={{ display: "flex" }}>
            <span style={{ fontFamily: "Caveat", color: "#E06A3B", fontSize: 108 }}>meaningful</span>
            <span>&nbsp;systems</span>
          </div>
          <div style={{ display: "flex" }}>that create impact.</div>
        </div>

        {/* sub */}
        <div
          style={{
            marginTop: 34,
            fontFamily: "Inter",
            fontSize: 30,
            color: "#5C5F62",
            maxWidth: 900,
            display: "flex",
          }}
        >
          UX strategy · dashboards · data visualization · AI-powered experiences
        </div>

        {/* footer strip */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(30,32,34,0.12)",
            padding: "26px 0 42px 0",
          }}
        >
          <div
            style={{
              fontFamily: "Space Mono",
              fontSize: 20,
              letterSpacing: 5,
              color: "#1E2022",
              display: "flex",
            }}
          >
            {"DIVYANSHU"}
            <span style={{ color: "#E06A3B", display: "flex" }}>&nbsp;SINGH</span>
          </div>
          <div
            style={{
              fontFamily: "Space Mono",
              fontSize: 19,
              letterSpacing: 4,
              color: "#8F949E",
              display: "flex",
            }}
          >
            {"3+ years — 10 projects — 500+ users impacted"}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
