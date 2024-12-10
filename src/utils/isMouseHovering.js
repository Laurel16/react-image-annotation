import { useState, useRef, useEffect, useCallback } from 'react';

const isMouseOverElement = ({ elem, e }) => {
  if (!elem) {
    console.warn('[isMouseOverElement] Element is null.');
    return false;
  }
  const rect = elem.getBoundingClientRect();
  return (
    e.clientX >= rect.left &&
    e.clientX <= rect.right &&
    e.clientY >= rect.top &&
    e.clientY <= rect.bottom
  );
};

export const useMouseHovering = () => {
  // Gestion du SSR
  if (typeof window === 'undefined') {
    console.warn('[useMouseHovering] Hook called during server-side rendering.');
    return {
      innerRef: () => {},
      isHoveringOver: false,
    };
  }

  const [isHoveringOver, setIsHoveringOver] = useState(false);
  const elementRef = useRef(null);

  const innerRef = useCallback((el) => {
    if (!el) {
      console.warn('[innerRef] Received null element.');
    }
    elementRef.current = el;
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!elementRef.current) {
      console.warn('[handleMouseMove] elementRef is null.');
      return;
    }

    const hovering = isMouseOverElement({
      elem: elementRef.current,
      e,
    });

    setIsHoveringOver(hovering);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      console.warn('[useEffect] Running in non-browser environment.');
      return;
    }

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return {
    innerRef, // À connecter à l'élément à surveiller
    isHoveringOver, // État indiquant si la souris survole l'élément
  };
};
