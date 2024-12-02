import React from 'react';
import '../../styles/Point.css'; // Assurez-vous que le chemin correspond à votre structure de projet

function Point({ annotation }) {
  const { geometry } = annotation;
  if (!geometry) return null;

  return (
    <div
      className="point-container"
      style={{
        top: `${geometry.y}%`,
        left: `${geometry.x}%`,
      }}
    />
  );
}

export default Point;
