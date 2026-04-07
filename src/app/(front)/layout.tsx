import React from "react";
import { SiteNavbar } from "@/components/ui/site-navbar";

export default function FrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full">
      <SiteNavbar />
      {children}
    </div>
  );
}
