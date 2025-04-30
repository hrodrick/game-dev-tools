import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f5f6fa' }}>
      <h1 style={{ marginBottom: 40 }}>GameDev Utils</h1>
      <div style={{ display: 'flex', gap: 24 }}>
        <Link to="/combine">
          <button style={buttonStyle}>Sprite Sheet Combiner</button>
        </Link>
        <Link to="/split">
          <button style={buttonStyle}>Sprite Sheet Splitter</button>
        </Link>
        <Link to="/pitch-randomizer">
          <button style={buttonStyle}>Pitch Randomizer</button>
        </Link>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: '18px 32px',
  fontSize: '1.1rem',
  borderRadius: '8px',
  border: 'none',
  background: '#4078c0',
  color: 'white',
  cursor: 'pointer',
  transition: 'background 0.2s',
};
