import React from 'react';
import '../../styles/Editor.css'; // Import du fichier CSS
import TextEditor from '../TextEditor';

function Editor({
  annotation, 
  className = '', 
  style = {}, 
  onChange, 
  onSubmit
}) {
  const { geometry } = annotation;
  if (!geometry) return null;

  return (
    <div
      className={`editor-container ${className}`} // Ajout de la classe CSS
      style={{
        left: `${geometry.x}%`,
        top: `${geometry.y + geometry.height}%`,
        ...style, // Ajout de styles dynamiques si nécessaire
      }}
    >
      <TextEditor
        onChange={e => onChange({
          ...annotation,
          data: {
            ...annotation.data,
            text: e.target.value,
          },
        })}
        onSubmit={onSubmit}
        value={annotation.data && annotation.data.text}
      />
    </div>
  );
}

export default Editor;
