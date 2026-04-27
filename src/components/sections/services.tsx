"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layout, Server, ShoppingBag, LineChart } from "lucide-react";

const SERVICES_CONTENT = [
  {
    number: "01",
    title: "Company Profile Profesional",
    description:
      "Bangun kredibilitas pelanggan dengan desain website modern, elegan, dan responsif. Dirancang untuk menonjolkan nilai bisnis Anda.",
    icon: <Layout className="w-5 h-5 text-cyan-400" />,
    iconBg: "bg-cyan-400/8 border-cyan-400/15",
  },
  {
    number: "02",
    title: "Sistem Kustom & Web App",
    description:
      "Sederhanakan proses bisnis dengan aplikasi web kustom. POS, Inventory, hingga CRM dengan arsitektur yang scalable.",
    icon: <Server className="w-5 h-5 text-indigo-400" />,
    iconBg: "bg-indigo-400/8 border-indigo-400/15",
  },
  {
    number: "03",
    title: "E-Commerce Integrasi Penuh",
    description:
      "Platform e-commerce cepat terintegrasi langsung dengan payment gateway lokal (GoPay, VA) dan layanan ekspedisi otomatis.",
    icon: <ShoppingBag className="w-5 h-5 text-rose-400" />,
    iconBg: "bg-rose-400/8 border-rose-400/15",
  },
  {
    number: "04",
    title: "Technical SEO & Performa",
    description:
      "Kode yang sangat teroptimasi untuk mesin pencari. Dapatkan peringkat Google lebih baik dengan loading super cepat.",
    icon: <LineChart className="w-5 h-5 text-emerald-400" />,
    iconBg: "bg-emerald-400/8 border-emerald-400/15",
  },
];

export const ServicesSection = () => {
  return (
    <section
      id="services"
      className="w-full py-24 md:py-32 relative overflow-hidden"
    >
      {/* Top/Bottom fade blend */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
      {/* Background flare */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Infrastruktur Teknis
          </h2>
          <p className="text-base md:text-lg text-neutral-400 max-w-2xl leading-relaxed">
            Layanan teknologikal ujung-ke-ujung yang dirancang untuk skala, keamanan, dan performa nyata.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICES_CONTENT.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col p-8 rounded-2xl bg-[#0a0a0a] border border-neutral-900 hover:border-neutral-800 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden cursor-pointer"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.06] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Top row: icon + number */}
              <div className="relative z-10 flex items-start justify-between mb-8">
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${service.iconBg}`}
                >
                  {service.icon}
                </div>
                <span className="text-xs font-semibold text-neutral-700 tracking-wide">
                  {service.number}
                </span>
              </div>

              {/* Body */}
              <div className="relative z-10 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-neutral-200 tracking-tight leading-snug mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed flex-1 mb-6">
                  {service.description}
                </p>
                <button className="inline-flex items-center gap-1.5 text-[13px] font-medium text-neutral-600 group-hover:text-neutral-400 transition-colors duration-200 w-fit">
                  Selengkapnya
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};