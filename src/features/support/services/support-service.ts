import "server-only";

import type { SupportRole, SupportStatus } from "@prisma/client";
import db from "@/lib/db";

export const SUPPORT_MAX_MESSAGE_LENGTH = 1000;
const HOURLY_LIMIT = 20;
const DAILY_LIMIT = 60;

export type SupportMessageView = {
  id: string;
  role: SupportRole;
  content: string;
  authorName: string | null;
  createdAt: string;
};

export type SupportConversationView = {
  id: string;
  status: SupportStatus;
};

export class SupportRateLimitError extends Error {
  constructor(message = "Batas pesan tercapai. Coba lagi nanti atau hubungi kami via WhatsApp.") {
    super(message);
  }
}

const messageSelect = { id: true, role: true, content: true, authorName: true, createdAt: true } as const;

function toView(m: { id: string; role: SupportRole; content: string; authorName: string | null; createdAt: Date }): SupportMessageView {
  return { ...m, createdAt: m.createdAt.toISOString() };
}

// ---------------------------------------------------------------- visitor side

/** Most recent conversation in any status (a just-closed one is still shown until the user writes again). */
export async function getLatestConversation(userId: string): Promise<SupportConversationView | null> {
  return db.supportConversation.findFirst({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    select: { id: true, status: true },
  });
}

export async function getActiveConversation(userId: string): Promise<SupportConversationView | null> {
  return db.supportConversation.findFirst({
    where: { userId, status: { not: "CLOSED" } },
    orderBy: { updatedAt: "desc" },
    select: { id: true, status: true },
  });
}

export async function getOrCreateActiveConversation(user: { id: string; name: string | null; email: string | null }) {
  const existing = await getActiveConversation(user.id);
  if (existing) return existing;
  return db.supportConversation.create({
    data: { userId: user.id, userName: user.name, userEmail: user.email },
    select: { id: true, status: true },
  });
}

export async function listMessages(conversationId: string, after?: Date, limit = 100): Promise<SupportMessageView[]> {
  const rows = await db.supportMessage.findMany({
    where: { conversationId, ...(after ? { createdAt: { gt: after } } : {}) },
    orderBy: { createdAt: after ? "asc" : "desc" },
    take: limit,
    select: messageSelect,
  });
  return (after ? rows : rows.reverse()).map(toView);
}

/** Last messages for the AI context, oldest first. */
export async function getRecentHistory(conversationId: string, take = 20) {
  const rows = await db.supportMessage.findMany({
    where: { conversationId },
    orderBy: { createdAt: "desc" },
    take,
    select: { role: true, content: true },
  });
  return rows.reverse();
}

export async function assertWithinRateLimit(userId: string) {
  const now = Date.now();
  const [hour, day] = await db.$transaction([
    db.supportMessage.count({ where: { role: "USER", createdAt: { gte: new Date(now - 3_600_000) }, conversation: { userId } } }),
    db.supportMessage.count({ where: { role: "USER", createdAt: { gte: new Date(now - 86_400_000) }, conversation: { userId } } }),
  ]);
  if (hour >= HOURLY_LIMIT || day >= DAILY_LIMIT) throw new SupportRateLimitError();
}

export async function addMessage(conversationId: string, role: SupportRole, content: string, authorName?: string | null) {
  const [message] = await db.$transaction([
    db.supportMessage.create({
      data: { conversationId, role, content: content.slice(0, 4000), authorName: authorName ?? null },
      select: messageSelect,
    }),
    db.supportConversation.update({
      where: { id: conversationId },
      data: { lastMessageAt: new Date(), ...(role === "USER" ? { adminUnread: { increment: 1 } } : {}) },
      select: { id: true },
    }),
  ]);
  return toView(message);
}

/** Moves an AI-handled conversation to the admin queue. Idempotent. */
export async function requestHandoff(conversationId: string, reason: string, by: "user" | "ai") {
  const updated = await db.supportConversation.updateMany({
    where: { id: conversationId, status: "AI" },
    data: { status: "WAITING_HUMAN", handoffReason: reason.slice(0, 300) },
  });
  if (updated.count === 1) {
    await addMessage(
      conversationId,
      "SYSTEM",
      by === "user"
        ? "Percakapan diteruskan ke admin. Mohon tunggu, admin akan membalas di sini (biasanya di jam kerja)."
        : "Asisten meneruskan percakapan ini ke admin. Mohon tunggu balasan di sini.",
    );
  }
  return updated.count === 1;
}

// ---------------------------------------------------------------- admin side

export type SupportInboxItem = {
  id: string;
  userName: string | null;
  userEmail: string | null;
  status: SupportStatus;
  handoffReason: string | null;
  adminUnread: number;
  lastMessageAt: string;
  lastMessage: { role: SupportRole; content: string } | null;
};

const STATUS_ORDER: SupportStatus[] = ["WAITING_HUMAN", "HUMAN", "AI", "CLOSED"];

export async function listSupportConversations(status?: SupportStatus, take = 50): Promise<SupportInboxItem[]> {
  const rows = await db.supportConversation.findMany({
    where: status ? { status } : { status: { not: "CLOSED" } },
    orderBy: { lastMessageAt: "desc" },
    take,
    select: {
      id: true, userName: true, userEmail: true, status: true, handoffReason: true, adminUnread: true, lastMessageAt: true,
      messages: { orderBy: { createdAt: "desc" }, take: 1, select: { role: true, content: true } },
    },
  });
  return rows
    .map(({ messages, ...row }) => ({ ...row, lastMessageAt: row.lastMessageAt.toISOString(), lastMessage: messages[0] ?? null }))
    .sort((a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status));
}

export async function getSupportCounts() {
  const [waiting, human, unread] = await db.$transaction([
    db.supportConversation.count({ where: { status: "WAITING_HUMAN" } }),
    db.supportConversation.count({ where: { status: "HUMAN" } }),
    db.supportConversation.count({ where: { status: { in: ["WAITING_HUMAN", "HUMAN"] }, adminUnread: { gt: 0 } } }),
  ]);
  return { waiting, human, unread };
}

export async function getConversationForAdmin(id: string) {
  const conversation = await db.supportConversation.findUnique({
    where: { id },
    select: { id: true, userName: true, userEmail: true, status: true, handoffReason: true, adminUnread: true, createdAt: true },
  });
  if (!conversation) return null;
  const messages = await listMessages(id, undefined, 200);
  return { ...conversation, createdAt: conversation.createdAt.toISOString(), messages };
}

export async function markConversationRead(id: string) {
  await db.supportConversation.update({ where: { id }, data: { adminUnread: 0 }, select: { id: true } });
}

export async function adminReply(id: string, adminName: string, content: string) {
  const text = content.trim().slice(0, SUPPORT_MAX_MESSAGE_LENGTH * 2);
  if (!text) throw new Error("Pesan kosong.");
  const conversation = await db.supportConversation.findUnique({ where: { id }, select: { status: true } });
  if (!conversation) throw new Error("Percakapan tidak ditemukan.");
  const message = await addMessage(id, "ADMIN", text, adminName);
  await db.supportConversation.update({
    where: { id },
    data: { adminUnread: 0, ...(conversation.status === "CLOSED" ? {} : { status: "HUMAN" }) },
    select: { id: true },
  });
  return message;
}

export async function setConversationStatus(id: string, status: Extract<SupportStatus, "AI" | "CLOSED">) {
  await db.supportConversation.update({ where: { id }, data: { status, adminUnread: 0 }, select: { id: true } });
  await addMessage(
    id,
    "SYSTEM",
    status === "AI" ? "Admin mengembalikan percakapan ke asisten AI." : "Percakapan ditutup oleh admin. Kirim pesan baru untuk memulai lagi.",
  );
}
