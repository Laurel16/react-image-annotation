import { useState, useRef, useCallback } from 'react';
import { getOffsetCoordPercentage } from './offsetCoordinates';

export const useRelativeMousePos = () => {
  // Vérification SSR
  if (typeof window === 'undefined') {
    console.warn('[useRelativeMousePos] Hook utilisé en mode SSR.');
    return {
      innerRef: () => {},
      onMouseMove: () => {},
      onMouseLeave: () => {},
      onTouchMove: () => {},
      onTouchLeave: () => {},
      x: null,
      y: null,
    };
  }

  const [mousePos, setMousePos] = useState({ x: null, y: null });
  const containerRef = useRef(null);

  const innerRef = useCallback((el) => {
    if (!el) {
      console.warn('[innerRef] Aucun élément DOM fourni.');
      return;
    }
    containerRef.current = el;
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!containerRef.current) {
      console.warn('[onMouseMove] Référence containerRef est null.');
      return;
    }
    try {
      const xyState = getOffsetCoordPercentage(e, containerRef.current);
      setMousePos(xyState);
    } catch (error) {
      console.error('[onMouseMove] Erreur lors du calcul des coordonnées :', error);
    }
  }, []);

  const onTouchMove = useCallback((e) => {
    if (!containerRef.current) {
      console.warn('[onTouchMove] Référence containerRef est null.');
      return;
    }
    if (e.targetTouches.length === 1) {
      const touch = e.targetTouches[0];
      const rect = containerRef.current.getBoundingClientRect();
      
      if (!rect.width || !rect.height) {
        console.warn('[onTouchMove] Dimensions de containerRef non disponibles.');
        return;
      }

      const offsetX = touch.clientX - rect.left;
      const offsetY = touch.clientY - rect.top;

      setMousePos({
        x: (offsetX / rect.width) * 100,
        y: (offsetY / rect.height) * 100,
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
    innerRef, // À attacher à l'élément suivi
    onMouseMove,
    onMouseLeave,
    onTouchMove,
    onTouchLeave,
    x: mousePos.x, // Coordonnée X en pourcentage
    y: mousePos.y, // Coordonnée Y en pourcentage
  };
};