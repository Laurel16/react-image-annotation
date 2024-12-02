import React from 'react';
import '../../styles/Overlay.css'; // Import du fichier CSS

function Overlay({ className = '', style = {}, children }) {
  return (
    <div className={`overlay-container ${className}`} style={style}>
      {children}
    </div>
  );
}

export default Overlay;
