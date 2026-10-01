import type { MutableRefObject } from 'react';
import type { Box, EdgeGeometry, Point } from '../layout';
import type { Relation } from '../types';
export interface Viewport {
    x: number;
    y: number;
    k: number;
}
export declare const MIN_ZOOM = 0.08;
export declare const MAX_ZOOM = 2.5;
export declare function clampZoom(k: number): number;
type Cardinality = 'one' | 'many';
export declare function cardinality(r: Relation): {
    start: Cardinality;
    startOptional: boolean;
    end: Cardinality;
    endOptional: boolean;
};
export interface CanvasProps {
    boxes: Box[];
    edges: EdgeGeometry[];
    viewport: Viewport;
    onViewport: (v: Viewport) => void;
    selectedId: string | null;
    hoveredId: string | null;
    onHover: (id: string | null) => void;
    onSelect: (id: string | null) => void;
    onMove: (id: string, x: number, y: number) => void;
    onMoveEnd: () => void;
    colors: Map<string, string>;
    kindLabels: Record<string, string>;
    svgRef: MutableRefObject<SVGSVGElement | null>;
    stageRef: MutableRefObject<HTMLDivElement | null>;
    hint: string;
    children?: React.ReactNode;
}
export declare function Canvas(props: CanvasProps): import("react").JSX.Element;
interface MinimapProps {
    boxes: Box[];
    viewport: Viewport;
    stageSize: {
        width: number;
        height: number;
    };
    colors: Map<string, string>;
    onCenter: (p: Point) => void;
}
export declare function Minimap({ boxes, viewport, stageSize, colors, onCenter }: MinimapProps): import("react").JSX.Element | null;
export {};
