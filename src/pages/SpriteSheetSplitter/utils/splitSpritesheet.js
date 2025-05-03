export function splitSpritesheet({
  img,
  splitMode,
  cellWidth,
  cellHeight,
  columns,
  rows,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
}) {
  let w, h, splitCols, splitRows;
  const imgW = img.naturalWidth;
  const imgH = img.naturalHeight;
  const padL = parseInt(paddingLeft, 10) || 0;
  const padR = parseInt(paddingRight, 10) || 0;
  const padT = parseInt(paddingTop, 10) || 0;
  const padB = parseInt(paddingBottom, 10) || 0;
  if (imgW - padL - padR <= 0 || imgH - padT - padB <= 0) {
    throw new Error("Paddings are too large for this image.");
  }
  let usableW = imgW - padL - padR;
  let usableH = imgH - padT - padB;
  if (splitMode === "size") {
    w = parseInt(cellWidth, 10);
    h = parseInt(cellHeight, 10);
    splitCols = Math.floor(usableW / w);
    splitRows = Math.floor(usableH / h);
    if (splitCols === 0 || splitRows === 0) {
      throw new Error("Cell size is too large for this image or paddings.");
    }
  } else {
    const parsedCols = Number(columns);
    const parsedRows = Number(rows);
    w = Math.floor(usableW / parsedCols);
    h = Math.floor(usableH / parsedRows);
    splitCols = parsedCols;
    splitRows = parsedRows;
    if (w === 0 || h === 0) {
      throw new Error(
        "Too many columns or rows for this image size or paddings.",
      );
    }
  }
  const tempFrames = [];
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  for (let y = 0; y < splitRows; y++) {
    for (let x = 0; x < splitCols; x++) {
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, padL + x * w, padT + y * h, w, h, 0, 0, w, h);
      tempFrames.push(canvas.toDataURL());
    }
  }
  return tempFrames;
}
