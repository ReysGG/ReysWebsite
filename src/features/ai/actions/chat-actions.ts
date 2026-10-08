"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/features/admin/lib/auth";
import { createChatSession, deleteChatSession } from "@/features/ai/services/chat-service";

export async function createChatSessionAction() {
  const admin = await requireAdmin();
  const session = await createChatSession(admin.id);
  redirect(`/admin/ai/chat/${session.id}`);
}

export async function deleteChatSessionAction(id: string) {
  const admin = await requireAdmin();
  await deleteChatSession(id, admin.id);
  revalidatePath("/admin/ai/chat");
  redirect("/admin/ai/chat");
}
