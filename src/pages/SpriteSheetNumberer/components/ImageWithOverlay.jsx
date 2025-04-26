import React, { useRef, useState } from "react";
import NumberedGridOverlay from "./NumberedGridOverlay";

const ImageWithOverlay = ({ imgUrl, columns, rows, fontSize }) => {
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
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 600,
        margin: "32px auto 0 auto",
        borderRadius: 8,
        boxShadow: "0 2px 8px #0001",
        background: "#f7f7f7",
      }}
    >
      <img
        ref={imgRef}
        src={imgUrl}
        alt="Spritesheet preview"
        onLoad={handleImgLoad}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          borderRadius: 8,
        }}
      />
      {imgDims.width > 0 && imgDims.height > 0 && (
        <NumberedGridOverlay
          imageUrl={imgUrl}
          columns={columns}
          rows={rows}
          fontSize={fontSize}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            borderRadius: 8,
            background: "transparent",
          }}
          renderedWidth={imgRef.current ? imgRef.current.clientWidth : undefined}
          renderedHeight={imgRef.current ? imgRef.current.clientHeight : undefined}
        />
      )}
    </div>
  );
};

export default ImageWithOverlay;
