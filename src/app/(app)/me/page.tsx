"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { getSupabase } from "@/lib/supabase";

export default function MePage() {
  const { profile } = useAuth();
  const [sent, setSent] = useState<number | null>(null);
  const [received, setReceived] = useState<number | null>(null);

  useEffect(() => {
    if (!profile) return;
    const supabase = getSupabase();
    const count = (col: "sender_id" | "receiver_id") =>
      supabase.from("transfers").select("id", { count: "exact", head: true }).eq(col, profile.id);
    count("sender_id").then(({ count }) => setSent(count ?? 0));
    count("receiver_id").then(({ count }) => setReceived(count ?? 0));
  }, [profile]);

  if (!profile) return null;

  return (
    <section className="mx-auto max-w-md text-center">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-card text-3xl font-bold">
        {(profile.full_name || profile.username).slice(0, 2).toUpperCase()}
      </div>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight">{profile.full_name || profile.username}</h1>
      <p className="text-muted">@{profile.username}</p>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-3xl bg-card p-6 text-left">
          <p className="text-4xl font-extrabold">{sent ?? "–"}</p>
          <p className="text-sm text-muted">Files sent</p>
        </div>
        <div className="rounded-3xl bg-card p-6 text-left">
          <p className="text-4xl font-extrabold">{received ?? "–"}</p>
          <p className="text-sm text-muted">Files received</p>
        </div>
      </div>

      <button
        onClick={() => getSupabase().auth.signOut()}
        className="mt-10 font-semibold text-red-600"
      >
        Log out
      </button>
    </section>
  );
}
