import { Bot, Plus } from "lucide-react";
import { requireAdmin } from "@/features/admin/lib/auth";
import { SubmitButton } from "@/features/admin/components/ui/submit-button";
import { createChatSessionAction } from "@/features/ai/actions/chat-actions";
import { AiStudioHeader } from "@/features/ai/components/ai-studio-header";
import { ChatSessionsSidebar } from "@/features/ai/components/chat-sessions-sidebar";
import { listChatSessions } from "@/features/ai/services/chat-service";

export const dynamic = "force-dynamic";

export default async function AiChatIndexPage() {
  const admin = await requireAdmin();
  const sessions = await listChatSessions(admin.id);

  return (
    <div className="space-y-6">
      <AiStudioHeader title="Reys AI Chat" description="Chatbot dengan akses langsung ke tools blog: tulis, edit, audit SEO, gambar, jadwal, publish." active="/admin/ai/chat" />
      <div className="grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        <ChatSessionsSidebar sessions={sessions} />
        <div className="flex min-h-[420px] flex-col items-center justify-center rounded-md border border-neutral-200 bg-white p-10 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-cyan to-brand text-white"><Bot className="h-6 w-6" /></span>
          <h2 className="mt-3 text-lg font-semibold text-neutral-900">Mulai percakapan</h2>
          <p className="mt-1 max-w-sm text-sm text-neutral-500">Pilih riwayat di kiri atau buat chat baru. Riwayat tersimpan dan hanya terlihat olehmu.</p>
          <form action={createChatSessionAction} className="mt-5">
            <SubmitButton idleIcon={<Plus className="h-4 w-4" />} pendingLabel="Membuat..." className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-deep disabled:opacity-60">
              Chat baru
            </SubmitButton>
          </form>
        </div>
      </div>
    </div>
  );
}
