"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconArrowRight, IconBrandWhatsapp } from "@tabler/icons-react";
import { Spotlight } from "@/components/ui/spotlight";

export const CtaSection = () => {
  return (
    <section
      id="cta"
      className="w-full relative py-32 md:py-48 overflow-hidden bg-white"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">

        {/* Badge — black style */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-300 bg-neutral-100 text-neutral-800 text-xs font-semibold tracking-widest uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
          Konsultasi Gratis — Tanpa Komitmen
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-8"
        >
          <span className="text-neutral-900">Siap memulai</span>
          <br />
          <span className="bg-gradient-to-r from-neutral-600 to-black bg-clip-text text-transparent">
            proyek Anda?
          </span>
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Ceritakan kebutuhan Anda. Kami akan bantu rancang solusi terbaik —
          dari landing page hingga sistem enterprise skala penuh.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
        >
          {/* Primary — Black solid button */}
          <Link
            href="https://wa.me/6281234567890"
            target="_blank"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-black text-white font-bold text-base transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
          >
            <IconBrandWhatsapp className="w-5 h-5" />
            Chat WhatsApp Sekarang
            <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          {/* Secondary — bordered */}
          <Link
            href="#portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-neutral-300 hover:border-neutral-500 text-neutral-700 hover:text-black font-semibold text-base hover:bg-neutral-50 transition-all duration-200"
          >
            Lihat Portfolio
          </Link>
        </motion.div>

        {/* Social proof strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-6 text-neutral-600 text-sm"
        >
          {/* Avatars */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["DB", "AR", "SK", "MY"].map((init, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-neutral-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-neutral-800"
                >
                  {init}
                </div>
              ))}
            </div>
            <span>50+ klien puas</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-neutral-300" />
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(i => (
              <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1">5.0 rating rata-rata</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
