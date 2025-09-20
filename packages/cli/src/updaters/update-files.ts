import fs from "fs-extra";
import path from "pathe";
import { Project } from "ts-morph";
import type { RegistryItem } from "@/types/registry";
import { withSpinner } from "@/utils/spinner";
import { transformImports } from "@/transformers/transformer-imports";
import { isSrcDirectory } from "@/utils/project-info";

export const updateFiles = async (
  files: RegistryItem["files"],
  cwd: string,
  overwrite: boolean
) => {
  const transform = await transformImports(cwd); // get import transformer
  const project = new Project({ useInMemoryFileSystem: true });
  const isSrc = await isSrcDirectory(cwd);

  await withSpinner("Writing files.", async () => {
    const fileList = files || [];
    let written = 0;
    let skipped = 0;

    for (const file of fileList) {
      let targetPath = file.target || file.path;
      if (!targetPath) continue;

      // If src folder exists, prepend it
      if (isSrc) {
        targetPath = path.join("src", targetPath);
      }

      // Transform imports using ts-morph
      const sourceFile = project.createSourceFile(
        file.path,
        file.content || "",
        { overwrite: true }
      );
      transform(sourceFile);
      file.content = sourceFile.getFullText();

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
