import React from 'react';
import '../../styles/Rectangle.css';

function Rectangle({ annotation, className = '', style = {}, active }) {
  const { geometry } = annotation;
  if (!geometry) return null;

  return (
    <div
      className={`rectangle-container ${className} ${active ? 'active' : ''}`}
      style={{
        left: `${geometry.x}%`,
        top: `${geometry.y}%`,
        height: `${geometry.height}%`,
        width: `${geometry.width}%`,
        ...style,
      }}
    />
  );
}

export default Rectangle;
