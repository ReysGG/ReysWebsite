"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[600px] items-center justify-center rounded-b-md border border-neutral-200 bg-white">
      <div className="text-sm text-neutral-400">Memuat editor...</div>
    </div>
  ),
});

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    [{ font: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

export function BlogRichTextEditor({ defaultValue = "", error }: { defaultValue?: string; error?: string }) {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className="space-y-1.5">
      <div
        className="overflow-hidden rounded-md border border-neutral-200 bg-white dark:bg-white dark:border-neutral-200
          [&_.ql-toolbar]:sticky [&_.ql-toolbar]:top-0 [&_.ql-toolbar]:z-10
          [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-neutral-200 [&_.ql-toolbar]:bg-white
          [&_.ql-toolbar]:dark:bg-white [&_.ql-toolbar]:dark:border-neutral-200
          [&_.ql-container]:border-0
          [&_.ql-editor]:min-h-[600px] [&_.ql-editor]:text-base [&_.ql-editor]:leading-relaxed
          [&_.ql-editor]:text-neutral-900 [&_.ql-editor]:bg-white
          [&_.ql-editor]:dark:text-neutral-900 [&_.ql-editor]:dark:bg-white
          [&_.ql-editor]:px-6 [&_.ql-editor]:py-5
          [&_.ql-editor_h1]:text-3xl [&_.ql-editor_h1]:font-bold [&_.ql-editor_h1]:mb-4
          [&_.ql-editor_h2]:text-2xl [&_.ql-editor_h2]:font-bold [&_.ql-editor_h2]:mb-3
          [&_.ql-editor_h3]:text-xl [&_.ql-editor_h3]:font-semibold [&_.ql-editor_h3]:mb-2
          [&_.ql-editor_p]:mb-3
          [&_.ql-editor_blockquote]:border-l-4 [&_.ql-editor_blockquote]:border-indigo-400
          [&_.ql-editor_blockquote]:pl-4 [&_.ql-editor_blockquote]:text-neutral-600 [&_.ql-editor_blockquote]:italic
          [&_.ql-editor_pre]:bg-neutral-950 [&_.ql-editor_pre]:text-green-400 [&_.ql-editor_pre]:rounded-md [&_.ql-editor_pre]:p-4
          [&_.ql-toolbar_.ql-stroke]:stroke-neutral-700
          [&_.ql-toolbar_.ql-fill]:fill-neutral-700
          [&_.ql-toolbar_.ql-picker-label]:text-neutral-700
        "
      >
        <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} />
      </div>
      <input type="hidden" name="content" value={value} />
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
      <p className="text-xs text-neutral-400">{value.replace(/<[^>]*>/g, '').length} karakter</p>
    </div>
  );
}
