import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import SpriteSheetCombiner from "./pages/SpriteSheetCombiner/SpriteSheetCombiner";
import SpriteSheetSplitter from "./pages/SpriteSheetSplitter/SpriteSheetSplitter";
import AspectRatioCalculator from "./pages/AspectRatioCalculator/AspectRatioCalculator";
import SafeAreaCalculator from "./pages/SafeAreaCalculator/SafeAreaCalculator";
import SpriteSheetNumberer from "./pages/SpriteSheetNumberer/SpriteSheetNumberer";
import PitchRandomizer from "./pages/PitchRandomizer/PitchRandomizer";
import InstantAudioPad from "./pages/InstantAudioPad/InstantAudioPad";
import Header from "./components/Header";
import AdPlaceholder from "./components/AdPlaceholder";
import ResolutionsByRatio from "./pages/ResolutionsByRatio/ResolutionsByRatio";
import RecommendedAssets from "./pages/RecommendedAssets/RecommendedAssets";

export default function App() {
  return (
    <div className="bg-base-100 w-full">
      <Header />
      <div className="flex flex-col md:flex-row h-full p-4">
        <div className="md:basis-1/8">
          <AdPlaceholder position="side" />
        </div>
        <div className="grow h-full p-4 md:basis-6/8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/combine" element={<SpriteSheetCombiner />} />
            <Route path="/split" element={<SpriteSheetSplitter />} />
            <Route path="/pitch-randomizer" element={<PitchRandomizer />} />
            <Route path="/instant-audio-pad" element={<InstantAudioPad />} />
            <Route path="/cell-numberer" element={<SpriteSheetNumberer />} />
            <Route path="/aspect-ratio-calculator" element={<AspectRatioCalculator />} />
            <Route path="/resolutions-by-ratio" element={<ResolutionsByRatio />} />
            <Route path="/safe-area-calculator" element={<SafeAreaCalculator />} />
            <Route path="/recommended-assets" element={<RecommendedAssets />} />
          </Routes>
        </div>
        <div className="basis-1/8 h-full">
          <AdPlaceholder position="side" />
        </div>
      </div>
    </div>
  );
}
