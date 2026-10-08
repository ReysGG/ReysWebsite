import Link from "next/link";
import { ArrowRight, CheckCircle2, Hourglass, MessageSquareText } from "lucide-react";
import type { SupportInboxItem } from "@/features/support/services/support-service";

function timeAgo(iso: string) {
  const minutes = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60_000));
  if (minutes < 1) return "baru saja";
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.round(minutes / 60);
  return hours < 24 ? `${hours} jam lalu` : `${Math.round(hours / 24)} hari lalu`;
}

/** Dashboard card: support chats waiting for an admin reply (oldest first). */
export function SupportNeedsReplyCard({ count, items }: { count: number; items: SupportInboxItem[] }) {
  return (
    <section className={`rounded-md border bg-white p-5 ${count > 0 ? "border-red-200" : "border-neutral-200"}`}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-base font-semibold text-neutral-900">
          <MessageSquareText className="h-5 w-5 text-brand" />
          Support chat butuh balasan
          {count > 0 && <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">{count}</span>}
        </h2>
        <Link href="/admin/support" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-deep hover:underline">
          Buka inbox <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {count === 0 ? (
        <p className="mt-3 flex items-center gap-2 text-sm text-neutral-500">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Semua chat sudah terbalas. AI menangani pertanyaan umum.
        </p>
      ) : (
        <ul className="mt-3 divide-y divide-neutral-100">
          {items.map((c) => (
            <li key={c.id}>
              <Link href={`/admin/support/${c.id}`} className="flex items-start gap-3 py-2.5 hover:bg-neutral-50">
                <Hourglass className={`mt-0.5 h-4 w-4 shrink-0 ${c.status === "WAITING_HUMAN" ? "text-amber-500" : "text-emerald-600"}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-neutral-900">
                    {c.userName || c.userEmail || "Pengunjung"}
                    {c.adminUnread > 0 && <span className="ml-2 text-xs font-bold text-red-600">{c.adminUnread} pesan baru</span>}
                  </p>
                  <p className="truncate text-xs text-neutral-500">
                    {c.status === "WAITING_HUMAN" && c.handoffReason ? `Minta admin: ${c.handoffReason}` : c.lastMessage?.content}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-neutral-400">{timeAgo(c.lastMessageAt)}</span>
              </Link>
            </li>
          ))}
          {count > items.length && (
            <li className="pt-2 text-xs text-neutral-500">+{count - items.length} percakapan lain di inbox</li>
          )}
        </ul>
      )}
    </section>
  );
}
