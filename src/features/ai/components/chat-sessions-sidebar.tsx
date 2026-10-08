import Link from "next/link";
import { MessageSquare, Plus, Trash2 } from "lucide-react";
import { createChatSessionAction, deleteChatSessionAction } from "@/features/ai/actions/chat-actions";
import type { ChatSessionSummary } from "@/features/ai/services/chat-service";
import { SubmitButton } from "@/features/admin/components/ui/submit-button";

function fmt(iso: string) {
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta" }).format(new Date(iso));
}

export function ChatSessionsSidebar({ sessions, activeId }: { sessions: ChatSessionSummary[]; activeId?: string }) {
  return (
    <aside className="flex flex-col rounded-md border border-neutral-200 bg-white lg:h-[calc(100vh-15rem)] lg:min-h-[520px]">
      <form action={createChatSessionAction} className="border-b border-neutral-100 p-3">
        <SubmitButton
          idleIcon={<Plus className="h-4 w-4" />}
          pendingLabel="Membuat..."
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-deep disabled:opacity-60"
        >
          Chat baru
        </SubmitButton>
      </form>
      <nav className="flex-1 overflow-y-auto p-2" aria-label="Riwayat chat">
        {sessions.length === 0 && <p className="p-3 text-xs text-neutral-500">Belum ada percakapan.</p>}
        <ul className="space-y-0.5">
          {sessions.map((session) => {
            const active = session.id === activeId;
            return (
              <li key={session.id} className={`group flex items-center gap-1 rounded-md ${active ? "bg-brand-tint" : "hover:bg-neutral-50"}`}>
                <Link href={`/admin/ai/chat/${session.id}`} className="flex min-w-0 flex-1 items-start gap-2 px-2.5 py-2">
                  <MessageSquare className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${active ? "text-brand-deep" : "text-neutral-400"}`} />
                  <span className="min-w-0">
                    <span className={`block truncate text-sm ${active ? "font-semibold text-brand-deep" : "text-neutral-700"}`}>{session.title}</span>
                    <span className="block text-[11px] text-neutral-400">{fmt(session.updatedAt)}</span>
                  </span>
                </Link>
                <form action={deleteChatSessionAction.bind(null, session.id)}>
                  <button type="submit" aria-label="Hapus percakapan" className="mr-1 rounded p-1.5 text-neutral-400 opacity-0 transition hover:bg-red-50 hover:text-red-600 focus:opacity-100 group-hover:opacity-100">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </form>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
