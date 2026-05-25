"use client";

import React, { useState } from "react";
import Image from "next/image";
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
            <Link
              href="/admin"
              className="rounded-md border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700 transition-colors hover:bg-indigo-100"
            >
              Admin
            </Link>
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
            <div className="flex items-center gap-3 w-full pt-2 border-t border-neutral-200">
              <Link
                href="/admin"
                onClick={closeMenu}
                className="rounded-md border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 transition-colors hover:bg-indigo-100"
              >
                Admin
              </Link>
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
