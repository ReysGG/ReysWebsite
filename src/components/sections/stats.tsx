"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const STATS: StatItem[] = [
  {
    value: 50,
    suffix: "+",
    label: "Proyek Selesai",
    description: "Startup hingga korporat",
  },
  {
    value: 98,
    suffix: "%",
    label: "Klien Puas",
    description: "Berdasarkan feedback langsung",
  },
  {
    value: 3,
    suffix: "+",
    label: "Tahun Pengalaman",
    description: "Web & software development",
  },
  {
    value: 100,
    suffix: "%",
    label: "On-Time Delivery",
    description: "Tidak ada proyek terlambat",
  },
];

const CountUp = ({
  target,
  suffix,
  inView,
}: {
  target: number;
  suffix: string;
  inView: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

export const StatsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative w-full py-16 overflow-hidden bg-white"
    >
      <div className="w-full border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-neutral-200 py-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center px-6 py-4 md:px-10 first:pl-0 last:pr-0"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-2">
                <CountUp target={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <div className="text-sm font-semibold text-neutral-900 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-neutral-600 leading-relaxed">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};
