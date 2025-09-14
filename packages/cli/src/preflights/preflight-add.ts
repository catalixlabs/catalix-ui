import path from "pathe";
import chalk from "chalk";
import fs from "fs-extra";
import { withSpinner } from "@/utils/spinner";
import type { AddOptionsSchema } from "@/types/command";

export const preflightAdd = async (options: AddOptionsSchema) => {
  // Step 1: Check if the working directory exists
  await withSpinner("Checking working directory", async () => {
    const exists = await fs.pathExists(options.cwd);
    if (!exists) {
      const resolvedPath = chalk.cyan.underline(path.resolve(options.cwd));
      throw new Error(`Directory does not exist: ${resolvedPath}`);
    }
  });

  // Step 2: Check if components.json exists (required for adding components)
  const componentsJsonPath = await withSpinner(
    "Checking components.json",
    async () => {
      const filePath = path.join(options.cwd, "components.json");
      const exists = await fs.pathExists(filePath);
      if (!exists) {
        throw new Error(
          `${chalk.cyan("components.json")} not found. Run 'foundry init' first.`
        );
      }
      return filePath;
    }
  );

  return {
    cwd: path.resolve(options.cwd),
    componentsJsonPath,
  };
};
