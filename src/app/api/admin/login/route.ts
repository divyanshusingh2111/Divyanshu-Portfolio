import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminCookieOptions,
  adminPasscodeHash,
  hashesMatch,
  sha256,
} from "@/lib/admin-auth";

/**
 * POST /api/admin/login { passcode }
 * Sets the httpOnly session cookie when the passcode matches ADMIN_PASSCODE.
 * Light in-memory rate limit: 5 failed attempts per IP per 10 minutes.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_FAILED = 5;

const failures = new Map<string, { count: number; resetAt: number }>();

function clientKey(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || "local";
}

export async function POST(request: Request) {
  const key = clientKey(request);
  const now = Date.now();

  const entry = failures.get(key);
  if (entry && now < entry.resetAt && entry.count >= MAX_FAILED) {
    const secs = Math.ceil((entry.resetAt - now) / 1000);
    return NextResponse.json(
      { ok: false, error: `Too many attempts — locked for ${Math.ceil(secs / 60)} more minute(s).` },
      { status: 429 }
    );
  }

  const expected = adminPasscodeHash();
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "Admin access is not configured on this server." },
      { status: 503 }
    );
  }

  const body = (await request.json().catch(() => null)) as { passcode?: unknown } | null;
  const passcode = typeof body?.passcode === "string" ? body.passcode : "";
  const provided = sha256(passcode);

  if (!passcode || !hashesMatch(provided, expected)) {
    const next = entry && now < entry.resetAt ? entry : { count: 0, resetAt: now + WINDOW_MS };
    next.count += 1;
    failures.set(key, next);
    const left = MAX_FAILED - next.count;
    return NextResponse.json(
      {
        ok: false,
        error:
          left > 0
            ? `Wrong passcode — ${left} attempt${left === 1 ? "" : "s"} left.`
            : "Wrong passcode — locked for 10 minutes.",
      },
      { status: 401 }
    );
  }

  failures.delete(key);

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, provided, adminCookieOptions());
  return res;
}
