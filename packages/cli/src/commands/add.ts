import path from "pathe";
import { Command } from "commander";
import z from "zod";
import prompts from "prompts";
import { handleError } from "@/utils/handle-error";
import { getRegistryIndex } from "@/registry/api";
import { registrySchema } from "@/types/registry";
import { addOptionsSchema } from "@/types/command";
import { preflightAdd } from "@/preflights/preflight-add";

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
  return registry.items;
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
) => {};
