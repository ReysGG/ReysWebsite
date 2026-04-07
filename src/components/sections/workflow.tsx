"use client";
import React from "react";
import { FlipWords } from "@/components/ui/flip-words";

const steps = [
  {
    step: "01",
    title: "Discovery",
    description: "Analisis mendalam mengenai kebutuhan, target audiens, dan tujuan bisnis esensial Anda.",
  },
  {
    step: "02",
    title: "Strategy",
    description: "Pembuatan arsitektur informasi, wireframe, dan perencanaan teknis yang sangat presisi.",
  },
  {
    step: "03",
    title: "Execution",
    description: "Pengembangan visual dan kode interaktif dengan performa super tinggi dan aman.",
  },
  {
    step: "04",
    title: "Delivery",
    description: "Pengujian ekstensif, peluncuran mulus, dan serah terima aset digital secara utuh.",
  },
];

export const WorkflowSection = () => {
  return (
    <section className="w-full py-24 md:py-32 bg-black relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="flex flex-col items-center text-center mb-16 md:mb-20 relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Dari Ide ke <FlipWords words={["Realisasi", "Kenyataan", "Kesuksesan", "Laba"]} className="text-indigo-400 font-extrabold" />
          </h2>
          <p className="text-base md:text-lg text-neutral-400 max-w-2xl leading-relaxed">
            Metodologi transparan dan terukur untuk menjamin keberhasilan setiap produk digital.
          </p>
        </div>

        {/* Timeline representation - Glossy Grid Hybrid */}
        <div className="relative mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 max-w-5xl mx-auto z-10">
          {/* Horizontal connecting line - Desktop */}
          <div className="hidden lg:block absolute top-[40px] left-[12%] w-[76%] h-[1px] bg-linear-to-r from-transparent via-indigo-500/30 to-transparent z-0" />
          
          {steps.map((item, idx) => (
            <div key={idx} className="relative group flex flex-col items-center lg:items-start text-center lg:text-left z-10">
              
              {/* Glossy Node */}
              <div className="w-20 h-20 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl flex items-center justify-center mb-8 relative shadow-[0_0_30px_rgba(99,102,241,0.0)] group-hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] group-hover:bg-white/[0.05] group-hover:border-indigo-500/30 transition-all duration-500 ease-out z-10">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-b from-white to-neutral-500 group-hover:to-indigo-300 transition-colors duration-500">
                  {item.step}
                </span>
                {/* Glow behind node */}
                <div className="absolute inset-0 rounded-2xl bg-indigo-500/0 group-hover:bg-indigo-500/20 blur-xl transition-colors duration-500 -z-10" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-indigo-300 transition-colors duration-500">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-[250px] mx-auto lg:mx-0">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
