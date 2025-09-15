import path from "pathe";
import chalk from "chalk";
import { Command } from "commander";
import fs from "fs-extra";
import { preflightBuild } from "@/preflights/preflight-build";
import { buildOptionsSchema, type BuildOptionsSchema } from "@/types/command";
import { registryItemSchema, registrySchema } from "@/types/registry";
import { handleError } from "@/utils/handle-error";
import { withSpinner } from "@/utils/spinner";

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
  .action(async (registry: string, options: BuildOptionsSchema) => {
    try {
      const parsed = buildOptionsSchema.parse({
        cwd: path.resolve(options.cwd),
        registryFile: registry,
        output: options.output,
      });

      const { registryFile } = await preflightBuild(parsed);

      const content = await fs.readJsonSync(registryFile, "utf-8");
      const result = registrySchema.parse(content);

      await withSpinner("Building registry", async () => {
        await fs.emptyDir(parsed.output);
        for (const registryItem of result.items) {
          if (!registryItem.files) continue;

          for (const file of registryItem.files) {
            file.content = await fs.readFile(
              path.resolve(parsed.cwd, file.path),
              "utf-8"
            );
          }

          const parsedRegistryItem = registryItemSchema.safeParse(registryItem);
          if (!parsedRegistryItem.success) {
            console.error(
              `Invalid registry item found for ${chalk.cyan(registryItem.name)}.`
            );
            continue;
          }

          await fs.writeFile(
            path.resolve(parsed.output, `${parsedRegistryItem.data.name}.json`),
            JSON.stringify(parsedRegistryItem.data, null, 2)
          );

          // copy the registry.json file to the output directory as index.json
          await fs.copyFile(
            registryFile,
            path.resolve(parsed.output, "index.json")
          );
        }
      });
    } catch (error) {
      handleError(error);
    }
  });

export default build;
