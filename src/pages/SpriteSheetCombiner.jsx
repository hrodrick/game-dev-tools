import React, { useRef, useState } from 'react';

export default function SpriteSheetCombiner() {
  const [images, setImages] = useState([]);
  const [spriteSheetUrl, setSpriteSheetUrl] = useState(null);
  const [error, setError] = useState('');
  const canvasRef = useRef();

  const handleFileChange = (e) => {
    setError('');
    setSpriteSheetUrl(null);
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const imgObjs = files.map(file => {
      return { file, url: URL.createObjectURL(file) };
    });
    setImages(imgObjs);
  };

  const handleCombine = () => {
    setError('');
    setSpriteSheetUrl(null);
    if (!images.length) {
      setError('Please upload at least one image.');
      return;
    }
    // Load all images and get max height
    Promise.all(images.map(imgObj => {
      return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.onload = () => resolve({ img, width: img.width, height: img.height });
        img.onerror = reject;
        img.src = imgObj.url;
      });
    })).then(loadedImgs => {
      const totalWidth = loadedImgs.reduce((sum, { width }) => sum + width, 0);
      const maxHeight = loadedImgs.reduce((max, { height }) => Math.max(max, height), 0);
      const canvas = canvasRef.current;
      canvas.width = totalWidth;
      canvas.height = maxHeight;
      const ctx = canvas.getContext('2d');
      let x = 0;
      loadedImgs.forEach(({ img, width, height }) => {
        ctx.drawImage(img, x, 0, width, height);
        x += width;
      });
      setSpriteSheetUrl(canvas.toDataURL());
    }).catch(() => {
      setError('Failed to load one or more images.');
    });
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <h2>Sprite Sheet Combiner</h2>
      <div style={{ margin: '18px 0', display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
        <button
          onClick={handleCombine}
          style={{ padding: '8px 20px', background: '#4078c0', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}
        >
          Combine
        </button>
      </div>
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      {images.length > 0 && (
        <div style={{ margin: '18px 0' }}>
          <h4>Preview:</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {images.map((img, i) => (
              <img key={i} src={img.url} alt={`img${i}`} style={{ width: 64, height: 64, objectFit: 'contain', border: '1px solid #bbb', borderRadius: 4 }} />
            ))}
          </div>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {spriteSheetUrl && (
        <div style={{ margin: '24px 0' }}>
          <h4>Sprite Sheet Result:</h4>
          <img src={spriteSheetUrl} alt="sprite sheet result" style={{ maxWidth: '100%', border: '1px solid #bbb', borderRadius: 8 }} />
          <br />
          <a href={spriteSheetUrl} download="sprite_sheet.png" style={{ display: 'inline-block', marginTop: 10, color: '#4078c0', textDecoration: 'underline', fontSize: 16 }}>
            Download Sprite Sheet
          </a>
        </div>
      )}
    </div>
  );
}
