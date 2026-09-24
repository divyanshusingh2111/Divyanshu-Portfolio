import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
    }

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const subject = String(body.subject ?? "").trim() || null;
    const message = String(body.message ?? "").trim();

    if (name.length < 2) {
      return NextResponse.json({ ok: false, error: "Please share your name (2+ characters)." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
    }
    if (message.length < 10) {
      return NextResponse.json({ ok: false, error: "Message is too short — tell me a bit more (10+ characters)." }, { status: 400 });
    }
    if (message.length > 2000) {
      return NextResponse.json({ ok: false, error: "Message is too long (max 2000 characters)." }, { status: 400 });
    }

    const saved = await db.contactMessage.create({
      data: { name, email, subject, message },
    });

    return NextResponse.json({
      ok: true,
      id: saved.id,
      note: "Message received — I'll get back to you within 24–48 hours.",
    });
  } catch (error) {
    console.error("[contact] failed:", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong on my end. Please try email instead." },
      { status: 500 }
    );
  }
}
