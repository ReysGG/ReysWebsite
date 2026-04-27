import React from "react";
import { Input } from "@/components/ui/input";
import { QuillEditor } from "@/components/admin/quill-editor";

interface PostMainEditorProps {
  content: string;
  setContent: (val: string) => void;
}

export function PostMainEditor({ content, setContent }: PostMainEditorProps) {
  return (
    <div className="bg-white dark:bg-neutral-950 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col h-full gap-8">
      <div className="space-y-3 shrink-0">
        <label htmlFor="title" className="text-sm font-semibold text-neutral-500 uppercase tracking-wider block">
          Judul Utama
        </label>
        <Input 
          id="title" 
          name="title" 
          placeholder="Cara Mengoptimasi SEO di Tahun 2025" 
          required 
          className="text-2xl md:text-3xl lg:text-4xl py-8 font-bold border-none bg-transparent px-0 focus-visible:ring-0 placeholder:text-neutral-300 dark:placeholder:text-neutral-800" 
        />
        <hr className="border-neutral-100 dark:border-neutral-900" />
      </div>

      <div className="space-y-3 flex-1 flex flex-col">
        <label htmlFor="content" className="text-sm font-semibold text-neutral-500 uppercase tracking-wider block">
          Isi Artikel
        </label>
        <input type="hidden" name="content" value={content} />
        {/* We use negative margin technique to make quill editor fit seamlessly in this clean component */}
        <div className="-mx-3 flex-1 flex flex-col">
          <QuillEditor 
            value={content} 
            onChange={setContent} 
            placeholder="Mulai menulis karya luar biasa Anda di sini..." 
            className="border-none bg-transparent shadow-none [&>.ql-toolbar]:border-none [&>.ql-toolbar]:bg-neutral-50 dark:[&>.ql-toolbar]:bg-neutral-900 rounded-none border-b [&_.ql-container]:border-none text-lg min-h-[600px] flex-1"
          />
        </div>
      </div>
    </div>
  );
}
