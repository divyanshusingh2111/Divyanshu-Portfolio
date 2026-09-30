"use client";

import { useState, useEffect } from "react";
import { AdminLogin } from "@/components/portfolio/admin/admin-login";
import { AdminInbox } from "@/components/portfolio/admin/admin-inbox";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isAuthed = localStorage.getItem("admin_auth") === "true";
    setAuthed(isAuthed);
  }, []);

  if (!mounted) return null;

  return authed ? <AdminInbox onLogout={() => setAuthed(false)} /> : <AdminLogin onLogin={() => setAuthed(true)} />;
}
