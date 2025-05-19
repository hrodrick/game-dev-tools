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
import ResolutionsByRatio from "./pages/ResolutionsByRatio/ResolutionsByRatio";
import RecommendedAssets from "./pages/RecommendedAssets/RecommendedAssets";
import About from "./pages/About/About";

export default function App() {
  return (
    <div className="bg-base-100 w-full">
      <Header />
      <div className="flex flex-col items-center min-h-screen p-4">
        <div className="w-full max-w-4xl bg-base-100 p-6 rounded-lg shadow-md">
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
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
