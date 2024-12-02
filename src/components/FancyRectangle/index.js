import React from 'react';
import '../../styles/FancyRectangle.css'; // Import du fichier CSS

function FancyRectangle({ annotation, className = '', style = {} }) {
  const { geometry } = annotation;
  if (!geometry) return null;

  return (
    <div
      className={`fancy-rectangle-container ${className}`} // Ajout de la classe CSS
      style={style}
    >
      <div
        className="fancy-rectangle-box"
        style={{
          height: `${geometry.y}%`,
          width: '100%',
        }}
      />
      <div
        className="fancy-rectangle-box"
        style={{
          top: `${geometry.y}%`,
          height: `${geometry.height}%`,
          width: `${geometry.x}%`,
        }}
      />
      <div
        className="fancy-rectangle-box"
        style={{
          top: `${geometry.y}%`,
          left: `${geometry.x + geometry.width}%`,
          height: `${geometry.height}%`,
          width: `${100 - (geometry.x + geometry.width)}%`,
        }}
      />
      <div
        className="fancy-rectangle-box"
        style={{
          top: `${geometry.y + geometry.height}%`,
          height: `${100 - (geometry.y + geometry.height)}%`,
          width: '100%',
        }}
      />
    </div>
  );
}

export default FancyRectangle;
