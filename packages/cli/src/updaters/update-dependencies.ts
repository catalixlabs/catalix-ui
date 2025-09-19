import { addDependency } from "nypm";
import type { RegistryItem } from "@/types/registry";
import { withSpinner } from "@/utils/spinner";

export const updateDependencies = async (
  dependencies: RegistryItem["dependencies"],
  devDependencies: RegistryItem["devDependencies"],
  cwd: string,
  silent: boolean = true
) => {
  await withSpinner("Installing dependencies.", async () => {
    const deps = dependencies || [];
    const devDeps = devDependencies || [];
    for (const dep of deps) {
      await addDependency(dep, { cwd, silent });
    }
    for (const dep of devDeps) {
      await addDependency(dep, { cwd, dev: true, silent });
    }
  });
};
