import type { DiagramOptions, ManagerInfo, Schema } from './types';
export declare class ApiError extends Error {
    status: number;
    constructor(message: string, status: number);
}
export declare function fetchManagers(options: DiagramOptions): Promise<{
    default: string;
    managers: ManagerInfo[];
}>;
export declare function fetchSchema(options: DiagramOptions, manager?: string): Promise<Schema>;
