import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import SpriteSheetCombiner from './pages/SpriteSheetCombiner';
import SpriteSheetSplitter from './pages/SpriteSheetSplitter';
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/combine" element={<SpriteSheetCombiner />} />
            <Route path="/split" element={<SpriteSheetSplitter />} />
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
