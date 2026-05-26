import React from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminUserMenu } from "@/components/admin/admin-user-menu";
import { Search } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin, type AdminUser } from "@/features/admin/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user: AdminUser;
  try {
    user = await requireAdmin();
  } catch {
    redirect("/");
  }

  const displayName = user.name;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-neutral-50">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-neutral-200 bg-white px-6">
          <div className="flex items-center gap-4 w-full max-w-md">
            <div className="relative w-full hidden md:flex">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="search"
                placeholder="Cari artikel, portfolio, testimoni..."
                className="w-full bg-neutral-100 border-none pl-9 h-9 text-sm rounded-md outline-none focus:ring-1 focus:ring-indigo-300 text-neutral-700 placeholder:text-neutral-400"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-medium text-neutral-500 hover:text-indigo-600 transition-colors"
            >
              Lihat Website →
            </Link>
            <AdminUserMenu displayName={displayName} />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="w-full p-6 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
