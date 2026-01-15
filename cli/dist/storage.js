import { homedir } from "os";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
const BRAGDOC_PATH = join(homedir(), ".bragdoc.md");
export function getBragDocPath() {
    return BRAGDOC_PATH;
}
export function readBragDoc() {
    if (!existsSync(BRAGDOC_PATH)) {
        return "";
    }
    return readFileSync(BRAGDOC_PATH, "utf-8");
}
export function writeBragDoc(content) {
    writeFileSync(BRAGDOC_PATH, content, "utf-8");
}
export function bragDocExists() {
    return existsSync(BRAGDOC_PATH);
}
