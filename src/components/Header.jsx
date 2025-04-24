import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navButtonStyle = {
  padding: '10px 18px',
  margin: '0 8px',
  fontSize: '1rem',
  borderRadius: '6px',
  border: 'none',
  background: '#4078c0',
  color: 'white',
  cursor: 'pointer',
  textDecoration: 'none',
};

export default function Header() {
  const location = useLocation();
  return (
    <header style={{
      width: '100%',
      padding: '16px 0',
      background: '#222b3a',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
    }}>
      <Link to="/" style={navButtonStyle}>
        Home
      </Link>
      <Link to="/combine" style={navButtonStyle}>
        Sprite Sheet Combiner
      </Link>
      <Link to="/split" style={navButtonStyle}>
        Sprite Sheet Splitter
      </Link>
    </header>
  );
}
