import React from "react";
import GridOverlay from "./components/GridOverlay";
import DownloadAllButton from "./components/DownloadAllButton";
import useSpriteSheetSplitter from "./hooks/useSpriteSheetSplitter";
import { splitSpritesheet } from "./utils/splitSpritesheet";

export default function SpriteSheetSplitter() {
  const [isDragging, setIsDragging] = React.useState(false);
  const uploadInputRef = React.useRef();
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
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 32,
          marginBottom: 12,
        }}
      >
        {/* Left: Preview */}
        <div style={{ flex: 1 }}>
          <div
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDragging(false);
              if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                handleFileChange({ target: { files: e.dataTransfer.files } });
                e.dataTransfer.clearData();
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setIsDragging(false);
            }}
            onClick={() =>
              uploadInputRef.current && uploadInputRef.current.click()
            }
            style={{
              border: isDragging ? "2px solid #4078c0" : "2px dashed #bbb",
              borderRadius: 8,
              padding: 24,
              marginBottom: 12,
              background: isDragging ? "#eaf3ff" : "#fafbfc",
              textAlign: "center",
              cursor: "pointer",
              color: "#333",
              minWidth: 220,
            }}
            tabIndex={0}
            aria-label="Upload or drag and drop image"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              ref={uploadInputRef}
            />
            <span style={{ fontSize: 15 }}>
              Drag & drop image here
              <br />
              <span style={{ color: "#888", fontSize: 13 }}>
                or click to select a file
              </span>
            </span>
          </div>
          {error && (
            <div style={{ color: "red", marginBottom: 12 }}>{error}</div>
          )}
          {image && (
            <>
              {imgInfo && (
                <div
                  style={{
                    margin: "10px 0 2px 0",
                    fontSize: 15,
                    color: "#333",
                    fontWeight: 500,
                  }}
                >
                  <span>File: {imgInfo.name} </span>
                  {typeof imgInfo.width === "number" &&
                    typeof imgInfo.height === "number" && (
                      <span>
                        {" "}
                        | Size: {imgInfo.width} × {imgInfo.height} px
                      </span>
                    )}
                  <span>
                    {" "}
                    | Disk:{" "}
                    {imgInfo.size >= 1048576
                      ? (imgInfo.size / 1048576).toFixed(2) + " MB"
                      : (imgInfo.size / 1024).toFixed(2) + " KB"}
                  </span>
                </div>
              )}
              <div
                style={{
                  margin: "8px 0 18px 0",
                  position: "relative",
                  display: "inline-block",
                  maxWidth: "100%",
                  minWidth: 320,
                  minHeight: 120,
                }}
              >
                <img
                  ref={imgRef}
                  src={image}
                  alt="sprite sheet"
                  style={{
                    maxWidth: "100%",
                    maxHeight: 320,
                    border: "1px solid #bbb",
                    borderRadius: 8,
                    display: "block",
                  }}
                  onLoad={(e) => {
                    setError("");
                    if (imgInfo) {
                      setImgInfo((info) =>
                        info
                          ? {
                              ...info,
                              width: e.target.naturalWidth,
                              height: e.target.naturalHeight,
                            }
                          : info,
                      );
                    }
                  }}
                  onError={() => setError("Failed to load image.")}
                  id="sprite-sheet-preview"
                />
                <GridOverlay
                  cellWidth={
                    splitMode === "size"
                      ? parseInt(cellWidth, 10) || 1
                      : columns
                        ? Math.floor(imgInfo?.width / columns)
                        : 1
                  }
                  cellHeight={
                    splitMode === "size"
                      ? parseInt(cellHeight, 10) || 1
                      : rows
                        ? Math.floor(imgInfo?.height / rows)
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
            </>
          )}
        </div>
        {/* Right: Controls */}
        <div
          style={{
            minWidth: 250,
            maxWidth: 340,
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {/* Split Mode */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Splits</div>
            <label style={{ fontWeight: 500, marginRight: 16 }}>
              <input
                type="radio"
                name="splitMode"
                value="size"
                checked={splitMode === "size"}
                onChange={() => setSplitMode("size")}
                style={{ marginRight: 4 }}
              />
              By Width/Height
            </label>
            <label style={{ fontWeight: 500 }}>
              <input
                type="radio"
                name="splitMode"
                value="grid"
                checked={splitMode === "grid"}
                onChange={() => setSplitMode("grid")}
                style={{ marginRight: 4 }}
              />
              By Columns/Rows
            </label>
          </div>
          {/* Width/Height or Columns/Rows */}
          <div style={{ marginBottom: 8 }}>
            {splitMode === "size" ? (
              <>
                <div style={{ marginBottom: 8 }}>
                  <label
                    style={{ marginRight: 8, fontWeight: 500 }}
                    htmlFor="cellWidth"
                  >
                    Width
                  </label>
                  <input
                    id="cellWidth"
                    type="number"
                    min={1}
                    placeholder="Cell Width"
                    value={cellWidth}
                    onChange={(e) => setCellWidth(e.target.value)}
                    style={{ width: 80 }}
                  />
                </div>
                <div>
                  <label
                    style={{ marginRight: 8, fontWeight: 500 }}
                    htmlFor="cellHeight"
                  >
                    Height
                  </label>
                  <input
                    id="cellHeight"
                    type="number"
                    min={1}
                    placeholder="Cell Height"
                    value={cellHeight}
                    onChange={(e) => setCellHeight(e.target.value)}
                    style={{ width: 80 }}
                  />
                </div>
              </>
            ) : (
              <>
                <div style={{ marginBottom: 8 }}>
                  <label
                    style={{ marginRight: 8, fontWeight: 500 }}
                    htmlFor="columns"
                  >
                    Columns
                  </label>
                  <input
                    id="columns"
                    type="number"
                    min={1}
                    placeholder="Columns"
                    value={columns}
                    onChange={(e) => setColumns(e.target.value)}
                    style={{ width: 80 }}
                  />
                </div>
                <div>
                  <label
                    style={{ marginRight: 8, fontWeight: 500 }}
                    htmlFor="rows"
                  >
                    Rows
                  </label>
                  <input
                    id="rows"
                    type="number"
                    min={1}
                    placeholder="Rows"
                    value={rows}
                    onChange={(e) => setRows(e.target.value)}
                    style={{ width: 80 }}
                  />
                </div>
              </>
            )}
          </div>
          {/* Paddings */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Paddings</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div>
                <label
                  style={{ marginRight: 8, fontWeight: 500 }}
                  htmlFor="paddingLeft"
                >
                  Left
                </label>
                <input
                  id="paddingLeft"
                  type="number"
                  min={0}
                  placeholder="Left"
                  value={paddingLeft}
                  onChange={(e) => setPaddingLeft(e.target.value)}
                  style={{ width: 55 }}
                />
              </div>
              <div>
                <label
                  style={{ marginRight: 8, fontWeight: 500 }}
                  htmlFor="paddingRight"
                >
                  Right
                </label>
                <input
                  id="paddingRight"
                  type="number"
                  min={0}
                  placeholder="Right"
                  value={paddingRight}
                  onChange={(e) => setPaddingRight(e.target.value)}
                  style={{ width: 55 }}
                />
              </div>
              <div>
                <label
                  style={{ marginRight: 8, fontWeight: 500 }}
                  htmlFor="paddingTop"
                >
                  Top
                </label>
                <input
                  id="paddingTop"
                  type="number"
                  min={0}
                  placeholder="Top"
                  value={paddingTop}
                  onChange={(e) => setPaddingTop(e.target.value)}
                  style={{ width: 55 }}
                />
              </div>
              <div>
                <label
                  style={{ marginRight: 8, fontWeight: 500 }}
                  htmlFor="paddingBottom"
                >
                  Bottom
                </label>
                <input
                  id="paddingBottom"
                  type="number"
                  min={0}
                  placeholder="Bottom"
                  value={paddingBottom}
                  onChange={(e) => setPaddingBottom(e.target.value)}
                  style={{ width: 55 }}
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleSplit}
            style={{
              padding: "8px 20px",
              background: "#4078c0",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              height: 38,
            }}
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
        </div>
      </div>
      {frames.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <h4>Frames:</h4>
          <DownloadAllButton frames={frames} />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              margin: "12px 0",
            }}
          >
            {frames.map((frame, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <img
                  src={frame}
                  alt={`frame ${i}`}
                  style={{
                    width: 64,
                    height: 64,
                    objectFit: "contain",
                    border: "1px solid #ccc",
                    borderRadius: 4,
                  }}
                />
                <br />
                <a
                  href={frame}
                  download={`frame_${i + 1}.png`}
                  style={{
                    fontSize: 13,
                    color: "#4078c0",
                    textDecoration: "underline",
                  }}
                >
                  Download
                </a>
              </div>
            ))}
          </div>
          <DownloadAllButton frames={frames} />
        </div>
      )}
    </div>
  );
}
