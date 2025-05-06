import React, { useRef, useState } from "react";
import NumberedGridOverlay from "./NumberedGridOverlay";

const ImageWithOverlay = ({ imgUrl, columns, rows, fontSize, splitMode, cellWidth, cellHeight }) => {
  const imgRef = useRef(null);
  const [imgDims, setImgDims] = useState({ width: 0, height: 0 });

  const handleImgLoad = () => {
    if (imgRef.current) {
      setImgDims({
        width: imgRef.current.naturalWidth,
        height: imgRef.current.naturalHeight,
      });
    }
  };

  return (
    <div
      className="flex justify-center items-center border-4 border-neutral-content rounded w-full relative shadow-lg"
    >
      <img
        ref={imgRef}
        src={imgUrl}
        alt="Spritesheet preview"
        onLoad={handleImgLoad}
        className="w-full h-auto object-contain"
      />
      {imgDims.width > 0 && imgDims.height > 0 && (
        <NumberedGridOverlay
          imageUrl={imgUrl}
          columns={columns}
          rows={rows}
          fontSize={fontSize}
          splitMode={splitMode}
          cellWidth={cellWidth}
          cellHeight={cellHeight}
          className="absolute top-0 left-0 w-full h-full pointer-events-none rounded"
          renderedWidth={
            imgRef.current ? imgRef.current.clientWidth : undefined
          }
          renderedHeight={
            imgRef.current ? imgRef.current.clientHeight : undefined
          }
        />
      )}
    </div>
  );
};

export default ImageWithOverlay;