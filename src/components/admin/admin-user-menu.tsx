"use client";

import Image from "next/image";
import { LogOut } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

type AdminUserMenuProps = {
  displayName: string;
  initial: string;
  avatarUrl?: string;
};

export function AdminUserMenu({ displayName, initial, avatarUrl }: AdminUserMenuProps) {
  return (
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
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600 text-xs font-bold text-white">
          {initial}
        </div>
      )}
      <div className="hidden sm:block">
        <p className="max-w-[120px] truncate text-xs font-semibold leading-tight text-neutral-900">{displayName}</p>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-indigo-600">Admin</p>
      </div>
      <SignOutButton redirectUrl="/">
        <button
          type="button"
          className="ml-1 inline-flex items-center gap-1.5 rounded-md border border-neutral-200 px-2.5 py-1.5 text-xs font-semibold text-neutral-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700"
          title="Logout"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="hidden lg:inline">Logout</span>
        </button>
      </SignOutButton>
    </div>
  );
}
