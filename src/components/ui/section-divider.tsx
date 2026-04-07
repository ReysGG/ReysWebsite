import React from "react";

/**
 * Gradient section divider.
 * transparent → indigo/violet → transparent
 * Terlihat premium, tidak kaku seperti border solid.
 */
export const SectionDivider = () => {
  return (
    <div className="w-full flex items-center justify-center py-0">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="h-px bg-linear-to-r from-transparent via-indigo-500/40 to-transparent" />
      </div>
    </div>
  );
};
