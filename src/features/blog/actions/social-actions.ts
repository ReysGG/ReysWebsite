"use server";

import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function toggleLike(postId: string, pathname: string) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const existingLike = await db.like.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });

  if (existingLike) {
    await db.like.delete({
      where: {
        id: existingLike.id,
      },
    });
  } else {
    await db.like.create({
      data: {
        userId,
        postId,
      },
    });
  }

  revalidatePath(pathname);
}

export async function addComment(postId: string, content: string, pathname: string, parentId?: string) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!content.trim()) {
    throw new Error("Content cannot be empty");
  }

  await db.comment.create({
    data: {
      content,
      userId,
      postId,
      parentId,
    },
  });

  revalidatePath(pathname);
}
