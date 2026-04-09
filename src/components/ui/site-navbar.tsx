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

const NAV_ITEMS = [
  { name: "Layanan", link: "#services" },
  { name: "Portofolio", link: "#portfolio" },
  { name: "Proses Kerja", link: "#workflow" },
  { name: "Harga", link: "#pricing" },
  { name: "Testimoni", link: "#testimonials" },
  { name: "FAQ", link: "#faq" },
];

export const SiteNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed inset-x-0 top-0 z-50 w-full">
      <Navbar>
        {/* Desktop */}
        <NavBody>
          {/* Logo */}
          <a href="#" className="relative z-20 flex items-center gap-2 px-2 py-1 group">
            <MonitorSmartphone className="w-6 h-6 text-amber-400 transition-transform group-hover:scale-110" />
            <span className="text-lg font-bold text-white tracking-tight">
              WebServices
            </span>
          </a>

          <NavItems items={NAV_ITEMS} />

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors"
            >
              Admin
            </Link>
            <NavbarButton
              href="#cta"
              variant="dark"
              className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black font-semibold border-0 text-xs px-5 py-2 rounded-full transition-all"
            >
              Hubungi Kami
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile */}
        <MobileNav>
          <MobileNavHeader>
            <a href="#" className="flex items-center gap-2">
              <MonitorSmartphone className="w-5 h-5 text-amber-400" />
              <span className="font-bold text-white text-sm">WebServices</span>
            </a>
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
                onClick={() => setIsOpen(false)}
                className="w-full py-2 text-neutral-300 hover:text-white transition-colors text-sm font-medium"
              >
                {item.name}
              </a>
            ))}
            <div className="flex items-center gap-3 w-full pt-2 border-t border-white/10">
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="text-sm text-neutral-400 hover:text-white transition-colors"
              >
                Admin
              </Link>
              <NavbarButton
                href="#cta"
                variant="dark"
                className="flex-1 text-center bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold border-0 rounded-full"
                onClick={() => setIsOpen(false)}
              >
                Hubungi Kami
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
};
