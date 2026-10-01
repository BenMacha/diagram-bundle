import type { Schema } from './types';
export declare class JdlError extends Error {
    line: number;
    constructor(message: string, line: number);
}
export declare function parseJdl(source: string, manager?: string): Schema;
export declare function toJdl(schema: Schema): string;
