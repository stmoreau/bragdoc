import chalk from "chalk";
import { readBragDoc, writeBragDoc, getBragDocPath } from "../storage.js";
export function config(options) {
    const doc = readBragDoc();
    let updated = false;
    if (options.name !== undefined) {
        doc.name = options.name;
        updated = true;
    }
    if (options.role !== undefined) {
        doc.role = options.role;
        updated = true;
    }
    if (options.period !== undefined) {
        doc.period = options.period;
        updated = true;
    }
    if (updated) {
        writeBragDoc(doc);
        console.log(chalk.green("✓") + " Updated config");
        console.log();
    }
    // Show current config
    console.log(chalk.bold("Current config:"));
    console.log(`  Name:   ${doc.name || chalk.dim("(not set)")}`);
    console.log(`  Role:   ${doc.role || chalk.dim("(not set)")}`);
    console.log(`  Period: ${doc.period || chalk.dim("(not set)")}`);
    console.log();
    console.log(chalk.dim(`Stored at: ${getBragDocPath()}`));
}
