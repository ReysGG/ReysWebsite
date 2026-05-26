"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SignInButton, SignUpButton, useAuth, UserButton } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";
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
import Link from "next/link";
import logoBuildWithReys from "@/app/logo buildwithreys.png";

const NAV_ITEMS = [
  { name: "Layanan", link: "/#services" },
  { name: "Portofolio", link: "/#portfolio" },
  { name: "Showcase", link: "/showcase" },
  { name: "Proses", link: "/#workflow" },
  { name: "Harga", link: "/#pricing" },
  { name: "Blog", link: "/blog" },
];

const signInClass =
  "inline-flex h-9 items-center justify-center rounded-md px-3 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950";

const signUpClass =
  "inline-flex h-9 items-center justify-center rounded-md bg-neutral-950 px-4 text-xs font-semibold text-white transition-colors hover:bg-neutral-800";

const dashboardClass =
  "inline-flex h-9 items-center justify-center rounded-md border border-indigo-200 bg-indigo-50 px-4 text-xs font-semibold text-indigo-700 transition-colors hover:bg-indigo-100";

function AuthControls({
  isMobile = false,
  onNavigate,
}: {
  isMobile?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const { isLoaded, isSignedIn } = useAuth();
  const redirectUrl = pathname || "/";

  if (!isLoaded) {
    return null;
  }

  const avatarClass = isMobile ? "h-10 w-10 rounded-md" : "h-9 w-9 rounded-md";

  if (isSignedIn) {
    return (
      <div className={isMobile ? "flex w-full items-center gap-3" : "flex items-center gap-3"}>
        <Link
          href="/admin"
          onClick={onNavigate}
          className={isMobile ? `${dashboardClass} flex-1 text-sm` : dashboardClass}
        >
          Admin
        </Link>
        <UserButton
          fallback={<div className={avatarClass} aria-hidden="true" />}
          appearance={{
            elements: {
              avatarBox: avatarClass,
            },
          }}
        >
          <UserButton.MenuItems>
            <UserButton.Link
              href="/admin"
              label="Admin"
              labelIcon={<LayoutDashboard className="h-4 w-4" />}
            />
          </UserButton.MenuItems>
        </UserButton>
      </div>
    );
  }

  return (
    <div className={isMobile ? "grid w-full grid-cols-2 gap-3" : "flex items-center gap-2"}>
      <SignInButton mode="modal" fallbackRedirectUrl={redirectUrl}>
        <button
          type="button"
          onClick={onNavigate}
          className={isMobile ? `${signInClass} h-10 border border-neutral-200 text-sm` : signInClass}
        >
          Masuk
        </button>
      </SignInButton>
      <SignUpButton mode="modal" fallbackRedirectUrl={redirectUrl}>
        <button
          type="button"
          onClick={onNavigate}
          className={isMobile ? `${signUpClass} h-10 text-sm` : signUpClass}
        >
          Daftar
        </button>
      </SignUpButton>
    </div>
  );
}

export const SiteNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="fixed inset-x-0 top-0 z-50 w-full">
      <Navbar>
        {/* Desktop */}
        <NavBody>
          {/* Logo */}
          <Link href="/" className="relative z-20 flex items-center gap-2 px-2 py-1 group">
            <Image
              src={logoBuildWithReys}
              alt="Build With Reys"
              width={132}
              height={36}
              priority
              className="h-9 w-auto transition-transform group-hover:scale-105"
            />
          </Link>

          <NavItems items={NAV_ITEMS} />

          <div className="flex items-center gap-3">
            <AuthControls />
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
              <Image
                src={logoBuildWithReys}
                alt="Build With Reys"
                width={112}
                height={31}
                priority
                className="h-8 w-auto"
              />
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
            <div className="flex w-full flex-col gap-3 pt-2 border-t border-neutral-200">
              <AuthControls isMobile onNavigate={closeMenu} />
              <NavbarButton
                href="/#cta"
                variant="dark"
                className="w-full text-center bg-indigo-600 text-white hover:bg-indigo-700 font-semibold border-0 rounded-md"
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
