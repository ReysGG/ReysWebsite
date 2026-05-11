import React from 'react';
import db from '@/lib/db';
import Link from 'next/link';
import type { Post } from '@prisma/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { IconEdit, IconTrash, IconPlus, IconArticle } from '@tabler/icons-react';

export default async function BlogAdminPage() {
  let databaseError = false;
  let posts: Post[] = [];

  try {
    posts = await db.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    databaseError = true;
  }

  return (
    <div className="space-y-8">
      {databaseError && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-800">
          Database sedang tidak bisa diakses. Data blog ditampilkan kosong sampai koneksi diperbaiki.
        </div>
      )}

      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 md:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">Content</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Daftar Blog</h1>
            <p className="text-neutral-500 mt-2">Kelola artikel blog untuk dipublikasikan di website.</p>
          </div>
          <Link href="/admin/blog/create">
            <Button className="gap-2 bg-neutral-950 text-white hover:bg-black dark:bg-white dark:text-neutral-950">
              <IconPlus size={16} />
              Tulis Artikel Baru
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <IconArticle className="mb-4 h-5 w-5 text-neutral-500" />
          <p className="text-3xl font-bold">{posts.length}</p>
          <p className="mt-1 text-sm text-neutral-500">Total artikel</p>
        </div>
        <div>
          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <p className="text-3xl font-bold">{posts.filter((post) => post.published).length}</p>
            <p className="mt-1 text-sm text-neutral-500">Published</p>
          </div>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-3xl font-bold">{posts.filter((post) => !post.published).length}</p>
          <p className="mt-1 text-sm text-neutral-500">Draft</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50 dark:bg-neutral-950">
              <TableHead>Judul Artikel</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tanggal Dibuat</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-neutral-500">
                  Belum ada artikel blog.
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id} className="hover:bg-neutral-50/80 dark:hover:bg-neutral-950">
                  <TableCell className="max-w-[280px] font-medium text-neutral-900 dark:text-neutral-100">
                    <div className="truncate">{post.title}</div>
                    <div className="mt-1 text-xs font-normal text-neutral-500">{post.author || "Admin"}</div>
                  </TableCell>
                  <TableCell className="max-w-[220px] truncate text-neutral-500">{post.slug}</TableCell>
                  <TableCell>
                    {post.published ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-semibold">
                        Published
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full text-xs font-semibold">
                        Draft
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-neutral-500">
                    {new Date(post.createdAt).toLocaleDateString('id-ID')}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="icon" title="Edit">
                      <IconEdit size={16} />
                    </Button>
                    <Button variant="destructive" size="icon" title="Hapus">
                      <IconTrash size={16} />
                    </Button>
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
