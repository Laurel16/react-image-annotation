import React from 'react';
import '../../styles/Content.css'; // Import du fichier CSS

function Content({ annotation, style = {}, className = '' }) {
  console.log('Rendering content for annotation:', annotation);

  const { geometry } = annotation;
  if (!geometry) return null;

  const customStyle = {
    left: `${geometry?.x || 0}%`,
    top: `${(geometry?.y || 0) + (geometry?.height || 0)}%`,
    ...style,
  };

  return (
    <div 
      className={`container ${className}`} 
      style={customStyle} // Ajout de styles dynamiques
    >
      {annotation.data?.text || 'Label manquant'}
    </div>
  );
}

export default Content;
