"use client";

import React from "react";
import { motion } from "framer-motion";
import { FlipWords } from "@/components/ui/flip-words";
import { HomepageShowcaseSection } from "@/components/sections/homepage-showcase";

export const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden antialiased bg-[#EFECE6] min-h-screen flex items-center">

      {/* ── Decorative SVG lines ───────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block z-0">
        <svg className="absolute -top-[5%] right-[0%] w-[500px] h-[500px] opacity-[0.04] text-black"
          viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.2">
          {[10,20,30,40,50,60,70].map(n=>(
            <polyline key={n} points={`${n},-10 ${n},${100-n} 110,${100-n}`}/>
          ))}
        </svg>
        <svg className="absolute top-[20%] -left-[5%] w-[400px] h-[400px] opacity-[0.04] text-black"
          viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.2">
          {[20,30,40,50,60].map(n=>(
            <polyline key={n} points={`-10,${n} ${100-n},${n} ${100-n},110`}/>
          ))}
        </svg>
      </div>

      {/* ── Main layout ───────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-4 pt-24 pb-16 lg:pt-0 lg:pb-0">

        {/* LEFT: Text */}
        <div className="flex-1 w-full flex flex-col">

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6 md:mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/60 bg-white/70 shadow-sm backdrop-blur-md text-xs md:text-sm font-semibold text-neutral-800 w-fit"
          >
            <div className="flex -space-x-2">
              {[33,47,12,11].map((n,i)=>(
                <img key={n} src={`https://i.pravatar.cc/100?img=${n}`} alt=""
                  className="w-6 h-6 md:w-7 md:h-7 rounded-full border-2 border-[#EFECE6]"
                  style={{ zIndex: 40-i*10, position:"relative" }} />
              ))}
            </div>
            <span className="tracking-tight">Trusted by 50+ Visionary Brands</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1A1A1A] tracking-tighter leading-[1.05]"
          >
            Architecting <br className="hidden sm:block" />
            <FlipWords className="text-[#1A1A1A] px-0 font-bold"
              words={["Web Platforms.", "Digital Futures.", "Modern UI/UX."]} />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="mt-4 md:mt-6 font-medium text-sm md:text-base lg:text-lg text-neutral-600 max-w-md leading-relaxed"
          >
            We engineer high-performance web platforms for visionary UMKM and
            fast-scaling startups. Precision development meets sophisticated
            minimalist design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4"
          >
            <button className="px-6 md:px-8 py-3 md:py-3.5 rounded-xl bg-[#111] text-white text-sm md:text-base font-medium hover:bg-black transition-colors shadow-lg shadow-black/10">
              Start Consultation
            </button>
            <button className="px-6 md:px-8 py-3 md:py-3.5 rounded-xl bg-white/60 backdrop-blur-sm border border-black/10 text-[#111] text-sm md:text-base font-medium hover:bg-white/80 transition-colors">
              View Portfolio
            </button>
          </motion.div>
        </div>

        {/* RIGHT: MacBook 3D Mockup + Slider */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="flex-1 w-full max-w-[560px] lg:max-w-none"
        >
          <HomepageShowcaseSection />
        </motion.div>

      </div>
    </section>
  );
};
