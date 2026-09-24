import { db } from "@/lib/db";
import { isAdminAuthed, unauthorized } from "@/lib/admin-auth";

/** GET /api/admin/subscribers — Studio Notes mailing list. */
export async function GET() {
  if (!(await isAdminAuthed())) return unauthorized();
  try {
    const [subscribers, total] = await Promise.all([
      db.subscriber.findMany({ orderBy: { createdAt: "desc" }, take: 500 }),
      db.subscriber.count(),
    ]);
    return Response.json({ ok: true, subscribers, stats: { total } });
  } catch (error) {
    console.error("[admin/subscribers] failed:", error);
    return Response.json({ ok: false, error: "Could not load subscribers." }, { status: 500 });
  }
}
