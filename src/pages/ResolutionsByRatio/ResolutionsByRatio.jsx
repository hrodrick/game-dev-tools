import React, { useState } from "react";
import { COMMON_RATIOS } from "./utils";
import { getAspectRatio } from "../../Utils/Utils";
import Footer from "../../components/Footer";
import CopiedTooltip, { useCopyWithTooltip } from "../../components/CopiedTooltip";
import QuickLinks from "../../components/QuickLinks";

export default function ResolutionsByRatio() {
  const [selectedRatio, setSelectedRatio] = useState(COMMON_RATIOS[0]);
  const selectedResolutions = selectedRatio.resolutions.slice(0, (selectedRatio.resolutions.length + 1) / 2);
  const selectedResolutionsRight = selectedRatio.resolutions.slice((selectedRatio.resolutions.length + 1) / 2);
  const [CopiedText, copyWithTooltip] = useCopyWithTooltip();

  return (
    <div className="flex flex-col gap-4 w-full">
      <header className="flex flex-col gap-4">
        <h1 className="text-xl font-bold">Resolutions by Aspect Ratio</h1>
        <h2>Browse common aspect ratios and their typical resolutions</h2>
      </header>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-4 basis-1/3 bg-base-200 rounded-box p-4">
          <b className="text-center lg:text-left">Common Aspect Ratios</b>
          <ul className="flex flex-wrap gap-2 justify-center">
            {COMMON_RATIOS.map((r) => (
              <li key={r.label} className="relative">
                <button
                  className={"btn w-24 h-24 " + (r.label === selectedRatio.label 
                    ? "btn-secondary" 
                    : "btn-neutral"
                  )}
                  onClick={() => setSelectedRatio(r)}
                >
                  <div className="flex flex-col">
                    <span>{r.label}</span>
                    <span>{r.labelDetail}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 basis-2/3 bg-base-200 rounded-box p-4">
          <b>Common Resolutions for {selectedRatio.label}:</b>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <ul className="flex flex-col gap-2">
              {selectedResolutions.map((r) => {
                return (
                  <li key={r.label} className="relative">
                    <button className="btn btn-neutral h-fit py-2" onClick={() => copyWithTooltip(r.label)}>
                      {r.label} ({getAspectRatio(r.w, r.h)})
                    </button>
                    <CopiedTooltip show={CopiedText === r.label} />
                  </li>
                );
              })}
            </ul>
            <ul className="flex flex-col gap-2">
              {selectedResolutionsRight.map((r) => {
                return (
                  <li key={r.label} className="relative">
                    <button className="btn btn-neutral h-fit py-2" onClick={() => copyWithTooltip(r.label)}>
                      {r.label} ({getAspectRatio(r.w, r.h)})
                    </button>
                    <CopiedTooltip show={CopiedText === r.label} />
                  </li>
                );
              })}
            </ul>
          </div>
          <p className="text-sm">
            Some resolutions may not be exactly {selectedRatio.label}, but these are often used under such aspect ratio, mostly because the exact match would have decimals.
          </p>
          <p className="text-sm">
            Click on a resolution to copy it to clipboard!
          </p>
        </div>
      </div>
      <hr className="divider" />
      <QuickLinks linkIds={["aspectRatioCalculator", "safeArea"]} />
      <Footer />
    </div>
  );
}
