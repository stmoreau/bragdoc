import { homedir } from "os";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const BRAGDOC_PATH = join(homedir(), ".bragdoc.md");

export function getBragDocPath(): string {
  return BRAGDOC_PATH;
}

export function readBragDoc(): string {
  if (!existsSync(BRAGDOC_PATH)) {
    return "";
  }
  return readFileSync(BRAGDOC_PATH, "utf-8");
}

export function writeBragDoc(content: string): void {
  writeFileSync(BRAGDOC_PATH, content, "utf-8");
}

export function bragDocExists(): boolean {
  return existsSync(BRAGDOC_PATH);
}
