"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getSupabase } from "@/lib/supabase";

const input = "w-full rounded-2xl border border-line bg-card px-4 py-3 outline-none focus:border-foreground";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const tag = username.trim().toLowerCase().replace(/^@/, "");
    if (!/^[a-z0-9_]{3,20}$/.test(tag)) {
      setError("Username must be 3 to 20 characters: letters, numbers or underscores.");
      return;
    }
    setBusy(true);
    const { data, error } = await getSupabase().auth.signUp({
      email,
      password,
      options: { data: { username: tag, full_name: fullName.trim() } },
    });
    setBusy(false);
    if (error) {
      setError("Could not create the account. The username or email may already be in use.");
      return;
    }
    if (data.session) router.replace("/send");
    else setNotice("Check your email to confirm your account, then log in.");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-6 px-6">
      <h1 className="text-4xl font-extrabold tracking-tight">Create your account</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input className={input} placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        <input className={input} placeholder="@username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input className={input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className={input} type="password" placeholder="Password (8+ characters)" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        {notice && <p className="text-sm text-muted">{notice}</p>}
        <button disabled={busy} className="rounded-full bg-foreground px-6 py-4 font-semibold text-white disabled:opacity-60">
          {busy ? "Creating account…" : "Create account"}
        </button>
      </form>
      <p className="text-sm text-muted">
        Already have an account? <Link href="/login" className="font-semibold text-foreground">Log in</Link>
      </p>
    </main>
  );
}
