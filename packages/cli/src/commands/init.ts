import { Command } from "commander";
import chalk from "chalk";
import fs from "fs-extra";
import z from "zod";
import { preflightInit } from "@/preflights/preflight-init";
import { withSpinner } from "@/utils/spinner";
import { handleError } from "@/utils/handle-error";

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

    console.log(chalk.green("Success! Project initialized"));
    console.log("You may now add components.");
  } catch (error) {
    handleError(error);
  }
}

export default init;
