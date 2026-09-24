import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

/**
 * Token-gated admin auth for the Studio Ledger (/admin).
 *
 * The passcode lives in ADMIN_PASSCODE (never sent to the client); the
 * browser only ever holds its SHA-256 hash in an httpOnly cookie, so the
 * raw passcode never round-trips after login.
 */

export const ADMIN_COOKIE = "studio_ledger_key";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

/** SHA-256 of the configured passcode, or null when admin is not configured. */
export function adminPasscodeHash(): string | null {
  const passcode = process.env.ADMIN_PASSCODE;
  if (!passcode) return null;
  return createHash("sha256").update(passcode).digest("hex");
}

export function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

/** Constant-time comparison of two hex digests. */
export function hashesMatch(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "hex");
  const bufB = Buffer.from(b, "hex");
  if (bufA.length !== bufB.length || bufA.length === 0) return false;
  return timingSafeEqual(bufA, bufB);
}

/** Server-side gate used by the /admin page (reads request cookies). */
export async function isAdminAuthed(): Promise<boolean> {
  const expected = adminPasscodeHash();
  if (!expected) return false;
  const store = await cookies();
  const provided = store.get(ADMIN_COOKIE)?.value;
  if (!provided) return false;
  return hashesMatch(provided, expected);
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  };
}

/** Shared 401 response for admin APIs. */
export function unauthorized() {
  return Response.json({ ok: false, error: "Not authorized." }, { status: 401 });
}
