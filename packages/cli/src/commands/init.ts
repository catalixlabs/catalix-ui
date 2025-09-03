import { Command } from "commander";
import ora from "ora";
import chalk from "chalk";
import fs from "fs-extra";
import z from "zod";
import * as schema from "@/utils/schema";
import preflightInit from "@/preflights/preflight-init";

const init = new Command()
  .name("init")
  .description("initialize your project and install dependencies")
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .action(initialization);

export async function initialization(options: schema.InitOptionsSchema) {
  try {
    const { success, data } = schema.initOptionsSchema.safeParse(options);
    if (!success) process.exit(1);
    const { componentsJsonPath } = await preflightInit(data);
    const componentsSpinner = ora("Writing components.json").start();
    await fs.writeJson(componentsJsonPath, {}, { spaces: 2 });
    componentsSpinner.succeed();
    console.log("");
    console.log(chalk.green("Success!"));
    console.log("You may now add components.");
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(chalk.red("Zod validation error"));
      for (const [key, value] of z.treeifyError(error).errors) {
        console.log(`- ${chalk.cyan(key)}: ${value}`);
      }
    }
    process.exit(1);
  }
}

export default init;
