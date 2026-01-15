export interface BragDoc {
    name: string;
    role: string;
    period: string;
    delivered: string[];
    collaboration: string[];
    growth: string[];
    impact: string[];
    feedback: string[];
    goals: string[];
    updatedAt: string;
}
export declare const DEFAULT_DOC: BragDoc;
export declare function getBragDocPath(): string;
export declare function readBragDoc(): BragDoc;
export declare function writeBragDoc(doc: BragDoc): void;
export declare function bragDocExists(): boolean;
