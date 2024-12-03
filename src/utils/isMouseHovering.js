import React, { useState, useEffect, useRef } from 'react';

// Utilitaire pour vérifier si la souris est au-dessus d'un élément
const isMouseOverElement = ({ elem, e }) => {
  if (!elem) return false;
  const rect = elem.getBoundingClientRect();
  const { clientX, clientY } = e;

  return (
    clientX >= rect.left &&
    clientX <= rect.right &&
    clientY >= rect.top &&
    clientY <= rect.bottom
  );
};

// Hook personnalisé pour détecter le survol de la souris
const useMouseHovering = () => {
  const [isHoveringOver, setIsHoveringOver] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!elementRef.current) return;
      setIsHoveringOver(isMouseOverElement({ elem: elementRef.current, e }));
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return { elementRef, isHoveringOver };
};

// Hook to HOC adapter (si nécessaire pour la compatibilité)
const isMouseHovering = (key = 'isMouseHovering') => (DecoratedComponent) => {
  const WithMouseHovering = (props) => {
    const { elementRef, isHoveringOver } = useMouseHovering();

    const hocProps = {
      [key]: {
        innerRef: elementRef,
        isHoveringOver,
      },
    };

    return <DecoratedComponent {...props} {...hocProps} />;
  };

  WithMouseHovering.displayName = `IsMouseHovering(${DecoratedComponent.displayName || DecoratedComponent.name || 'Component'})`;

  return WithMouseHovering;
};

export default isMouseHovering;

