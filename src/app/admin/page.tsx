import { AdminDashboardView } from "@/features/admin/components/dashboard/admin-dashboard-view";
import { getAdminDashboardData } from "@/features/admin/services/dashboard-service";

export default async function AdminDashboard() {
  const data = await getAdminDashboardData();

  return <AdminDashboardView data={data} />;
}
