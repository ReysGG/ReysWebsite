'use server';

import db from '@/lib/db';

export async function createPost(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const content = formData.get('content') as string;
    const excerpt = formData.get('excerpt') as string;
    const metaTitle = formData.get('metaTitle') as string;
    const metaDesc = formData.get('metaDesc') as string;
    const coverImage = formData.get('coverImage') as string;
    const isPublished = formData.get('published') === 'true';

    const post = await db.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        metaTitle,
        metaDesc,
        coverImage,
        published: isPublished,
        author: 'Admin', // Static for now, can use Clerk User context later.
      },
    });

    return { success: true, slug: post.slug };
  } catch (error) {
    return { success: false, error: 'Database error while creating post' };
  }
}

export async function createDraft(formData: FormData) {
  formData.set('published', 'false');
  return createPost(formData);
}
