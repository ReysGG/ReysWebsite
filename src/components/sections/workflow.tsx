"use client";
import React from "react";
import { motion } from "framer-motion";
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
    <section className="w-full py-24 md:py-32 relative overflow-hidden bg-white">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-neutral-100 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center mb-16 md:mb-20 relative z-10"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-6">
            Dari Ide ke <FlipWords words={["Realisasi", "Kenyataan", "Kesuksesan", "Laba"]} className="text-neutral-600 font-extrabold" />
          </h2>
          <p className="text-base md:text-lg text-neutral-600 max-w-2xl leading-relaxed">
            Metodologi transparan dan terukur untuk menjamin keberhasilan setiap produk digital.
          </p>
        </motion.div>

        {/* Timeline representation */}
        <div className="relative mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 max-w-5xl mx-auto z-10">
          {/* Horizontal connecting line - Desktop */}
          <div className="hidden lg:block absolute top-[40px] left-[12%] w-[76%] h-[1px] bg-neutral-200 z-0" />
          
          {steps.map((item, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative group flex flex-col items-center lg:items-start text-center lg:text-left z-10"
            >
              
              {/* Node */}
              <div className="w-20 h-20 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center mb-8 relative shadow-sm group-hover:shadow-md group-hover:border-neutral-400 transition-all duration-500 ease-out z-10">
                <span className="text-2xl font-bold text-neutral-900 transition-colors duration-500">
                  {item.step}
                </span>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-neutral-900 mb-3 transition-colors duration-500">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed max-w-[250px] mx-auto lg:mx-0">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
