import React from 'react';
import '../styles/Annotation.css';

const Target = React.forwardRef(({ className = '', style = {}, children, onClick, onMouseUp, onMouseDown, onMouseMove }, ref) => {
    return (
      <div
        className={`annotation-target ${className}`}
        style={style}
        onClick={onClick}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        ref={ref}
      >
        {children}
      </div>
    );
  });

export default Target;
