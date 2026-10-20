"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";

export type Profile = { id: string; username: string; full_name: string };

type AuthContextValue = {
  profile: Profile | null;
  unread: number;
  refreshUnread: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue>({
  profile: null,
  unread: 0,
  refreshUnread: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    const supabase = getSupabase();
    let active = true;

    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/login");
        return;
      }
      const { data } = await supabase
        .from("profiles")
        .select("id, username, full_name")
        .eq("id", session.user.id)
        .single();
      if (active && data) setProfile(data as Profile);
    }
    load();

    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") router.replace("/login");
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [router]);

  const refreshUnread = useCallback(async () => {
    if (!profile) return;
    const { count } = await getSupabase()
      .from("transfers")
      .select("id", { count: "exact", head: true })
      .eq("receiver_id", profile.id)
      .is("downloaded_at", null);
    setUnread(count ?? 0);
  }, [profile]);

  useEffect(() => {
    refreshUnread();
  }, [refreshUnread]);

  if (!profile) {
    return <p className="p-10 text-center text-muted">Loading…</p>;
  }

  return (
    <AuthContext.Provider value={{ profile, unread, refreshUnread }}>
      {children}
    </AuthContext.Provider>
  );
}
