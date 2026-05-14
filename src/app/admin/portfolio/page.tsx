import React from "react";
import { IconEdit, IconExternalLink, IconPlus, IconTrash } from "@tabler/icons-react";

const DUMMY_PORTFOLIO = [
  { id: 1, title: "Premium Fashion Retail", category: "E-Commerce", status: "Published" },
  { id: 2, title: "Sistem Kasir & Inventory", category: "Web Application", status: "Published" },
  { id: 3, title: "Konsultan Arsitektur", category: "Company Profile", status: "Draft" },
  { id: 4, title: "Startup Digital", category: "Landing Page", status: "Published" },
];

export default function ManagePortfolioPage() {
  const publishedCount = DUMMY_PORTFOLIO.filter((i) => i.status === "Published").length;
  const draftCount = DUMMY_PORTFOLIO.length - publishedCount;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
              Portfolio
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">
              Manage Portfolio
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Kurasi project yang tampil di showcase halaman utama.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 shrink-0">
            <IconPlus size={16} />
            Tambah Project
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Project", value: DUMMY_PORTFOLIO.length },
          { label: "Published", value: publishedCount },
          { label: "Draft", value: draftCount },
        ].map((s) => (
          <div key={s.label} className="rounded-md border border-neutral-200 bg-white p-5 shadow-none">
            <p className="text-2xl font-bold text-neutral-900">{s.value}</p>
            <p className="mt-1 text-xs text-neutral-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-md border border-neutral-200 bg-white shadow-none">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50">
            <tr>
              <th className="px-6 py-3.5 text-xs font-semibold text-neutral-500">Project</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-neutral-500">Kategori</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-neutral-500">Status</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-neutral-500 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {DUMMY_PORTFOLIO.map((item) => (
              <tr key={item.id} className="transition-colors hover:bg-neutral-50">
                <td className="px-6 py-4">
                  <div className="font-semibold text-neutral-900">{item.title}</div>
                  <div className="mt-0.5 text-xs text-neutral-400">
                    #{String(item.id).padStart(2, "0")}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-neutral-500">{item.category}</td>
                <td className="px-6 py-4">
                  <span
                    className={
                      item.status === "Published"
                        ? "rounded-md border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700"
                        : "rounded-md border border-neutral-200 bg-neutral-100 px-2.5 py-1 text-xs font-semibold text-neutral-500"
                    }
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-900" title="Preview">
                      <IconExternalLink size={14} />
                    </button>
                    <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-900" title="Edit">
                      <IconEdit size={14} />
                    </button>
                    <button className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-red-50 border border-red-200 text-red-500 transition-colors hover:bg-red-100" title="Hapus">
                      <IconTrash size={14} />
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
