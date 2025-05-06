import React from "react";

const ImageDetails = ({ imgInfo }) => {
  if (!imgInfo) return null;
  return (
    <div className="text-sm">
      <span>File: {imgInfo.name}</span>
      {typeof imgInfo.width === "number" && typeof imgInfo.height === "number" && (
        <span>{" "} | Size: {imgInfo.width} × {imgInfo.height} px</span>
      )}
      <span>{" "} | Disk:{" "} {imgInfo.size >= 1048576 ? (imgInfo.size / 1048576).toFixed(2) + " MB" : (imgInfo.size / 1024).toFixed(2) + " KB"}</span>
    </div>
  );
};

export default ImageDetails;
