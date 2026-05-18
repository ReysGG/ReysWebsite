"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import type { SiteConfig } from "@/lib/site-config";

interface FAQItem {
  question: string;
  answer: string;
}

const FALLBACK_FAQ_DATA: FAQItem[] = [
  {
    question: "Berapa lama waktu pembuatan website?",
    answer: "Untuk Company Profile berkisar 1-2 minggu. Web App kustom atau E-Commerce membutuhkan waktu 3-6 minggu tergantung kompleksitas fitur.",
  },
  {
    question: "Apakah website sudah termasuk hosting dan domain?",
    answer: "Bisa termasuk setup domain dan hosting, atau memakai akun hosting/domain milik bisnis kamu sendiri. Detailnya dikunci di scope.",
  },
];

type FaqContent = SiteConfig["faq"];

export const FaqSection = ({ content }: { content: FaqContent }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqItems = content.items.length ? content.items : FALLBACK_FAQ_DATA;

  return (
    <section id="faq" className="w-full border-y border-slate-200 bg-[#f7f9fb] py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-blue-600">
            {content.eyebrow}
          </p>
          <h2 className="text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
            {content.heading}
          </h2>
        </div>

        <div className="lg:col-span-8">
          {faqItems.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`border-b border-slate-200 ${index === 0 ? "border-t" : ""}`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center gap-5 py-6 text-left"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-blue-600">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                  <span className="text-lg font-bold leading-snug text-slate-950">{faq.question}</span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pl-14 text-base leading-relaxed text-slate-600">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
