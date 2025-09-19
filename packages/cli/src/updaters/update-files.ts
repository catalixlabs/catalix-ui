import fs from "fs-extra";
import path from "pathe";
import type { RegistryItem } from "@/types/registry";
import { withSpinner } from "@/utils/spinner";

export const updateFiles = async (
  files: RegistryItem["files"],
  cwd: string,
  overwrite: boolean
) => {
  await withSpinner("Writing files.", async () => {
    const fileList = files || [];
    let written = 0;
    let skipped = 0;

    for (const file of fileList) {
      const targetPath = file.target || file.path;
      if (!targetPath) continue;

      const fullPath = path.join(cwd, targetPath);
      const dir = path.dirname(fullPath);

      // Check if file exists
      const exists = await fs.pathExists(fullPath);
      if (exists && !overwrite) {
        skipped++;
        continue;
      }

      // Ensure directory exists
      await fs.ensureDir(dir);

      // Write file
      await fs.writeFile(fullPath, file.content || "", "utf-8");
      written++;
    }

    return { written, skipped };
  });
};
