import { NOTES } from "@/lib/notes";
import { noteExcerpt } from "@/lib/notes/excerpt";

/**
 * Studio Notes welcome email — the nicety that would be sent on a fresh
 * subscription. Rendered as a standalone, email-client-safe HTML document
 * (table layout, inline styles, no external CSS/JS) plus a plain-text
 * sibling. No SMTP in the sandbox, so this ships as the template + an
 * admin preview; wiring a transport is a drop-in when one exists.
 */

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const C = {
  cream: "#F9F7F3",
  creamDeep: "#F3F0EA",
  card: "#FFFFFF",
  ink: "#1E2022",
  inkSoft: "#5C5F62",
  inkFaint: "#696E78",
  terra: "#E06A3B",
  terraDeep: "#C2410C",
  terraSoft: "#FCF0EB",
  hairline: "rgba(30,32,34,0.12)",
};

const SANS = "'Clash Display','Avenir Next','Segoe UI',Helvetica,Arial,sans-serif";
const BODY = "'Inter','Helvetica Neue',Helvetica,Arial,sans-serif";
const MONO = "'Space Mono','SF Mono','Courier New',monospace";
const SCRIPT = "'Caveat','Segoe Script','Brush Script MT',cursive";

function escAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export interface WelcomeEmail {
  subject: string;
  preheader: string;
  html: string;
  text: string;
}

export function renderWelcomeEmail(email: string): WelcomeEmail {
  const subject = "Welcome to Studio Notes — one deliberate note at a time";
  const preheader = "Essays on design systems, research and craft — straight from the studio desk.";
  const latest = NOTES.slice(0, 3);
  const firstNote = latest[0];

  /* ── rows for the "latest notes" list ── */
  const noteRows = latest
    .map((n, i) => {
      const num = String(i + 1).padStart(2, "0");
      return `
      <tr>
        <td style="padding:14px 28px;border-top:1px solid ${C.hairline};">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td width="34" valign="top" style="font-family:${MONO};font-size:11px;font-weight:700;color:${C.terraDeep};padding-top:2px;">${num}</td>
              <td valign="top">
                <a href="${SITE}/notes/${n.slug}" style="font-family:${SANS};font-size:16px;font-weight:600;color:${C.ink};text-decoration:none;line-height:1.3;">${n.title}</a>
                <p style="margin:6px 0 0;font-family:${BODY};font-size:13px;color:${C.inkSoft};line-height:1.6;">${noteExcerpt(n)}</p>
                <p style="margin:8px 0 0;font-family:${MONO};font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:${C.inkFaint};">${n.dateLabel} · ${n.readingMinutes} min · ${n.category}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
    })
    .join("");

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>${escAttr(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:${C.cream};">
<!-- preheader -->
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${C.cream};">${preheader}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${C.cream};">
  <tr>
    <td align="center" style="padding:28px 12px 48px;">

      <!-- studio wordmark -->
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;">
        <tr>
          <td style="padding:0 8px 22px;text-align:center;">
            <img src="${SITE}/design-assets/logo-monogram.png" width="34" height="34" alt="D — Divyanshu Singh monogram" style="display:inline-block;vertical-align:middle;border-radius:8px;">
            <span style="font-family:${MONO};font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${C.ink};vertical-align:middle;padding-left:10px;">DIVYANSHU&nbsp;<span style="color:${C.terra};">SINGH</span></span>
          </td>
        </tr>
      </table>

      <!-- hero card -->
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;background-color:${C.card};border:1px solid ${C.hairline};border-radius:22px;overflow:hidden;">
        <!-- terra accent strip -->
        <tr><td height="5" style="height:5px;background-color:${C.terra};font-size:0;line-height:0;">&nbsp;</td></tr>

        <tr>
          <td style="padding:40px 28px 8px;text-align:center;">
            <p style="margin:0;font-family:${MONO};font-size:10px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:${C.terraDeep};">● STUDIO NOTES — SUBSCRIBED</p>
            <h1 style="margin:18px 0 0;font-family:${SANS};font-size:30px;font-weight:600;color:${C.ink};line-height:1.15;">Welcome to the studio<span style="color:${C.terra};">.</span></h1>
            <p style="margin:10px 0 0;font-family:${SCRIPT};font-size:22px;color:${C.terra};">one deliberate note at a time</p>
          </td>
        </tr>

        <tr>
          <td style="padding:18px 40px 6px;">
            <p style="margin:0;font-family:${BODY};font-size:15px;color:${C.inkSoft};line-height:1.7;">
              You&apos;re in${email ? `, <strong style="color:${C.ink};">${escAttr(email)}</strong>` : ""} — and this is what the desk looks like from here: essays on design
              systems, research field notes, and the occasional pre-ship audit. No launches,
              no hype — just the thinking behind the case studies.
            </p>
          </td>
        </tr>

        <!-- what to expect -->
        <tr>
          <td style="padding:24px 28px 4px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${C.creamDeep};border-radius:16px;">
              <tr>
                <td style="padding:18px 22px;">
                  <p style="margin:0 0 12px;font-family:${MONO};font-size:9.5px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${C.inkFaint};">WHAT TO EXPECT</p>
                  ${[
                    ["01", "Long-form essays", "Token architecture, dashboard narratives, trust in payments — the deep dives."],
                    ["02", "Field notes", "The quick, raw observations that later become case studies."],
                    ["03", "A sane cadence", "One note when it's ready. Unsubscribe anytime — no hard feelings."],
                  ]
                    .map(
                      ([num, t, d]) => `
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:10px;">
                    <tr>
                      <td width="30" valign="top" style="font-family:${MONO};font-size:10px;font-weight:700;color:${C.terraDeep};">${num}</td>
                      <td valign="top" style="font-family:${BODY};font-size:13.5px;line-height:1.55;">
                        <strong style="color:${C.ink};">${t}</strong>
                        <span style="color:${C.inkSoft};"> — ${d}</span>
                      </td>
                    </tr>
                  </table>`
                    )
                    .join("")}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td align="center" style="padding:26px 28px 8px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" style="background-color:${C.terra};border-radius:999px;">
                  <a href="${SITE}/notes/${firstNote.slug}" style="display:inline-block;padding:14px 30px;font-family:${MONO};font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#ffffff;text-decoration:none;">Read the latest note →</a>
                </td>
              </tr>
            </table>
            <p style="margin:12px 0 0;font-family:${MONO};font-size:9.5px;letter-spacing:1.5px;text-transform:uppercase;color:${C.inkFaint};">${firstNote.title} · ${firstNote.readingMinutes} MIN</p>
          </td>
        </tr>

        <!-- latest notes -->
        <tr>
          <td style="padding:26px 0 14px;">
            <p style="margin:0;padding:0 28px 4px;font-family:${MONO};font-size:9.5px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${C.inkFaint};">FROM THE ARCHIVE</p>
          </td>
        </tr>
        ${noteRows}

        <!-- closing note -->
        <tr>
          <td style="padding:24px 28px 34px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${C.terraSoft};border-radius:16px;">
              <tr>
                <td style="padding:18px 22px;font-family:${SCRIPT};font-size:19px;line-height:1.4;color:${C.terraDeep};">
                  “Reply to any note — it lands straight on my desk. I read every one.”
                  <span style="display:block;margin-top:8px;font-family:${MONO};font-size:9.5px;letter-spacing:1.5px;text-transform:uppercase;color:${C.inkFaint};">— DIVYANSHU, AT THE DESK</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- footer -->
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;">
        <tr>
          <td style="padding:22px 20px 0;text-align:center;">
            <p style="margin:0;font-family:${MONO};font-size:9.5px;letter-spacing:1.5px;text-transform:uppercase;color:${C.inkFaint};line-height:1.8;">
              You&apos;re receiving this because you subscribed to Studio Notes at
              <a href="${SITE}" style="color:${C.terraDeep};text-decoration:none;">divyanshu.design</a>.<br>
              Didn&apos;t mean to? <a href="mailto:studio@divyanshu.design?subject=Unsubscribe%20from%20Studio%20Notes" style="color:${C.terraDeep};text-decoration:none;">Unsubscribe</a> — instant, no questions.
            </p>
            <p style="margin:10px 0 0;font-family:${MONO};font-size:9.5px;letter-spacing:2px;text-transform:uppercase;color:${C.inkFaint};">
              © 2026 DIVYANSHU SINGH · STUDIO NOTES
            </p>
          </td>
        </tr>
      </table>

    </td>
  </tr>
</table>
</body>
</html>`;

  /* ── plain-text sibling ── */
  const text = `WELCOME TO STUDIO NOTES — ONE DELIBERATE NOTE AT A TIME

You're in${email ? `, ${email}` : ""}. This list carries essays on design
systems, research field notes, and the occasional pre-ship audit — the
thinking behind the case studies at ${SITE}.

WHAT TO EXPECT
01 — Long-form essays: token architecture, dashboard narratives, trust in payments.
02 — Field notes: the quick, raw observations that later become case studies.
03 — A sane cadence: one note when it's ready. Unsubscribe anytime.

LATEST — START HERE
${firstNote.title} (${firstNote.readingMinutes} min)
${SITE}/notes/${firstNote.slug}

FROM THE ARCHIVE
${latest
  .slice(1)
  .map((n) => `${n.title}\n${SITE}/notes/${n.slug}`)
  .join("\n\n")}

Reply to any note — it lands straight on my desk. I read every one.
— Divyanshu, at the desk

You're receiving this because you subscribed to Studio Notes at ${SITE}.
To unsubscribe, reply "unsubscribe" or email studio@divyanshu.design.`;

  return { subject, preheader, html, text };
}
