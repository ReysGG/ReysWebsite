"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <textarea className="min-h-[360px] w-full rounded-md border border-neutral-200 p-4 text-sm dark:bg-white dark:text-neutral-900 dark:border-neutral-200" disabled placeholder="Memuat editor..." />,
});

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

export function BlogRichTextEditor({ defaultValue = "", error }: { defaultValue?: string; error?: string }) {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className="space-y-2">
      <div className="overflow-hidden rounded-md border border-neutral-200 bg-white dark:bg-white dark:border-neutral-200 [&_.ql-container]:min-h-[360px] [&_.ql-editor]:min-h-[360px] [&_.ql-toolbar]:border-0 [&_.ql-container]:border-0 [&_.ql-editor]:text-neutral-900 [&_.ql-editor]:bg-white [&_.ql-toolbar]:bg-white [&_.ql-toolbar]:text-neutral-700">
        <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} />
      </div>
      <input type="hidden" name="content" value={value} />
      {error ? <p className="text-xs font-medium text-red-600">{error}</p> : null}
    </div>
  );
}
