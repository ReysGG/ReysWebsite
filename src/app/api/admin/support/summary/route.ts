import { requireAdmin } from "@/features/admin/lib/auth";
import { countNeedsReply } from "@/features/support/services/support-service";

export const dynamic = "force-dynamic";

/** Polled by the admin header badge: number of support chats that need an admin reply. */
export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return Response.json({ needsReply: await countNeedsReply() });
}
