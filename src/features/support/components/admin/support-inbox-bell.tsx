"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageSquareText } from "lucide-react";

/** Admin header icon: number of support chats waiting for an admin reply (refreshes every 15s). */
export function SupportInboxBell({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const refresh = async () => {
      if (document.visibilityState !== "visible") return;
      const res = await fetch("/api/admin/support/summary", { cache: "no-store" }).catch(() => null);
      if (res?.ok) {
        const data = (await res.json()) as { needsReply?: number };
        if (typeof data.needsReply === "number") setCount(data.needsReply);
      }
    };
    const id = setInterval(() => void refresh(), 15_000);
    return () => clearInterval(id);
  }, []);

  const label = count > 0 ? `${count} chat perlu dibalas` : "Support chat: tidak ada yang perlu dibalas";

  return (
    <Link
      href="/admin/support"
      aria-label={label}
      title={label}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-md text-neutral-500 transition hover:bg-brand-tint hover:text-brand-deep"
    >
      <MessageSquareText className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold leading-none text-white ring-2 ring-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
