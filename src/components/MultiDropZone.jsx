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
  className = {},
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
      className={"flex flex-col justify-center gap-4 p-4 min-h-32 hover:opacity-80 hover:cursor-pointer " + (isDragging ? "bg-base-100 border-2 border-primary border-solid" : "bg-neutral border-2 border-neutral-content border-dashed") + " " + className}
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
        <span className="text-base text-center text-neutral-content w-full">
          {label}
          <br />
          <span className="text-neutral-content opacity-50 text-center w-full">
            or click to select {multiple ? "files" : "a file"}
          </span>
        </span>
      )}
    </div>
  );
}
