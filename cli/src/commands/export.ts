import chalk from "chalk";
import { readBragDoc, bragDocExists, getBragDocPath } from "../storage.js";

export function exportDoc(options: { year?: string }): void {
  if (!bragDocExists()) {
    console.log(chalk.yellow("No brag doc found. Add your first win with:"));
    console.log(chalk.cyan('  bragdoc add "Your accomplishment"'));
    return;
  }

  let content = readBragDoc();

  if (options.year) {
    // Filter to only show the specified year
    const yearHeader = `## ${options.year}`;
    const yearIndex = content.indexOf(yearHeader);

    if (yearIndex === -1) {
      console.log(chalk.yellow(`No entries found for year ${options.year}`));
      return;
    }

    // Find the next year section
    const afterYear = content.slice(yearIndex + yearHeader.length);
    const nextYearMatch = afterYear.match(/\n## \d{4}/);

    const yearContent = nextYearMatch
      ? content.slice(yearIndex, yearIndex + yearHeader.length + nextYearMatch.index!)
      : content.slice(yearIndex);

    content = `# Brag Doc - ${options.year}\n\n${yearContent.slice(yearHeader.length).trim()}`;
  }

  console.log(content);
  console.log(chalk.dim(`\n---\nSource: ${getBragDocPath()}`));
}
