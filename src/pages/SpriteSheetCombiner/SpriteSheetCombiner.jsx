import React, { useRef, useState } from "react";

import { combineImagesToSpriteSheet } from "./utils/combineImagesToSpriteSheet";
import MultiDropZone from "../../components/MultiDropZone";
import DownloadButton from "../../components/DownloadButton";

export default function SpriteSheetCombiner() {
  const [imagesPerRow, setImagesPerRow] = useState(4); // Default to 4 per row
  const [images, setImages] = useState([]);
  const [spriteSheetUrl, setSpriteSheetUrl] = useState(null);
  const [error, setError] = useState("");
  const canvasRef = useRef();

  const handleFileChange = (e) => {
    setError("");
    setSpriteSheetUrl(null);
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const imgObjs = files.map((file) => {
      return { file, url: URL.createObjectURL(file) };
    });
    setImages(imgObjs);
  };

  const handleCombine = async () => {
    setError("");
    setSpriteSheetUrl(null);
    try {
      const dataUrl = await combineImagesToSpriteSheet(images, imagesPerRow, canvasRef.current);
      setSpriteSheetUrl(dataUrl);
    } catch (err) {
      setError(err.message || "Failed to combine images.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl">Sprite Sheet Combiner</h1>
      <h2 className="text-lg">Combine multiple images into a single sprite sheet</h2>
      <p className="text-lg">This tool allows you to easily create a single sprite sheet from multiple images. It is ideal to create icon sets from individual icons with same size, or to combine animation sprites.</p>
      <div className="flex flex-col md:flex-row gap-4">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Settings</legend>
          <MultiDropZone
              onFilesSelected={files => handleFileChange({ target: { files } })}
              multiple={true}
              label="Drag & drop images here"
              className="min-w-48"
            />
          <label className="label">Images per row</label>
          <input id="images-per-row"
            type="number" 
            className="input min-w-48" 
            placeholder="Images per row" 
            value={imagesPerRow} 
            onChange={e => setImagesPerRow(Number(e.target.value))} 
            min={1}
            max={images.length || 100}
          />
          <button className="btn btn-neutral" onClick={handleCombine}>Combine</button>
          {error && <div className="text-error">{error}</div>}
        </fieldset>
        <canvas ref={canvasRef} className="hidden"/>
        {images.length > 0 && (
          <div className="flex flex-col gap-4">
            <h4>Selected images</h4>
            <div className="flex flex-wrap gap-2">
              {images.map((img, i) => (
                <img key={i} src={img.url} alt={`img${i}`} className="w-16 h-16 object-contain border border-neutral-100 rounded" />
              ))}
            </div>
          </div>
        )}
      </div>
      {spriteSheetUrl && (
        <div className="flex flex-col gap-4 bg-base-200 border-base-300 rounded-box w-full border p-4">
          <h4 className="text-lg font-bold">Combination Result</h4>
          <DownloadButton
            href={spriteSheetUrl}
            fileName="sprite_sheet.png"
            className="btn btn-neutral w-64"
            children = "Download Sprite Sheet"
          />
          <img
            src={spriteSheetUrl}
            alt="sprite sheet result"
            className="w-full h-auto border-1 border-neutral-100 rounded"
          />
          <DownloadButton
            href={spriteSheetUrl}
            fileName="sprite_sheet.png"
            className="btn btn-neutral w-64"
            children = "Download Sprite Sheet"
          />
        </div>
      )}
    </div>
  );
}
