"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

const PORTFOLIO_DATA = [
  {
    category: "E-Commerce",
    title: "Premium Fashion Retail",
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjRzYWRmc2Fmc2Rmc2FmZHNhZmRzZmRzZnNmZHNmc2Rm/giphy.gif", // placeholder
    content: (
      <div className="text-neutral-600 dark:text-neutral-400">
        <p className="mb-4">
          Platform e-commerce high-end dengan integrasi pembayaran multi-channel, 
          manajemen inventori otomatis, dan desain yang mengutamakan visual produk resolusi tinggi.
        </p>
        <div className="flex gap-2 mt-4 text-xs font-semibold">
          <span className="px-3 py-1 bg-neutral-200 dark:bg-neutral-800 rounded-full">Next.js</span>
          <span className="px-3 py-1 bg-neutral-200 dark:bg-neutral-800 rounded-full">Stripe</span>
        </div>
      </div>
    ),
  },
  {
    category: "Web Application",
    title: "Sistem Kasir & Inventory",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjRzYWRmc2Fmc2Rmc2FmZHNhZmRzZmRzZnNmZHNmc2Rm/giphy.gif", // placeholder
    content: (
      <div className="text-neutral-600 dark:text-neutral-400">
        <p className="mb-4">
          Sistem Point of Sales responsif dengan dashboard monitoring stok secara real-time. 
          Dirancang khusus untuk operasional F&B dengan tingkat transaksi tinggi.
        </p>
        <div className="flex gap-2 mt-4 text-xs font-semibold">
          <span className="px-3 py-1 bg-neutral-200 dark:bg-neutral-800 rounded-full">React</span>
          <span className="px-3 py-1 bg-neutral-200 dark:bg-neutral-800 rounded-full">Node.js</span>
        </div>
      </div>
    ),
  },
  {
    category: "Company Profile",
    title: "Konsultan Arsitektur",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjRzYWRmc2Fmc2Rmc2FmZHNhZmRzZmRzZnNmZHNmc2Rm/giphy.gif", // placeholder
    content: (
      <div className="text-neutral-600 dark:text-neutral-400">
        <p className="mb-4">
          Website representasi profesional dengan animasi 3D interaktif untuk menampilkan portofolio bangunan dan proyek arsitektur mewah.
        </p>
        <div className="flex gap-2 mt-4 text-xs font-semibold">
          <span className="px-3 py-1 bg-neutral-200 dark:bg-neutral-800 rounded-full">Three.js</span>
          <span className="px-3 py-1 bg-neutral-200 dark:bg-neutral-800 rounded-full">Tailwind</span>
        </div>
      </div>
    ),
  },
  {
    category: "Landing Page",
    title: "Startup Digital",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjRzYWRmc2Fmc2Rmc2FmZHNhZmRzZmRzZnNmZHNmc2Rm/giphy.gif", // placeholder
    content: (
      <div className="text-neutral-600 dark:text-neutral-400">
        <p className="mb-4">
          Landing page dengan konversi tinggi, dilengkapi copywriting SEO-friendly dan A/B testing backend untuk startup teknologi AI.
        </p>
        <div className="flex gap-2 mt-4 text-xs font-semibold">
          <span className="px-3 py-1 bg-neutral-200 dark:bg-neutral-800 rounded-full">Next.js</span>
          <span className="px-3 py-1 bg-neutral-200 dark:bg-neutral-800 rounded-full">Framer</span>
        </div>
      </div>
    ),
  },
];

export const PortfolioSection = () => {
  const cards = PORTFOLIO_DATA.map((card, index) => (
    <Card key={card.title} card={card} index={index} />
  ));

  return (
    <section id="portfolio" className="w-full py-24 md:py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
        <div className="flex flex-col mb-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Karya Terbaik Kami
          </h2>
          <p className="text-base md:text-lg text-neutral-400 max-w-2xl leading-relaxed">
            Eksplorasi mahakarya digital yang telah kami kembangkan untuk membedakan klien di industrinya.
          </p>
        </div>
      </div>
      
      <div className="w-full">
        <Carousel items={cards} />
      </div>
    </section>
  );
};
