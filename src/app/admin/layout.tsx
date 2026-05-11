import React from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex h-screen w-full flex-col overflow-hidden bg-neutral-100 text-neutral-950 md:flex-row dark:bg-neutral-950 dark:text-neutral-50"
      )}
    >
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto w-full">
        <div className="mx-auto w-full max-w-7xl p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
