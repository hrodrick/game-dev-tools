import React, { useRef, useEffect, useState } from "react";

const NumberedGridOverlay = ({
  imageUrl,
  columns,
  rows,
  fontSize = 18,
  renderedWidth,
  renderedHeight,
  splitMode,
  cellWidth,
  cellHeight,
  className,
}) => {
  const canvasRef = useRef(null);
  const [imgDims, setImgDims] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!imageUrl) return;
    const img = new window.Image();
    img.src = imageUrl;
    img.onload = () => {
      // Always use the natural size for calculations
      setImgDims({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
      drawGrid(img);
    };
    img.onerror = (e) => {
      console.error("Image failed to load", imageUrl, e);
      setImgDims({ width: 0, height: 0 });
    };
  }, [imageUrl, columns, rows, fontSize, splitMode, cellWidth, cellHeight]);

  const drawGrid = (img) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    canvas.width = w;
    canvas.height = h;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
    if (splitMode === "size" && (cellWidth < 8 || cellHeight < 8)) return;
    else if (columns < 1 || rows < 1) return;

    const cellWidthCalc = splitMode === "size" ? cellWidth : w / columns;
    const cellHeightCalc = splitMode === "size" ? cellHeight : h / rows;
    const cellRowsCalc = splitMode === "size" ? Math.ceil(h / cellHeightCalc) : rows;
    const cellColumnsCalc = splitMode === "size" ? Math.ceil(w / cellWidthCalc) : columns;

    if (cellRowsCalc < 1 || cellColumnsCalc < 1) return;

    ctx.strokeStyle = "rgba(0,0,0,0.5)";
    ctx.lineWidth = 1;
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = "right";
    ctx.textBaseline = "top";

    let cellId = 0;
    for (let row = 0; row < cellRowsCalc; row++) {
      for (let col = 0; col < cellColumnsCalc; col++) {
        const x = col * cellWidthCalc;
        const y = row * cellHeightCalc;
        ctx.strokeRect(x, y, cellWidthCalc, cellHeightCalc);
        // Draw cell number with outline at top right
        const padding = 4;
        const numX = x + cellWidthCalc - padding;
        const numY = y + padding;
        ctx.lineWidth = 5;
        ctx.strokeStyle = "black";
        ctx.strokeText(cellId, numX, numY);
        ctx.fillStyle = "#fff";
        ctx.fillText(cellId, numX, numY);
        cellId++;
      }
    }
  };

  // Scale the canvas to the rendered size, but keep drawing in natural size
  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: renderedWidth || imgDims.width, // Displayed size
        height: renderedHeight || imgDims.height,
        display: imgDims.width && imgDims.height ? "block" : "none",
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 2,
      }}
    />
  );
};

export default NumberedGridOverlay;
