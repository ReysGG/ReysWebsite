'use server';

import db from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export type PostEngagementData = {
  likesCount: number;
  userHasLiked: boolean;
  comments: Array<{
    id: string;
    content: string;
    createdAt: Date;
    userId: string;
    parentId: string | null;
  }>;
};

export async function getPostEngagement(postId: string): Promise<PostEngagementData> {
  const { userId } = await auth();
  const [comments, likesCount, userHasLiked] = await Promise.all([
    db.comment
      .findMany({
        where: { postId },
        orderBy: { createdAt: 'desc' },
        take: 50,
        select: { id: true, content: true, createdAt: true, userId: true, parentId: true },
      })
      .catch(() => []),
    db.like.count({ where: { postId } }).catch(() => 0),
    userId
      ? db.like
          .findFirst({ where: { postId, userId } })
          .then((r) => !!r)
          .catch(() => false)
      : Promise.resolve(false),
  ]);
  return { comments, likesCount, userHasLiked };
}
