import React, { useState } from "react";
import ToolPageLayout from "../../components/ToolPageLayout";
import QuickLinks from "../../components/QuickLinks";
import useMediaQuery from "../../Utils/useMediaQuery";

function calculateSafePadding(width, height, percent) {
  return {
    left: Math.round(width * percent),
    right: Math.round(width * percent),
    top: Math.round(height * percent),
    bottom: Math.round(height * percent),
  };
}

export default function SafeAreaCalculator() {
  // Responsive canvas size
  const isLgUp = useMediaQuery("(min-width: 1024px)");
  const MAX_CANVAS_WIDTH = isLgUp ? 640 : 320;
  const MAX_CANVAS_HEIGHT = isLgUp ? 240 : 136;
  const [width, setWidth] = useState(3840);
  const [height, setHeight] = useState(2160);

  const titleSafe = calculateSafePadding(width, height, 0.05);
  const actionSafe = calculateSafePadding(width, height, 0.025);

  // For the preview, scale down to fit a 400x225 box (16:9) or similar
  const scale = Math.min(1, MAX_CANVAS_WIDTH / width, MAX_CANVAS_HEIGHT / height);
  const previewWidth = Math.round(width * scale);
  const previewHeight = Math.round(height * scale);

  const tSafe = {
    left: titleSafe.left * scale,
    right: titleSafe.right * scale,
    top: titleSafe.top * scale,
    bottom: titleSafe.bottom * scale,
  };
  const aSafe = {
    left: actionSafe.left * scale,
    right: actionSafe.right * scale,
    top: actionSafe.top * scale,
    bottom: actionSafe.bottom * scale,
  };

  return (
    <>
      <ToolPageLayout
        title="Safe Area Calculator"
        description={
          <>Calculate TV and monitor UI safe areas for your game's HUD and menus. Enter your screen size to see recommended padding for 
            <span className="font-bold text-secondary"> Title Safe</span> and <span className="font-bold text-primary">Action Safe</span> zones.</>
        }
        fieldsetContentClassName="md:w-48"
        fieldsetContent={
          <div className="flex flex-col gap-2">
            <label>Width:</label>
            <input className="input" type="number" value={width} min={1} onChange={e => setWidth(Number(e.target.value))}/>
            <label>Height:</label>
            <input className="input" type="number" value={height} min={1} onChange={e => setHeight(Number(e.target.value))}/>
            <div className="flex flex-col gap-4 bg-base-100 p-2 border-base-300 rounded">
              <p className="font-bold text-secondary"> Title Safe Paddings</p>
              <div className="flex flex-row gap-4">
                <p className="text-xs box-border">Horizontal: <b>{titleSafe.left}</b> | Vertical: <b>{titleSafe.top}</b> </p> 
              </div>
            </div>
            <div className="flex flex-col gap-4 bg-base-100 p-2 border-base-300 rounded">
              <p className="font-bold text-primary"> Action Safe Paddings</p>
              <div className="flex flex-row gap-4">
                <p className="text-xs box-border">Horizontal: <b>{actionSafe.left}</b> | Vertical: <b>{actionSafe.top}</b> </p> 
              </div>
            </div>
          </div>
        }
        leftContent={
          <div className="flex flex-col items-center gap-2 w-full">
            <div
              className="bg-neutral relative border-1 border-neutral-content rounded"
              style={{ width: previewWidth, height: previewHeight }}
            >
              {/* Action Safe Area */}
              <div
                className="border-2 border-primary border-dashed absolute z-1"
                style={{
                  left: aSafe.left,
                  top: aSafe.top,
                  width: previewWidth - aSafe.left - aSafe.right,
                  height: previewHeight - aSafe.top - aSafe.bottom,
                }}
                title="Action Safe"
              />
              {/* Title Safe Area */}
              <div
                className="border-2 border-secondary border-solid absolute z-2"
                style={{
                  left: tSafe.left,
                  top: tSafe.top,
                  width: previewWidth - tSafe.left - tSafe.right,
                  height: previewHeight - tSafe.top - tSafe.bottom,
                }}
                title="Title Safe"
              />
              <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center pointer-events-none">
                <span className="text-xs text-neutral-300">Preview</span>
              </div>
            </div>
            <div className="hidden lg:flex flex-col gap-1 mt-2 text-xs bg-base-200 p-4 rounded w-full items-center">
              <span className="text-base"><span className="font-bold text-secondary">Title Safe</span> padding: {titleSafe.left}px Horizontal, {titleSafe.top}px Vertical</span>
              <span className="text-base"><span className="font-bold text-primary">Action Safe</span> padding: {actionSafe.left}px Horizontal, {actionSafe.top}px Vertical</span>
            </div>
            <div className="flex lg:hidden flex-col gap-1 mt-2 text-base bg-base-200 p-4 rounded w-full items-start">
              <p><span className="font-bold text-secondary">Title Safe</span> padding:</p>
              <p>- Horizontal: {titleSafe.left}px </p> <p>- Vertical: {titleSafe.top}px</p>
              <p><span className="font-bold text-primary">Action Safe</span> padding:</p>
              <p>- Horizontal: {actionSafe.left}px </p> <p>- Vertical: {actionSafe.top}px</p>
            </div>
          </div>
        }
        resultsContent={
          <div className="text-sm text-neutral-content">
            <b>What is this?</b><br />
            "Safe areas" are recommended margins for UI on TVs and some monitors. Important text and UI should stay inside the <span className="text-secondary font-bold">Title Safe</span> area, and essential visuals inside the <span className="text-primary font-bold">Action Safe</span> area. This helps avoid overscan/trimming on TVs and ensures a good user experience.
          </div>
        }
        quickLinks={["aspectRatioCalculator", "resolutions"]}
      />
    </>
  );
}
