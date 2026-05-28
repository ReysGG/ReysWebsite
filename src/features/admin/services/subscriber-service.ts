import "server-only";

import type { Prisma } from "@prisma/client";
import db from "@/lib/db";
import { SUBSCRIBERS_PAGE_SIZE } from "@/features/admin/constants/subscribers";
import { rowsToCsv } from "@/features/admin/lib/csv";
import type { SubscriberListFilters, SubscriberListResult } from "@/features/admin/types/subscribers";

function buildSubscriberWhere(filters: Pick<SubscriberListFilters, "q" | "status">): Prisma.SubscriberWhereInput {
  const where: Prisma.SubscriberWhereInput = {};

  if (filters.q) {
    where.OR = [
      { email: { contains: filters.q, mode: "insensitive" } },
      { source: { contains: filters.q, mode: "insensitive" } },
    ];
  }

  if (filters.status === "active") where.active = true;
  if (filters.status === "inactive") where.active = false;

  return where;
}

export async function getSubscriberList(filters: SubscriberListFilters): Promise<SubscriberListResult> {
  const where = buildSubscriberWhere(filters);

  try {
    const [subscribers, totalCount, activeCount, inactiveCount, filteredCount] = await db.$transaction([
      db.subscriber.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (filters.page - 1) * SUBSCRIBERS_PAGE_SIZE,
        take: SUBSCRIBERS_PAGE_SIZE,
        select: {
          id: true,
          email: true,
          source: true,
          active: true,
          createdAt: true,
        },
      }),
      db.subscriber.count(),
      db.subscriber.count({ where: { active: true } }),
      db.subscriber.count({ where: { active: false } }),
      db.subscriber.count({ where }),
    ]);

    return {
      subscribers,
      totalCount,
      activeCount,
      inactiveCount,
      filteredCount,
      totalPages: Math.max(1, Math.ceil(filteredCount / SUBSCRIBERS_PAGE_SIZE)),
      pageSize: SUBSCRIBERS_PAGE_SIZE,
      databaseError: false,
    };
  } catch {
    return {
      subscribers: [],
      totalCount: 0,
      activeCount: 0,
      inactiveCount: 0,
      filteredCount: 0,
      totalPages: 1,
      pageSize: SUBSCRIBERS_PAGE_SIZE,
      databaseError: true,
    };
  }
}

export async function getSubscribersCsvExport() {
  const subscribers = await db.subscriber.findMany({
    orderBy: { createdAt: "desc" },
    select: { email: true, source: true, active: true, createdAt: true },
  });

  return rowsToCsv([
    ["Email", "Source", "Status", "Tanggal Daftar"],
    ...subscribers.map((subscriber) => [
      subscriber.email,
      subscriber.source ?? "",
      subscriber.active ? "Aktif" : "Nonaktif",
      subscriber.createdAt.toISOString().slice(0, 10),
    ]),
  ]);
}
