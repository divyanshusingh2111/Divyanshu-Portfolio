import { db } from "@/lib/db";
import { isAdminAuthed, unauthorized } from "@/lib/admin-auth";

/** GET /api/admin/messages — newest-first inbox with unread stats. */
export async function GET() {
  if (!(await isAdminAuthed())) return unauthorized();
  try {
    const [messages, total, unread] = await Promise.all([
      db.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 200 }),
      db.contactMessage.count(),
      db.contactMessage.count({ where: { read: false } }),
    ]);
    return Response.json({ ok: true, messages, stats: { total, unread } });
  } catch (error) {
    console.error("[admin/messages] failed:", error);
    return Response.json({ ok: false, error: "Could not load messages." }, { status: 500 });
  }
}
