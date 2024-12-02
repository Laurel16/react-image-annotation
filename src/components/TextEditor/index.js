import React from 'react';
import '../../styles/TextEditor.css'; // Assurez-vous que le chemin vers le fichier CSS est correct

function TextEditor({ onFocus, onBlur, onChange, onSubmit, value }) {
  return (
    <React.Fragment>
      <div className="text-editor-inner">
        <textarea
          className="text-editor-textarea"
          placeholder="Write description"
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
        ></textarea>
      </div>
      {value && (
        <div
          className="text-editor-button"
          onClick={onSubmit}
          role="button"
          tabIndex="0"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSubmit();
            }
          }}
        >
          Submit
        </div>
      )}
    </React.Fragment>
  );
}

export default TextEditor;
