import React from "react";

const DUMMY_PORTFOLIO = [
  { id: 1, title: "Premium Fashion Retail", category: "E-Commerce", status: "Published" },
  { id: 2, title: "Sistem Kasir & Inventory", category: "Web Application", status: "Published" },
  { id: 3, title: "Konsultan Arsitektur", category: "Company Profile", status: "Draft" },
  { id: 4, title: "Startup Digital", category: "Landing Page", status: "Published" },
];

export default function ManagePortfolioPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center border-b border-neutral-200 dark:border-neutral-800 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Portfolio</h1>
          <p className="text-neutral-500 mt-2">Manage your showcased projects.</p>
        </div>
        <button className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-medium rounded-md hover:opacity-80 transition-opacity">
          Add Project
        </button>
      </div>

      <div className="bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
            <tr>
              <th className="px-6 py-4 font-medium text-neutral-500">Project Title</th>
              <th className="px-6 py-4 font-medium text-neutral-500">Category</th>
              <th className="px-6 py-4 font-medium text-neutral-500">Status</th>
              <th className="px-6 py-4 font-medium text-neutral-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {DUMMY_PORTFOLIO.map((item) => (
              <tr key={item.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
                <td className="px-6 py-4 font-medium">{item.title}</td>
                <td className="px-6 py-4 text-neutral-500">{item.category}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-xs rounded-full border ${item.status === "Published" ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20' : 'bg-neutral-100 text-neutral-600 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:underline mr-4">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
