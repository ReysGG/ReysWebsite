"use client";

import React from "react";
import Link from "next/link";
import { Layout } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full bg-black border-t border-neutral-900 pt-24 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top section: Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="flex flex-col col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Layout className="w-6 h-6 text-indigo-500" />
              <span className="text-xl font-bold text-white tracking-tight">WebServices</span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Membangun standar baru aplikasi web digital untuk UMKM, Startup, dan Personal Brand Anda.
            </p>
          </div>

          {/* Links Col 1 */}
          <div className="flex flex-col">
            <h3 className="text-white font-semibold mb-4 text-sm tracking-widest uppercase">Layanan</h3>
            <div className="flex flex-col gap-3 text-sm text-neutral-400">
              <Link href="#" className="hover:text-indigo-400 transition-colors">Company Profile</Link>
              <Link href="#" className="hover:text-indigo-400 transition-colors">Web Application</Link>
              <Link href="#" className="hover:text-indigo-400 transition-colors">Sistem E-Commerce</Link>
              <Link href="#" className="hover:text-indigo-400 transition-colors">SEO & Performa</Link>
            </div>
          </div>

          {/* Links Col 2 */}
          <div className="flex flex-col">
            <h3 className="text-white font-semibold mb-4 text-sm tracking-widest uppercase">Perusahaan</h3>
            <div className="flex flex-col gap-3 text-sm text-neutral-400">
              <Link href="#" className="hover:text-indigo-400 transition-colors">Tentang Kami</Link>
              <Link href="#" className="hover:text-indigo-400 transition-colors">Portofolio Kerja</Link>
              <Link href="#" className="hover:text-indigo-400 transition-colors">Testimonial Klien</Link>
              <Link href="#" className="hover:text-indigo-400 transition-colors">Hubungi Kami</Link>
            </div>
          </div>

          {/* Links Col 3 */}
          <div className="flex flex-col">
            <h3 className="text-white font-semibold mb-4 text-sm tracking-widest uppercase">Legal</h3>
            <div className="flex flex-col gap-3 text-sm text-neutral-400">
              <Link href="#" className="hover:text-indigo-400 transition-colors">Syarat & Ketentuan</Link>
              <Link href="#" className="hover:text-indigo-400 transition-colors">Kebijakan Privasi</Link>
            </div>
          </div>
          
        </div>

        {/* Bottom section: Border and rights */}
        <div className="w-full h-px bg-neutral-900 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-neutral-500 text-sm">
          <p>© {new Date().getFullYear()} WebServices. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Twitter X</Link>
            <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
            <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
};
