import React, { useState } from "react";

const COMMON_RATIOS = [
  {
    label: "16:9 (HD, FHD, 4K, etc)",
    value: 16 / 9,
    w: 16,
    h: 9,
    resolutions: [
      { label: "7680x4320 (8K UHD)", w: 7680, h: 4320 },
      { label: "5120x2880 (5K UHD)", w: 5120, h: 2880 },
      { label: "4096x2304 (DCI 4K)", w: 4096, h: 2304 },
      { label: "3840x2160 (4K UHD)", w: 3840, h: 2160 },
      { label: "3200x1800 (QHD+)", w: 3200, h: 1800 },
      { label: "2560x1440 (QHD/WQHD, 1440p)", w: 2560, h: 1440 },
      { label: "1920x1080 (FHD, 1080p)", w: 1920, h: 1080 },
      { label: "1600x900 (HD+)", w: 1600, h: 900 },
      { label: "1366x768", w: 1366, h: 768 },
      { label: "1280x720 (HD, 720p)", w: 1280, h: 720 },
      { label: "960x540 (qHD)", w: 960, h: 540 },
      { label: "854x480 (FWVGA, 480p)", w: 854, h: 480 },
      { label: "640x360 (nHD, 360p)", w: 640, h: 360 },
      { label: "426x240 (240p)", w: 426, h: 240 },
    ],
  },
  {
    label: "4:3 (Classic)",
    value: 4 / 3,
    w: 4,
    h: 3,
    resolutions: [
      { label: "2048x1536 (QXGA, iPad Retina)", w: 2048, h: 1536 },
      { label: "1600x1200 (UXGA)", w: 1600, h: 1200 },
      { label: "1400x1050 (SXGA+)", w: 1400, h: 1050 },
      { label: "1280x960 (SXGA-)", w: 1280, h: 960 },
      { label: "1024x768 (XGA)", w: 1024, h: 768 },
      { label: "800x600 (SVGA)", w: 800, h: 600 },
      { label: "640x480 (VGA)", w: 640, h: 480 },
      { label: "320x240 (QVGA)", w: 320, h: 240 },
    ],
  },
  {
    label: "21:9 (Ultrawide)",
    value: 21 / 9,
    w: 21,
    h: 9,
    resolutions: [
      { label: "5120x2160 (5K Ultra-wide, 2160p)", w: 5120, h: 2160 },
      { label: "3840x1600 (WQHD+)", w: 3840, h: 1600 },
      { label: "3440x1440 (UWQHD)", w: 3440, h: 1440 },
      { label: "2560x1080 (UWHD)", w: 2560, h: 1080 },
      { label: "1720x720", w: 1720, h: 720 },
    ],
  },
  {
    label: "3:2",
    value: 3 / 2,
    w: 3,
    h: 2,
    resolutions: [
      { label: "3000x2000 (Surface Book)", w: 3000, h: 2000 },
      { label: "2736x1824 (Surface Pro)", w: 2736, h: 1824 },
      { label: "2256x1504 (Surface Laptop)", w: 2256, h: 1504 },
      { label: "2160x1440", w: 2160, h: 1440 },
      { label: "1440x960", w: 1440, h: 960 },
      { label: "1280x854", w: 1280, h: 854 },
    ],
  },
  {
    label: "1:1",
    value: 1,
    w: 1,
    h: 1,
    resolutions: [
      { label: "4096x4096", w: 4096, h: 4096 },
      { label: "2048x2048", w: 2048, h: 2048 },
      { label: "1080x1080", w: 1080, h: 1080 },
      { label: "512x512", w: 512, h: 512 },
      { label: "256x256", w: 256, h: 256 },
      { label: "128x128", w: 128, h: 128 },
    ],
  },
];

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function getAspectRatio(w, h) {
  const d = gcd(w, h);
  return `${w / d}:${h / d}`;
}

export default function AspectRatioCalculator() {
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [selectedRatio, setSelectedRatio] = useState(COMMON_RATIOS[0]);

  const ratio = getAspectRatio(width, height);
  const decimal = (width / height).toFixed(4);

  // Use the resolutions for the selected aspect ratio
  const selectedResolutions = selectedRatio.resolutions;

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "40px auto",
        padding: 24,
        background: "#fafbfc",
        borderRadius: 10,
        boxShadow: "0 2px 12px #0001",
      }}
    >
      <h2>Aspect Ratio Calculator</h2>
      <div style={{ marginBottom: 20 }}>
        <label>
          Width:
          <input
            type="number"
            value={width}
            min={1}
            onChange={(e) => setWidth(Number(e.target.value))}
            style={{ width: 80, marginLeft: 10 }}
          />
        </label>
        <label style={{ marginLeft: 24 }}>
          Height:
          <input
            type="number"
            value={height}
            min={1}
            onChange={(e) => setHeight(Number(e.target.value))}
            style={{ width: 80, marginLeft: 10 }}
          />
        </label>
      </div>
      <div style={{ fontSize: 20, marginBottom: 10 }}>
        Aspect Ratio: <b>{ratio}</b> ({decimal})
      </div>
      <hr style={{ margin: "24px 0" }} />
      <div style={{ display: "flex", gap: 32 }}>
        <div style={{ flex: 1 }}>
          <b>Common Aspect Ratios:</b>
          <ul style={{ margin: "8px 0 16px 0", padding: 0, listStyle: "none" }}>
            {COMMON_RATIOS.map((r) => (
              <li key={r.label}>
                <button
                  style={{
                    margin: "4px 0",
                    padding: "4px 10px",
                    borderRadius: 5,
                    border:
                      r.label === selectedRatio.label
                        ? "2px solid #4078c0"
                        : "1px solid #bbb",
                    background:
                      r.label === selectedRatio.label ? "#eaf3ff" : "#fff",
                    color:
                      r.label === selectedRatio.label ? "#4078c0" : "inherit",
                    cursor: "pointer",
                    fontWeight: r.label === selectedRatio.label ? 600 : 400,
                  }}
                  onClick={() => {
                    setSelectedRatio(r);
                  }}
                >
                  {r.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: 1 }}>
          <b>Common Resolutions for {selectedRatio.label}:</b>
          <ul style={{ margin: "8px 0 0 0", padding: 0, listStyle: "none" }}>
            {selectedResolutions.map((r) => (
              <li key={r.label}>
                <button
                  style={{
                    margin: "4px 0",
                    padding: "4px 10px",
                    borderRadius: 5,
                    border: "1px solid #bbb",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setWidth(r.w);
                    setHeight(r.h);
                  }}
                >
                  {r.label} ({getAspectRatio(r.w, r.h)})
                </button>
              </li>
            ))}
          </ul>
          <p style={{ fontSize: 14, color: "#666", marginTop: 8 }}>
            Some resolutions may not be exactly {selectedRatio.label}, but these
            are often used under such aspect ratio, mostly because the exact
            match would have decimals.
          </p>
        </div>
      </div>
    </div>
  );
}
