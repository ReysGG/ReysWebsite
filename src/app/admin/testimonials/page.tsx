import React from "react";
import Link from "next/link";

const DUMMY_TESTIMONIALS = [
  { id: 1, name: "Budi Santoso", role: "CEO TechCorp", snippet: "Website yang luar biasa cepat..." },
  { id: 2, name: "Siti Aminah", role: "Founder LocalBrand", snippet: "Penjualan meningkat 200% berkat..." },
];

export default function ManageTestimonialsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center border-b border-neutral-200 dark:border-neutral-800 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
          <p className="text-neutral-500 mt-2">Manage client reviews and feedback.</p>
        </div>
        <Link 
          href="/admin/testimonials/add" 
          className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-medium rounded-md hover:opacity-80 transition-opacity"
        >
          Add Testimonial
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DUMMY_TESTIMONIALS.map((item) => (
          <div key={item.id} className="p-6 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-800 rounded-full flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-neutral-500">{item.role}</p>
                </div>
              </div>
              <p className="text-sm italic text-neutral-600 dark:text-neutral-400">"{item.snippet}"</p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-end gap-3 text-sm font-medium">
              <button className="text-blue-600 hover:underline">Edit</button>
              <button className="text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
