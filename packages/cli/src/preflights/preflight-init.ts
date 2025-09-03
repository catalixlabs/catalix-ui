import path from "path";
import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";
import * as schema from "@/utils/schema";

export default async function preflightInit(options: schema.InitOptionsSchema) {
  if (!(await fs.pathExists(options.cwd))) {
    console.log(chalk.red(`Directory does not exist: ${options.cwd}`));
    process.exit(1);
  }

  const packageJsonPath = path.join(options.cwd, "package.json");
  if (!(await fs.pathExists(packageJsonPath))) {
    const CWD = chalk.cyan(options.cwd);
    const FILE = chalk.cyan("components.json");
    const CMD = chalk.green("npx create-next-app@latest my-app --yes");
    console.log("");
    console.log(`The path ${CWD} doesn't contain a ${FILE} file.`);
    console.log(`Strat a new next.js app running ${CMD} and try again`);
    console.log("");
    process.exit(1);
  }

  // todo: if no package.json found, prompt to create a next app from cli

  const projectSpinner = ora("Preflight checks").start();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const componentsJsonPath = path.join(options.cwd, "components.json");

  if (await fs.pathExists(componentsJsonPath)) {
    projectSpinner.fail();
    const CWD = chalk.cyan(options.cwd);
    const FILE = chalk.cyan("components.json");
    const CMD = chalk.cyan("init");
    console.log("");
    console.log(chalk.red(`A ${FILE} file already exists at ${CWD}.`));
    console.log(chalk.red(`To start over, remove ${FILE} and re-run ${CMD}.`));
    console.log("");
    process.exit(1);
  }

  projectSpinner.succeed();

  return {
    cwd: options.cwd,
    componentsJsonPath,
    packageJsonPath,
  };
}
