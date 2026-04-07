"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconArrowRight, IconBrandWhatsapp } from "@tabler/icons-react";

export const CtaSection = () => {
  return (
    <section
      id="cta"
      className="w-full relative py-32 md:py-48 bg-black overflow-hidden"
    >
      {/* Glow orb center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-[120px]" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[300px] h-[300px] rounded-full bg-violet-500/20 blur-[80px]" />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold tracking-widest uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
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
          <span className="text-white">Siap memulai</span>
          <br />
          <span className="bg-linear-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
            proyek Anda?
          </span>
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed"
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
          <Link
            href="https://wa.me/6281234567890"
            target="_blank"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105"
          >
            <IconBrandWhatsapp className="w-5 h-5" />
            Chat WhatsApp Sekarang
            <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-neutral-700 hover:border-neutral-500 text-white font-semibold text-base hover:bg-white/5 transition-all duration-200"
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
          className="flex flex-col sm:flex-row items-center gap-6 text-neutral-500 text-sm"
        >
          {/* Avatars */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["DB", "AR", "SK", "MY"].map((init, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-violet-600 border-2 border-black flex items-center justify-center text-[10px] font-bold text-white"
                >
                  {init}
                </div>
              ))}
            </div>
            <span>50+ klien puas</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-neutral-800" />
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
