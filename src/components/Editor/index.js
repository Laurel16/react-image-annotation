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

  // Vérifie si l'annotation contient une géométrie
  if (!geometry) {
    console.warn('[Editor] No geometry provided in annotation:', annotation);
    return null;
  }

  const handleTextChange = (e) => {
    const updatedAnnotation = {
      ...annotation,
      data: {
        ...annotation.data,
        text: e.target.value,
      },
    };

    console.log('[Editor] Annotation updated on text change:', updatedAnnotation);
    onChange(updatedAnnotation);
  };

  const handleSubmit = () => {
    if (!annotation.geometry || !annotation.data) {
      console.warn('[Editor] Invalid annotation on submit:', annotation);
      return;
    }

    console.log('[Editor] Annotation submitted:', annotation);
    onSubmit(annotation);
  };

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
        onChange={handleTextChange}
        onSubmit={handleSubmit}
        value={annotation.data && annotation.data.text}
      />
    </div>
  );
}

export default Editor;
