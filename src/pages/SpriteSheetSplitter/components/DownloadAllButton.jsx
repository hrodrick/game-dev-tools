import React, { useState } from "react";
import JSZip from "jszip";

export default function DownloadAllButton({ frames }) {
  const [downloading, setDownloading] = useState(false);
  const handleDownloadAll = async () => {
    setDownloading(true);
    const zip = new JSZip();
    frames.forEach((frame, i) => {
      // Remove the data URL prefix
      const base64 = frame.split(",")[1];
      zip.file(`frame_${i + 1}.png`, base64, { base64: true });
    });
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "frames.zip";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    setDownloading(false);
  };
  if (!frames.length) return null;
  return (
    <button
      onClick={handleDownloadAll}
      style={{
        padding: "8px 18px",
        background: "#4078c0",
        color: "white",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
        margin: "10px 0",
        fontWeight: 500,
      }}
      disabled={downloading}
    >
      {downloading ? "Preparing..." : "Download All"}
    </button>
  );
}
