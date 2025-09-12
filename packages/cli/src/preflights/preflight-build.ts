import path from "pathe";
import fs from "fs-extra";
import chalk from "chalk";
import { type BuildOptions } from "@/types/build";
import { withSpinner } from "@/utils/spinner";

export async function preflightBuild(options: BuildOptions) {
  // Step 1: check working directory
  await withSpinner("Checking working directory", async () => {
    const exists = await fs.pathExists(options.cwd);
    if (!exists) {
      const CWD = chalk.cyan.underline(path.resolve(options.cwd));
      throw new Error(`Make sure directory exists: ${CWD}`);
    }
  });

  // Step 2: check registry.json exists
  const registryFile = await withSpinner("Checking registry.json", async () => {
    const filePath = path.resolve(options.cwd, options.registryFile);
    const exists = await fs.pathExists(filePath);
    if (!exists) {
      throw new Error(
        `${chalk.cyan("registry.json")} not found at ${filePath}`
      );
    }
    return filePath;
  });

  // Step 3: ensure output directory
  const outputDir = await withSpinner(
    "Preparing output directory",
    async () => {
      const dir = path.resolve(options.cwd, options.output);
      await fs.ensureDir(dir);
      return dir;
    }
  );

  return { cwd: options.cwd, registryFile, outputDir };
}
