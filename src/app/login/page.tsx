"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getSupabase } from "@/lib/supabase";

const input = "w-full rounded-2xl border border-line bg-card px-4 py-3 outline-none focus:border-foreground";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const { error } = await getSupabase().auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      setError("Wrong email or password.");
      return;
    }
    router.replace("/send");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-6 px-6">
      <h1 className="text-4xl font-extrabold tracking-tight">Log in</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input className={input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className={input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        <button disabled={busy} className="rounded-full bg-foreground px-6 py-4 font-semibold text-white disabled:opacity-60">
          {busy ? "Logging in…" : "Log in"}
        </button>
      </form>
      <p className="text-sm text-muted">
        New here? <Link href="/signup" className="font-semibold text-foreground">Create an account</Link>
      </p>
    </main>
  );
}
