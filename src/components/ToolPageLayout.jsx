import React from "react";
import Footer from "./Footer";
import QuickLinks from "./QuickLinks";

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
  className = "",
  fieldsetContentClassName = "md:w-64",
  quickLinks,
}) {
  return (
    <div className={`tool-page-layout w-full min-h-screen flex flex-col gap-4 ${className}`}>
      {/* Title and Description */}
      <header className="flex flex-col gap-4">
        {title && <h1 className="text-xl font-bold">{title}</h1>}
        {description && <div className="whitespace-pre-line text-lg font-semibold">{description}</div>}
      </header>

      {/* Main Row (responsive) */}
      <div className="flex flex-col md:flex-row place-content-center gap-4 w-full">
        {/* Left Content (usually drag & drops + previews) */}
        <div className="flex-1 mt-4">{leftContent}</div>
        {/* Fieldset Content */}
        {fieldsetContent && (
          <fieldset className={"box-content fieldset bg-base-200 border-base-300 rounded-box border gap-4 p-4 " + fieldsetContentClassName}>
            <legend className="fieldset-legend">Settings</legend>
            {fieldsetContent}
          </fieldset>
        )}
      </div>

      {/* Results Area */}
      {resultsContent && (
        <section className="w-full">
          {resultsContent}
        </section>
      )}
      {/* Quick Links */}
      {quickLinks && 
        <> 
          <hr className="divider mt-6" /> 
          <QuickLinks linkIds={quickLinks} /> 
        </>
      }
      {/* Footer (optional, can be slotted in as children if needed) */}
      <Footer />
    </div>
  );
}