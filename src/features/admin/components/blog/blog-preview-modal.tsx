"use client";

import { useState } from "react";
import { X, ExternalLink, Monitor, Smartphone, RefreshCw } from "lucide-react";

interface BlogPreviewModalProps {
  slug: string;
  label?: React.ReactNode;
  className?: string;
}

export function BlogPreviewModal({ slug, label = "↗ Preview", className }: BlogPreviewModalProps) {
  const [open, setOpen] = useState(false);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [key, setKey] = useState(0);
  const url = `/blog/${slug}`;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className ?? "text-sm font-semibold text-indigo-600 hover:text-indigo-700"}
      >
        {label}
      </button>

      {open && (
        <div className="fixed inset-0 z-[9999] flex flex-col bg-black/60 backdrop-blur-sm">
          {/* Toolbar */}
          <div className="flex h-12 shrink-0 items-center justify-between bg-neutral-900 px-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">Preview</span>
              <span className="rounded bg-neutral-800 px-2 py-0.5 text-xs text-neutral-300 font-mono">{url}</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Device toggle */}
              <button
                type="button"
                title="Desktop"
                onClick={() => setDevice("desktop")}
                className={`flex h-8 w-8 items-center justify-center rounded transition-colors ${
                  device === "desktop" ? "bg-indigo-600 text-white" : "text-neutral-400 hover:text-white"
                }`}
              >
                <Monitor size={15} />
              </button>
              <button
                type="button"
                title="Mobile"
                onClick={() => setDevice("mobile")}
                className={`flex h-8 w-8 items-center justify-center rounded transition-colors ${
                  device === "mobile" ? "bg-indigo-600 text-white" : "text-neutral-400 hover:text-white"
                }`}
              >
                <Smartphone size={15} />
              </button>

              {/* Refresh */}
              <button
                type="button"
                title="Refresh"
                onClick={() => setKey((k) => k + 1)}
                className="flex h-8 w-8 items-center justify-center rounded text-neutral-400 hover:text-white transition-colors"
              >
                <RefreshCw size={14} />
              </button>

              {/* Open in new tab */}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                title="Buka di tab baru"
                className="flex h-8 w-8 items-center justify-center rounded text-neutral-400 hover:text-white transition-colors"
              >
                <ExternalLink size={14} />
              </a>

              {/* Close */}
              <button
                type="button"
                title="Tutup"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded text-neutral-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* iframe container */}
          <div className="flex flex-1 items-start justify-center overflow-auto bg-neutral-800 py-4">
            <div
              className={`relative bg-white shadow-2xl transition-all duration-300 ${
                device === "mobile" ? "w-[390px] rounded-2xl overflow-hidden" : "w-full h-full"
              }`}
              style={device === "desktop" ? { height: "calc(100vh - 3rem - 2rem)" } : { height: "844px" }}
            >
              <iframe
                key={key}
                src={url}
                title="Blog Preview"
                className="h-full w-full border-0"
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
