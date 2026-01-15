import chalk from "chalk";
import { readBragDoc, bragDocExists, getBragDocPath } from "../storage.js";
import { SECTIONS } from "../sections.js";
export function exportDoc() {
    if (!bragDocExists()) {
        console.log(chalk.yellow("No brag doc found. Add your first win with:"));
        console.log(chalk.cyan("  bragdoc add delivered \"Your accomplishment\""));
        return;
    }
    const doc = readBragDoc();
    const lines = [];
    // Header
    lines.push(`# ${doc.name || "My"}'s Brag Doc`);
    lines.push("");
    if (doc.role)
        lines.push(`**${doc.role}**`);
    if (doc.period)
        lines.push(`*${doc.period}*`);
    lines.push("");
    // Sections
    for (const sec of SECTIONS) {
        const items = doc[sec.key].filter((item) => item.trim());
        if (items.length > 0) {
            lines.push(`## ${sec.icon} ${sec.title}`);
            lines.push("");
            items.forEach((item) => lines.push(`- ${item}`));
            lines.push("");
        }
    }
    console.log(lines.join("\n"));
    console.log(chalk.dim(`---`));
    console.log(chalk.dim(`Source: ${getBragDocPath()}`));
}
