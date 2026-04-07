"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  gifUrl: string; // The URL to the GIF that plays on hover
  link?: string;
};

export const PortfolioCard = ({ item }: { item: PortfolioItem }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-72 md:h-96 w-full rounded-2xl overflow-hidden cursor-pointer"
    >
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          isHovered ? "opacity-0" : "opacity-100"
        )}
      >
        <img
          src={item.imageUrl}
          alt={item.title}
          className="object-cover w-full h-full"
        />
      </div>

      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      >
        {item.gifUrl ? (
          <img
            src={item.gifUrl}
            alt={`${item.title} animated preview`}
            className="object-cover w-full h-full"
          />
        ) : null}
      </div>

      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
          <p className="text-neutral-200 text-sm">{item.description}</p>
        </motion.div>
      </div>
    </div>
  );
};

export const PortfolioGrid = ({ items }: { items: PortfolioItem[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 md:px-8 py-10">
      {items.map((item) => (
        <PortfolioCard key={item.id} item={item} />
      ))}
    </div>
  );
};
