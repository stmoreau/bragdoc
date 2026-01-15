import chalk from "chalk";
import { readBragDoc, writeBragDoc } from "../storage.js";
import { findSection, formatSectionList } from "../sections.js";
export function add(section, text) {
    const sec = findSection(section);
    if (!sec) {
        console.log(chalk.red(`Unknown section: ${section}`));
        console.log();
        console.log("Available sections:");
        console.log(formatSectionList());
        console.log();
        console.log(chalk.dim("Example: bragdoc add delivered \"Shipped new feature\""));
        process.exit(1);
    }
    const doc = readBragDoc();
    doc[sec.key].push(text);
    writeBragDoc(doc);
    console.log(chalk.green("✓") + ` Added to ${sec.icon} ${sec.title}`);
    console.log(chalk.dim(`  "${text}"`));
}
export function addInteractive() {
    console.log("Available sections:");
    console.log(formatSectionList());
    console.log();
    console.log(chalk.dim("Usage: bragdoc add <section> \"Your accomplishment\""));
    console.log();
    console.log("Examples:");
    console.log(chalk.cyan("  bragdoc add delivered \"Shipped new checkout flow\""));
    console.log(chalk.cyan("  bragdoc add growth \"Learned Kubernetes\""));
    console.log(chalk.cyan("  bragdoc add impact \"Reduced latency by 40%\""));
}
