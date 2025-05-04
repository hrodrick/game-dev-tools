// Utility to combine images into a spritesheet grid
// images: [{ url, file }], imagesPerRow: number
// Returns a Promise that resolves to a dataURL
export async function combineImagesToSpriteSheet(images, imagesPerRow, canvas) {
  if (!images.length) throw new Error("No images provided");
  if (imagesPerRow < 1) throw new Error("Images per row must be at least 1");

  // Load all images and get their sizes
  const loadedImgs = await Promise.all(
    images.map((imgObj) => {
      return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.onload = () => resolve({ img, width: img.width, height: img.height });
        img.onerror = reject;
        img.src = imgObj.url;
      });
    })
  );
  const rows = Math.ceil(loadedImgs.length / imagesPerRow);
  const rowHeights = Array(rows).fill(0);
  const colWidths = Array(imagesPerRow).fill(0);
  for (let i = 0; i < loadedImgs.length; i++) {
    const row = Math.floor(i / imagesPerRow);
    const col = i % imagesPerRow;
    rowHeights[row] = Math.max(rowHeights[row], loadedImgs[i].height);
    colWidths[col] = Math.max(colWidths[col], loadedImgs[i].width);
  }
  const canvasWidth = colWidths.reduce((a, b) => a + b, 0);
  const canvasHeight = rowHeights.reduce((a, b) => a + b, 0);
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext("2d");
  let y = 0;
  for (let row = 0, imgIdx = 0; row < rows; row++) {
    let x = 0;
    for (let col = 0; col < imagesPerRow && imgIdx < loadedImgs.length; col++, imgIdx++) {
      const { img, width, height } = loadedImgs[imgIdx];
      ctx.drawImage(img, x, y, width, height);
      x += colWidths[col];
    }
    y += rowHeights[row];
  }
  return canvas.toDataURL();
}
