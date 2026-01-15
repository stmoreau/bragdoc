import { homedir } from "os";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const BRAGDOC_PATH = join(homedir(), ".bragdoc.json");

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

export const DEFAULT_DOC: BragDoc = {
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

export function getBragDocPath(): string {
  return BRAGDOC_PATH;
}

export function readBragDoc(): BragDoc {
  if (!existsSync(BRAGDOC_PATH)) {
    return { ...DEFAULT_DOC };
  }
  try {
    const content = readFileSync(BRAGDOC_PATH, "utf-8");
    return { ...DEFAULT_DOC, ...JSON.parse(content) };
  } catch {
    return { ...DEFAULT_DOC };
  }
}

export function writeBragDoc(doc: BragDoc): void {
  doc.updatedAt = new Date().toISOString();
  writeFileSync(BRAGDOC_PATH, JSON.stringify(doc, null, 2), "utf-8");
}

export function bragDocExists(): boolean {
  return existsSync(BRAGDOC_PATH);
}
