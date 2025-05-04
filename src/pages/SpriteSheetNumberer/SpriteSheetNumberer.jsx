import React, { useState } from "react";
import ImageWithOverlay from "./components/ImageWithOverlay";
import MultiDropZone from "../../components/MultiDropZone";

const SpriteSheetCellNumberer = () => {
  const [image, setImage] = useState(null);
  const DEFAULT_COLUMNS = 2;
  const DEFAULT_ROWS = 2;
  const DEFAULT_FONT_SIZE = 18;
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [imgUrl, setImgUrl] = useState("");
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);

  // No longer need isDragging or drag/drop handlers

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImgUrl(URL.createObjectURL(file));
      setColumns(DEFAULT_COLUMNS);
      setRows(DEFAULT_ROWS);
      setFontSize(DEFAULT_FONT_SIZE);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Spritesheet Cell Numberer</h2>
      <MultiDropZone
        onFilesSelected={files => handleImageUpload({ target: { files } })}
        multiple={false}
        accept="image/*"
        label={imgUrl ? "Drop a new image to replace, or click to choose another file." : "Drag and drop your spritesheet here, or click to choose a file."}
        style={{
          marginBottom: 24,
          transition: "border 0.2s, background 0.2s",
          maxWidth: 400,
          minHeight: 100,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
      <div style={{ margin: "16px 0", textAlign: "center" }}>
        <label>
          Columns:
          <input
            type="number"
            min="1"
            value={columns}
            onChange={(e) => setColumns(Number(e.target.value))}
            style={{ width: 60, marginLeft: 8 }}
          />
        </label>
        <label style={{ marginLeft: 24 }}>
          Rows:
          <input
            type="number"
            min="1"
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
            style={{ width: 60, marginLeft: 8 }}
          />
        </label>
        <label style={{ marginLeft: 24 }}>
          Number Size:
          <input
            type="number"
            min="8"
            max="128"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            style={{ width: 60, marginLeft: 8 }}
          />
        </label>
      </div>
      {imgUrl && (
        <ImageWithOverlay
          imgUrl={imgUrl}
          columns={columns}
          rows={rows}
          fontSize={fontSize}
        />
      )}
    </div>
  );
};

export default SpriteSheetCellNumberer;
