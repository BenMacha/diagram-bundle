import type { Detail, Direction, Entity, Relation } from './types';
export declare const HEADER_H = 46;
export declare const ROW_H = 24;
export declare const FOOT_H = 8;
export type RowKind = 'pk' | 'field' | 'fk' | 'collection';
export interface Row {
    key: string;
    label: string;
    type: string;
    kind: RowKind;
    nullable: boolean;
    unique: boolean;
    /** Relation id for fk / collection rows. */
    relation?: string;
}
export interface Box {
    id: string;
    entity: Entity;
    rows: Row[];
    width: number;
    height: number;
    x: number;
    y: number;
}
export interface Point {
    x: number;
    y: number;
}
export interface EdgeGeometry {
    id: string;
    relation: Relation | null;
    source: string;
    target: string;
    d: string;
    start: Point;
    end: Point;
    /** Unit vectors pointing out of the source / target box. */
    startDir: Point;
    endDir: Point;
    mid: Point;
    inheritance: boolean;
}
export type Measure = (text: string, font: 'title' | 'row' | 'type') => number;
export declare function buildRows(entity: Entity, relations: Relation[], names: Map<string, string>, detail: Detail): Row[];
export declare function measureBox(entity: Entity, rows: Row[], measure: Measure): {
    width: number;
    height: number;
};
/**
 * Connected entities are laid out by dagre; isolated ones are packed in a grid
 * under the graph so that a large schema stays readable.
 */
export declare function computeLayout(boxes: Omit<Box, 'x' | 'y'>[], relations: Relation[], direction: Direction): Map<string, Point>;
/**
 * Bézier edges between box sides. Horizontal links leave from the foreign key
 * row and enter at the target header / inverse collection row; parallel links
 * between two boxes are spread along the side.
 */
export declare function computeEdges(boxes: Map<string, Box>, relations: Relation[]): EdgeGeometry[];
export declare function bounds(boxes: Iterable<Box>): {
    x: number;
    y: number;
    width: number;
    height: number;
};
/** Crow's foot glyphs drawn at an edge end, `dir` points out of the box. */
export declare function endGlyph(p: Point, dir: Point, cardinality: 'one' | 'many', optional: boolean): string;
export declare function optionalCircle(p: Point, dir: Point, cardinality: 'one' | 'many'): Point;
