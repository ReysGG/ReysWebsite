'use server';
import db from '@/lib/db';

export async function incrementPostViews(id: string) {
  try {
    await db.post.update({ where: { id }, data: { views: { increment: 1 } } });
  } catch { /* silent */ }
}
