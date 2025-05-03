import React, { useRef, useEffect, useState } from "react";

const NumberedGridOverlay = ({
  imageUrl,
  columns,
  rows,
  fontSize = 18,
  style = {},
  renderedWidth,
  renderedHeight,
}) => {
  const canvasRef = useRef(null);
  const [imgDims, setImgDims] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!imageUrl) return;
    const img = new window.Image();
    img.src = imageUrl;
    img.onload = () => {
      // Use renderedWidth/renderedHeight if provided, else fallback to natural size
      setImgDims({
        width: renderedWidth || img.width,
        height: renderedHeight || img.height,
      });
      drawGrid(img, renderedWidth, renderedHeight);
    };
    img.onerror = (e) => {
      console.error("Image failed to load", imageUrl, e);
      setImgDims({ width: 0, height: 0 });
    };
  }, [imageUrl, columns, rows, fontSize, renderedWidth, renderedHeight]);

  const drawGrid = (img, rWidth, rHeight) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = rWidth || img.width;
    const h = rHeight || img.height;
    canvas.width = w;
    canvas.height = h;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
    if (columns < 1 || rows < 1) return;

    const cellWidth = w / columns;
    const cellHeight = h / rows;
    ctx.strokeStyle = "rgba(0,0,0,0.5)";
    ctx.lineWidth = 1;
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = "right";
    ctx.textBaseline = "top";

    let cellId = 0;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const x = col * cellWidth;
        const y = row * cellHeight;
        ctx.strokeRect(x, y, cellWidth, cellHeight);
        // Draw cell number with outline at top right
        const padding = 4;
        const numX = x + cellWidth - padding;
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

  return (
    <>
      <canvas
        ref={canvasRef}
        width={imgDims.width}
        height={imgDims.height}
        style={{
          maxWidth: "100%",
          height: "auto",
          border: "1px solid #ccc",
          background: "#f7f7f7",
          ...style,
        }}
      />
      {imgDims.width === 0 && (
        <div style={{ color: "red", marginTop: 8 }}>
          Image failed to load or has no dimensions.
        </div>
      )}
    </>
  );
};

export default NumberedGridOverlay;
