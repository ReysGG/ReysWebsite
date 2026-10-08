import Link from "next/link";
import type { SupportStatus } from "@prisma/client";
import { Bot, CheckCheck, Headset, Hourglass, MessagesSquare } from "lucide-react";
import { AutoRefresh } from "@/features/support/components/admin/auto-refresh";
import { getSupportCounts, listSupportConversations } from "@/features/support/services/support-service";

export const dynamic = "force-dynamic";

const STATUS_META: Record<SupportStatus, { label: string; className: string; icon: typeof Bot }> = {
  WAITING_HUMAN: { label: "Menunggu admin", className: "bg-amber-50 text-amber-700", icon: Hourglass },
  HUMAN: { label: "Ditangani admin", className: "bg-emerald-50 text-emerald-700", icon: Headset },
  AI: { label: "Dijawab AI", className: "bg-brand-tint text-brand-deep", icon: Bot },
  CLOSED: { label: "Selesai", className: "bg-neutral-100 text-neutral-500", icon: CheckCheck },
};

const FILTERS: { label: string; value?: SupportStatus }[] = [
  { label: "Aktif" },
  { label: "Menunggu admin", value: "WAITING_HUMAN" },
  { label: "Ditangani", value: "HUMAN" },
  { label: "AI", value: "AI" },
  { label: "Selesai", value: "CLOSED" },
];

function fmt(iso: string) {
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta" }).format(new Date(iso));
}

export default async function AdminSupportPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status: statusParam } = await searchParams;
  const status = FILTERS.find((f) => f.value === statusParam)?.value;
  const [conversations, counts] = await Promise.all([listSupportConversations(status), getSupportCounts()]);

  return (
    <div className="space-y-6">
      <AutoRefresh intervalMs={8000} />
      <div className="rounded-md border border-neutral-200 bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">Audience</p>
        <h1 className="mt-2 flex items-center gap-2 text-2xl font-bold tracking-tight text-neutral-900">
          <MessagesSquare className="h-6 w-6 text-brand" /> Support Chat
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Chat pengunjung dari widget website. AI menjawab otomatis; percakapan yang minta admin muncul di atas.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <span className="rounded-md bg-amber-50 px-3 py-1.5 font-semibold text-amber-700">{counts.waiting} menunggu admin</span>
          <span className="rounded-md bg-emerald-50 px-3 py-1.5 font-semibold text-emerald-700">{counts.human} ditangani</span>
          <span className="rounded-md bg-neutral-100 px-3 py-1.5 font-semibold text-neutral-600">{counts.unread} belum dibaca</span>
        </div>
      </div>

      <nav className="flex flex-wrap gap-1.5" aria-label="Filter status">
        {FILTERS.map((f) => {
          const active = f.value === status;
          return (
            <Link
              key={f.label}
              href={f.value ? `/admin/support?status=${f.value}` : "/admin/support"}
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${active ? "border-brand bg-brand text-white" : "border-neutral-200 bg-white text-neutral-600 hover:border-brand-soft"}`}
            >
              {f.label}
            </Link>
          );
        })}
      </nav>

      {conversations.length === 0 ? (
        <div className="rounded-md border border-dashed border-neutral-300 bg-white p-10 text-center text-sm text-neutral-500">Belum ada percakapan.</div>
      ) : (
        <ul className="divide-y divide-neutral-100 rounded-md border border-neutral-200 bg-white">
          {conversations.map((c) => {
            const meta = STATUS_META[c.status];
            return (
              <li key={c.id}>
                <Link href={`/admin/support/${c.id}`} className="flex items-start gap-3 p-4 hover:bg-neutral-50">
                  <meta.icon className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-neutral-900">{c.userName || c.userEmail || "Pengunjung"}</p>
                      {c.userEmail && c.userName && <span className="text-xs text-neutral-500">{c.userEmail}</span>}
                      <span className={`rounded px-1.5 py-0.5 text-[11px] font-semibold ${meta.className}`}>{meta.label}</span>
                      {c.adminUnread > 0 && c.status !== "AI" && (
                        <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">{c.adminUnread} baru</span>
                      )}
                    </div>
                    {c.handoffReason && c.status === "WAITING_HUMAN" && <p className="mt-0.5 text-xs text-amber-700">Alasan: {c.handoffReason}</p>}
                    {c.lastMessage && (
                      <p className="mt-1 truncate text-sm text-neutral-600">
                        <span className="font-medium text-neutral-400">{c.lastMessage.role === "USER" ? "Pengunjung" : c.lastMessage.role === "AI" ? "AI" : c.lastMessage.role === "ADMIN" ? "Admin" : "Sistem"}: </span>
                        {c.lastMessage.content}
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 text-xs text-neutral-400">{fmt(c.lastMessageAt)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
