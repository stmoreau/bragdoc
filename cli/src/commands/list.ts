import chalk from "chalk";
import { readBragDoc, bragDocExists } from "../storage.js";
import { parseEntries } from "../parser.js";

export function list(options: { last?: number }): void {
  if (!bragDocExists()) {
    console.log(chalk.yellow("No brag doc found. Add your first win with:"));
    console.log(chalk.cyan('  bragdoc add "Your accomplishment"'));
    return;
  }

  const content = readBragDoc();
  let entries = parseEntries(content);

  if (entries.length === 0) {
    console.log(chalk.yellow("Your brag doc is empty. Add your first win with:"));
    console.log(chalk.cyan('  bragdoc add "Your accomplishment"'));
    return;
  }

  // Sort by date descending
  entries.sort((a, b) => b.date.localeCompare(a.date));

  if (options.last) {
    entries = entries.slice(0, options.last);
  }

  console.log(chalk.bold("\nYour Wins\n"));

  for (const entry of entries) {
    const date = chalk.dim(entry.date);
    const category = entry.category ? chalk.blue(`[${entry.category}]`) + " " : "";
    console.log(`  ${date}  ${category}${entry.text}`);
  }

  console.log();
}
