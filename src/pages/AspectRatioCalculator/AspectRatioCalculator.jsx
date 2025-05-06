import React, { useState } from "react";
import { getAspectRatio } from "../../Utils/Utils";
import Footer from "../../components/Footer";

export default function AspectRatioCalculator() {
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);

  const ratio = getAspectRatio(width, height);

  return (
    <div className="flex flex-col gap-4 w-full">
      <header className="flex flex-col gap-4">
        <h1 className="text-xl font-bold">Aspect Ratio Calculator</h1>
        <h2>Quickly calculate aspect ratios and find common screen resolutions</h2>
      </header>
      <fieldset className="box-content fieldset bg-base-200 border-base-300 rounded-box border gap-4 p-4 md:w-64">
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
      <hr style={{ margin: "24px 0" }} />
      <div>
        <a href="/resolutions-by-ratio" className="btn btn-outline btn-info">
          Browse Common Aspect Ratios & Resolutions
        </a>
      </div>
      <Footer />
    </div>
  );
}
