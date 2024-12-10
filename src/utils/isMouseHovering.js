import { useState, useRef, useEffect, useCallback } from 'react';

const isMouseOverElement = ({ elem, e }) => {
  if (!elem) return false;
  const rect = elem.getBoundingClientRect();
  return (
    e.clientX >= rect.left &&
    e.clientX <= rect.right &&
    e.clientY >= rect.top &&
    e.clientY <= rect.bottom
  );
};

export const useMouseHovering = () => {
  if (typeof window === 'undefined') {
    return {
      innerRef: () => {},
      isHoveringOver: false,
    };
  }
  const [isHoveringOver, setIsHoveringOver] = useState(false);
  const elementRef = useRef(null);

  const innerRef = useCallback((el) => {
    elementRef.current = el;
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!elementRef.current) return;
    
    const hovering = isMouseOverElement({ 
      elem: elementRef.current, 
      e 
    });
    
    setIsHoveringOver(hovering);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return {
    innerRef,
    isHoveringOver
  };
};