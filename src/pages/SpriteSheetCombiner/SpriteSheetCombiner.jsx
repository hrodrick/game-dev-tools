import React, { useRef, useState } from "react";
import { combineImagesToSpriteSheet } from "./utils/combineImagesToSpriteSheet";
import MultiDropZone from "../../components/MultiDropZone";
import DownloadButton from "../../components/DownloadButton";
import ToolPageLayout from "../../components/ToolPageLayout";

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
    <ToolPageLayout
      title="Sprite Sheet Combiner"
      description="Combine multiple images into a single sprite sheet. Ideal for creating icon sets or combining animation sprites."
      leftContent={
        <div className="flex flex-col gap-4">
          <MultiDropZone
            onFilesSelected={files => handleFileChange({ target: { files } })}
            multiple={true}
            label="Drag & drop images here"
            className=""
          />
          <canvas ref={canvasRef} className="hidden" />
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
      }
      fieldsetContent={
        <>
          <label className="label text-neutral-content">Images per row</label>
          <input id="images-per-row"
            type="number"
            className="input w-full"
            placeholder="Images per row"
            value={imagesPerRow}
            onChange={e => setImagesPerRow(Number(e.target.value))}
            min={1}
            max={images.length || 100}
          />
          <button className="btn btn-neutral w-full" onClick={handleCombine}>Combine</button>
          {error && <div className="text-error text-sm">{error}</div>}
        </>
      }
      resultsContent={
        spriteSheetUrl && (
          <div className="flex flex-col gap-4 bg-base-200 border-base-300 rounded-box w-full border p-4">
            <h4 className="text-lg font-bold">Combination Result</h4>
            <DownloadButton
              href={spriteSheetUrl}
              fileName="sprite_sheet.png"
              className="btn btn-neutral w-full"
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
              className="btn btn-neutral w-full"
              children = "Download Sprite Sheet"
            />
          </div>
        )
      }
    />
  );
}
