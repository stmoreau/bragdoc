#!/usr/bin/env node
import { Command } from "commander";
import { add, addInteractive } from "./commands/add.js";
import { list } from "./commands/list.js";
import { exportDoc } from "./commands/export.js";
import { config } from "./commands/config.js";
const program = new Command();
program
    .name("bragdoc")
    .description("Track your wins from the command line")
    .version("1.1.0");
program
    .command("add [section] [text]")
    .description("Add a win to a section (delivered, collaboration, growth, impact, feedback, goals)")
    .action((section, text) => {
    if (!section || !text) {
        addInteractive();
    }
    else {
        add(section, text);
    }
});
program
    .command("list [section]")
    .description("List your wins (optionally filter by section)")
    .action((section) => {
    list(section);
});
program
    .command("export")
    .description("Export your brag doc as markdown")
    .action(() => {
    exportDoc();
});
program
    .command("config")
    .description("Set your name, role, and period")
    .option("-n, --name <name>", "Your name")
    .option("-r, --role <role>", "Your role/title")
    .option("-p, --period <period>", "Time period (e.g., 2026)")
    .action((options) => {
    config(options);
});
program.parse();
