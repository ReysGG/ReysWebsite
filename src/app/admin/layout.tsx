import React from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/features/admin/lib/auth";
import { currentUser } from "@clerk/nextjs/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    await requireAdmin();
  } catch {
    redirect("/");
  }

  const user = await currentUser().catch(() => null);
  const displayName = user?.fullName || user?.username || user?.primaryEmailAddress?.emailAddress || "Admin";
  const initial = displayName.charAt(0).toUpperCase();
  const avatarUrl = user?.imageUrl;

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
            <div className="flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-2.5 py-1.5">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={displayName}
                  width={28}
                  height={28}
                  className="h-7 w-7 rounded-md object-cover"
                />
              ) : (
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600 text-white text-xs font-bold">
                  {initial}
                </div>
              )}
              <div className="hidden sm:block">
                <p className="text-xs font-semibold leading-tight text-neutral-900 max-w-[120px] truncate">{displayName}</p>
                <p className="text-[10px] uppercase tracking-widest text-indigo-600 font-semibold">Admin</p>
              </div>
            </div>
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
