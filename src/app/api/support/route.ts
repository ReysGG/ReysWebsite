import { auth, currentUser } from "@clerk/nextjs/server";
import { generateSupportReply } from "@/features/support/services/support-ai-service";
import {
  SUPPORT_MAX_MESSAGE_LENGTH,
  SupportRateLimitError,
  addMessage,
  assertWithinRateLimit,
  getLatestConversation,
  getOrCreateActiveConversation,
  listMessages,
} from "@/features/support/services/support-service";

export const dynamic = "force-dynamic";
export const maxDuration = 90;

function json(status: number, body: unknown) {
  return Response.json(body, { status });
}

/** Current conversation + messages (optionally only those after `?after=<ISO>`). Login required. */
export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return json(401, { error: "Silakan masuk terlebih dahulu." });

  const conversation = await getLatestConversation(userId);
  if (!conversation) return json(200, { conversation: null, messages: [] });

  const afterParam = new URL(req.url).searchParams.get("after");
  const after = afterParam ? new Date(afterParam) : undefined;
  const messages = await listMessages(conversation.id, after && !Number.isNaN(after.getTime()) ? after : undefined);
  return json(200, { conversation, messages });
}

/** Sends a visitor message; the AI answers immediately while the conversation is in AI mode. */
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return json(401, { error: "Silakan masuk terlebih dahulu." });

  const body = (await req.json().catch(() => null)) as { content?: unknown } | null;
  const content = typeof body?.content === "string" ? body.content.trim() : "";
  if (!content) return json(400, { error: "Pesan kosong." });
  if (content.length > SUPPORT_MAX_MESSAGE_LENGTH) return json(400, { error: `Pesan maksimal ${SUPPORT_MAX_MESSAGE_LENGTH} karakter.` });

  try {
    await assertWithinRateLimit(userId);
  } catch (error) {
    if (error instanceof SupportRateLimitError) return json(429, { error: error.message });
    throw error;
  }

  const user = await currentUser();
  const conversation = await getOrCreateActiveConversation({
    id: userId,
    name: [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.username || null,
    email: user?.primaryEmailAddress?.emailAddress ?? null,
  });

  const userMessage = await addMessage(conversation.id, "USER", content, null);
  if (conversation.status === "AI") {
    await generateSupportReply(conversation.id);
  }

  // Everything from the user's message on (AI reply, handoff notice, …), oldest first.
  const since = new Date(new Date(userMessage.createdAt).getTime() - 1);
  const [latest, messages] = await Promise.all([getLatestConversation(userId), listMessages(conversation.id, since)]);
  return json(200, { conversation: latest, messages });
}
