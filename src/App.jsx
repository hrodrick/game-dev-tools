import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import SpriteSheetCombiner from "./pages/SpriteSheetCombiner/SpriteSheetCombiner";
import SpriteSheetSplitter from "./pages/SpriteSheetSplitter/SpriteSheetSplitter";
import AspectRatioCalculator from "./pages/AspectRatioCalculator/AspectRatioCalculator";
import SafeAreaCalculator from "./pages/SafeAreaCalculator/SafeAreaCalculator";
import SpriteSheetNumberer from "./pages/SpriteSheetNumberer/SpriteSheetNumberer";
import PitchRandomizer from "./pages/PitchRandomizer/PitchRandomizer";
import Header from "./components/Header";
import AdPlaceholder from "./components/AdPlaceholder";

export default function App() {
  return (
    <div class="bg-base-100 w-full">
      <Header />
      <div class="flex flex-col md:flex-row h-full p-4">
        <div class="w-full md:basis-1/6">
          <AdPlaceholder position="side" />
        </div>
        <div class="grow h-full p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/combine" element={<SpriteSheetCombiner />} />
            <Route path="/split" element={<SpriteSheetSplitter />} />
            <Route path="/pitch-randomizer" element={<PitchRandomizer />} />
            <Route path="/cell-numberer" element={<SpriteSheetNumberer />} />
            <Route
              path="/aspect-ratio-calculator"
              element={<AspectRatioCalculator />}
            />
            <Route
              path="/safe-area-calculator"
              element={<SafeAreaCalculator />}
            />
          </Routes>
        </div>
        <div class="basis-1/6 h-full">
          <AdPlaceholder position="side" />
        </div>
      </div>
    </div>
  );
}
