import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * GET — subscriber count for light social proof in the signup copy
 * (only shown in the UI once the count crosses a small threshold).
 */
export async function GET() {
  try {
    const count = await db.subscriber.count();
    return NextResponse.json({ ok: true, count });
  } catch (error) {
    console.error("[newsletter] count failed:", error);
    return NextResponse.json({ ok: false, count: 0 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
    }

    const email = String(body.email ?? "").trim().toLowerCase();

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (email.length > 254) {
      return NextResponse.json(
        { ok: false, error: "That email address is too long." },
        { status: 400 }
      );
    }

    try {
      await db.subscriber.create({ data: { email } });
    } catch (err) {
      // unique-constraint → already subscribed, treat as success
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
        return NextResponse.json({
          ok: true,
          already: true,
          note: "You're already on the list — welcome back!",
        });
      }
      throw err;
    }

    return NextResponse.json({
      ok: true,
      already: false,
      note: "Welcome aboard — studio notes incoming. No spam, ever.",
    });
  } catch (error) {
    console.error("[newsletter] failed:", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong on my end. Please try again in a moment." },
      { status: 500 }
    );
  }
}
