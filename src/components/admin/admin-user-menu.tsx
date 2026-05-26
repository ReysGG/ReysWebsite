"use client";

import { UserButton } from "@clerk/nextjs";
import { ExternalLink } from "lucide-react";

type AdminUserMenuProps = {
  displayName: string;
};

export function AdminUserMenu({ displayName }: AdminUserMenuProps) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-2.5 py-1.5">
      <div className="hidden sm:block">
        <p className="max-w-[120px] truncate text-xs font-semibold leading-tight text-neutral-900">{displayName}</p>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-indigo-600">Admin</p>
      </div>
      <UserButton
        fallback={<div className="h-8 w-8 rounded-md bg-neutral-100" aria-hidden="true" />}
        appearance={{
          elements: {
            avatarBox: "h-8 w-8 rounded-md",
          },
        }}
      >
        <UserButton.MenuItems>
          <UserButton.Link
            href="/"
            label="Lihat Website"
            labelIcon={<ExternalLink className="h-4 w-4" />}
          />
        </UserButton.MenuItems>
      </UserButton>
    </div>
  );
}
