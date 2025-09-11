import path from "pathe";
import chalk from "chalk";
import fs from "fs-extra";
import { withSpinner } from "@/utils/spinner";

export async function preflightInit(cwd: string) {
  // Step 1: check directory exists
  await withSpinner("Checking working directory", async () => {
    const exists = await fs.pathExists(cwd);
    if (!exists) {
      const CWD = chalk.cyan.underline(path.resolve(cwd));
      throw new Error(`Make sure directory exists: ${CWD}`);
    }
  });

  // Step 2: check package.json exists
  const packageJsonPath = await withSpinner(
    "Checking package.json",
    async () => {
      const filePath = path.join(cwd, "package.json");
      const exists = await fs.pathExists(filePath);
      if (!exists) {
        throw new Error(`${chalk.cyan("package.json")} not found`);
      }
      return filePath;
    }
  );

  // Step 3: check components.json doesn't exist
  const componentsJsonPath = await withSpinner(
    "Checking components.json",
    async () => {
      const filePath = path.join(cwd, "components.json");
      if (await fs.pathExists(filePath)) {
        const CWD = chalk.cyan.underline(path.resolve(cwd));
        throw new Error(
          `A ${chalk.cyan("components.json")} already exists at ${CWD}\n` +
            `Please remove it to start over.`
        );
      }
      return filePath;
    }
  );

  return { cwd, packageJsonPath, componentsJsonPath };
}
