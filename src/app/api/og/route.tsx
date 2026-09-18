import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

// Dynamic Open Graph image for the portfolio.
// Usage: <meta property="og:image" content="/api/og" />
// Supports optional ?title=...&subtitle=... for per-section variants.
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const title = url.searchParams.get("title") ?? "Divyanshu Singh";
  const subtitle =
    url.searchParams.get("subtitle") ?? "Product Designer · UX · AI";
  const accent = "#e06a3b";
  const ink = "#1e2022";
  const bg = "#f9f7f3";
  const card = "#f3f0ea";

  try {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: bg,
            padding: "72px",
            fontFamily: "sans-serif",
          }}
        >
          {/* Top row: brand mark */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 999,
                backgroundColor: "rgba(224,106,59,0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: 700,
                color: ink,
                border: `2px solid ${accent}`,
              }}
            >
              D
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: ink }}>
                Divyanshu Singh
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontFamily: "monospace",
                  color: "#5c5f62",
                  letterSpacing: 2,
                }}
              >
                PORTFOLIO
              </div>
            </div>
          </div>

          {/* Center: title + subtitle */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: ink,
                lineHeight: 1.05,
                maxWidth: 1000,
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 28,
                color: "#5c5f62",
                fontFamily: "monospace",
                letterSpacing: 1,
              }}
            >
              {subtitle}
            </div>
          </div>

          {/* Bottom: accent line + status */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 80, height: 4, backgroundColor: accent }} />
              <div
                style={{
                  fontSize: 16,
                  fontFamily: "monospace",
                  color: "#8f949e",
                  letterSpacing: 2,
                }}
              >
                DESIGNING MEANINGFUL SYSTEMS
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                backgroundColor: card,
                borderRadius: 999,
                padding: "10px 20px",
                border: "1px solid rgba(15,23,42,0.06)",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  backgroundColor: "#10b981",
                }}
              />
              <div
                style={{
                  fontSize: 14,
                  fontFamily: "monospace",
                  color: ink,
                  fontWeight: 700,
                }}
              >
                Available for work
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (err) {
    console.error("[/api/og] error", err);
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
