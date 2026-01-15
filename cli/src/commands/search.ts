import chalk from "chalk";
import { readBragDoc, bragDocExists } from "../storage.js";
import { parseEntries } from "../parser.js";

export function search(query: string): void {
  if (!bragDocExists()) {
    console.log(chalk.yellow("No brag doc found. Add your first win with:"));
    console.log(chalk.cyan('  bragdoc add "Your accomplishment"'));
    return;
  }

  const content = readBragDoc();
  const entries = parseEntries(content);

  const lowerQuery = query.toLowerCase();
  const matches = entries.filter(
    (e) =>
      e.text.toLowerCase().includes(lowerQuery) ||
      (e.category && e.category.toLowerCase().includes(lowerQuery))
  );

  if (matches.length === 0) {
    console.log(chalk.yellow(`No entries found matching "${query}"`));
    return;
  }

  console.log(chalk.bold(`\nFound ${matches.length} match${matches.length === 1 ? "" : "es"}\n`));

  // Sort by date descending
  matches.sort((a, b) => b.date.localeCompare(a.date));

  for (const entry of matches) {
    const date = chalk.dim(entry.date);
    const category = entry.category ? chalk.blue(`[${entry.category}]`) + " " : "";

    // Highlight the matching text
    const highlightedText = entry.text.replace(
      new RegExp(`(${query})`, "gi"),
      chalk.yellow("$1")
    );

    console.log(`  ${date}  ${category}${highlightedText}`);
  }

  console.log();
}
