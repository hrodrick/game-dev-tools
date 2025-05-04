import React from "react";

/**
 * DownloadButton
 * Props:
 * - href: string (required) - the URL or data URI to download
 * - fileName: string (required) - the downloaded file name
 * - className: string (optional) - extra classes for styling
 * - children: ReactNode (button label/content)
 */
export default function DownloadButton({ href, fileName, className = '', children }) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button type="button" className={className} onClick={handleDownload}>
      {children}
    </button>
  );
}