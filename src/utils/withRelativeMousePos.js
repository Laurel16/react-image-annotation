import { useState, useRef, useCallback } from 'react';
import { getOffsetCoordPercentage } from './offsetCoordinates';

export const useRelativeMousePos = () => {
  const [mousePos, setMousePos] = useState({ x: null, y: null });
  const containerRef = useRef(null);

  const innerRef = useCallback((el) => {
    containerRef.current = el;
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const xyState = getOffsetCoordPercentage(e, containerRef.current);
    setMousePos(xyState);
  }, []);

  const onTouchMove = useCallback((e) => {
    if (!containerRef.current) return;
    if (e.targetTouches.length === 1) {
      const touch = e.targetTouches[0];
      const offsetX = touch.pageX - containerRef.current.offsetParent.offsetLeft;
      const offsetY = touch.pageY - containerRef.current.offsetParent.offsetTop;
      
      setMousePos({
        x: (offsetX / containerRef.current.width) * 100,
        y: (offsetY / containerRef.current.height) * 100
      });
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    setMousePos({ x: null, y: null });
  }, []);

  const onTouchLeave = useCallback(() => {
    setMousePos({ x: null, y: null });
  }, []);

  return {
    innerRef,
    onMouseMove,
    onMouseLeave,
    onTouchMove,
    onTouchLeave,
    x: mousePos.x,
    y: mousePos.y
  };
};