import React from 'react';

export default function AdPlaceholder({ position }) {
  return (
    <div
      style={{
        background: '#e0e4ea',
        color: '#888',
        textAlign: 'center',
        borderRadius: 8,
        margin: position === 'bottom' ? '24px 0 0 0' : '0',
        width: position === 'side' ? 160 : '100%',
        height: position === 'side' ? 600 : 90,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
      }}
    >
      Ad Placeholder ({position})
    </div>
  );
}
