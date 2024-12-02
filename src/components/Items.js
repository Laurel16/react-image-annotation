import React from 'react';
import '../styles/Annotation.css';

const Items = React.forwardRef(({ className = '', style = {}, children }, ref) => {
    return (
      <div className={`annotation-items ${className}`} style={style} ref={ref}>
        {children}
      </div>
    );
  });

export default Items;
