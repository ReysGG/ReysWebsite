import React from "react";
import { OverviewBento } from "@/components/admin/overview-bento";

export default function AdminDashboard() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-neutral-500 mt-2">Welcome to your minimal admin dashboard.</p>
      </div>

      <div>
        <OverviewBento />
      </div>
    </div>
  );
}
