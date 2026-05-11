import React from "react";
import { IconEdit, IconExternalLink, IconPlus, IconTrash } from "@tabler/icons-react";

const DUMMY_PORTFOLIO = [
  { id: 1, title: "Premium Fashion Retail", category: "E-Commerce", status: "Published" },
  { id: 2, title: "Sistem Kasir & Inventory", category: "Web Application", status: "Published" },
  { id: 3, title: "Konsultan Arsitektur", category: "Company Profile", status: "Draft" },
  { id: 4, title: "Startup Digital", category: "Landing Page", status: "Published" },
];

export default function ManagePortfolioPage() {
  const publishedCount = DUMMY_PORTFOLIO.filter((item) => item.status === "Published").length;

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 md:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">Portfolio</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight">Manage Portfolio</h1>
            <p className="mt-2 max-w-2xl text-neutral-500">
              Kurasi project yang tampil di showcase halaman utama.
            </p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-md bg-neutral-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-black dark:bg-white dark:text-neutral-950">
            <IconPlus size={16} />
            Add Project
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-3xl font-bold">{DUMMY_PORTFOLIO.length}</p>
          <p className="mt-1 text-sm text-neutral-500">Total project</p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-3xl font-bold">{publishedCount}</p>
          <p className="mt-1 text-sm text-neutral-500">Published</p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-3xl font-bold">{DUMMY_PORTFOLIO.length - publishedCount}</p>
          <p className="mt-1 text-sm text-neutral-500">Draft</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
            <tr>
              <th className="px-6 py-4 font-semibold text-neutral-500">Project</th>
              <th className="px-6 py-4 font-semibold text-neutral-500">Category</th>
              <th className="px-6 py-4 font-semibold text-neutral-500">Status</th>
              <th className="px-6 py-4 font-semibold text-neutral-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {DUMMY_PORTFOLIO.map((item) => (
              <tr key={item.id} className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-950">
                <td className="px-6 py-4">
                  <div className="font-semibold">{item.title}</div>
                  <div className="mt-1 text-xs text-neutral-500">Project #{String(item.id).padStart(2, "0")}</div>
                </td>
                <td className="px-6 py-4 text-neutral-500">{item.category}</td>
                <td className="px-6 py-4">
                  <span
                    className={
                      item.status === "Published"
                        ? "rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-400"
                        : "rounded-full border border-neutral-200 bg-neutral-100 px-2.5 py-1 text-xs font-semibold text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400"
                    }
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800" title="Preview">
                      <IconExternalLink size={16} />
                    </button>
                    <button className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800" title="Edit">
                      <IconEdit size={16} />
                    </button>
                    <button className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-red-600 text-white transition-colors hover:bg-red-700" title="Delete">
                      <IconTrash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
