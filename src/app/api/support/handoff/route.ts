import { auth, currentUser } from "@clerk/nextjs/server";
import { getLatestConversation, getOrCreateActiveConversation, requestHandoff } from "@/features/support/services/support-service";

export const dynamic = "force-dynamic";

/** Visitor explicitly asks for a human: the AI stops replying and the conversation enters the admin queue. */
export async function POST() {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Silakan masuk terlebih dahulu." }, { status: 401 });

  const user = await currentUser();
  const conversation = await getOrCreateActiveConversation({
    id: userId,
    name: [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.username || null,
    email: user?.primaryEmailAddress?.emailAddress ?? null,
  });
  await requestHandoff(conversation.id, "Pengguna meminta bicara dengan admin", "user");
  return Response.json({ conversation: await getLatestConversation(userId) });
}
