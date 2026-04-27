import React from "react";

/**
 * Thin decorative line divider with a subtle horizontal glow.
 * Blending is handled by per-section top/bottom gradient overlays in globals.css.
 */
export const SectionDivider = () => {
  return (
    <div className="w-full px-16 md:px-32">
      <div className="h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
    </div>
  );
};
