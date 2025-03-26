declare module 'react-simple-maps' {
  import React from 'react';
  
  export interface GeoProjectionConfig {
    center?: [number, number];
    rotate?: [number, number, number];
    parallels?: [number, number];
    scale?: number;
    translate?: [number, number];
    precision?: number;
  }
  
  export interface ZoomableGroupProps {
    zoom?: number;
    center?: [number, number];
    onMoveStart?: (position: { coordinates: [number, number], zoom: number }) => void;
    onMoveEnd?: (position: { coordinates: [number, number], zoom: number }) => void;
    maxZoom?: number;
    minZoom?: number;
    translateExtent?: [[number, number], [number, number]];
    children?: React.ReactNode;
  }
  
  export interface GeographyProps {
    geography: any;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
    onMouseEnter?: (event: React.MouseEvent<SVGPathElement>) => void;
    onMouseLeave?: (event: React.MouseEvent<SVGPathElement>) => void;
    onClick?: (event: React.MouseEvent<SVGPathElement>) => void;
    onMouseDown?: (event: React.MouseEvent<SVGPathElement>) => void;
    onMouseUp?: (event: React.MouseEvent<SVGPathElement>) => void;
    className?: string;
  }
  
  export interface ComposableMapProps {
    projectionConfig?: GeoProjectionConfig;
    width?: number;
    height?: number;
    projection?: string;
    children?: React.ReactNode;
  }
  
  export interface GeographiesProps {
    geography: string | object;
    children: (props: { geographies: Array<any> }) => React.ReactNode;
    parseGeographies?: (features: Array<any>) => Array<any>;
  }
  
  export const ComposableMap: React.FC<ComposableMapProps>;
  export const ZoomableGroup: React.FC<ZoomableGroupProps>;
  export const Geographies: React.FC<GeographiesProps>;
  export const Geography: React.FC<GeographyProps>;
}