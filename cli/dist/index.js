#!/usr/bin/env node
import { Command } from "commander";
import { add } from "./commands/add.js";
import { list } from "./commands/list.js";
import { search } from "./commands/search.js";
import { exportDoc } from "./commands/export.js";
const program = new Command();
program
    .name("bragdoc")
    .description("Track your wins from the command line")
    .version("1.0.1");
program
    .command("add")
    .description("Add a new win to your brag doc")
    .argument("<text>", "What you accomplished")
    .option("-c, --category <category>", "Category for the entry (e.g., work, side-project)")
    .action(add);
program
    .command("list")
    .description("List your wins")
    .option("-l, --last <n>", "Show only the last n entries", parseInt)
    .action(list);
program
    .command("search")
    .description("Search your brag doc")
    .argument("<query>", "Search term")
    .action(search);
program
    .command("export")
    .description("Export your brag doc")
    .option("-y, --year <year>", "Export only a specific year")
    .action(exportDoc);
program.parse();
