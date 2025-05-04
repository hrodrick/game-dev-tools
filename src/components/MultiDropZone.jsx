import React, { useRef, useState } from "react";

/**
 * MultiDropzone
 * Props:
 * - onFilesSelected(files: FileList|Array<File>)
 * - multiple (default: true)
 * - label (default: "Drag & drop images here")
 * - accept (default: "image/*")
 * - style (optional)
 * - children (optional, for custom content inside)
 */
export default function MultiDropZone({
  onFilesSelected,
  multiple = true,
  label = "Drag & drop images here",
  accept = "image/*",
  style = {},
  children,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef();

  const handleFiles = (files) => {
    if (onFilesSelected && files && files.length > 0) {
      onFilesSelected(files);
    }
  };

  return (
    <div
      onDrop={e => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
        e.dataTransfer.clearData();
      }}
      onDragOver={e => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={e => {
        e.preventDefault();
        setIsDragging(false);
      }}
      onClick={() => inputRef.current && inputRef.current.click()}
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
        ...style,
      }}
      tabIndex={0}
      aria-label={label}
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={e => handleFiles(e.target.files)}
        style={{ display: "none" }}
        ref={inputRef}
      />
      {children ? children : (
        <span style={{ fontSize: 15 }}>
          {label}
          <br />
          <span style={{ color: "#888", fontSize: 13 }}>
            or click to select {multiple ? "files" : "a file"}
          </span>
        </span>
      )}
    </div>
  );
}
