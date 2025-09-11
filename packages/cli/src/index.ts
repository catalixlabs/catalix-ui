#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import init from "@/commands/init";

const program = new Command();

program
  .name("foundry")
  .description(chalk.cyan("CLI for managing Foundry UI components"))
  .version("0.1.0")
  .addCommand(init);

await program.parseAsync();
