import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useRelativeMousePos } from '../utils/withRelativeMousePos';
import { useMouseHovering } from '../utils/isMouseHovering';

// import isMouseHovering from '../utils/isMouseHovering';
// import withRelativeMousePos from '../utils/withRelativeMousePos';
import Container from './Container';
import Img from './Img';
import Items from './Items';
import Target from './Target';
import compose from '../utils/compose';
import Point from './Point';
import Editor from './Editor';
import FancyRectangle from './FancyRectangle';
import Rectangle from './Rectangle';
import Oval from './Oval';
import Content from './Content';
import Overlay from './Overlay';

import { RectangleSelector, PointSelector, OvalSelector } from '../selectors';

const Annotation = ({
  annotations = [],
  type = RectangleSelector.TYPE,
  selectors = [RectangleSelector, PointSelector, OvalSelector],
  value,
  innerRef = () => {},
  onChange = () => {},
  onSubmit = () => {},
  renderHighlight = ({ key, annotation, active }) => {
    console.log(
      '[renderHighlight] Rendering highlight for annotation:',
      annotation,
    );
    if (!annotation.geometry) {
      console.warn('[renderHighlight] Annotation has no geometry:', annotation);
    }
    switch (annotation.geometry?.type) {
      case RectangleSelector.TYPE:
        return <Rectangle key={key} annotation={annotation} active={active} />;
      case PointSelector.TYPE:
        return <Point key={key} annotation={annotation} active={active} />;
      case OvalSelector.TYPE:
        return <Oval key={key} annotation={annotation} active={active} />;
      default:
        return null;
    }
  },
  renderSelector = ({ annotation }) => {
    console.log(
      '[renderSelector] Rendering selector for annotation:',
      annotation,
    );
    if (!annotation.geometry) {
      console.warn('[renderSelector] Annotation has no geometry:', annotation);
    }
    switch (annotation.geometry?.type) {
      case RectangleSelector.TYPE:
        return <FancyRectangle annotation={annotation} />;
      case PointSelector.TYPE:
        return <Point annotation={annotation} />;
      case OvalSelector.TYPE:
        return <Oval annotation={annotation} />;
      default:
        return null;
    }
  },
  renderEditor = ({ annotation, onChange, onSubmit }) => (
    <Editor annotation={annotation} onChange={onChange} onSubmit={onSubmit} />
  ),
  renderContent = ({ key, annotation }) => {
    console.log(
      '[renderContent] Rendering content for annotation:',
      annotation,
    );
    return <Content key={key} annotation={annotation} />;
  },
  renderOverlay = ({ type }) => {
    console.log('[renderOverlay] Rendering overlay for type:', type);
    return type === PointSelector.TYPE ? (
      <Overlay>Click to Annotate</Overlay>
    ) : (
      <Overlay>Click and Drag to Annotate</Overlay>
    );
  },
  disableAnnotation = false,
  disableSelector = false,
  disableEditor = false,
  disableOverlay = false,
  activeAnnotationComparator = (a, b) => a === b,
  // relativeMousePos,
  // isMouseHovering,
  allowTouch = false,
  style,
  className,
  alt,
  src,
  children,
}) => {
  console.log('[Annotation] Props received:');
  console.log('src:', src);
  console.log('annotations:', annotations);
  console.log('value:', value);
  //console.log('relative mouse pos', relativeMousePos);

  const containerRef = useRef(null);
  const targetRef = useRef(null);
  const relativeMousePos = useRelativeMousePos();
  const isMouseHovering = useMouseHovering();

  const setInnerRef = useCallback(
    (el) => {
      
      relativeMousePos.innerRef(el);
      isMouseHovering.innerRef(el);

      containerRef.current = el;
    },
    [relativeMousePos, isMouseHovering],
  );

  const getSelectorByType = useCallback(
    (type) => {
      console.log('[getSelectorByType] Getting selector for type:', type);
      return selectors.find((s) => s.TYPE === type);
    },
    [selectors],
  );

  const callSelectorMethod = (methodName, e) => {
    console.log(`[callSelectorMethod] Invoking method: ${methodName}`, {
      event: e,
      value,
    });

    if (disableAnnotation) {
      console.warn('[callSelectorMethod] Annotation is disabled.');
      return;
    }

    const selector = getSelectorByType(type);
    if (selector?.methods?.[methodName]) {
      const updatedValue = selector.methods[methodName](value, e);

      console.log(`[callSelectorMethod] Updated annotation:`, updatedValue);

      if (updatedValue) {
        onChange(updatedValue);
      }
    } else {
      console.warn(
        `[callSelectorMethod] Method not found in selector: ${methodName}`,
      );
    }
  };

  const getTopAnnotationAt = (x, y) => {
    console.log('x et y', x, y);
    if (!annotations || annotations.length === 0) {
      console.warn('[getTopAnnotationAt] No annotations available.');
      return null;
    }

    if (x === null || y === null) {
      console.warn('[getTopAnnotationAt] Mouse coordinates are null.');
      return null;
    }

    console.log('[getTopAnnotationAt] Checking top annotation at:', { x, y });

    const intersectingAnnotations = annotations
      .map((annotation) => {
        const { geometry } = annotation;
        if (!geometry) {
          console.warn(
            '[getTopAnnotationAt] Annotation has no geometry:',
            annotation,
          );
          return null;
        }

        const selector = getSelectorByType(geometry.type);
        if (!selector) {
          console.warn(
            '[getTopAnnotationAt] No selector found for type:',
            geometry.type,
          );
          return null;
        }

        const intersects = selector.intersects(
          { x, y },
          geometry,
          containerRef.current,
        );

        console.log(
          `[getTopAnnotationAt] Annotation ${
            annotation.data?.id || 'unknown'
          } intersects:`,
          intersects,
        );

        return intersects ? annotation : null;
      })
      .filter(Boolean)
      .sort((a, b) => {
        const selectorA = getSelectorByType(a.geometry.type);
        const selectorB = getSelectorByType(b.geometry.type);
        return selectorA.area(a.geometry) - selectorB.area(b.geometry);
      });

    const topAnnotation = intersectingAnnotations[0] || null;
    console.log('[getTopAnnotationAt] Top annotation:', topAnnotation);
    return topAnnotation;
  };

  console.log(
    'relativeMousePos.x, relativeMousePos.y)',
    relativeMousePos.x,
    relativeMousePos.y,
  );
  const activeAnnotation = getTopAnnotationAt(
    relativeMousePos.x,
    relativeMousePos.y,
  );

  const shouldAnnotationBeActive = (annotation, activeAnnotation) => {
    if (!activeAnnotationComparator) return false;
    if (activeAnnotation) {
      const isActive = activeAnnotationComparator(annotation, activeAnnotation);
      console.log(
        '[shouldAnnotationBeActive] Checking if annotation is active:',
        { annotation, activeAnnotation, isActive },
      );
      return isActive;
    }
    return false;
  };

  console.log('[Annotation] Active annotation:', activeAnnotation);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Ajoutez les écouteurs depuis relativeMousePos
    container.addEventListener('mousemove', relativeMousePos.onMouseMove);
    container.addEventListener('mouseleave', relativeMousePos.onMouseLeave);

    if (allowTouch) {
      container.addEventListener('touchmove', relativeMousePos.onTouchMove);
      container.addEventListener('touchleave', relativeMousePos.onTouchLeave);
    }

    return () => {
      container.removeEventListener('mousemove', relativeMousePos.onMouseMove);
      container.removeEventListener(
        'mouseleave',
        relativeMousePos.onMouseLeave,
      );

      if (allowTouch) {
        container.removeEventListener(
          'touchmove',
          relativeMousePos.onTouchMove,
        );
        container.removeEventListener(
          'touchleave',
          relativeMousePos.onTouchLeave,
        );
      }
    };
  }, [relativeMousePos, allowTouch]);

  return (
    <Container
      ref={setInnerRef}
      style={style}
      className={className}
      onMouseMove={relativeMousePos.onMouseMove}
      onMouseLeave={relativeMousePos.onMouseLeave}
      onTouchMove={relativeMousePos.onTouchMove}
      onTouchCancel={relativeMousePos.onTouchLeave}
      allowTouch={allowTouch}
    >
      <Img
        ref={(el) => {
          relativeMousePos.innerRef(el);
          isMouseHovering.innerRef(el);
        }}
        alt={alt}
        src={src}
      />
      <Items>
        {annotations.map((annotation) =>
          renderHighlight({
            key: annotation.data.id,
            annotation,
            active: shouldAnnotationBeActive(annotation, activeAnnotation),
          }),
        )}
        {!disableSelector &&
          value?.geometry &&
          renderSelector({ annotation: value })}
      </Items>
      <Target
        ref={targetRef}
        onMouseDown={(e) => callSelectorMethod('onMouseDown', e)}
        onMouseMove={(e) => callSelectorMethod('onMouseMove', e)}
        onMouseUp={(e) => callSelectorMethod('onMouseUp', e)}
        onClick={(e) => callSelectorMethod('onClick', e)}
      />
      {!disableOverlay &&
        renderOverlay({
          type,
          annotation: value,
        })}
      {annotations.map(
        (annotation) =>
          shouldAnnotationBeActive(annotation, activeAnnotation) &&
          renderContent({ key: annotation.data.id, annotation }),
      )}
      {!disableEditor &&
        value?.selection?.showEditor &&
        renderEditor({ annotation: value, onChange, onSubmit })}
      {children}
    </Container>
  );
};

export default Annotation;
