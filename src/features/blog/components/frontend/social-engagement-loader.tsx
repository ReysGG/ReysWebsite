'use client';

import { useEffect, useState } from 'react';
import { getPostEngagement, type PostEngagementData } from '@/features/blog/actions/engagement-actions';
import { SocialEngagement } from './social-engagement';

export function SocialEngagementLoader({ postId }: { postId: string }) {
  const [data, setData] = useState<PostEngagementData | null>(null);

  useEffect(() => {
    let cancelled = false;
    getPostEngagement(postId)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch(() => {
        if (!cancelled) setData({ comments: [], likesCount: 0, userHasLiked: false });
      });
    return () => {
      cancelled = true;
    };
  }, [postId]);

  if (!data) {
    return (
      <section className="mt-14 border-t border-neutral-200 pt-10">
        <div className="flex items-center gap-6 mb-10">
          <div className="h-12 w-12 rounded-full bg-neutral-100 animate-pulse" />
          <div className="h-12 w-12 rounded-full bg-neutral-100 animate-pulse" />
        </div>
        <div className="h-7 w-32 rounded bg-neutral-100 animate-pulse mb-6" />
        <div className="h-32 w-full rounded-lg bg-neutral-50 animate-pulse" />
      </section>
    );
  }

  return (
    <SocialEngagement
      postId={postId}
      initialLikesCount={data.likesCount}
      userHasLiked={data.userHasLiked}
      comments={data.comments}
    />
  );
}
