"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "@/components/ui/resizable-navbar";
import { MonitorSmartphone } from "lucide-react";
import Link from "next/link";
import { Show, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

const NAV_ITEMS = [
  { name: "Layanan", link: "/#services" },
  { name: "Portofolio", link: "/#portfolio" },
  { name: "Proses", link: "/#workflow" },
  { name: "Harga", link: "/#pricing" },
  { name: "Testimoni", link: "/#testimonials" },
  { name: "Blog", link: "/blog" },
];

export const SiteNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const isAdmin = String(user?.publicMetadata?.role ?? "").toLowerCase() === "admin";

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="fixed inset-x-0 top-0 z-50 w-full">
      <Navbar>
        {/* Desktop */}
        <NavBody>
          {/* Logo */}
          <Link href="/" className="relative z-20 flex items-center gap-2 px-2 py-1 group">
            <MonitorSmartphone className="w-6 h-6 text-neutral-900 transition-transform group-hover:scale-110" />
            <span className="text-lg font-bold text-neutral-900 tracking-tight">
              Build With Reys
            </span>
          </Link>

          <NavItems items={NAV_ITEMS} />

          <div className="flex items-center gap-3">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="px-3 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  Masuk
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button
                  type="button"
                  className="rounded-md bg-white px-4 py-2 text-xs font-semibold text-neutral-900 shadow-sm ring-1 ring-neutral-200 transition-colors hover:bg-neutral-50"
                >
                  Daftar
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
            {isAdmin ? (
              <Link
                href="/admin"
                className="rounded-md border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700 transition-colors hover:bg-indigo-100"
              >
                Admin Panel
              </Link>
            ) : null}
            <NavbarButton
              href="/#cta"
              variant="dark"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold border-0 text-xs px-5 py-2 rounded-md transition-all"
            >
              Konsultasi
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile */}
        <MobileNav>
          <MobileNavHeader>
            <Link href="/" className="flex items-center gap-2">
              <MonitorSmartphone className="w-5 h-5 text-neutral-900" />
              <span className="font-bold text-neutral-900 text-sm">Build With Reys</span>
            </Link>
            <MobileNavToggle
              isOpen={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.link}
                onClick={closeMenu}
                className="w-full py-2 text-neutral-900 hover:text-black transition-colors text-sm font-semibold"
              >
                {item.name}
              </a>
            ))}
            <div className="flex items-center gap-3 w-full pt-2 border-t border-neutral-200">
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button
                    type="button"
                    onClick={closeMenu}
                    className="text-sm font-semibold text-neutral-600 transition-colors hover:text-black"
                  >
                    Masuk
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button
                    type="button"
                    onClick={closeMenu}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
                  >
                    Daftar
                  </button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
              {isAdmin ? (
                <Link
                  href="/admin"
                  onClick={closeMenu}
                  className="rounded-md border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 transition-colors hover:bg-indigo-100"
                >
                  Admin Panel
                </Link>
              ) : null}
              <NavbarButton
                href="/#cta"
                variant="dark"
                className="flex-1 text-center bg-indigo-600 text-white hover:bg-indigo-700 font-semibold border-0 rounded-md"
                onClick={closeMenu}
              >
                Konsultasi
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
};
