import React from 'react';
import '../styles/Annotation.css';

const Container = React.forwardRef(
  ({ allowTouch, children, className = '', style, onMouseLeave, onTouchCancel }, ref) => {
    return (
      <div
        className={`annotation-container ${className}`}
        data-allow-touch={allowTouch}
        style={style}
        ref={ref}
        onMouseLeave={onMouseLeave}
        onTouchCancel={onTouchCancel}
      >
        {children}
      </div>
    );
  }
);

export default Container;
