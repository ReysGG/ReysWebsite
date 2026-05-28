import { NextResponse } from "next/server";
import { requireAdmin } from "@/features/admin/lib/auth";
import { getSubscribersCsvExport } from "@/features/admin/services/subscriber-service";

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const csv = await getSubscribersCsvExport();

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
