#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import init from "@/commands/init";
import build from "@/commands/build";
import add from "@/commands/add";

const program = new Command();

program
  .name("catalix")
  .description(chalk.cyan("CLI for managing Catalix UI components"))
  .version("0.1.0")
  .addCommand(init)
  .addCommand(build)
  .addCommand(add);

await program.parseAsync();
