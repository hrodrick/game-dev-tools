import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import SpriteSheetCombiner from "./pages/SpriteSheetCombiner/SpriteSheetCombiner";
import SpriteSheetSplitter from "./pages/SpriteSheetSplitter/SpriteSheetSplitter";
import AspectRatioCalculator from "./pages/AspectRatioCalculator/AspectRatioCalculator";
import SafeAreaCalculator from "./pages/SafeAreaCalculator/SafeAreaCalculator";
import SpriteSheetNumberer from './pages/SpriteSheetNumberer/SpriteSheetNumberer';
import Header from './components/Header';
import AdPlaceholder from './components/AdPlaceholder';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f5f6fa' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
        <div style={{ margin: '0 12px' }}>
          <AdPlaceholder position="side" />
        </div>
        <div style={{ flex: 1, maxWidth: 900, minHeight: '70vh', padding: 16 }}>
          <nav style={{ marginBottom: 32 }}>
            <Link to="/" style={{ marginRight: 16 }}>Home</Link>
            <Link to="/combine" style={{ marginRight: 16 }}>Spritesheet Combiner</Link>
            <Link to="/split" style={{ marginRight: 16 }}>Spritesheet Splitter</Link>
            <Link to="/cell-numberer" style={{ marginRight: 16 }}>Sprite Sheet Numberer</Link>
            <Link to="/aspect-ratio-calculator" style={{ marginRight: 16 }}>Aspect Ratio Calculator</Link>
            <Link to="/safe-area-calculator" style={{ marginRight: 16 }}>Safe Area Calculator</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/combine" element={<SpriteSheetCombiner />} />
            <Route path="/split" element={<SpriteSheetSplitter />} />
            <Route path="/cell-numberer" element={<SpriteSheetNumberer />} />
            <Route path="/aspect-ratio-calculator" element={<AspectRatioCalculator />} />
            <Route path="/safe-area-calculator" element={<SafeAreaCalculator />} />
          </Routes>
        </div>
        <div style={{ margin: '0 12px' }}>
          <AdPlaceholder position="side" />
        </div>
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: 900, width: '100%' }}>
          <AdPlaceholder position="bottom" />
        </div>
      </div>
    </div>
  );
}
