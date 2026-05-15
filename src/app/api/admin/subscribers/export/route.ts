import { NextResponse } from "next/server";
import db from "@/lib/db";
import { requireAdmin } from "@/features/admin/lib/auth";

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const subscribers = await db.subscriber.findMany({
    orderBy: { createdAt: "desc" },
    select: { email: true, source: true, active: true, createdAt: true },
  });

  const rows = [
    ["Email", "Source", "Status", "Tanggal Daftar"],
    ...subscribers.map((s) => [
      s.email,
      s.source ?? "",
      s.active ? "Aktif" : "Nonaktif",
      s.createdAt.toISOString().slice(0, 10),
    ]),
  ];

  const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
