import chalk from "chalk";
import { readBragDoc, bragDocExists } from "../storage.js";
import { findSection, SECTIONS } from "../sections.js";
export function list(section) {
    if (!bragDocExists()) {
        console.log(chalk.yellow("No brag doc found. Add your first win with:"));
        console.log(chalk.cyan("  bragdoc add delivered \"Your accomplishment\""));
        return;
    }
    const doc = readBragDoc();
    // If a specific section is requested
    if (section) {
        const sec = findSection(section);
        if (!sec) {
            console.log(chalk.red(`Unknown section: ${section}`));
            return;
        }
        const items = doc[sec.key];
        console.log();
        console.log(chalk.bold(`${sec.icon} ${sec.title}`));
        console.log();
        if (items.length === 0) {
            console.log(chalk.dim("  No entries yet"));
        }
        else {
            items.forEach((item) => {
                console.log(`  • ${item}`);
            });
        }
        console.log();
        return;
    }
    // Show header info
    console.log();
    if (doc.name || doc.role || doc.period) {
        if (doc.name)
            console.log(chalk.bold(doc.name));
        if (doc.role)
            console.log(chalk.dim(doc.role));
        if (doc.period)
            console.log(chalk.dim(doc.period));
        console.log();
    }
    // Show all sections
    let hasContent = false;
    for (const sec of SECTIONS) {
        const items = doc[sec.key];
        if (items.length > 0) {
            hasContent = true;
            console.log(chalk.bold(`${sec.icon} ${sec.title}`));
            items.forEach((item) => {
                console.log(`  • ${item}`);
            });
            console.log();
        }
    }
    if (!hasContent) {
        console.log(chalk.yellow("Your brag doc is empty. Add your first win with:"));
        console.log(chalk.cyan("  bragdoc add delivered \"Your accomplishment\""));
    }
}
