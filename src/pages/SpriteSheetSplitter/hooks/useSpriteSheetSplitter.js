import { useState, useRef, useEffect } from 'react';

export default function useSpriteSheetSplitter() {
  const [image, setImage] = useState(null);
  const [splitMode, setSplitMode] = useState('size');
  const [cellWidth, setCellWidth] = useState('');
  const [cellHeight, setCellHeight] = useState('');
  const [columns, setColumns] = useState('2');
  const [rows, setRows] = useState('2');
  const [frames, setFrames] = useState([]);
  const [error, setError] = useState('');
  const [imgInfo, setImgInfo] = useState(null);

  // Set default cellWidth/cellHeight to half the image size when image info is available
  useEffect(() => {
    if (imgInfo && imgInfo.width && imgInfo.height) {
      setCellWidth(Math.floor(imgInfo.width / 2).toString());
      setCellHeight(Math.floor(imgInfo.height / 2).toString());
    }
    // Only set when splitMode is 'size', otherwise let columns/rows take precedence
    // eslint-disable-next-line
  }, [imgInfo]);

  const [paddingLeft, setPaddingLeft] = useState(0);
  const [paddingRight, setPaddingRight] = useState(0);
  const [paddingTop, setPaddingTop] = useState(0);
  const [paddingBottom, setPaddingBottom] = useState(0);
  const imgRef = useRef();

  return {
    image, setImage,
    splitMode, setSplitMode,
    cellWidth, setCellWidth,
    cellHeight, setCellHeight,
    columns, setColumns,
    rows, setRows,
    frames, setFrames,
    error, setError,
    imgInfo, setImgInfo,
    paddingLeft, setPaddingLeft,
    paddingRight, setPaddingRight,
    paddingTop, setPaddingTop,
    paddingBottom, setPaddingBottom,
    imgRef
  };
}
