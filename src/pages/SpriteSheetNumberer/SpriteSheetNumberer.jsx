import React, { useState } from "react";
import ImageWithOverlay from "./components/ImageWithOverlay";
import MultiDropZone from "../../components/MultiDropZone";
import ImageDetails from "../../components/ImageDetails";
import QuickLinks from "../../components/QuickLinks";
import Footer from "../../components/Footer";

const SpriteSheetCellNumberer = () => {
  const [image, setImage] = useState(null);
  const [imgInfo, setImgInfo] = useState(null);
  const DEFAULT_COLUMNS = 2;
  const DEFAULT_ROWS = 2;
  const DEFAULT_FONT_SIZE = 18;
  const DEFAULT_CELL_WIDTH = 48;
  const DEFAULT_CELL_HEIGHT = 48;
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [imgUrl, setImgUrl] = useState("");
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
  const [splitMode, setSplitMode] = useState("size");
  const [cellWidth, setCellWidth] = useState(DEFAULT_CELL_WIDTH);
  const [cellHeight, setCellHeight] = useState(DEFAULT_CELL_HEIGHT);

  // No longer need isDragging or drag/drop handlers

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImgUrl(URL.createObjectURL(file));
      setColumns(DEFAULT_COLUMNS);
      setRows(DEFAULT_ROWS);
      setFontSize(DEFAULT_FONT_SIZE);
      // Get name and size immediately
      const info = { name: file.name, size: file.size };
      // Load image to get width/height
      const img = new window.Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setImgInfo({ ...info, width: img.naturalWidth, height: img.naturalHeight });
      };
      img.onerror = () => {
        setImgInfo(info);
      };
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-col gap-4">
        <h1 className="text-xl font-bold">Sprite Sheet Cell Identifier</h1>
        <h2>Quickly identify each individual cell of your sprite sheet</h2>
      </header>
      <MultiDropZone
        onFilesSelected={files => handleImageUpload({ target: { files } })}
        multiple={false}
        accept="image/*"
        label={imgUrl ? "Drop a new image to replace, or click to choose another file." : "Drag and drop your spritesheet here, or click to choose a file."}
      />
      <ImageDetails imgInfo={imgInfo} />
      <fieldset className="box-content items-center fieldset p-4 bg-base-200 border-base-300 rounded-box border gap-4 flex flex-wrap">
        <legend className="fieldset-legend">Settings</legend>
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
        {splitMode === "size" ? (
          <>
          <div className="flex flex-col gap-2">
            <label className="label text-sm text-neutral-content font-bold">Cell Width</label>
            <input className="input" type="number" min="8" value={cellWidth} 
              onChange={(e) => setCellWidth(Number(e.target.value))} 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="label text-sm text-neutral-content font-bold">Cell Height</label>
            <input className="input" type="number" min="8" value={cellHeight} 
              onChange={(e) => setCellHeight(Number(e.target.value))} 
            />
          </div>
          </>
        ) : (
          <>
          <div className="flex flex-col gap-2">
            <label className="label text-sm text-neutral-content font-bold">Columns</label>
            <input className="input" type="number" min="1" value={columns} 
              onChange={(e) => setColumns(Number(e.target.value))} 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="label text-sm text-neutral-content font-bold">Rows</label>
            <input className="input" type="number" min="1" value={rows} 
              onChange={(e) => setRows(Number(e.target.value))} 
            />
          </div>
          </>
        )}
        <div className="flex flex-col gap-2">
          <label className="label text-sm text-neutral-content font-bold">Cell Number Size</label>
          <input className="input" type="number" min="2" max="128" value={fontSize} 
            onChange={(e) => setFontSize(Number(e.target.value))} 
          />
        </div>
      </fieldset>
      {imgUrl && (
        <ImageWithOverlay
          imgUrl={imgUrl}
          columns={columns}
          rows={rows}
          fontSize={fontSize}
          splitMode={splitMode}
          cellWidth={cellWidth}
          cellHeight={cellHeight}
        />
      )}
      <hr className="divider mt-6" />
      <QuickLinks linkIds={["combine", "split"]} />
      <Footer />
    </div>
  );
};

export default SpriteSheetCellNumberer;
