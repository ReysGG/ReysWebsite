"use client";

import React, { useState, useTransition } from "react";
import { useAuth, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { IconHeart, IconHeartFilled, IconMessageCircle, IconSend } from "@tabler/icons-react";
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
  const { userId } = useAuth();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [optimisticLiked, setOptimisticLiked] = useState(userHasLiked);
  const [optimisticLikesCount, setOptimisticLikesCount] = useState(initialLikesCount);
  
  const [commentText, setCommentText] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const handleToggleLike = () => {
    // Optimistic UI update
    setOptimisticLiked(!optimisticLiked);
    setOptimisticLikesCount((prev) => (optimisticLiked ? prev - 1 : prev + 1));
    
    startTransition(async () => {
      try {
        await toggleLike(postId, pathname);
      } catch (e) {
        // Revert on failure
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
    <div className="mt-16 pt-8 border-t border-neutral-800">
      <div className="flex items-center gap-6 mb-12">
        <SignedIn>
          <button 
            onClick={handleToggleLike}
            disabled={isPending}
            className="flex items-center gap-2 group transition-all"
          >
            <div className={cn(
              "p-3 rounded-full transition-colors flex items-center justify-center",
              optimisticLiked ? "bg-pink-500/10 text-pink-500" : "bg-neutral-900 text-neutral-400 group-hover:bg-neutral-800 group-hover:text-neutral-300"
            )}>
              {optimisticLiked ? <IconHeartFilled size={24} /> : <IconHeart size={24} />}
            </div>
            <span className="font-mono text-lg text-neutral-300 font-bold">{optimisticLikesCount}</span>
          </button>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal" fallbackRedirectUrl={pathname}>
            <button className="flex items-center gap-2 group transition-all">
              <div className="p-3 rounded-full bg-neutral-900 text-neutral-400 group-hover:bg-neutral-800 group-hover:text-pink-400 transition-colors flex items-center justify-center">
                <IconHeart size={24} />
              </div>
              <span className="font-mono text-lg text-neutral-300 font-bold">{optimisticLikesCount}</span>
            </button>
          </SignInButton>
        </SignedOut>

        <div className="flex items-center gap-2">
          <div className="p-3 rounded-full bg-neutral-900 text-neutral-400 flex items-center justify-center">
            <IconMessageCircle size={24} />
          </div>
          <span className="font-mono text-lg text-neutral-300 font-bold">{comments.length}</span>
        </div>
      </div>

      <div className="space-y-8">
        <h3 className="text-2xl font-bold tracking-tight text-white mb-6">Komentar</h3>

        <SignedIn>
          <form onSubmit={handleSubmitComment} className="flex flex-col items-end gap-3 mb-10">
            <Textarea
              placeholder="Tuliskan komentar Anda di sini..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="bg-neutral-900/50 border-neutral-800 min-h-[120px] text-white focus-visible:ring-indigo-500"
            />
            {replyTo && (
              <div className="w-full flex justify-between items-center text-sm">
                <span className="text-indigo-400">Membalas komentar...</span>
                <button type="button" onClick={() => setReplyTo(null)} className="text-neutral-500 hover:text-white">Batal Balas</button>
              </div>
            )}
            <Button type="submit" disabled={isPending || !commentText.trim()} className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
              <IconSend size={16} />
              Kirim Komentar
            </Button>
          </form>
        </SignedIn>

        <SignedOut>
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-8 text-center mb-10">
            <IconMessageCircle size={32} className="mx-auto text-neutral-600 mb-4" />
            <h4 className="text-white font-medium mb-2">Ingin ikut berdiskusi?</h4>
            <p className="text-neutral-400 text-sm mb-6">Login untuk meninggalkan jejak di artikel ini.</p>
            <SignInButton mode="modal" fallbackRedirectUrl={pathname}>
              <Button className="bg-white text-black hover:bg-neutral-200">Login Sekarang</Button>
            </SignInButton>
          </div>
        </SignedOut>

        <div className="space-y-8">
          {rootComments.length === 0 ? (
            <p className="text-neutral-500 text-center py-8">Belum ada komentar. Jadilah yang pertama!</p>
          ) : (
            rootComments.map((comment) => (
              <div key={comment.id} className="space-y-4">
                <div className="bg-neutral-900/40 p-5 rounded-2xl border border-neutral-800/60">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-sm">
                      {comment.userId.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white flex items-center gap-2">
                        User {comment.userId.substring(comment.userId.length - 4)}
                        {/* If admin logic matching could go here */}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: id })}
                      </div>
                    </div>
                  </div>
                  <p className="text-neutral-300 leading-relaxed text-sm whitespace-pre-wrap">
                    {comment.content}
                  </p>
                  <SignedIn>
                    <button 
                      onClick={() => setReplyTo(comment.id)}
                      className="mt-3 text-xs font-semibold text-neutral-500 hover:text-indigo-400 transition-colors"
                    >
                      Balas Komentar
                    </button>
                  </SignedIn>
                </div>
                
                {/* Replies */}
                {getReplies(comment.id).length > 0 && (
                  <div className="pl-6 md:pl-12 space-y-4 border-l-2 border-neutral-900 ml-4">
                    {getReplies(comment.id).map(reply => (
                      <div key={reply.id} className="bg-neutral-900/20 p-4 rounded-xl border border-neutral-800/40">
                        <div className="flex items-center gap-3 mb-2">
                           <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center font-bold text-white text-xs">
                            {reply.userId.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-xs font-medium text-white">
                               User {reply.userId.substring(reply.userId.length - 4)}
                            </div>
                            <div className="text-[10px] text-neutral-500">
                              {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true, locale: id })}
                            </div>
                          </div>
                        </div>
                        <p className="text-neutral-300 leading-relaxed text-sm whitespace-pre-wrap">
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
    </div>
  );
}
