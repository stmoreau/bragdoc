import { homedir } from "os";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
const BRAGDOC_PATH = join(homedir(), ".bragdoc.json");
export const DEFAULT_DOC = {
    name: "",
    role: "",
    period: new Date().getFullYear().toString(),
    delivered: [],
    collaboration: [],
    growth: [],
    impact: [],
    feedback: [],
    goals: [],
    updatedAt: new Date().toISOString(),
};
export function getBragDocPath() {
    return BRAGDOC_PATH;
}
export function readBragDoc() {
    if (!existsSync(BRAGDOC_PATH)) {
        return { ...DEFAULT_DOC };
    }
    try {
        const content = readFileSync(BRAGDOC_PATH, "utf-8");
        return { ...DEFAULT_DOC, ...JSON.parse(content) };
    }
    catch {
        return { ...DEFAULT_DOC };
    }
}
export function writeBragDoc(doc) {
    doc.updatedAt = new Date().toISOString();
    writeFileSync(BRAGDOC_PATH, JSON.stringify(doc, null, 2), "utf-8");
}
export function bragDocExists() {
    return existsSync(BRAGDOC_PATH);
}
