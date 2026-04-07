import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full h-screen bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 flex">
      {/* Nanti kita letakkan Sidebar Admin di sini */}
      <aside className="w-64 bg-white dark:bg-black border-r border-neutral-200 dark:border-neutral-800 p-4">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
          Admin Panel
        </h2>
        <nav className="mt-8 flex flex-col gap-2">
          {/* Menu Dummy */}
          <a href="/admin" className="px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md">Dashboard</a>
          <a href="/admin/portfolio" className="px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md">Portfolio</a>
          <a href="/admin/services" className="px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md">Services</a>
          <a href="/" className="px-4 py-2 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-md mt-auto">Back to Site</a>
        </nav>
      </aside>
      
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
