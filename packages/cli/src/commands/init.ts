import { Command } from "commander";
import path from "path";
import ora from "ora";
import chalk from "chalk";
import { z } from "zod/v4";
import fs from "fs-extra";
import * as schema from "@/utils/schema";

const init = new Command()
  .name("init")
  .description("initialize your project and install dependencies")
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .option(
    "--src-dir",
    "use the src directory when creating a new project.",
    false
  )
  .action(initialization);

async function initialization(options: schema.InitOptionsSchema) {
  try {
    const parsed = schema.initOptionsSchema.parse(options);

    if (!(await fs.pathExists(parsed.cwd))) {
      console.log(chalk.red(`Directory does not exist: ${parsed.cwd}`));
      process.exit(1);
    }

    const packageJsonPath = path.join(parsed.cwd, "package.json");
    if (!(await fs.pathExists(packageJsonPath))) {
      console.log(
        `${chalk.red(
          "No package.json found. Please run this command in a valid next.js project directory."
        )}`
      );
      process.exit(1);
    }

    const projectSpinner = ora("Verifying installation").start();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const componentsJsonPath = path.join(parsed.cwd, "components.json");
    if (await fs.pathExists(componentsJsonPath)) {
      projectSpinner.fail();
      console.log("\n");
      console.log(
        chalk.red(
          `A ${chalk.cyan("components.json")} file already exists at ${chalk.cyan(
            options.cwd
          )}.\nTo start over, remove the ${chalk.cyan(
            "components.json"
          )} file and run ${chalk.cyan("init")} again.`
        )
      );
      process.exit(1);
    }

    projectSpinner.succeed();

    const componentsSpinner = ora("Writing components.json").start();
    await fs.writeJson(componentsJsonPath, {}, { spaces: 2 });
    componentsSpinner.succeed();

    console.log("\n");
    console.log(`${chalk.green("Success!")} Project initialization completed.`);
    console.log("You may now add components.");
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(chalk.red("Validation failed:"));
      for (const [key, value] of Object.entries(z.treeifyError(error))) {
        console.log(`- ${chalk.cyan(key)}: ${value}`);
      }
      process.exit(1);
    }
    console.log(chalk.red(error));
  }
}

export default init;
