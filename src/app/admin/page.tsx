import { AdminDashboardView } from "@/features/admin/components/dashboard/admin-dashboard-view";
import { getAdminDashboardData } from "@/features/admin/services/dashboard-service";
import { SupportNeedsReplyCard } from "@/features/support/components/admin/support-needs-reply-card";
import { getNeedsReplySummary } from "@/features/support/services/support-service";

export default async function AdminDashboard() {
  const [data, support] = await Promise.all([
    getAdminDashboardData(),
    getNeedsReplySummary(5).catch(() => ({ count: 0, items: [] })),
  ]);

  return (
    <div className="space-y-6">
      <SupportNeedsReplyCard count={support.count} items={support.items} />
      <AdminDashboardView data={data} />
    </div>
  );
}
