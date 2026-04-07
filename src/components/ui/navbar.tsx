"use client";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, MonitorSmartphone } from "lucide-react";

export const Navbar = () => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [isTop, setIsTop] = useState(true);
  const { theme, setTheme } = useTheme();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > 50) {
      setIsTop(false);
      if (latest > previous && previous > 150) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    } else {
      setIsTop(true);
      setVisible(true);
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 transition-colors duration-300",
        !isTop ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="flex items-center gap-2">
        <MonitorSmartphone className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        <span className="text-xl font-bold dark:text-white text-black">WebServices</span>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <Link href="#services" className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Layanan</Link>
        <Link href="#portfolio" className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Portofolio</Link>
        <Link href="#testimonials" className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Testimoni</Link>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <Link 
          href="/admin" 
          className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Admin
        </Link>
      </div>
    </motion.div>
  );
};
