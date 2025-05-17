import React from "react";

// Centralized link definitions
export const QUICK_LINKS = {
  home: {
    href: "/",
    text: "Quick link to home"
  },
  cellIdentifier: {
    href: "/cell-numberer",
    text: "Identify cell IDs on big sprite sheets or icon sets"
  },
  combine: {
    href: "/combine",
    text: "Combine multiple images into one"
  },
  split: {
    href: "/split",
    text: "Split an image into multiple images"
  },
  aspectRatioCalculator: {
    href: "/aspect-ratio-calculator",
    text: "Calculate aspect ratios, and the width or height of a screen"
  },
  resolutions: {
    href: "/resolutions-by-ratio",
    text: "Browse Common Aspect Ratios & Resolutions"
  },
  safeArea: {
    href: "/safe-area-calculator",
    text: "Learn how much padding you need to show your UI safely"
  },
  instantAudioPad: {
    href: "/instant-audio-pad",
    text: "Play multiple audio files quickly on our Audio Pad!"
  },
  pitchRandomizer: {
    href: "/pitch-randomizer",
    text: "Find the ideal pitch for an audio file"
  },
  recommendedAssets: {
    href: "/recommended-assets",
    text: "Recommended Game Assets"
  },
  about: {
    href: "/about",
    text: "About"
  },
};

/**
 * QuickLinks component
 * @param {string[]} linkIds - Array of IDs to display
 */
export default function QuickLinks({ linkIds }) {
  const filtered = linkIds
    .map(id => ({ id, ...QUICK_LINKS[id] }))
    .filter(link => link.href && link.text);
  if (filtered.length === 0) return null;
  return (
    <div className="flex flex-col gap-4 w-fit">
      {filtered.map(link => (
        <a
          key={link.id}
          href={link.href}
          className="btn btn-outline btn-info px-8 py-2 h-fit"
        >
          {link.text}
        </a>
      ))}
    </div>
  );
}
