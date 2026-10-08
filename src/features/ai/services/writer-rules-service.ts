import "server-only";

import type { Prisma } from "@prisma/client";
import db from "@/lib/db";
import { normalizeWriterRules, type AiWriterRules } from "@/features/ai/lib/writer-rules";

export const AI_WRITER_RULES_KEY = "ai-writer-rules";

export async function getWriterRules(): Promise<AiWriterRules> {
  const config = await db.siteConfig.findUnique({ where: { key: AI_WRITER_RULES_KEY }, select: { value: true } });
  return normalizeWriterRules((config?.value ?? null) as Partial<AiWriterRules> | null);
}

export async function saveWriterRules(input: Partial<AiWriterRules>) {
  const rules = normalizeWriterRules(input);
  const value = rules as unknown as Prisma.InputJsonValue;
  await db.siteConfig.upsert({
    where: { key: AI_WRITER_RULES_KEY },
    create: { key: AI_WRITER_RULES_KEY, value },
    update: { value },
  });
  return rules;
}
