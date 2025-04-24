import React, { useRef, useState } from 'react';
import JSZip from 'jszip';

export default function SpriteSheetSplitter() {
  const [image, setImage] = useState(null);
  const [cellWidth, setCellWidth] = useState('');
  const [cellHeight, setCellHeight] = useState('');
  const [frames, setFrames] = useState([]);
  const [error, setError] = useState('');
  const [imgInfo, setImgInfo] = useState(null); // { name, size, width, height }
  const imgRef = useRef();

  const handleFileChange = (e) => {
    setFrames([]);
    setError('');
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImage(url);
    // Store file info
    setImgInfo({
      name: file.name,
      size: file.size,
      width: null,
      height: null
    });
  };



  const handleSplit = () => {
    setError('');
    setFrames([]);
    if (!imgRef.current) return;
    const w = parseInt(cellWidth, 10);
    const h = parseInt(cellHeight, 10);
    if (!w || !h || w <= 0 || h <= 0) {
      setError('Cell width and height must be positive numbers.');
      return;
    }
    const img = imgRef.current;
    const cols = Math.floor(img.naturalWidth / w);
    const rows = Math.floor(img.naturalHeight / h);
    if (cols === 0 || rows === 0) {
      setError('Cell size is too large for this image.');
      return;
    }
    const tempFrames = [];
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, x * w, y * h, w, h, 0, 0, w, h);
        tempFrames.push(canvas.toDataURL());
      }
    }
    setFrames(tempFrames);
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <h2>Sprite Sheet Splitter</h2>
      <div style={{ margin: '18px 0', display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
        <div>
          <label style={{ fontWeight: 500, marginRight: 6 }}>Sprite Sheet Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginRight: 18 }}
          />
        </div>
        <div>
          <label style={{ fontWeight: 500, marginRight: 4 }}>Cell Width:</label>
          <input
            type="number"
            min="1"
            placeholder="Width"
            value={cellWidth}
            onChange={e => setCellWidth(e.target.value)}
            style={{ width: 80, marginRight: 16 }}
          />
        </div>
        <div>
          <label style={{ fontWeight: 500, marginRight: 4 }}>Cell Height:</label>
          <input
            type="number"
            min="1"
            placeholder="Height"
            value={cellHeight}
            onChange={e => setCellHeight(e.target.value)}
            style={{ width: 80, marginRight: 16 }}
          />
        </div>
        <button onClick={handleSplit} style={{ padding: '8px 20px', background: '#4078c0', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', height: 38 }}>
          Split
        </button>
      </div>
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      {image && (
        <>
          {imgInfo && (
            <div style={{ margin: '10px 0 2px 0', fontSize: 15, color: '#333', fontWeight: 500 }}>
              <span>File: {imgInfo.name} </span>
              {typeof imgInfo.width === 'number' && typeof imgInfo.height === 'number' && (
                <span> | Size: {imgInfo.width} × {imgInfo.height} px</span>
              )}
              <span>
                {' '}| Disk: {imgInfo.size >= 1048576
                  ? (imgInfo.size / 1048576).toFixed(2) + ' MB'
                  : (imgInfo.size / 1024).toFixed(2) + ' KB'}
              </span>
            </div>
          )}
          <div style={{ margin: '8px 0 18px 0', position: 'relative', display: 'inline-block', maxWidth: '100%' }}>
            <img
              ref={imgRef}
              src={image}
              alt="sprite sheet"
              style={{ maxWidth: '100%', maxHeight: 320, border: '1px solid #bbb', borderRadius: 8, display: 'block' }}
              onLoad={e => {
                setError('');
                if (imgInfo) {
                  setImgInfo(info => info ? { ...info, width: e.target.naturalWidth, height: e.target.naturalHeight } : info);
                }
              }}
              onError={() => setError('Failed to load image.')}
              id="sprite-sheet-preview"
            />
            {/* Overlay grid */}
            {cellWidth && cellHeight && !isNaN(parseInt(cellWidth)) && !isNaN(parseInt(cellHeight)) && (
              <GridOverlay
                cellWidth={parseInt(cellWidth)}
                cellHeight={parseInt(cellHeight)}
                imgRef={imgRef}
              />
            )}
          </div>
        </>
      )}
      {frames.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <h4>Frames:</h4>
          <DownloadAllButton frames={frames} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, margin: '12px 0' }}>
            {frames.map((frame, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <img src={frame} alt={`frame ${i}`} style={{ width: 64, height: 64, objectFit: 'contain', border: '1px solid #ccc', borderRadius: 4 }} />
                <br />
                <a href={frame} download={`frame_${i + 1}.png`} style={{ fontSize: 13, color: '#4078c0', textDecoration: 'underline' }}>Download</a>
              </div>
            ))}
          </div>
          <DownloadAllButton frames={frames} />
        </div>
      )}
    </div>
  );
}

function GridOverlay({ cellWidth, cellHeight, imgRef }) {
  const [overlayDims, setOverlayDims] = useState({
    displayW: 0,
    displayH: 0,
    natW: 0,
    natH: 0
  });
  React.useEffect(() => {
    if (imgRef.current) {
      setOverlayDims({
        displayW: imgRef.current.width,
        displayH: imgRef.current.height,
        natW: imgRef.current.naturalWidth,
        natH: imgRef.current.naturalHeight
      });
    }
  }, [imgRef.current, cellWidth, cellHeight]);

  const { displayW, displayH, natW, natH } = overlayDims;
  if (!displayW || !displayH || !natW || !natH) return null;

  // Calculate grid lines in natural image coordinates, then scale
  const cols = Math.floor(natW / cellWidth);
  const rows = Math.floor(natH / cellHeight);
  const scaleX = displayW / natW;
  const scaleY = displayH / natH;
  const gridLines = [];
  // Vertical lines
  for (let i = 1; i < cols; i++) {
    gridLines.push(
      <div key={`v${i}`} style={{
        position: 'absolute',
        left: i * cellWidth * scaleX,
        top: 0,
        height: displayH,
        width: 1,
        background: 'rgba(64,120,192,0.6)',
        zIndex: 2
      }} />
    );
  }
  // Horizontal lines
  for (let i = 1; i < rows; i++) {
    gridLines.push(
      <div key={`h${i}`} style={{
        position: 'absolute',
        top: i * cellHeight * scaleY,
        left: 0,
        width: displayW,
        height: 1,
        background: 'rgba(64,120,192,0.6)',
        zIndex: 2
      }} />
    );
  }
  return (
    <div style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: displayW,
      height: displayH,
      pointerEvents: 'none',
      zIndex: 2
    }}>
      {gridLines}
    </div>
  );
}

function DownloadAllButton({ frames }) {
  const [downloading, setDownloading] = useState(false);
  const handleDownloadAll = async () => {
    setDownloading(true);
    const zip = new JSZip();
    frames.forEach((frame, i) => {
      // Remove the data URL prefix
      const base64 = frame.split(',')[1];
      zip.file(`frame_${i + 1}.png`, base64, { base64: true });
    });
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'frames.zip';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    setDownloading(false);
  };
  if (!frames.length) return null;
  return (
    <button
      onClick={handleDownloadAll}
      style={{
        padding: '8px 18px',
        background: '#4078c0',
        color: 'white',
        border: 'none',
        borderRadius: 6,
        cursor: 'pointer',
        margin: '10px 0',
        fontWeight: 500
      }}
      disabled={downloading}
    >
      {downloading ? 'Preparing...' : 'Download All'}
    </button>
  );
}
