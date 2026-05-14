"use client";

import React from "react";
import { motion } from "framer-motion";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const DUMMY_TESTIMONIALS = [
  {
    quote: "Website company profile kami selesai dalam 12 hari. Desainnya clean, loading cepat, dan langsung bisa kami kelola sendiri tanpa perlu bantuan teknis.",
    name: "Hendra Kusuma",
    title: "Owner Toko Bangunan Maju Jaya",
    img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    quote: "Dashboard operasional yang dibangun benar-benar mengubah cara kami kerja. Stok, pesanan, dan laporan harian sekarang bisa dipantau dari satu tempat.",
    name: "Sari Dewi",
    title: "Manajer Operasional, Klinik Sehat Prima",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    quote: "Toko online kami naik omzet 35% setelah redesign. Checkout lebih mulus, integrasi WhatsApp-nya sangat membantu tim sales kami.",
    name: "Rizky Pratama",
    title: "Founder Batik Nusantara Store",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    quote: "Komunikasinya transparan dari awal sampai selesai. Tidak ada biaya tersembunyi, timeline ditepati, dan hasilnya melebihi ekspektasi kami.",
    name: "Anisa Rahma",
    title: "CEO Konsultan HR Solusi",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    quote: "SEO website kami membaik drastis dalam 2 bulan. Sekarang muncul di halaman pertama Google untuk kata kunci utama bisnis kami.",
    name: "Teguh Santoso",
    title: "Direktur CV Mitra Logistik",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
  },
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="relative w-full py-24 md:py-32 overflow-hidden bg-[#f5f3ff]">
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full bg-indigo-100/60 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full bg-rose-100/40 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center justify-center mb-16 md:mb-20 text-center"
        >
          <p className="text-xs font-bold tracking-widest text-indigo-600 uppercase mb-4">
            Testimoni
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-6">
            Dipercaya Para Founder
          </h2>
          <p className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Jangan hanya percaya kata-kata kami. Dengarkan langsung dari para visioner yang telah bekerja sama dengan kami.
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="h-[20rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden"
        >
          <InfiniteMovingCards
            items={DUMMY_TESTIMONIALS}
            direction="left"
            speed="normal"
          />
        </motion.div>
      </div>
    </section>
  );
};
