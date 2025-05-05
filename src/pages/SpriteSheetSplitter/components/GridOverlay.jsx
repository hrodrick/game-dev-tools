import React, { useState, useEffect } from "react";

export default function GridOverlay({
  cellWidth,
  cellHeight,
  imgRef,
  splitMode,
  columns,
  rows,
  paddingLeft = 0,
  paddingRight = 0,
  paddingTop = 0,
  paddingBottom = 0,
}) {
  const [overlayDims, setOverlayDims] = useState({
    displayW: 0,
    displayH: 0,
    natW: 0,
    natH: 0,
  });
  useEffect(() => {
    if (imgRef.current) {
      setOverlayDims({
        displayW: imgRef.current.width,
        displayH: imgRef.current.height,
        natW: imgRef.current.naturalWidth,
        natH: imgRef.current.naturalHeight,
      });
    }
  }, [
    imgRef.current,
    cellWidth,
    cellHeight,
    splitMode,
    columns,
    rows,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
  ]);

  const { displayW, displayH, natW, natH } = overlayDims;
  if (!displayW || !displayH || !natW || !natH) return null;

  let gridCols, gridRows, w, h;
  if (splitMode === "size") {
    w = cellWidth;
    h = cellHeight;
    gridCols = Math.floor(
      (natW - (parseInt(paddingLeft) || 0) - (parseInt(paddingRight) || 0)) / w,
    );
    gridRows = Math.floor(
      (natH - (parseInt(paddingTop) || 0) - (parseInt(paddingBottom) || 0)) / h,
    );
  } else {
    gridCols = parseInt(columns, 10) || 0;
    gridRows = parseInt(rows, 10) || 0;
    w =
      gridCols > 0
        ? Math.floor(
            (natW -
              (parseInt(paddingLeft) || 0) -
              (parseInt(paddingRight) || 0)) /
              gridCols,
          )
        : 0;
    h =
      gridRows > 0
        ? Math.floor(
            (natH -
              (parseInt(paddingTop) || 0) -
              (parseInt(paddingBottom) || 0)) /
              gridRows,
          )
        : 0;
  }
  const scaleX = displayW / natW;
  const scaleY = displayH / natH;
  const gridLines = [];

  // Paddings overlay box (magenta border)
  const padL = parseInt(paddingLeft, 10) || 0;
  const padR = parseInt(paddingRight, 10) || 0;
  const padT = parseInt(paddingTop, 10) || 0;
  const padB = parseInt(paddingBottom, 10) || 0;
  const padBox = (
    <div
      key="padding-preview"
      className="border-2 rounded-xl border-dashed border-neutral-content z-3"
      style={{
        position: "absolute",
        left: padL * scaleX,
        top: padT * scaleY,
        width: (natW - padL - padR) * scaleX,
        height: (natH - padT - padB) * scaleY,
        boxSizing: "border-box",
        pointerEvents: "none",
      }}
    />
  );
  // Grid area origin and size
  const gridOriginX = padL * scaleX;
  const gridOriginY = padT * scaleY;
  const gridAreaW = (natW - padL - padR) * scaleX;
  const gridAreaH = (natH - padT - padB) * scaleY;

  // Vertical lines (inside padded area)
  for (let i = 1; i < gridCols; i++) {
    gridLines.push(
      <div
        key={`v${i}`}
        className="bg-neutral-content"
        style={{
          position: "absolute",
          left: gridOriginX + i * (gridAreaW / gridCols),
          top: gridOriginY,
          height: gridAreaH,
          width: 1,
          zIndex: 2,
        }}
      />,
    );
  }
  // Horizontal lines (inside padded area)
  for (let i = 1; i < gridRows; i++) {
    gridLines.push(
      <div
        key={`h${i}`}
        className="bg-neutral-content"
        style={{
          position: "absolute",
          top: gridOriginY + i * (gridAreaH / gridRows),
          left: gridOriginX,
          width: gridAreaW,
          height: 1,
          zIndex: 2,
        }}
      />,
    );
  }
  return (
    <div
      className="w-full h-full"
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        pointerEvents: "none",
        zIndex: 2,
      }}
    >
      {padBox}
      {gridLines}
    </div>
  );
}
