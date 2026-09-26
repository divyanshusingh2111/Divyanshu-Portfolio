import { db } from "@/lib/db";
import { isAdminAuthed, unauthorized } from "@/lib/admin-auth";

/**
 * GET /api/admin/export?type=messages|subscribers — CSV download.
 * Values are RFC-4180 escaped (quotes doubled, wrapped when needed).
 */

function csvCell(value: string | number | boolean | null | undefined): string {
  const raw = value === null || value === undefined ? "" : String(value);
  if (/[",\n\r]/.test(raw)) return `"${raw.replace(/"/g, '""')}"`;
  return raw;
}

function toCsv(headers: string[], rows: (string | number | boolean | null)[][]): string {
  const lines = [headers.map(csvCell).join(","), ...rows.map((r) => r.map(csvCell).join(","))];
  return lines.join("\r\n");
}

export async function GET(request: Request) {
  if (!(await isAdminAuthed())) return unauthorized();

  const type = new URL(request.url).searchParams.get("type");
  if (type !== "messages" && type !== "subscribers") {
    return Response.json(
      { ok: false, error: "type must be 'messages' or 'subscribers'." },
      { status: 400 }
    );
  }

  try {
    let csv: string;
    if (type === "messages") {
      const messages = await db.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
      csv = toCsv(
        ["Date", "Name", "Email", "Subject", "Read", "Message"],
        messages.map((m) => [m.createdAt.toISOString(), m.name, m.email, m.subject ?? "", m.read ? "yes" : "no", m.message])
      );
    } else {
      const subscribers = await db.subscriber.findMany({ orderBy: { createdAt: "desc" } });
      csv = toCsv(
        ["Date", "Email"],
        subscribers.map((s) => [s.createdAt.toISOString(), s.email])
      );
    }

    const stamp = new Date().toISOString().slice(0, 10);
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="studio-${type}-${stamp}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[admin/export] failed:", error);
    return Response.json({ ok: false, error: "Export failed." }, { status: 500 });
  }
}
