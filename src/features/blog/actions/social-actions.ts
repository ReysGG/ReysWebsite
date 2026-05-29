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

type CommentAuthorInput = {
  name?: string | null;
  imageUrl?: string | null;
};

export async function addComment(postId: string, content: string, pathname: string, parentId?: string, author?: CommentAuthorInput) {
  const { userId, sessionClaims } = await auth();
  
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const trimmedContent = content.trim();

  if (!trimmedContent) {
    throw new Error("Content cannot be empty");
  }

  const claims = sessionClaims as {
    first_name?: string;
    last_name?: string;
    given_name?: string;
    family_name?: string;
    username?: string;
    email?: string;
    email_address?: string;
    image_url?: string;
    picture?: string;
  } | null;
  const displayName = claims
    ? [claims.first_name ?? claims.given_name, claims.last_name ?? claims.family_name].filter(Boolean).join(" ") ||
      claims.username ||
      claims.email ||
      claims.email_address ||
      author?.name?.trim() ||
      null
    : author?.name?.trim() || null;

  const comment = await db.comment.create({
    data: {
      content: trimmedContent,
      userId,
      userName: displayName,
      userImg: claims?.image_url ?? claims?.picture ?? author?.imageUrl,
      postId,
      parentId,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      userId: true,
      userName: true,
      userImg: true,
      parentId: true,
    },
  });

  revalidatePath(pathname);
  return comment;
}
