"use client";

import { useAuth } from "@/components/AuthProvider";

export default function Header() {
  const { profile } = useAuth();
  const initials = (profile?.full_name || profile?.username || "?").slice(0, 2).toUpperCase();

  return (
    <header className="flex items-center justify-between border-b border-line px-6 py-4 md:px-12">
      <span className="text-2xl font-extrabold tracking-tight">
        relay<span className="text-lime">.</span>
      </span>
      <span className="flex items-center gap-3 text-sm font-medium">
        @{profile?.username}
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-card font-bold">
          {initials}
        </span>
      </span>
    </header>
  );
}
