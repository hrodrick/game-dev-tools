import React from "react";
import GridOverlay from "./components/GridOverlay";
import DownloadAllButton from "./components/DownloadAllButton";
import useSpriteSheetSplitter from "./hooks/useSpriteSheetSplitter";
import { splitSpritesheet } from "./utils/splitSpritesheet";
import MultiDropZone from "../../components/MultiDropZone";
import Footer from "../../components/Footer";
import ToolPageLayout from "../../components/ToolPageLayout";

export default function SpriteSheetSplitter() {
  const {
    image,
    setImage,
    splitMode,
    setSplitMode,
    cellWidth,
    setCellWidth,
    cellHeight,
    setCellHeight,
    columns,
    setColumns,
    rows,
    setRows,
    frames,
    setFrames,
    error,
    setError,
    imgInfo,
    setImgInfo,
    paddingLeft,
    setPaddingLeft,
    paddingRight,
    setPaddingRight,
    paddingTop,
    setPaddingTop,
    paddingBottom,
    setPaddingBottom,
    imgRef,
  } = useSpriteSheetSplitter();

  const handleFileChange = (e) => {
    setFrames([]);
    setError("");
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImage(url);
    // Store file info
    setImgInfo({
      name: file.name,
      size: file.size,
      width: null,
      height: null,
    });
  };

  const handleSplit = () => {
    setError("");
    setFrames([]);
    if (!imgRef.current || !imgInfo) return;
    try {
      const frames = splitSpritesheet({
        img: imgRef.current,
        splitMode,
        cellWidth,
        cellHeight,
        columns,
        rows,
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingBottom,
      });
      setFrames(frames);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ToolPageLayout
      title="Sprite Sheet Splitter"
      description="Upload a sprite sheet image, set the split mode (by cell size or columns/rows), and split the image into individual frames of equal size. You can also add global paddings to the sprite sheet."
      leftContent={
        <>
          <MultiDropZone
            onFilesSelected={files => handleFileChange({ target: { files } })}
            multiple={false}
            label="Drag & drop image here"
          />
          {error && (
            <div className="text-error text-sm">{error}</div>
          )}
          {image && (
            <div className="flex flex-col gap-4 pt-4">
              {imgInfo && (
                <div className="text-sm">
                  <span>File: {imgInfo.name}</span>
                  {typeof imgInfo.width === "number" && typeof imgInfo.height === "number" && <span>{" "} | Size: {imgInfo.width} × {imgInfo.height} px</span>}
                  <span>{" "} | Disk:{" "} {imgInfo.size >= 1048576 ? (imgInfo.size / 1048576).toFixed(2) + " MB" : (imgInfo.size / 1024).toFixed(2) + " KB"}</span>
                </div>
              )}
              <div className="max-w-full min-h-24 relative inline-block">
                <img ref={imgRef} src={image} alt="sprite sheet" 
                  className="rounded-2xl w-full h-full block"
                  onLoad={(e) => {
                    setError("");
                    if (imgInfo) {
                      setImgInfo((info) => info ? { ...info, width: e.target.naturalWidth, height: e.target.naturalHeight,} : info,);
                    }
                  }}
                  onError={() => setError("Failed to load image.")}
                  id="sprite-sheet-preview"
                />
                <GridOverlay
                  cellWidth={
                    splitMode === "size" 
                      ? parseInt(cellWidth, 10) || 1 
                      : columns ? Math.floor(imgInfo?.width / columns) 
                      : 1
                  }
                  cellHeight={
                    splitMode === "size"
                      ? parseInt(cellHeight, 10) || 1
                      : rows ? Math.floor(imgInfo?.height / rows)
                      : 1
                  }
                  imgRef={imgRef}
                  splitMode={splitMode}
                  columns={columns}
                  rows={rows}
                  paddingLeft={paddingLeft}
                  paddingRight={paddingRight}
                  paddingTop={paddingTop}
                  paddingBottom={paddingBottom}
                />
              </div>
            </div>
          )}
        </>
      }
      fieldsetContent={
        <>
          <label className="md:hidden text-sm text-neutral-content italic w-full text-center">Preview the changes above</label>
          {/* Split Mode */}
          <div className="flex flex-col gap-2">
            <label className="label text-base text-neutral-content font-bold">Split type</label>
            <label className="text-sm">
              <input className="radio radio-info mr-2" type="radio" name="splitMode" value="size" 
              checked={splitMode === "size"} onChange={() => setSplitMode("size")}
            />
            By Cell size
            </label>
            <label className="text-sm">
              <input className="radio radio-info mr-2" type="radio" name="splitMode" value="grid" 
                checked={splitMode === "grid"} onChange={() => setSplitMode("grid")}
              />
              By Columns/Rows
            </label>
          </div>
          {/* Cell size or Columns/Rows */}
          {splitMode === "size" ? (
            <div className="flex flex-col gap-1">
              <label htmlFor="cellWidth">Width</label>
              <input className="input" id="cellWidth" type="number" min={1} placeholder="Cell Width" value={cellWidth}
                onChange={(e) => setCellWidth(e.target.value)}
              />
              <label className="pt-3" htmlFor="cellHeight">Height</label>
              <input className="input" id="cellHeight" type="number" min={1} placeholder="Cell Height" value={cellHeight}
                onChange={(e) => setCellHeight(e.target.value)}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <label htmlFor="columns">Columns</label>
              <input className="input" id="columns" type="number" min={1} placeholder="Columns" value={columns}
                onChange={(e) => setColumns(e.target.value)}
              />
              <label className="pt-3" htmlFor="rows">Rows</label>
              <input className="input" id="rows" type="number" min={1} placeholder="Rows" value={rows}
                onChange={(e) => setRows(e.target.value)}
              />
            </div>
          )}
          {/* Paddings */}
          <label className="label text-base text-neutral-content font-bold">Paddings</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div>
              <label htmlFor="paddingLeft">Left</label>
              <input className="input" id="paddingLeft" type="number" min={0} placeholder="Left" value={paddingLeft}
                onChange={(e) => setPaddingLeft(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="paddingRight">Right</label>
              <input className="input" id="paddingRight" type="number" min={0} placeholder="Right" value={paddingRight}
                onChange={(e) => setPaddingRight(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="paddingTop">Top</label>
              <input className="input" id="paddingTop" type="number" min={0} placeholder="Top" value={paddingTop}
                onChange={(e) => setPaddingTop(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="paddingBottom">Bottom</label>
              <input className="input" id="paddingBottom" type="number" min={0} placeholder="Bottom" value={paddingBottom}
                onChange={(e) => setPaddingBottom(e.target.value)}
              />
            </div>
          </div>
          <button className="btn btn-neutral w-full" onClick={handleSplit}
            disabled={
              (splitMode === "size" &&
                (!cellWidth ||
                  !cellHeight ||
                  isNaN(Number(cellWidth)) ||
                  isNaN(Number(cellHeight)) ||
                  Number(cellWidth) <= 0 ||
                  Number(cellHeight) <= 0)) ||
              (splitMode === "grid" &&
                (!columns ||
                  !rows ||
                  isNaN(Number(columns)) ||
                  isNaN(Number(rows)) ||
                  Number(columns) <= 0 ||
                  Number(rows) <= 0))
            }
          >
            Split
          </button>
          {frames.length > 0 && (<p className="text-sm w-full text-center">Process complete. Results below</p>)}
        </>
      }
      resultsContent={
        frames.length > 0 && (
          <div className="flex flex-col gap-4 pt-4">
            <h2 className="text-xl font-bold">Split Frames</h2>
            <DownloadAllButton frames={frames} />
            <div className="flex flex-wrap gap-4 place-content-center-safe">
              {frames.map((frame, i) => (
                <div key={i} className="flex flex-col gap-2 items-center">
                  <img src={frame} alt={`frame ${i + 1}`} className="w-16 h-16 object-contain border border-neutral-content rounded"/>
                  <a href={frame} download={`${imgInfo.name}-${i + 1}.png`} className="text-xs text-neutral-content underline">Download</a>
                </div>
              ))}
            </div>
            <DownloadAllButton frames={frames} fileName={imgInfo?.name} />
          </div>
        )
      }
    />
  );
}
