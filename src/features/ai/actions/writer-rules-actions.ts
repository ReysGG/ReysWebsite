"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/features/admin/lib/auth";
import type { AiWriterRules } from "@/features/ai/lib/writer-rules";
import { saveWriterRules } from "@/features/ai/services/writer-rules-service";
import type { AiActionState } from "@/features/ai/actions/provider-actions";

const BOOLEAN_FIELDS = ["requireFaq", "requireTldr", "requireCta"] as const;
const NUMBER_FIELDS = ["minWords", "maxWords", "seoScoreThreshold", "internalLinks", "externalLinks", "inlineImages", "maxAgentSteps"] as const;

export async function saveWriterRulesAction(_prev: AiActionState, formData: FormData): Promise<AiActionState> {
  try {
    await requireAdmin();
    const input: Partial<Record<keyof AiWriterRules, unknown>> = {};
    for (const [key, value] of formData.entries()) {
      if (typeof value === "string") input[key as keyof AiWriterRules] = value;
    }
    BOOLEAN_FIELDS.forEach((key) => (input[key] = formData.get(key) === "on"));
    NUMBER_FIELDS.forEach((key) => (input[key] = Number(formData.get(key))));
    await saveWriterRules(input as Partial<AiWriterRules>);
    revalidatePath("/admin/ai/rules");
    return { ok: true, message: "Aturan penulisan disimpan." };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Gagal menyimpan aturan." };
  }
}
