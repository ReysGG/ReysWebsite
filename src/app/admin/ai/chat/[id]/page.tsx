import { notFound } from "next/navigation";
import { requireAdmin } from "@/features/admin/lib/auth";
import { AiStudioHeader } from "@/features/ai/components/ai-studio-header";
import { ChatPanel } from "@/features/ai/components/chat-panel";
import { ChatSessionsSidebar } from "@/features/ai/components/chat-sessions-sidebar";
import { getChatSession, listChatSessions } from "@/features/ai/services/chat-service";
import { countEnabledProviders } from "@/features/ai/services/provider-service";

export const dynamic = "force-dynamic";

export default async function AiChatSessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const admin = await requireAdmin();
  const [session, sessions, providerCount] = await Promise.all([
    getChatSession(id, admin.id),
    listChatSessions(admin.id),
    countEnabledProviders(),
  ]);
  if (!session) notFound();

  return (
    <div className="space-y-6">
      <AiStudioHeader title="Reys AI Chat" description={session.title} active="/admin/ai/chat" />
      <div className="grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        <ChatSessionsSidebar sessions={sessions} activeId={session.id} />
        <ChatPanel key={session.id} sessionId={session.id} initialMessages={session.messages} providersReady={providerCount > 0} />
      </div>
    </div>
  );
}
