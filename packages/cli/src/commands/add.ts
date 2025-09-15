import path from "pathe";
import { Command } from "commander";
import z from "zod";
import prompts from "prompts";
import fs from "fs-extra";
import chalk from "chalk";
import { handleError } from "@/utils/handle-error";
import { getRegistryIndex, getRegistryItem } from "@/registry/api";
import { registrySchema, registryItemSchema } from "@/types/registry";
import { addOptionsSchema } from "@/types/command";
import { preflightAdd } from "@/preflights/preflight-add";
import { addDependency } from "nypm";

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
  .action(async (components, opts) => {
    try {
      const options = addOptionsSchema.parse({
        components,
        cwd: path.resolve(opts.cwd),
        ...opts,
      });

      const selected = await getSelectedComponents(options);
      options.components = selected;
      const preflightResult = await preflightAdd(options);
      await addComponents(options, preflightResult);
    } catch (error) {
      handleError(error);
    }
  });

export default add;

const getSelectedComponents = async (
  options: z.infer<typeof addOptionsSchema>
): Promise<string[]> => {
  const components = await getAvailableComponents();
  if (options.components?.length) return options.components;
  if (options.all) return components.map((c) => c.name);
  return await promptUserForComponents(components);
};

const getAvailableComponents = async () => {
  const registryData = await getRegistryIndex();
  const registry = registrySchema.parse(registryData);
  // Hide utility/library items from the prompt
  return registry.items.filter((item) => item.type !== "registry:lib");
};

const promptUserForComponents = async (
  components: Array<{ name: string }>
): Promise<string[]> => {
  const { selected } = await prompts({
    type: "multiselect",
    name: "selected",
    message: "Which components would you like to add?",
    hint: "Space to select. A to toggle all. Enter to submit.",
    instructions: false,
    choices: components.map((component) => ({
      title: component.name,
      value: component.name,
    })),
  });

  if (!selected?.length) {
    console.warn("No components selected. Exiting.");
    process.exit(1);
  }

  return selected;
};

const addComponents = async (
  options: z.infer<typeof addOptionsSchema>,
  preflightResult: { cwd: string; componentsJsonPath: string }
) => {
  const { cwd } = preflightResult;
  const selected = options.components ?? [];

  for (const name of selected) {
    const item = await getRegistryItem(name);
    const parsed = registryItemSchema.safeParse(item);
    if (!parsed.success) {
      console.warn(chalk.yellow(`Skipping invalid registry item: ${name}`));
      continue;
    }

    // Write files
    for (const file of parsed.data.files ?? []) {
      const targetRelative = file.target ?? file.path;
      if (!targetRelative) continue;

      const targetPath = path.join(cwd, targetRelative);
      const targetDir = path.dirname(targetPath);
      const exists = await fs.pathExists(targetPath);
      if (exists && !options.overwrite) {
        continue;
      }
      await fs.ensureDir(targetDir);
      await fs.writeFile(targetPath, file.content ?? "", "utf-8");
    }

    // Install deps
    const prev = {
      npm_config_loglevel: process.env.npm_config_loglevel,
      NPM_CONFIG_LOGLEVEL: process.env.NPM_CONFIG_LOGLEVEL,
      npm_config_progress: process.env.npm_config_progress,
      npm_config_fund: process.env.npm_config_fund,
      npm_config_audit: process.env.npm_config_audit,
      ADBLOCK: process.env.ADBLOCK,
      DISABLE_OPENCOLLECTIVE: process.env.DISABLE_OPENCOLLECTIVE,
      PNPM_LOG_LEVEL: process.env.PNPM_LOG_LEVEL,
      YARN_SILENT: process.env.YARN_SILENT,
    } as const;
    try {
      process.env.npm_config_loglevel = "silent";
      process.env.NPM_CONFIG_LOGLEVEL = "silent";
      process.env.npm_config_progress = "false";
      process.env.npm_config_fund = "false";
      process.env.npm_config_audit = "false";
      process.env.ADBLOCK = "1";
      process.env.DISABLE_OPENCOLLECTIVE = "1";
      process.env.PNPM_LOG_LEVEL = "silent";
      process.env.YARN_SILENT = "1";

      for (const d of parsed.data.dependencies ?? []) {
        await addDependency(d, { cwd });
      }
      for (const d of parsed.data.devDependencies ?? []) {
        await addDependency(d, { cwd, dev: true } as any);
      }
    } finally {
      process.env.npm_config_loglevel = prev.npm_config_loglevel;
      process.env.NPM_CONFIG_LOGLEVEL = prev.NPM_CONFIG_LOGLEVEL;
      process.env.npm_config_progress = prev.npm_config_progress;
      process.env.npm_config_fund = prev.npm_config_fund;
      process.env.npm_config_audit = prev.npm_config_audit;
      process.env.ADBLOCK = prev.ADBLOCK;
      process.env.DISABLE_OPENCOLLECTIVE = prev.DISABLE_OPENCOLLECTIVE;
      process.env.PNPM_LOG_LEVEL = prev.PNPM_LOG_LEVEL;
      process.env.YARN_SILENT = prev.YARN_SILENT;
    }

    // Do not mutate components.json — it's reserved for config
  }
};
