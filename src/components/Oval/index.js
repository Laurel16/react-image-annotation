import React from 'react';
import '../../styles/Oval.css'; // Import du fichier CSS

function Oval({ annotation, className = '', style = {}, active }) {
  const { geometry } = annotation;
  if (!geometry) return null;

  return (
    <div
      className={`oval-container ${className}`} // Ajout de la classe CSS
      style={{
        position: 'absolute',
        left: `${geometry.x}%`,
        top: `${geometry.y}%`,
        height: `${geometry.height}%`,
        width: `${geometry.width}%`,
        boxShadow: active ? '0 0 1px 1px yellow inset' : undefined, // Ajout dynamique
        ...style,
      }}
    />
  );
}

export default Oval;

