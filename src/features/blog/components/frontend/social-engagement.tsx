"use client";

import React, { useState, useTransition } from "react";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { Heart, MessageCircle, Send } from 'lucide-react';
import { toggleLike, addComment } from "@/features/blog/actions/social-actions";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

type CommentType = {
  id: string;
  content: string;
  createdAt: Date;
  userId: string;
  parentId: string | null;
  replies?: CommentType[];
};

export function SocialEngagement({
  postId,
  initialLikesCount,
  userHasLiked,
  comments,
}: {
  postId: string;
  initialLikesCount: number;
  userHasLiked: boolean;
  comments: CommentType[];
}) {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [optimisticLiked, setOptimisticLiked] = useState(userHasLiked);
  const [optimisticLikesCount, setOptimisticLikesCount] = useState(initialLikesCount);
  
  const [commentText, setCommentText] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const handleToggleLike = () => {
    setOptimisticLiked(!optimisticLiked);
    setOptimisticLikesCount((prev) => (optimisticLiked ? prev - 1 : prev + 1));
    
    startTransition(async () => {
      try {
        await toggleLike(postId, pathname);
      } catch {
        setOptimisticLiked(optimisticLiked);
        setOptimisticLikesCount(optimisticLiked ? optimisticLikesCount + 1 : optimisticLikesCount - 1);
      }
    });
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    startTransition(async () => {
      await addComment(postId, commentText, pathname, replyTo || undefined);
      setCommentText("");
      setReplyTo(null);
    });
  };

  // Group comments
  const rootComments = comments.filter(c => !c.parentId);
  const getReplies = (parentId: string) => comments.filter(c => c.parentId === parentId);

  return (
    <section className="mt-14 border-t border-neutral-200 pt-10">
      <div className="flex items-center gap-6 mb-10">
        {isSignedIn ? (
          <button 
            onClick={handleToggleLike}
            disabled={isPending}
            className="flex items-center gap-2 group transition-all"
          >
            <div className={cn(
              "p-3 rounded-full transition-colors flex items-center justify-center",
              optimisticLiked ? "bg-pink-50 text-pink-600" : "bg-neutral-100 text-neutral-500 group-hover:bg-neutral-950 group-hover:text-white"
            )}>
              {optimisticLiked ? <Heart size={24} /> : <Heart size={24} />}
            </div>
            {optimisticLikesCount > 0 && (
              <span className="font-mono text-lg text-neutral-900 font-bold">{optimisticLikesCount}</span>
            )}
          </button>
        ) : (
          <SignInButton mode="modal" fallbackRedirectUrl={pathname}>
            <button className="flex items-center gap-2 group transition-all">
              <div className="p-3 rounded-full bg-neutral-100 text-neutral-500 group-hover:bg-neutral-950 group-hover:text-pink-300 transition-colors flex items-center justify-center">
                <Heart size={24} />
              </div>
              {optimisticLikesCount > 0 && (
                <span className="font-mono text-lg text-neutral-900 font-bold">{optimisticLikesCount}</span>
              )}
            </button>
          </SignInButton>
        )}

        <div className="flex items-center gap-2">
          <div className="p-3 rounded-full bg-neutral-100 text-neutral-500 flex items-center justify-center">
            <MessageCircle size={24} />
          </div>
          {comments.length > 0 && (
            <span className="font-mono text-lg text-neutral-900 font-bold">{comments.length}</span>
          )}
        </div>
      </div>

      <div className="space-y-8">
        <h3 className="text-2xl font-bold tracking-tight text-neutral-950 mb-6">Komentar</h3>

        {isSignedIn ? (
          <form onSubmit={handleSubmitComment} className="flex flex-col items-end gap-3 mb-10">
            <Textarea
              placeholder="Tuliskan komentar Anda di sini..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="bg-neutral-50 border-neutral-200 min-h-[120px] text-neutral-950 focus-visible:ring-neutral-950"
            />
            {replyTo && (
              <div className="w-full flex justify-between items-center text-sm">
                <span className="text-neutral-700">Membalas komentar...</span>
                <button type="button" onClick={() => setReplyTo(null)} className="text-neutral-500 hover:text-neutral-950">Batal Balas</button>
              </div>
            )}
            <Button type="submit" disabled={isPending || !commentText.trim()} className="bg-neutral-950 hover:bg-black text-white gap-2">
              <Send size={16} />
              Kirim Komentar
            </Button>
          </form>
        ) : (
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-8 text-center mb-10">
            <MessageCircle size={32} className="mx-auto text-neutral-400 mb-4" />
            <h4 className="text-neutral-950 font-semibold mb-2">Ingin ikut berdiskusi?</h4>
            <p className="text-neutral-500 text-sm mb-6">Login untuk meninggalkan jejak di artikel ini.</p>
            <SignInButton mode="modal" fallbackRedirectUrl={pathname}>
              <Button className="bg-neutral-950 text-white hover:bg-black">Login Sekarang</Button>
            </SignInButton>
          </div>
        )}

        <div className="space-y-8">
          {rootComments.length === 0 ? (
            <p className="text-neutral-500 text-center py-8">Belum ada komentar. Jadilah yang pertama!</p>
          ) : (
            rootComments.map((comment) => (
              <div key={comment.id} className="space-y-4">
                <div className="bg-neutral-50 p-5 rounded-lg border border-neutral-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-950 flex items-center justify-center font-bold text-white text-sm">
                      {comment.userId.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-neutral-950 flex items-center gap-2">
                        User {comment.userId.substring(comment.userId.length - 4)}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: id })}
                      </div>
                    </div>
                  </div>
                  <p className="text-neutral-700 leading-relaxed text-sm whitespace-pre-wrap">
                    {comment.content}
                  </p>
                  {isSignedIn && (
                    <button 
                      onClick={() => setReplyTo(comment.id)}
                      className="mt-3 text-xs font-semibold text-neutral-500 hover:text-neutral-950 transition-colors"
                    >
                      Balas Komentar
                    </button>
                  )}
                </div>
                
                {/* Replies */}
                {getReplies(comment.id).length > 0 && (
                  <div className="pl-6 md:pl-12 space-y-4 border-l-2 border-neutral-200 ml-4">
                    {getReplies(comment.id).map(reply => (
                      <div key={reply.id} className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                        <div className="flex items-center gap-3 mb-2">
                           <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-white text-xs">
                            {reply.userId.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-xs font-medium text-neutral-950">
                               User {reply.userId.substring(reply.userId.length - 4)}
                            </div>
                            <div className="text-[10px] text-neutral-500">
                              {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true, locale: id })}
                            </div>
                          </div>
                        </div>
                        <p className="text-neutral-700 leading-relaxed text-sm whitespace-pre-wrap">
                          {reply.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
