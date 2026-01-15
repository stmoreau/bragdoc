export interface BragEntry {
    date: string;
    text: string;
    category?: string;
}
export declare function getMonthName(month: number): string;
export declare function parseEntries(content: string): BragEntry[];
export declare function formatEntry(entry: BragEntry): string;
export declare function createInitialDoc(): string;
export declare function addEntryToDoc(content: string, entry: BragEntry): string;
