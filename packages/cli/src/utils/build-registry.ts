import fs from "fs-extra";
import path from "pathe";
import chalk from "chalk";
import { registryItemSchema, type Registry } from "@/types/registry";

export async function buildRegistry(
  cwd: string,
  output: string,
  registry: Registry
) {
  for (const item of registry.items) {
    if (!item.files) continue;

    for (const file of item.files) {
      const content = await fs.readFile(path.resolve(cwd, file.path), "utf-8");
      file.content = content;
    }
    const result = registryItemSchema.safeParse(item);
    const name = chalk.cyan(item.name);

    if (!result.success) {
      console.error(`Invalid registry item found for ${name}.`);
      continue;
    }

    const data = JSON.stringify(result.data, null, 2);
    await fs.writeFile(path.resolve(output, result.data.name + `.json`), data);
  }
}
