import React, { useState, useEffect, useRef } from 'react';
import { getOffsetCoordPercentage } from './offsetCoordinates';

const useRelativeMousePos = () => {
  const [position, setPosition] = useState({ x: null, y: null });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const coords = getOffsetCoordPercentage(e, containerRef.current);
    console.log('[useRelativeMousePos] handleMouseMove:', coords);
    setPosition(coords);
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current || e.targetTouches.length !== 1) return;
    const touch = e.targetTouches[0];
    const boundingRect = containerRef.current.getBoundingClientRect();

    const offsetX = touch.pageX - boundingRect.left;
    const offsetY = touch.pageY - boundingRect.top;

    const coords = {
      x: (offsetX / boundingRect.width) * 100,
      y: (offsetY / boundingRect.height) * 100,
    };

    console.log('[useRelativeMousePos] handleTouchMove:', coords);
    setPosition(coords);
  };

  const handleMouseLeave = () => {
    console.log('[useRelativeMousePos] handleMouseLeave: Resetting position');
    setPosition({ x: null, y: null });
  };

  const handleTouchLeave = () => {
    console.log('[useRelativeMousePos] handleTouchLeave: Resetting position');
    setPosition({ x: null, y: null });
  };

  return {
    ref: containerRef,
    position,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      onTouchMove: handleTouchMove,
      onTouchLeave: handleTouchLeave,
    },
  };
};


// Hook to HOC adapter (si nécessaire pour la compatibilité)
const withRelativeMousePos = (key = 'relativeMousePos') => (DecoratedComponent) => {
  const WithRelativeMousePos = (props) => {
    const { ref, position, handlers } = useRelativeMousePos();

    const hocProps = {
      [key]: {
        innerRef: ref,
        ...handlers,
        x: position.x,
        y: position.y,
      },
    };

    return <DecoratedComponent {...props} {...hocProps} />;
  };

  WithRelativeMousePos.displayName = `withRelativeMousePos(${DecoratedComponent.displayName || DecoratedComponent.name || 'Component'})`;

  return WithRelativeMousePos;
};

export { useRelativeMousePos };
export default withRelativeMousePos;
