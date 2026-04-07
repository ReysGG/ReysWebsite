"use client";

import React from "react";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";
import { FlipWords } from "@/components/ui/flip-words";

export const HeroSection = () => {
  return (
    <section className="relative w-full h-screen min-h-[40rem] flex md:items-center justify-center overflow-hidden antialiased pt-32 pb-20">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full pt-20 md:pt-0">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 tracking-tight"
        >
          Membangun Standar Baru <br className="hidden md:block"/> <FlipWords className="text-white" words={["Aplikasi Web Digital", "Pengalaman Pengguna", "Kehadiran Online", "Solusi Enterprise"]} />
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="mt-6 font-normal text-base md:text-xl text-neutral-300 max-w-2xl text-center mx-auto"
        >
          Dari situs portofolio kelas atas hingga infrastruktur perangkat lunak skala enterprise. Kami adalah spesialis pengembangan web modern untuk UMKM dan Startup.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="mt-10 flex justify-center gap-4"
        >
          <button className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-colors">
            Mulai Konsultasi
          </button>
          <button className="px-8 py-3 rounded-full bg-transparent border border-neutral-700 text-white font-semibold hover:bg-neutral-900 transition-colors">
            Lihat Portofolio
          </button>
        </motion.div>
      </div>
    </section>
  );
};
