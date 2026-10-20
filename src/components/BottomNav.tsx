"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { ArrowUpRight, Inbox, Search, Send, User } from "lucide-react";

const tabs = [
  { href: "/send", label: "Send", Icon: ArrowUpRight },
  { href: "/incoming", label: "Incoming", Icon: Inbox },
  { href: "/relayed", label: "Relayed", Icon: Send },
  { href: "/find", label: "Find", Icon: Search },
  { href: "/me", label: "Me", Icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { unread } = useAuth();

  return (
    <nav
      aria-label="Main"
      className="fixed bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1 rounded-3xl border border-line bg-white p-2 shadow-lg"
    >
      {tabs.map(({ href, label, Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`relative flex w-20 flex-col items-center gap-1 rounded-2xl px-2 py-3 text-xs font-semibold transition-colors ${
              active ? "bg-foreground text-white" : "text-muted hover:text-foreground"
            }`}
          >
            <Icon size={20} aria-hidden />
            {label}
            {label === "Incoming" && unread > 0 && (
              <span className="absolute right-3 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-lime text-[10px] font-bold text-foreground">
                {unread}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
