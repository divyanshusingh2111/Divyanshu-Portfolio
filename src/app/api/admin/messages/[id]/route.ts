import { db } from "@/lib/db";
import { isAdminAuthed, unauthorized } from "@/lib/admin-auth";

type Ctx = { params: Promise<{ id: string }> };

/** PATCH /api/admin/messages/[id] { read: boolean } — toggle read state. */
export async function PATCH(request: Request, { params }: Ctx) {
  if (!(await isAdminAuthed())) return unauthorized();
  const { id } = await params;
  const body = (await request.json().catch(() => null)) as { read?: unknown } | null;
  if (typeof body?.read !== "boolean") {
    return Response.json({ ok: false, error: "Body must be { read: boolean }." }, { status: 400 });
  }
  try {
    const updated = await db.contactMessage.update({
      where: { id },
      data: { read: body.read },
    });
    return Response.json({ ok: true, message: updated });
  } catch {
    return Response.json({ ok: false, error: "Message not found." }, { status: 404 });
  }
}

/** DELETE /api/admin/messages/[id] — remove a message. */
export async function DELETE(_request: Request, { params }: Ctx) {
  if (!(await isAdminAuthed())) return unauthorized();
  const { id } = await params;
  try {
    await db.contactMessage.delete({ where: { id } });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "Message not found." }, { status: 404 });
  }
}
