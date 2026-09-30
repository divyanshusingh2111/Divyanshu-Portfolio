import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { NOTES } from "@/lib/notes";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Divyanshu Singh — Studio Notes article cover";

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

export default async function NoteOGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = NOTES.find((n) => n.slug === slug) ?? NOTES[0];
  const fonts = await loadFonts();

  /* adaptive title size — note titles run long */
  const len = note.title.length;
  const titleSize = len > 52 ? 56 : len > 34 ? 68 : 82;
  const dek = note.dek.length > 126 ? `${note.dek.slice(0, 123)}...` : note.dek;

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
            background:
              "linear-gradient(90deg, #E06A3B 0%, rgba(224,106,59,0.4) 70%, transparent 100%)",
          }}
        />

        {/* eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              background: "#E06A3B",
              display: "flex",
            }}
          />
          <div
            style={{
              fontFamily: "Space Mono",
              fontSize: 22,
              letterSpacing: 5,
              color: "#5C5F62",
              display: "flex",
            }}
          >
            {`Studio Notes — ${note.category}`}
          </div>
        </div>

        {/* title */}
        <div
          style={{
            marginTop: 46,
            display: "flex",
            fontFamily: "Clash Display",
            fontSize: titleSize,
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: -1.5,
            color: "#1E2022",
            maxWidth: 1010,
          }}
        >
          {note.title}
        </div>

        {/* dek */}
        <div
          style={{
            marginTop: 26,
            fontFamily: "Inter",
            fontSize: 28,
            lineHeight: 1.45,
            color: "#5C5F62",
            maxWidth: 900,
            display: "flex",
          }}
        >
          {dek}
        </div>

        {/* footer strip */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(30,32,34,0.12)",
            padding: "26px 0 40px 0",
          }}
        >
          <div
            style={{
              fontFamily: "Space Mono",
              fontSize: 19,
              letterSpacing: 4,
              color: "#5C5F62",
              display: "flex",
            }}
          >
            {`${note.dateLabel} · ${note.readingMinutes} min read · Divyanshu Singh`}
          </div>
          <div
            style={{
              fontFamily: "Space Mono",
              fontSize: 19,
              letterSpacing: 4,
              color: "#E06A3B",
              display: "flex",
            }}
          >
            {note.tags.slice(0, 2).join(" / ")}
          </div>
        </div>

        {/* giant watermark */}
        <div
          style={{
            position: "absolute",
            top: 4,
            right: 56,
            fontFamily: "Space Mono",
            fontSize: 200,
            color: "#1E2022",
            opacity: 0.06,
            display: "flex",
          }}
        >
          N.
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}

export function generateStaticParams() {
  return NOTES.map((n) => ({ slug: n.slug }));
}
