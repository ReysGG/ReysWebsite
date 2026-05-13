import React from "react";

/**
 * SVG wave divider. `fromColor` and `toColor` are Tailwind fill class names
 * applied to the wave shape so it blends from one section bg to the next.
 */
export const WaveDivider = ({
  fromColor = "#ffffff",
  toColor = "#f5f5f5",
  flip = false,
}: {
  fromColor?: string;
  toColor?: string;
  flip?: boolean;
}) => {
  return (
    <div
      className="w-full overflow-hidden leading-none"
      style={{ backgroundColor: fromColor, transform: flip ? "scaleY(-1)" : undefined }}
    >
      <svg
        viewBox="0 0 1440 64"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-12 md:h-16 block"
      >
        <path
          d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,64 L0,64 Z"
          fill={toColor}
        />
      </svg>
    </div>
  );
};
