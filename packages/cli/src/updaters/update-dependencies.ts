import { addDependency } from "nypm";
import type { RegistryItem } from "@/types/registry";
import { withSpinner } from "@/utils/spinner";
import { getPackageJSONInfo } from "@/utils/package-json-info";

export const updateDependencies = async (
  dependencies: RegistryItem["dependencies"],
  devDependencies: RegistryItem["devDependencies"],
  cwd: string,
  silent: boolean = true
) => {
  await withSpinner("Installing dependencies.", async () => {
    const deps = dependencies || [];
    const devDeps = devDependencies || [];

    const pkg = await getPackageJSONInfo(cwd);
    const existing = new Set<string>([
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
      ...Object.keys(pkg.optionalDependencies || {}),
    ]);

    const getName = (specifier: string): string => {
      const at = specifier.lastIndexOf("@");
      return specifier.slice(0, Math.max(at, specifier.length));
    };

    const depsToInstall = deps.filter((s) => !existing.has(getName(s)));
    const devDepsToInstall = devDeps.filter((s) => !existing.has(getName(s)));

    for (const dep of depsToInstall) {
      await addDependency(dep, { cwd, silent });
    }
    for (const dep of devDepsToInstall) {
      await addDependency(dep, { cwd, dev: true, silent });
    }
  });
};
