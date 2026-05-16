import React from "react";
import type { SiteConfig } from "@/lib/site-config";

const COLUMN_CLASSES: Record<number, string> = {
  1: "md:grid-cols-1 lg:grid-cols-1",
  2: "md:grid-cols-2 lg:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};

export const ProblemSection = ({ content }: { content: SiteConfig["problems"] }) => {
  const count = content.items.length;
  const columnClass = COLUMN_CLASSES[count] ?? "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-indigo-600">{content.eyebrow}</p>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl lg:text-5xl">
            {content.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 md:text-lg">
            {content.description}
          </p>
        </div>

        <div className={`grid grid-cols-1 gap-5 ${columnClass}`}>
          {content.items.map((problem, index) => (
            <div key={problem.title} className="rounded-lg border border-neutral-200 bg-neutral-50 p-6 shadow-none">
              <span className="mb-5 flex h-9 w-9 items-center justify-center rounded-md bg-white text-sm font-bold text-indigo-600 ring-1 ring-indigo-100">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-bold text-neutral-950">{problem.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
