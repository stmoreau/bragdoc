export type SectionKey = "delivered" | "collaboration" | "growth" | "impact" | "feedback" | "goals";
export interface Section {
    key: SectionKey;
    icon: string;
    title: string;
    aliases: string[];
}
export declare const SECTIONS: Section[];
export declare function findSection(input: string): Section | undefined;
export declare function getSectionKeys(): SectionKey[];
export declare function isSectionKey(key: string): key is SectionKey;
export declare function formatSectionList(): string;
