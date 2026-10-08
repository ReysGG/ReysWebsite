"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/features/admin/lib/auth";
import { adminReply, setConversationStatus } from "@/features/support/services/support-service";

export type SupportActionState = { ok?: boolean; error?: string };

function revalidateSupport(id: string) {
  revalidatePath("/admin/support");
  revalidatePath(`/admin/support/${id}`);
}

export async function replyToConversationAction(id: string, _prev: SupportActionState, formData: FormData): Promise<SupportActionState> {
  try {
    const admin = await requireAdmin();
    const content = formData.get("content");
    await adminReply(id, admin.name || "Admin", typeof content === "string" ? content : "");
    revalidateSupport(id);
    return { ok: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Gagal mengirim balasan." };
  }
}

export async function setConversationStatusAction(id: string, status: "AI" | "CLOSED") {
  await requireAdmin();
  await setConversationStatus(id, status);
  revalidateSupport(id);
}

