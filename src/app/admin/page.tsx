import React from "react";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Summary</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 p-6 rounded-xl shadow-sm">
          <h3 className="text-neutral-500 text-sm font-medium">Total Portfolio</h3>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>
        <div className="bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 p-6 rounded-xl shadow-sm">
          <h3 className="text-neutral-500 text-sm font-medium">Total Services</h3>
          <p className="text-3xl font-bold mt-2">4</p>
        </div>
        <div className="bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 p-6 rounded-xl shadow-sm">
          <h3 className="text-neutral-500 text-sm font-medium">Total Testimonials</h3>
          <p className="text-3xl font-bold mt-2">8</p>
        </div>
      </div>

      <div className="bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Mulai Kelola Konten</h2>
        <p className="text-neutral-500 mb-6">
          Gunakan menu di samping untuk menambahkan, mengedit, atau menghapus data yang akan ditampilkan di landing page.
        </p>
        
        {/* Tombol aksi dummy */}
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-indigo-500 text-white rounded-md font-medium hover:bg-indigo-600 transition-colors">
            Tambah Portfolio
          </button>
          <button className="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-md font-medium hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors">
            Setup Database
          </button>
        </div>
      </div>
    </div>
  );
}
