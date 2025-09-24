import { Command } from "commander";
import chalk from "chalk";
import fs from "fs-extra";
import path from "pathe";
import { withSpinner } from "@/utils/spinner";
import { handleError } from "@/utils/handle-error";
import { initOptionsSchema, type InitOptionsSchema } from "@/types/command";
import { getProjectInfo } from "@/utils/project-info";
import { resolveRegistryTree } from "@/registry/resolver";
import { updateFiles } from "@/updaters/update-files";
import { updateDependencies } from "@/updaters/update-dependencies";

const init = new Command()
  .name("init")
  .description("initialize your project and install dependencies")
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .action((options) => runInit(options));

async function runInit(options: InitOptionsSchema) {
  try {
    const { cwd } = initOptionsSchema.parse({
      ...options,
      cwd: path.resolve(options.cwd),
    });

    const projectInfo = await getProjectInfo(cwd);

    await withSpinner("Checking current working directory.", async () => {
      const exists = await fs.pathExists(cwd);
      const CWD = chalk.cyan.underline(cwd);
      if (!exists) throw new Error(`Make sure directory exists: ${CWD}.`);
    });

    await withSpinner("Verifying package.json", async () => {
      const pkgJSONPath = path.join(cwd, "package.json");
      const exists = await fs.pathExists(pkgJSONPath);
      const FILE = chalk.cyan("package.json");
      const CWD = chalk.cyan(cwd);
      if (!exists) throw new Error(`Path ${CWD} doesn't contain a ${FILE}.`);
      return pkgJSONPath;
    });

    await withSpinner("Verifying framework", async (spinner) => {
      const { framework } = projectInfo;
      const CWD = chalk.cyan(cwd);
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (!framework) throw new Error(`Couldn't find a framework at ${CWD}.`);
      spinner.text = `Verifying framework. Found ${chalk.cyan(framework)}.`;
      return framework;
    });

    await withSpinner("Verifying src directory", async (spinner) => {
      const { isSrc } = await getProjectInfo(cwd);
      await new Promise((resolve) => setTimeout(resolve, 500));
      spinner.text = `Verifying src directory ${chalk.cyan(isSrc)}.`;
      return isSrc;
    });

    await withSpinner("Validating Tailwind CSS.", async (spinner) => {
      const { tailwindVersion: tv } = projectInfo;
      const CWD = chalk.cyan(cwd);
      const REQ_VER = chalk.cyan("v4");
      const VER = chalk.cyan(tv);
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (!tv) throw new Error(`No Tailwind CSS config found at ${CWD}.`);
      if (tv === "v3") throw new Error(`Need tailwind ${REQ_VER}, got ${VER}.`);
      spinner.text = `Validating Tailwind CSS. Found ${chalk.cyan(REQ_VER)}.`;
    });

    await withSpinner("Validating import alias.", async () => {
      const { alias } = projectInfo;
      const FILE = chalk.cyan("tsconfig.json");
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (!alias) throw new Error(`No import alias found in ${FILE}.`);
    });

    // Ensure common utils (cn) are added on init
    const registry = await resolveRegistryTree(["cn"]);
    if (registry) {
      await updateDependencies(
        registry.dependencies,
        registry.devDependencies,
        cwd
      );
      await updateFiles(registry.files, cwd, false);
    }

    console.log("");
    console.log(chalk.green("Success! Project initialized."));
    console.log(chalk.green("You may now add components."));
  } catch (error) {
    handleError(error);
  }
}

export default init;
