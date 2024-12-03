import { getCoordPercentage } from '../utils/offsetCoordinates';

export const TYPE = 'RECTANGLE';

export function intersects({ x, y }, geometry) {
  const intersects =
    x >= geometry.x &&
    y >= geometry.y &&
    x <= geometry.x + geometry.width &&
    y <= geometry.y + geometry.height;

  console.log('[intersects] Point:', { x, y }, 'Geometry:', geometry, 'Intersects:', intersects);
  return intersects;
}

export function area(geometry) {
  const calculatedArea = geometry.height * geometry.width;
  console.log('[area] Calculating area for geometry:', geometry, 'Area:', calculatedArea);
  return calculatedArea;
}

export const methods = {
  onTouchStart(annotation, e) {
    console.log('[onTouchStart] Event triggered:', e);
    return pointerDown(annotation, e);
  },
  onTouchEnd(annotation, e) {
    console.log('[onTouchEnd] Event triggered:', e, 'Annotation:', annotation);
    return pointerUp(annotation, e);
  },
  onTouchMove(annotation, e) {
    console.log('[onTouchMove] Event triggered:', e, 'Annotation:', annotation);
    return pointerMove(annotation, e);
  },
  onMouseDown(annotation, e) {
    console.log('[onMouseDown] Event triggered:', e);
    return pointerDown(annotation, e);
  },
  onMouseUp(annotation, e) {
    console.log('[onMouseUp] Event triggered:', e);
    return pointerUp(annotation, e);
  },
  onMouseMove(annotation, e) {
    console.log('[onMouseMove] Event triggered:', e, 'Annotation:', annotation);
    return pointerMove(annotation, e);
  }
};

function pointerDown(annotation, e) {
  console.log('[pointerDown] Initial annotation:', annotation);
  if (!annotation.selection) {
    const { x: anchorX, y: anchorY } = getCoordPercentage(e);
    const updatedAnnotation = {
      ...annotation,
      selection: {
        ...annotation.selection,
        mode: 'SELECTING',
        anchorX,
        anchorY,
      },
    };
    console.log('[pointerDown] Updated annotation:', updatedAnnotation);
    return updatedAnnotation;
  } else {
    console.warn('[pointerDown] Selection already exists, no action taken.');
    return annotation;
  }
}

function pointerMove(annotation, e) {
  console.log('[pointerMove] Current annotation:', annotation);

  if (annotation.selection && annotation.selection.mode === 'SELECTING') {
    const { anchorX, anchorY } = annotation.selection;
    const { x: newX, y: newY } = getCoordPercentage(e);

    const width = newX - anchorX;
    const height = newY - anchorY;

    const updatedAnnotation = {
      ...annotation,
      geometry: {
        ...annotation.geometry,
        type: TYPE,
        x: width > 0 ? anchorX : newX,
        y: height > 0 ? anchorY : newY,
        width: Math.abs(width),
        height: Math.abs(height),
      },
    };

    console.log('[pointerMove] Updated annotation:', updatedAnnotation);
    return updatedAnnotation;
  }

  console.warn('[pointerMove] No action taken for annotation:', annotation);
  return annotation;
}

function pointerUp(annotation, e) {
  console.log('[pointerUp] Current annotation:', annotation);
  if (annotation.selection) {
    const { selection, geometry } = annotation;
    if (!geometry) {
      console.warn('[pointerUp] No geometry present, returning empty annotation.');
      return {};
    }
    if (selection.mode === 'SELECTING') {
      const updatedAnnotation = {
        ...annotation,
        selection: {
          ...annotation.selection,
          showEditor: true,
          mode: 'EDITING',
        },
      };
      console.log('[pointerUp] Updated annotation:', updatedAnnotation);
      return updatedAnnotation;
    }
  }

  console.warn('[pointerUp] No selection present, returning unchanged annotation.');
  return annotation;
}

export default {
  TYPE,
  intersects,
  area,
  methods,
};
