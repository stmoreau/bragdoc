import chalk from "chalk";
import { readBragDoc, writeBragDoc } from "../storage.js";
import { addEntryToDoc, BragEntry } from "../parser.js";

export function add(text: string, options: { category?: string }): void {
  const today = new Date().toISOString().split("T")[0];

  const entry: BragEntry = {
    date: today,
    text: text,
    category: options.category,
  };

  const content = readBragDoc();
  const updated = addEntryToDoc(content, entry);
  writeBragDoc(updated);

  const categoryInfo = options.category ? ` [${options.category}]` : "";
  console.log(chalk.green("✓") + ` Added:${categoryInfo} ${text}`);
}
