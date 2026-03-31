#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import "dotenv/config";
import init from "@/commands/init";
import build from "@/commands/build";
import add from "@/commands/add";
import packageJson from "../package.json";

const program = new Command();

program
  .name("catalix")
  .description(chalk.cyan("CLI for managing Catalix UI components"))
  .version(packageJson.version || "0.0.0")
  .addCommand(init)
  .addCommand(build)
  .addCommand(add);

program.parse();
