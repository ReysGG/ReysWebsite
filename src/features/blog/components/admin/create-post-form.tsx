"use client";

import React, { useState, useTransition, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconArrowLeft } from "@tabler/icons-react";
import { createPost, createDraft } from "@/features/blog/actions/create-post";
import { PostMainEditor } from "./post-main-editor";
import { PostPublishSidebar } from "./post-publish-sidebar";
import { SharePostModal } from "./share-post-modal";
import { toast } from "sonner";

export function CreatePostForm() {
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);
  
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    // Check which button was pressed
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const isDraft = submitter?.getAttribute("formAction") !== null;
    
    const formData = new FormData(formRef.current);
    
    startTransition(async () => {
      let result;
      if (isDraft) {
        result = await createDraft(formData);
      } else {
        result = await createPost(formData);
      }

      if (result.success && result.slug) {
        setCreatedSlug(result.slug);
        setIsModalOpen(true);
      } else {
        toast.error(result.error || "Terjadi kesalahan saat memproses data.");
      }
    });
  };

  return (
    <div className="w-full h-full space-y-6">
      <div className="flex items-center gap-4 bg-white dark:bg-neutral-950 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 sticky top-0 z-10 shadow-xs">
        <Link href="/admin/blog">
          <Button variant="ghost" size="icon" className="shrink-0 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-full">
            <IconArrowLeft size={18} />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Tulis Artikel Baru
          </h1>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="w-full flex flex-col xl:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <PostMainEditor content={content} setContent={setContent} />
        </div>
        
        <div className="w-full xl:w-[300px] shrink-0">
          <PostPublishSidebar isPending={isPending} />
        </div>
      </form>

      <SharePostModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        slug={createdSlug} 
      />
    </div>
  );
}
