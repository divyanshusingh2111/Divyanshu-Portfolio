import type { Metadata } from "next";
import { isAdminAuthed } from "@/lib/admin-auth";
import { AdminLogin } from "@/components/portfolio/admin/admin-login";
import { AdminInbox } from "@/components/portfolio/admin/admin-inbox";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Studio Ledger — Private",
  description: "Private inbox for contact messages and Studio Notes subscribers.",
  robots: { index: false, follow: false },
};

/**
 * Token-gated private area: contact-form inbox + newsletter list.
 * The passcode gate is server-side — the inbox markup only renders
 * after the httpOnly session cookie validates.
 */
export default async function AdminPage() {
  const authed = await isAdminAuthed();
  return authed ? <AdminInbox /> : <AdminLogin />;
}
