import React from 'react';
import '../styles/Annotation.css';

function Container({ allowTouch, children, className = '', style, onMouseLeave, onTouchCancel, innerRef }) {
  return (
    <div
      className={`annotation-container ${className}`}
      data-allow-touch={allowTouch}
      style={style}
      ref={innerRef}
      onMouseLeave={onMouseLeave}
      onTouchCancel={onTouchCancel}
    >
      {children}
    </div>
  );
}

export default Container;
