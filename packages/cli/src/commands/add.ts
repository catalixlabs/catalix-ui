import { Command } from "commander";
import fs from "fs-extra";
import path from "pathe";
import chalk from "chalk";
import prompts from "prompts";
import { handleError } from "@/utils/handle-error";
import { addOptionsSchema, type AddOptionsSchema } from "@/types/command";
import { withSpinner } from "@/utils/spinner";
import { getRegistryIndex } from "@/registry/api";
import { type RegistryItem } from "@/types/registry";
import { resolveRegistryTree } from "@/registry/resolver";
import { updateDependencies } from "@/updaters/update-dependencies";
import { updateFiles } from "@/updaters/update-files";

const add = new Command()
  .name("add")
  .description("add a component to your project")
  .argument("[components...]", "the components to add")
  .option("-o, --overwrite", "overwrite existing files.", false)
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .option("-a, --all", "add all available components", false)
  .action(async (components, options) => runAdd(components, options));

export default add;

async function runAdd(components: string[], options: AddOptionsSchema) {
  try {
    const parsed = addOptionsSchema.parse({
      components,
      cwd: path.resolve(options.cwd),
      all: options.all,
      overwrite: options.overwrite,
    });

    await withSpinner("Checking working directory", async () => {
      const exists = await fs.pathExists(parsed.cwd);
      const resolvedPath = chalk.cyan.underline(parsed.cwd);
      if (!exists) throw new Error(`Directory does not exist: ${resolvedPath}`);
      return resolvedPath;
    });

    await withSpinner("Verifying package.json", async () => {
      const pkgJSONPath = path.join(parsed.cwd, "package.json");
      const exists = await fs.pathExists(pkgJSONPath);
      const FILE = chalk.cyan("package.json");
      const CWD = chalk.cyan(parsed.cwd);
      if (!exists) throw new Error(`Path ${CWD} doesn't contain a ${FILE}.`);
    });

    const available = await getRegistryComponents();
    let selected: string[];

    if (parsed.all) {
      selected = available.map((i) => i.name);
    } else if (parsed.components?.length) {
      selected = parsed.components;
    } else {
      selected = await promptForComponents(available);
    }

    const registry = await withSpinner("Resolving registry.", async () => {
      const tree = await resolveRegistryTree(selected);
      if (!tree) throw new Error("Failed to resolve registry items.");
      return tree;
    });

    await updateDependencies(
      registry.dependencies,
      registry.devDependencies,
      parsed.cwd
    );

    await updateFiles(registry.files, parsed.cwd, parsed.overwrite);
  } catch (error) {
    handleError(error);
  }
}

const getRegistryComponents = async (): Promise<RegistryItem[]> => {
  const registry = await getRegistryIndex();
  if (!registry) throw new Error("Failed to fetch registry index.");
  return registry.items.filter((i: RegistryItem) => i.type === "registry:core");
};

const promptForComponents = async (
  available: RegistryItem[]
): Promise<string[]> => {
  const { selected } = await prompts({
    type: "multiselect",
    name: "selected",
    hint: "Space to select. A to toggle all. Enter to submit.",
    instructions: false,
    message: "Select components to add",
    choices: available.map((i) => ({ title: i.name, value: i.name })),
  });

  if (!selected || !selected.length) {
    console.error(chalk.yellow("No components selected. Exiting."));
    process.exit(1);
  }

  return selected;
};
