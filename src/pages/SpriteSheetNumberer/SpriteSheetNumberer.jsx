import React, { useState } from "react";
import NumberedGridOverlay from "./components/NumberedGridOverlay";
import ImageWithOverlay from "./components/ImageWithOverlay";

const SpriteSheetCellNumberer = () => {
  const [image, setImage] = useState(null);
  const DEFAULT_COLUMNS = 2;
  const DEFAULT_ROWS = 2;
  const DEFAULT_FONT_SIZE = 18;
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [imgUrl, setImgUrl] = useState("");
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);

  const [isDragging, setIsDragging] = useState(false);

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

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageUpload({ target: { files: e.dataTransfer.files } });
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };



  return (
    <div style={{ padding: 24 }}>
      <h2>Spritesheet Cell Numberer</h2>
      <div style={{ margin: "16px 0" }}>
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
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        style={{
          border: isDragging ? '2px solid #4078c0' : '2px dashed #bbb',
          borderRadius: 8,
          padding: 24,
          marginBottom: 20,
          background: isDragging ? '#eaf3ff' : '#fafbfc',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'border 0.2s, background 0.2s',
          maxWidth: 400,
          minHeight: 120,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
        <span>Drag and drop your spritesheet here, or click to choose a file.</span>
        {imgUrl && <div style={{fontSize: 13, color: '#888', marginTop: 8}}>Drop a new image to replace, or click to choose another file.</div>}
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
