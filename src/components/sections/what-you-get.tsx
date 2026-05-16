import React from "react";
import type { SiteConfig } from "@/lib/site-config";

export const WhatYouGetSection = ({ content }: { content: SiteConfig["whatYouGet"] }) => {
  return (
    <section className="w-full bg-[#f5f3ff] py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-indigo-600">{content.eyebrow}</p>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl lg:text-5xl">
            {content.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 md:text-lg">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {content.items.map((item) => (
            <div key={item} className="flex gap-3 rounded-lg border border-indigo-100 bg-white p-4 shadow-none">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-indigo-600 text-white">
                <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </span>
              <p className="text-sm font-medium leading-relaxed text-neutral-700">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
