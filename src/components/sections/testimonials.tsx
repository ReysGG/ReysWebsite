"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const DUMMY_TESTIMONIALS = [
  {
    quote: "Kualitas kodenya luar biasa, performa website kami tidak pernah secepat ini. Tim yang sangat diandalkan untuk urusan digitalisasi.",
    name: "Budi Santoso",
    title: "Owner Kopi Kenangan Jaya",
    img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    quote: "Desain yang clean dan profesional membuat konversi landing page kami naik 40%. Proses kerja terstruktur dan tepat waktu.",
    name: "Rina Melati",
    title: "CEO HR-Tech Startup",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    quote: "Integrasi API yang rumit pun dapat diselesaikan dengan elegan. Mereka memahami arsitektur aplikasi lebih dari agensi pada umumnya.",
    name: "Darmawan Setiadi",
    title: "CTO Finflow ID",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    quote: "Solusi platform e-commerce yang mereka bangun sangat skalabel dan mudah dikelola. Sangat merekomendasikan tim ini untuk proyek skala besar.",
    name: "David Boy",
    title: "Founder Vibe Koding",
  },
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="w-full py-24 md:py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center justify-center mb-16 md:mb-20 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Dipercaya Oleh Inovator
          </h2>
          <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Jangan hanya percaya kata-kata kami. Dengarkan langsung dari para visioner yang telah bekerja sama dengan kami.
          </p>
        </div>
        <div className="h-[20rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={DUMMY_TESTIMONIALS}
            direction="left"
            speed="normal"
          />
        </div>
      </div>
    </section>
  );
};
