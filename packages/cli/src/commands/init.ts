import { Command } from "commander";
import chalk from "chalk";
import fs from "fs-extra";
import z from "zod";
import { preflightInit } from "@/preflights/preflight-init";
import { withSpinner } from "@/utils/spinner";
import { handleError } from "@/utils/handle-error";
import path from "pathe";
import { getRegistryItem } from "@/registry/api";
import { registryItemSchema } from "@/types/registry";
import { addDependency } from "nypm";

const optionsSchema = z.object({
  cwd: z.string(),
});

type OptionsSchema = z.infer<typeof optionsSchema>;

const init = new Command()
  .name("init")
  .description("initialize your project and install dependencies")
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .action((options) => runInit(options));

async function runInit(options: OptionsSchema) {
  try {
    const { cwd } = optionsSchema.parse(options);
    const { componentsJsonPath } = await preflightInit(cwd);

    await withSpinner("Writing components.json", async () => {
      await fs.writeJson(componentsJsonPath, {}, { spaces: 2 });
    });

    await withSpinner("Installing base utilities", async () => {
      const item = await getRegistryItem("cn");
      const parsed = registryItemSchema.safeParse(item);
      if (!parsed.success) return;

      for (const file of parsed.data.files ?? []) {
        const targetRelative = file.target ?? file.path;
        if (!targetRelative) continue;
        const outPath = path.join(cwd, targetRelative);
        await fs.ensureDir(path.dirname(outPath));
        await fs.writeFile(outPath, file.content ?? "", "utf-8");
      }

      for (const dep of parsed.data.dependencies ?? []) {
        await addDependency(dep, { cwd });
      }
      for (const dep of parsed.data.devDependencies ?? []) {
        await addDependency(dep, { cwd, dev: true } as any);
      }
    });

    console.log(chalk.green("Success! Project initialized"));
    console.log("You may now add components.");
  } catch (error) {
    handleError(error);
  }
}

export default init;
