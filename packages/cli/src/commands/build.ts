import path from "pathe";
import chalk from "chalk";
import { Command } from "commander";
import fs from "fs-extra";
import { buildOptionsSchema } from "@/types/command";
import { registrySchema } from "@/types/registry";
import { handleError } from "@/utils/handle-error";
import { withSpinner } from "@/utils/spinner";
import { buildRegistry } from "@/utils/build-registry";

const build = new Command()
  .name("build")
  .description("build registry metadata files")
  .argument("[registry]", "path to registry.json file", "./registry.json")
  .option(
    "-o, --output <path>",
    "destination directory for json files",
    "./public/r"
  )
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .action((registry, options) => runBuild(registry, options));

async function runBuild(registry: string, options: any) {
  try {
    const { cwd, outputDir, registryFile } = buildOptionsSchema.parse({
      cwd: path.resolve(options.cwd),
      outputDir: options.output,
      registryFile: registry,
    });

    await withSpinner("Checking current working directory.", async () => {
      const exists = await fs.pathExists(cwd);
      const CWD = chalk.cyan.underline(cwd);
      if (!exists) throw new Error(`Make sure directory exists: ${CWD}.`);
    });

    const reg = await withSpinner("Checking registry.json", async () => {
      const registry = path.resolve(cwd, registryFile);
      const exists = await fs.pathExists(registry);
      const FILE = chalk.cyan("registry.json");
      if (!exists) throw new Error(`${FILE} not found at ${registry}`);
      return registry;
    });

    const output = await withSpinner("Preparing out directory", async () => {
      const dir = path.resolve(cwd, outputDir);
      await fs.ensureDir(dir);
      return dir;
    });

    const registryContent = await fs.readJson(reg, "utf-8");
    const parsedRegistry = registrySchema.parse(registryContent);

    await withSpinner("Building registry", async () => {
      await fs.emptyDir(output);
      await buildRegistry(cwd, output, parsedRegistry);
      await fs.copyFile(registryFile, path.resolve(output, "index.json"));
    });
  } catch (error) {
    handleError(error);
  }
}

export default build;
