import React from 'react';
import '../styles/Annotation.css';

const Img = React.forwardRef(({ className = '', style = {}, alt, src, draggable = false }, ref) => {
    return (
      <img
        className={`annotation-img ${className}`}
        style={style}
        alt={alt}
        src={src}
        draggable={draggable}
        ref={ref}
      />
    );
  });
  

export default Img;
