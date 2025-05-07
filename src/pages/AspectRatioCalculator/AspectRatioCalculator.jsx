import React, { useState } from "react";
import { getAspectRatio } from "../../Utils/Utils";
import Footer from "../../components/Footer";
import QuickLinks from "../../components/QuickLinks";

export default function AspectRatioCalculator() {
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const ratio = getAspectRatio(width, height);

  // State for Height Calculator (Width + Ratio => Height)
  const [hcWidth, setHcWidth] = useState(1920);
  const [hcRatioNum, setHcRatioNum] = useState(16);
  const [hcRatioDen, setHcRatioDen] = useState(9);
  const hcRatio = hcRatioDen !== 0 ? hcRatioNum / hcRatioDen : 0;
  const hcHeight = hcRatio > 0 ? (hcWidth / hcRatio).toFixed(2) : '';

  // State for Width Calculator (Height + Ratio => Width)
  const [wcHeight, setWcHeight] = useState(1080);
  const [wcRatioNum, setWcRatioNum] = useState(16);
  const [wcRatioDen, setWcRatioDen] = useState(9);
  const wcRatio = wcRatioDen !== 0 ? wcRatioNum / wcRatioDen : 0;
  const wcWidth = wcRatio > 0 ? (wcHeight * wcRatio).toFixed(2) : '';

  return (
    <div className="flex flex-col gap-4 w-full">
      <header className="flex flex-col gap-4">
        <h1 className="text-xl font-bold">Aspect Ratio Calculator</h1>
        <h2>Quickly calculate aspect ratios and find common screen resolutions</h2>
      </header>
      {/* Responsive row of calculators */}
      <div className="flex flex-col md:flex-row gap-4 w-full justify-center items-stretch">
        {/* Aspect Ratio Calculator */}
        <fieldset className="box-content fieldset bg-base-200 border-base-300 rounded-box border gap-4 p-4 md:w-64 flex-1">
          <legend className="fieldset-legend">Aspect Ratio Calculator</legend>
          <div className="flex flex-col gap-2">
            <label>Width: </label>
            <input className="input" type="number" value={width} min={1} onChange={(e) => setWidth(Number(e.target.value))}/>
          </div>
          <div className="flex flex-col gap-2">
            <label>Height: </label>
            <input className="input" type="number" value={height} min={1} onChange={(e) => setHeight(Number(e.target.value))}/>
          </div>
          <label className="text-base flex flex-row gap-2">Aspect Ratio: <p className="font-bold">{ratio}</p></label>
        </fieldset>
        {/* Height Calculator */}
        <fieldset className="box-content fieldset bg-base-200 border-base-300 rounded-box border gap-4 p-4 md:w-64 flex-1">
          <legend className="fieldset-legend">Height from Width & Ratio</legend>
          <div className="flex flex-col gap-2">
            <label>Width: </label>
            <input className="input" type="number" value={hcWidth} min={1} onChange={(e) => setHcWidth(Number(e.target.value))}/>
          </div>
          <div className="flex flex-col gap-2">
            <label>Aspect Ratio (W/H): </label>
            <div className="flex flex-row items-center gap-2">
              <input
                className="input w-16"
                type="number"
                min={1}
                value={hcRatioNum}
                onChange={e => setHcRatioNum(Number(e.target.value))}
              />
              <span className="text-lg font-bold">:</span>
              <input
                className="input w-16"
                type="number"
                min={1}
                value={hcRatioDen}
                onChange={e => setHcRatioDen(Number(e.target.value))}
              />
            </div>
          </div>
          <label className="text-base flex flex-row gap-2">Height: <p className="font-bold">{hcHeight}</p></label>
        </fieldset> 
        {/* Width Calculator */}
        <fieldset className="box-content fieldset bg-base-200 border-base-300 rounded-box border gap-4 p-4 md:w-64 flex-1">
          <legend className="fieldset-legend">Width from Height & Ratio</legend>
          <div className="flex flex-col gap-2">
            <label>Height: </label>
            <input className="input" type="number" value={wcHeight} min={1} onChange={(e) => setWcHeight(Number(e.target.value))}/>
          </div>
          <div className="flex flex-col gap-2">
            <label>Aspect Ratio (W/H): </label>
            <div className="flex flex-row items-center gap-2">
              <input
                className="input w-16"
                type="number"
                min={1}
                value={wcRatioNum}
                onChange={e => setWcRatioNum(Number(e.target.value))}
              />
              <span className="text-lg font-bold">:</span>
              <input
                className="input w-16"
                type="number"
                min={1}
                value={wcRatioDen}
                onChange={e => setWcRatioDen(Number(e.target.value))}
              />
            </div>
          </div>
          <label className="text-base flex flex-row gap-2">Width: <p className="font-bold">{wcWidth}</p></label>
        </fieldset>
      </div>
      <hr className="divider" />
      <QuickLinks linkIds={["resolutions", "safeArea"]} />
      <Footer />
    </div>
  );
}
