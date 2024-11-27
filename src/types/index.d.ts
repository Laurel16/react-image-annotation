declare module "react-image-annotation" {
  import React from "react";

  export interface IGeometry {
    type: string;
    x?: number;
    y?: number;
    height?: number;
    width?: number;
  }

  export interface ISelector {
    TYPE: string;
    intersects: (
      point: { x: number; y: number },
      geometry: IGeometry,
      container: { width: number; height: number }
    ) => boolean;
    area: (
      geometry: IGeometry,
      container: { width: number; height: number }
    ) => number;
    methods: {
      onMouseUp?: (annotation: IAnnotation, event: React.MouseEvent) => IAnnotation | {};
      onMouseDown?: (annotation: IAnnotation, event: React.MouseEvent) => IAnnotation | {};
      onMouseMove?: (annotation: IAnnotation, event: React.MouseEvent) => IAnnotation | {};
      onClick?: (annotation: IAnnotation, event: React.MouseEvent) => IAnnotation | {};
    };
  }

  export interface IAnnotation {
    selection?: {
      mode: string;
      showEditor: boolean;
    };
    geometry: IGeometry;
    data: {
      text: string;
      id?: number | string; // Flexibilité accrue pour l'identifiant
    };
  }

  export interface IAnnotationProps {
    src: string;
    alt?: string;
    innerRef?: (element: HTMLElement | null) => void;
    onMouseUp?: (event: React.MouseEvent) => void;
    onMouseDown?: (event: React.MouseEvent) => void;
    onMouseMove?: (event: React.MouseEvent) => void;
    onClick?: (event: React.MouseEvent) => void;

    annotations: IAnnotation[];
    type?: string;
    selectors?: ISelector[];

    value: IAnnotation | Record<string, never>;
    onChange?: (annotation: IAnnotation | {}) => void;
    onSubmit?: (annotation?: IAnnotation) => void;

    activeAnnotationComparator?: (annotationA: IAnnotation, annotationB: IAnnotation) => boolean;
    activeAnnotations?: IAnnotation[];

    disableAnnotation?: boolean;
    disableSelector?: boolean;
    renderSelector?: ({
      annotation,
      active,
    }: {
      annotation: IAnnotation;
      active: boolean;
    }) => React.ReactNode;

    disableEditor?: boolean;
    renderEditor?: ({
      annotation,
      onChange,
      onSubmit,
    }: {
      annotation: IAnnotation;
      onChange: (annotation: IAnnotation | {}) => void;
      onSubmit: () => void;
    }) => React.ReactNode;

    renderHighlight?: ({
      annotation,
      active,
    }: {
      annotation: IAnnotation;
      active: boolean;
    }) => React.ReactNode;

    renderContent?: ({ annotation }: { annotation: IAnnotation }) => React.ReactNode;

    disableOverlay?: boolean;
    renderOverlay?: () => React.ReactNode;

    allowTouch?: boolean; // Rendu optionnel pour éviter les erreurs si non défini
  }

  class Annotation extends React.Component<IAnnotationProps, {}> {}
  export default Annotation;
}
