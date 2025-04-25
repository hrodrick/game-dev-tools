import React, { useRef, useState } from 'react';
import JSZip from 'jszip';

export default function SpriteSheetSplitter() {
  const [image, setImage] = useState(null);
  const [splitMode, setSplitMode] = useState('size'); // 'size' or 'grid'
  const [cellWidth, setCellWidth] = useState('');
  const [cellHeight, setCellHeight] = useState('');
  const [columns, setColumns] = useState('');
  const [rows, setRows] = useState('');
  const [frames, setFrames] = useState([]);
  const [error, setError] = useState('');
  const [imgInfo, setImgInfo] = useState(null); // { name, size, width, height }
  const [paddingLeft, setPaddingLeft] = useState(0);
  const [paddingRight, setPaddingRight] = useState(0);
  const [paddingTop, setPaddingTop] = useState(0);
  const [paddingBottom, setPaddingBottom] = useState(0);
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
    if (!imgRef.current || !imgInfo) return;
    let w, h;
    let splitCols, splitRows;
    const img = imgRef.current;
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;
    // Padding validation
    const padL = parseInt(paddingLeft, 10) || 0;
    const padR = parseInt(paddingRight, 10) || 0;
    const padT = parseInt(paddingTop, 10) || 0;
    const padB = parseInt(paddingBottom, 10) || 0;
    if (padL < 0 || padR < 0 || padT < 0 || padB < 0) {
      setError('Paddings cannot be negative.');
      return;
    }
    if (imgW - padL - padR <= 0 || imgH - padT - padB <= 0) {
      setError('Paddings are too large for this image.');
      return;
    }
    let usableW = imgW - padL - padR;
    let usableH = imgH - padT - padB;
    if (splitMode === 'size') {
      w = parseInt(cellWidth, 10);
      h = parseInt(cellHeight, 10);
      if (!w || !h || w <= 0 || h <= 0) {
        setError('Cell width and height must be positive numbers.');
        return;
      }
      splitCols = Math.floor(usableW / w);
      splitRows = Math.floor(usableH / h);
      if (splitCols === 0 || splitRows === 0) {
        setError('Cell size is too large for this image or paddings.');
        return;
      }
    } else {
      const parsedCols = Number(columns);
      const parsedRows = Number(rows);
      if (isNaN(parsedCols) || isNaN(parsedRows)) {
        setError('Columns and rows must be valid numbers.');
        return;
      }
      if (parsedCols <= 0 || parsedRows <= 0) {
        setError('Columns and rows must be positive numbers.');
        return;
      }
      w = Math.floor(usableW / parsedCols);
      h = Math.floor(usableH / parsedRows);
      if (w === 0 || h === 0) {
        setError('Too many columns or rows for this image size or paddings.');
        return;
      }
      splitCols = parsedCols;
      splitRows = parsedRows;
    }
    const tempFrames = [];
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    for (let y = 0; y < splitRows; y++) {
      for (let x = 0; x < splitCols; x++) {
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(
          img,
          padL + x * w,
          padT + y * h,
          w,
          h,
          0,
          0,
          w,
          h
        );
        tempFrames.push(canvas.toDataURL()); // (unchanged, just for context)

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
          <label style={{ fontWeight: 500, marginRight: 6 }}>Split Mode:</label>
          <select value={splitMode} onChange={e => setSplitMode(e.target.value)} style={{ marginRight: 18, padding: '4px 8px', fontSize: 15 }}>
            <option value="size">By Width/Height</option>
            <option value="grid">By Columns/Rows</option>
          </select>
        </div>
        {splitMode === 'size' ? (
          <>
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
          </>
        ) : (
          <>
            <div>
              <label style={{ fontWeight: 500, marginRight: 4 }}>Columns:</label>
              <input
                type="number"
                min="1"
                placeholder="Columns"
                value={columns}
                onChange={e => setColumns(e.target.value)}
                style={{ width: 80, marginRight: 16 }}
              />
            </div>
            <div>
              <label style={{ fontWeight: 500, marginRight: 4 }}>Rows:</label>
              <input
                type="number"
                min="1"
                placeholder="Rows"
                value={rows}
                onChange={e => setRows(e.target.value)}
                style={{ width: 80, marginRight: 16 }}
              />
            </div>
          </>
        )}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <label style={{ fontWeight: 500, marginRight: 4 }}>Padding:</label>
          <input
            type="number"
            min="0"
            placeholder="Left"
            value={paddingLeft}
            onChange={e => setPaddingLeft(e.target.value)}
            style={{ width: 55 }}
          />
          <span style={{ fontWeight: 500, margin: '0 2px' }}>L</span>
          <input
            type="number"
            min="0"
            placeholder="Right"
            value={paddingRight}
            onChange={e => setPaddingRight(e.target.value)}
            style={{ width: 55 }}
          />
          <span style={{ fontWeight: 500, margin: '0 2px' }}>R</span>
          <input
            type="number"
            min="0"
            placeholder="Top"
            value={paddingTop}
            onChange={e => setPaddingTop(e.target.value)}
            style={{ width: 55 }}
          />
          <span style={{ fontWeight: 500, margin: '0 2px' }}>T</span>
          <input
            type="number"
            min="0"
            placeholder="Bottom"
            value={paddingBottom}
            onChange={e => setPaddingBottom(e.target.value)}
            style={{ width: 55 }}
          />
          <span style={{ fontWeight: 500, margin: '0 2px' }}>B</span>
        </div>
        <button
          onClick={handleSplit}
          style={{ padding: '8px 20px', background: '#4078c0', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', height: 38 }}
          disabled={
            (splitMode === 'size' && (!cellWidth || !cellHeight || isNaN(Number(cellWidth)) || isNaN(Number(cellHeight)) || Number(cellWidth) <= 0 || Number(cellHeight) <= 0)) ||
            (splitMode === 'grid' && (!columns || !rows || isNaN(Number(columns)) || isNaN(Number(rows)) || Number(columns) <= 0 || Number(rows) <= 0))
          }
        >
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
            <GridOverlay
              cellWidth={splitMode === 'size' ? parseInt(cellWidth, 10) || 1 : 1}
              cellHeight={splitMode === 'size' ? parseInt(cellHeight, 10) || 1 : 1}
              imgRef={imgRef}
              splitMode={splitMode}
              columns={columns}
              rows={rows}
              paddingLeft={paddingLeft}
              paddingRight={paddingRight}
              paddingTop={paddingTop}
              paddingBottom={paddingBottom}
            />
          </div>
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
        </>
      )}
    </div>
  );
}

function GridOverlay({ cellWidth, cellHeight, imgRef, splitMode, columns, rows, paddingLeft = 0, paddingRight = 0, paddingTop = 0, paddingBottom = 0 }) {
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
  }, [imgRef.current, cellWidth, cellHeight, splitMode, columns, rows]);

  const { displayW, displayH, natW, natH } = overlayDims;
  if (!displayW || !displayH || !natW || !natH) return null;

  let gridCols, gridRows, w, h;
  if (splitMode === 'size') {
    w = cellWidth;
    h = cellHeight;
    gridCols = Math.floor(natW / w);
    gridRows = Math.floor(natH / h);
  } else {
    gridCols = parseInt(columns, 10) || 0;
    gridRows = parseInt(rows, 10) || 0;
    w = gridCols > 0 ? Math.floor(natW / gridCols) : 0;
    h = gridRows > 0 ? Math.floor(natH / gridRows) : 0;
  }
  const scaleX = displayW / natW;
  const scaleY = displayH / natH;
  const gridLines = [];

  // Paddings overlay box (magenta border)
  const padL = parseInt(paddingLeft, 10) || 0;
  const padR = parseInt(paddingRight, 10) || 0;
  const padT = parseInt(paddingTop, 10) || 0;
  const padB = parseInt(paddingBottom, 10) || 0;
  const padBox = (
    <div
      key="padding-preview"
      style={{
        position: 'absolute',
        left: padL * scaleX,
        top: padT * scaleY,
        width: (natW - padL - padR) * scaleX,
        height: (natH - padT - padB) * scaleY,
        border: '2px dashed magenta',
        boxSizing: 'border-box',
        pointerEvents: 'none',
        zIndex: 3
      }}
    />
  );
  // Grid area origin and size
  const gridOriginX = padL * scaleX;
  const gridOriginY = padT * scaleY;
  const gridAreaW = (natW - padL - padR) * scaleX;
  const gridAreaH = (natH - padT - padB) * scaleY;

  // Vertical lines (inside padded area)
  for (let i = 1; i < gridCols; i++) {
    gridLines.push(
      <div key={`v${i}`} style={{
        position: 'absolute',
        left: gridOriginX + i * (gridAreaW / gridCols),
        top: gridOriginY,
        height: gridAreaH,
        width: 1,
        background: 'rgba(64,120,192,0.6)',
        zIndex: 2
      }} />
    );
  }
  // Horizontal lines (inside padded area)
  for (let i = 1; i < gridRows; i++) {
    gridLines.push(
      <div key={`h${i}`} style={{
        position: 'absolute',
        top: gridOriginY + i * (gridAreaH / gridRows),
        left: gridOriginX,
        width: gridAreaW,
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
      {padBox}
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
