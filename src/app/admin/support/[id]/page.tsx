import Link from "next/link";
import { notFound } from "next/navigation";
import { AutoRefresh } from "@/features/support/components/admin/auto-refresh";
import { SupportThread } from "@/features/support/components/admin/support-thread";
import { getConversationForAdmin } from "@/features/support/services/support-service";

export const dynamic = "force-dynamic";

const STATUS_LABEL = { AI: "Dijawab AI", WAITING_HUMAN: "Menunggu admin", HUMAN: "Ditangani admin", CLOSED: "Selesai" } as const;

export default async function AdminSupportThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const conversation = await getConversationForAdmin(id);
  if (!conversation) notFound();

  return (
    <div className="space-y-4">
      <AutoRefresh intervalMs={4000} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/admin/support" className="text-sm font-semibold text-neutral-400 hover:text-neutral-700">← Support Chat</Link>
          <h1 className="mt-1 text-lg font-bold text-neutral-900">{conversation.userName || conversation.userEmail || "Pengunjung"}</h1>
          <p className="text-xs text-neutral-500">
            {conversation.userEmail} · {STATUS_LABEL[conversation.status]}
            {conversation.handoffReason ? ` · Alasan: ${conversation.handoffReason}` : ""}
          </p>
        </div>
      </div>
      <SupportThread conversationId={conversation.id} status={conversation.status} messages={conversation.messages} hasUnread={conversation.adminUnread > 0} />
    </div>
  );
}
