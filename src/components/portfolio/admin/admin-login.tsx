"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Loader2, LockKeyhole } from "lucide-react";
import { toast } from "@/hooks/use-toast";

/**
 * Passcode gate for the Studio Ledger. The passcode itself never leaves
 * the POST body — after a successful check the browser only holds an
 * httpOnly hash cookie.
 */
export function AdminLogin() {
  const router = useRouter();
  const [passcode, setPasscode] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (res.ok && data.ok) {
        toast({ title: "Studio Ledger unlocked" });
        router.refresh();
      } else {
        setError(data.error ?? "Could not sign in.");
      }
    } catch {
      setError("Network hiccup — try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-[420px]">
          <div className="relative overflow-hidden rounded-[24px] border border-ink/10 bg-card p-7 shadow-[0_30px_70px_-28px_rgba(30,32,34,0.25)] md:p-9 dark:border-white/12">
            {/* corner ornament */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full border-[12px] border-terra-soft dark:border-terra/10"
            />

            <div className="relative">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/design-assets/logo-monogram.png"
                  alt="Divyanshu Singh monogram logo"
                  width={34}
                  height={34}
                  className="size-[34px] object-contain"
                  priority
                />
                <span className="font-mono-x text-[10.5px] font-bold tracking-[0.22em] uppercase text-terra-deep">
                  ● Studio Ledger
                </span>
              </div>

              <h1 className="mt-6 font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.01em] text-ink">
                Private access.
              </h1>
              <p className="mt-2.5 text-[14px] leading-[1.6] text-ink-soft">
                Enter the studio passcode to read contact messages and the Studio Notes
                mailing list.
              </p>

              <form onSubmit={submit} className="mt-7 space-y-3.5" noValidate>
                <div className="relative">
                  <LockKeyhole
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-faint"
                  />
                  <input
                    type={show ? "text" : "password"}
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Passcode"
                    autoComplete="current-password"
                    autoFocus
                    aria-label="Studio passcode"
                    aria-invalid={!!error}
                    aria-describedby={error ? "admin-login-error" : undefined}
                    className="h-12 w-full rounded-2xl border border-ink/12 bg-cream pl-11 pr-12 font-mono-x text-[14px] tracking-[0.06em] text-ink outline-none transition-all placeholder:text-ink-faint/70 focus:border-terra focus:ring-4 focus:ring-terra/15 dark:border-white/15 dark:bg-white/5"
                  />
                  <button
                    type="button"
                    onClick={() => setShow((v) => !v)}
                    aria-label={show ? "Hide passcode" : "Show passcode"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-ink-faint transition-colors hover:bg-cream-deep hover:text-ink dark:hover:bg-white/10"
                  >
                    {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>

                {error && (
                  <p id="admin-login-error" role="alert" className="pl-1 text-[12.5px] text-red-500">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={busy || passcode.length === 0}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-night font-display text-[15px] font-semibold text-white transition-all hover:bg-ink disabled:cursor-not-allowed disabled:opacity-45 dark:bg-terra dark:text-white dark:hover:bg-terra-deep"
                >
                  {busy ? <Loader2 className="size-4 animate-spin" /> : null}
                  {busy ? "Checking…" : "Unlock the ledger"}
                </button>
              </form>

              <p className="mt-6 font-mono-x text-[9.5px] tracking-[0.16em] uppercase text-ink-faint">
                5 attempts · 10 min lockout
              </p>
            </div>
          </div>

          <p className="mt-6 text-center">
            <Link
              href="/"
              className="font-mono-x text-[10.5px] tracking-[0.18em] uppercase text-ink-faint underline decoration-ink/20 underline-offset-4 transition-colors hover:text-terra-deep"
            >
              ← back to the portfolio
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
