import React, { useState } from "react";

// Hook to use copy+tooltip logic anywhere
export function useCopyWithTooltip(timeout = 1500) {
  const [copiedText, setCopiedText] = useState(null);

  const copyWithTooltip = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), timeout);
  };

  return [copiedText, copyWithTooltip];
}

// Tooltip component (unchanged)
export default function CopiedTooltip({ show, className = "", children }) {
  if (!show) return null;
  return (
    <span className={"absolute -top-7 left-1/2 -translate-x-1/2 bg-success text-success-content px-2 py-1 rounded shadow text-xs animate-fade-in-out z-10 font-bold " + className}>
      {children || "Copied!"}
    </span>
  );
}
