"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { cn } from "@/lib/utils";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export const QuillEditor = ({
  value,
  onChange,
  placeholder,
  className
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}) => {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "link",
    "image",
  ];

  return (
    <div className={cn(
      "w-full bg-white dark:bg-transparent min-h-[400px] border dark:border-neutral-800 rounded-md overflow-hidden text-neutral-900 dark:text-neutral-100 flex flex-col",
      // Important trick for forcing Quill's internal elements to respect full height
      "[&>.quill]:flex-1 [&>.quill]:flex [&>.quill]:flex-col [&_.ql-container]:flex-1 [&_.ql-editor]:min-h-full",
      className
    )}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder || "Tuliskan konten artikel..."}
        className="h-full min-h-[350px]"
      />
    </div>
  );
};
