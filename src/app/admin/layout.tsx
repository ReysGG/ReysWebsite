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
        "rounded-md flex flex-col md:flex-row bg-neutral-50 dark:bg-neutral-950 w-full flex-1 mx-auto overflow-hidden",
        "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto w-full">
        <div className="max-w-6xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
