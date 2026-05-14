import React from "react";
import db from "@/lib/db";
import Link from "next/link";
import type { Post } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconEdit, IconTrash, IconPlus, IconArticle } from "@tabler/icons-react";

export default async function BlogAdminPage() {
  let databaseError = false;
  let posts: Post[] = [];

  try {
    posts = await db.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    databaseError = true;
  }

  const publishedCount = posts.filter((p) => p.published).length;
  const draftCount = posts.filter((p) => !p.published).length;

  return (
    <div className="space-y-6">
      {databaseError && (
        <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
          Database tidak bisa diakses. Data blog ditampilkan kosong.
        </div>
      )}

      {/* Header */}
      <div className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
              Content
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">
              Daftar Blog
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Kelola artikel blog untuk dipublikasikan di website.
            </p>
          </div>
          <Link
            href="/admin/blog/create"
            className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 shrink-0"
          >
            <IconPlus size={16} />
            Tulis Artikel Baru
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Artikel", value: posts.length, icon: IconArticle },
          { label: "Published", value: publishedCount, icon: IconArticle },
          { label: "Draft", value: draftCount, icon: IconArticle },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-md border border-neutral-200 bg-white p-5 shadow-none">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-neutral-500">{s.label}</p>
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-50">
                  <Icon className="h-3.5 w-3.5 text-indigo-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-neutral-900">{s.value}</p>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-md border border-neutral-200 bg-white shadow-none">
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50 hover:bg-neutral-50">
              <TableHead className="text-xs font-semibold text-neutral-500">Judul Artikel</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-500">Slug</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-500">Status</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-500">Tanggal</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-500 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-indigo-50 mb-3">
                      <IconArticle className="h-5 w-5 text-indigo-600" />
                    </div>
                    <p className="text-sm font-semibold text-neutral-700">Belum ada artikel</p>
                    <p className="mt-1 text-xs text-neutral-400">Mulai tulis artikel pertama kamu.</p>
                    <Link
                      href="/admin/blog/create"
                      className="mt-4 inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors"
                    >
                      <IconPlus size={13} /> Tulis Sekarang
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id} className="hover:bg-neutral-50">
                  <TableCell className="max-w-[280px]">
                    <div className="truncate font-semibold text-neutral-900">{post.title}</div>
                    <div className="mt-0.5 text-xs text-neutral-400">{post.author || "Admin"}</div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-xs text-neutral-400">
                    {post.slug}
                  </TableCell>
                  <TableCell>
                    {post.published ? (
                      <span className="rounded-md border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                        Published
                      </span>
                    ) : (
                      <span className="rounded-md border border-neutral-200 bg-neutral-100 px-2.5 py-1 text-xs font-semibold text-neutral-500">
                        Draft
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-xs text-neutral-400">
                    {new Date(post.createdAt).toLocaleDateString("id-ID")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-900" title="Edit">
                        <IconEdit size={14} />
                      </button>
                      <button className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-red-50 border border-red-200 text-red-500 transition-colors hover:bg-red-100" title="Hapus">
                        <IconTrash size={14} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
