"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "Berapa lama waktu pembuatan website?",
    answer: "Untuk Company Profile berkisar 1-2 minggu. Sedangkan untuk Web App kustom atau E-Commerce membutuhkan waktu 3-6 minggu tergantung tingkat kompleksitas fitur."
  },
  {
    question: "Apakah website sudah termasuk hosting dan domain?",
    answer: "Ya, semua paket utama kami sudah termasuk gratis domain (.com / .id) dan SSD Cloud Hosting selama 1 tahun pertama."
  },
  {
    question: "Apakah saya bisa mengubah konten website sendiri nantinya?",
    answer: "Tentu. Anda akan mendapatkan akses ke Dasbor Admin modern di mana Anda bisa menambah, mengedit, atau menghapus layanan dan portofolio dengan sangat mudah."
  },
  {
    question: "Apakah ada biaya maintenance tahunan?",
    answer: "Ya, mulai dari tahun kedua akan ada biaya perpanjangan domain, hosting, dan layanan maintenance keamanan (opsional) yang sangat terjangkau."
  },
  {
    question: "Apakah website ini sudah SEO friendly?",
    answer: "Sangat friendly! Kami menerapkan technical SEO terbaik di industri (Next.js SSR/SSG), struktur heading yang benar, dan meta tags untuk menjamin performa Google yang optimal."
  }
];

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 lg:gap-24">
        
        {/* Left Side: Title */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/3 flex flex-col"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-tight mb-6">
            Frequently <br className="hidden md:block" /> asked <br className="hidden md:block" /> questions
          </h2>
        </motion.div>

        {/* Right Side: Accordion */}
        <div className="w-full md:w-7/12 lg:w-2/3 flex flex-col">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`flex flex-col border-b border-neutral-200 py-6 cursor-pointer group ${index === 0 ? 'border-t' : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex items-center gap-6">
                  <div className="text-indigo-600 shrink-0">
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5 group-hover:scale-125 transition-transform" />}
                  </div>
                  <h3 className="text-lg md:text-xl font-medium text-neutral-800 group-hover:text-black transition-colors">
                    {faq.question}
                  </h3>
                </div>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pl-11 pt-4 text-neutral-600 text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
