import React, { useState } from "react";

function calculateSafePadding(width, height, percent) {
  return {
    left: Math.round(width * percent),
    right: Math.round(width * percent),
    top: Math.round(height * percent),
    bottom: Math.round(height * percent),
  };
}

export default function SafeAreaCalculator() {
  const [width, setWidth] = useState(3840);
  const [height, setHeight] = useState(2160);

  const titleSafe = calculateSafePadding(width, height, 0.05);
  const actionSafe = calculateSafePadding(width, height, 0.025);

  // For the preview, scale down to fit a 400x225 box (16:9) or similar
  const scale = Math.min(1, 400 / width, 225 / height);
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
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        padding: 24,
        background: "#fafbfc",
        borderRadius: 10,
        boxShadow: "0 2px 12px #0001",
      }}
    >
      <h2>Safe Area Calculator</h2>
      <div style={{ marginBottom: 20 }}>
        <label>
          Width:
          <input
            type="number"
            value={width}
            min={1}
            onChange={(e) => setWidth(Number(e.target.value))}
            style={{ width: 90, marginLeft: 10 }}
          />
        </label>
        <label style={{ marginLeft: 24 }}>
          Height:
          <input
            type="number"
            value={height}
            min={1}
            onChange={(e) => setHeight(Number(e.target.value))}
            style={{ width: 90, marginLeft: 10 }}
          />
        </label>
      </div>
      <div style={{ marginBottom: 20 }}>
        <b>Title Safe Padding (5%):</b> {titleSafe.left}px left/right,{" "}
        {titleSafe.top}px top/bottom
        <br />
        <b>Action Safe Padding (2.5%):</b> {actionSafe.left}px left/right,{" "}
        {actionSafe.top}px top/bottom
      </div>
      <div
        style={{ margin: "32px 0", display: "flex", justifyContent: "center" }}
      >
        <div
          style={{
            position: "relative",
            width: previewWidth,
            height: previewHeight,
            background: "#222",
            borderRadius: 8,
            overflow: "hidden",
            border: "2px solid #999",
          }}
        >
          {/* Title Safe Area */}
          <div
            style={{
              position: "absolute",
              left: tSafe.left,
              top: tSafe.top,
              width: previewWidth - tSafe.left - tSafe.right,
              height: previewHeight - tSafe.top - tSafe.bottom,
              border: "2px solid #2b87ff",
              boxSizing: "border-box",
              pointerEvents: "none",
              borderRadius: 4,
            }}
          />
          {/* Action Safe Area */}
          <div
            style={{
              position: "absolute",
              left: aSafe.left,
              top: aSafe.top,
              width: previewWidth - aSafe.left - aSafe.right,
              height: previewHeight - aSafe.top - aSafe.bottom,
              border: "2px dashed #ffb300",
              boxSizing: "border-box",
              pointerEvents: "none",
              borderRadius: 4,
            }}
          />
        </div>
      </div>
      <div style={{ fontSize: 14, color: "#555", marginTop: 12 }}>
        <b>What is this?</b>
        <br />
        "Safe areas" are recommended margins for UI on TVs and some monitors.
        Important text and UI should stay inside the{" "}
        <span style={{ color: "#2b87ff" }}>Title Safe</span> area, and essential
        visuals inside the <span style={{ color: "#ffb300" }}>Action Safe</span>{" "}
        area. This helps avoid overscan/trimming on TVs and ensures a good user
        experience.
      </div>
    </div>
  );
}
