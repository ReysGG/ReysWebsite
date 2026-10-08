import "server-only";

import type { Prisma } from "@prisma/client";
import type { UIMessage } from "ai";
import db from "@/lib/db";

export type ChatSessionSummary = { id: string; title: string; updatedAt: string };

export async function listChatSessions(adminId: string, limit = 30): Promise<ChatSessionSummary[]> {
  const rows = await db.aiChatSession.findMany({
    where: { adminId },
    orderBy: { updatedAt: "desc" },
    take: limit,
    select: { id: true, title: true, updatedAt: true },
  });
  return rows.map((row) => ({ ...row, updatedAt: row.updatedAt.toISOString() }));
}

export async function createChatSession(adminId: string) {
  return db.aiChatSession.create({
    data: { adminId, title: "Percakapan baru", messages: [] },
    select: { id: true },
  });
}

export async function getChatSession(id: string, adminId: string) {
  const session = await db.aiChatSession.findFirst({
    where: { id, adminId },
    select: { id: true, title: true, messages: true },
  });
  if (!session) return null;
  return { ...session, messages: (Array.isArray(session.messages) ? session.messages : []) as unknown as UIMessage[] };
}

function deriveTitle(messages: UIMessage[]) {
  const firstUser = messages.find((m) => m.role === "user");
  const text = firstUser?.parts.find((p) => p.type === "text");
  const raw = text && "text" in text ? text.text : "";
  const title = raw.replace(/\s+/g, " ").trim();
  return title ? (title.length > 60 ? `${title.slice(0, 57)}…` : title) : "Percakapan baru";
}

export async function saveChatMessages(id: string, adminId: string, messages: UIMessage[]) {
  await db.aiChatSession.updateMany({
    where: { id, adminId },
    data: { messages: messages as unknown as Prisma.InputJsonValue, title: deriveTitle(messages) },
  });
}

export async function deleteChatSession(id: string, adminId: string) {
  await db.aiChatSession.deleteMany({ where: { id, adminId } });
}
