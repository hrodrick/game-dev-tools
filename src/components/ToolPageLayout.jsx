import React from "react";
import Footer from "./Footer";

/**
 * Reusable layout for tool pages.
 * Props:
 *  - title: string | React node
 *  - description: string | React node
 *  - leftContent: React node
 *  - fieldsetContent: React node
 *  - resultsContent: React node
 *  - className: string (optional)
 */
export default function ToolPageLayout({
  title,
  description,
  leftContent,
  fieldsetContent,
  resultsContent,
  className = ""
}) {
  return (
    <div className={`tool-page-layout place-content-center w-full min-h-screen flex flex-col gap-4 ${className}`}>
      {/* Title and Description */}
      <header className="flex flex-col gap-4">
        {title && <h1 className="text-xl font-bold">{title}</h1>}
        {description && <h2>{description}</h2>}
      </header>

      {/* Main Row (responsive) */}
      <div className="flex flex-col md:flex-row place-content-center gap-4 w-full">
        {/* Left Content (usually drag & drops + previews) */}
        <div className="flex-1 mt-4">{leftContent}</div>
        {/* Fieldset Content */}
        <fieldset className="box-content fieldset bg-base-200 border-base-300 rounded-box border gap-4 p-4 md:w-64">
          <legend className="fieldset-legend">Settings</legend>
          {fieldsetContent}
        </fieldset>
      </div>

      {/* Results Area */}
      {resultsContent && (
        <section className="w-full">
          {resultsContent}
        </section>
      )}

      {/* Footer (optional, can be slotted in as children if needed) */}
      <Footer />
    </div>
  );
}
