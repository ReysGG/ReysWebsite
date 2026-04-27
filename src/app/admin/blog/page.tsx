import React from 'react';
import db from '@/lib/db';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { IconEdit, IconTrash, IconPlus } from '@tabler/icons-react';

export default async function BlogAdminPage() {
  const posts = await db.post.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Daftar Blog</h1>
          <p className="text-neutral-500 mt-2">Kelola artikel blog untuk dipublikasikan di website.</p>
        </div>
        <Link href="/admin/blog/create">
          <Button className="gap-2">
            <IconPlus size={16} />
            Tulis Artikel Baru
          </Button>
        </Link>
      </div>

      <div className="rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <Table>
          <TableHeader>
            <TableRow>
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
                <TableRow key={post.id}>
                  <TableCell className="font-medium text-neutral-900 dark:text-neutral-100">{post.title}</TableCell>
                  <TableCell className="text-neutral-500">{post.slug}</TableCell>
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
