import path from "pathe";
import fs from "fs-extra";
import fg from "fast-glob";
import { getPackageJSONInfo } from "@/utils/package-json-info";
import { getTsconfig } from "get-tsconfig";

const ignore = [
  "**/node_modules/**",
  ".next",
  ".git",
  "public",
  "dist",
  "build",
];

export const getProjectInfo = async (cwd: string) => {
  const [framework, isSrc, tailwindVersion, ts, tsconfig, alias, pkg] =
    await Promise.all([
      getFramework(cwd),
      isSrcDirectory(cwd),
      getTailwindVersion(cwd),
      isTSProject(cwd),
      getTSConfig(cwd),
      getTSConfigAliasPrefix(cwd),
      getPackageJSONInfo(cwd),
    ]);

  return {
    framework,
    isSrc,
    tailwindVersion,
    ts,
    tsconfig,
    alias,
    pkg,
  };
};

export const getFramework = async (cwd: string) => {
  const files = await fg.glob("**/next.config.{js,mjs,ts}", { ignore, cwd });
  if (files.some((f) => f.startsWith("next.config."))) return "next.js";
  return null;
};

export const isSrcDirectory = async (cwd: string) => {
  return await fs.pathExists(path.resolve(cwd, "src"));
};

export type TailwindVersion = "v3" | "v4" | null;

export const getTailwindVersion = async (
  cwd: string
): Promise<TailwindVersion> => {
  const { dependencies, devDependencies } = await getPackageJSONInfo(cwd);
  const dep = dependencies?.tailwindcss;
  const devDep = devDependencies?.tailwindcss;
  if (!dep && !devDep) return null;
  if (/^(?:\^|~)?3(?:\.\d+)*(?:-.*)?$/.test(dep || devDep || "")) return "v3";
  return "v4";
};

export const isTSProject = async (cwd: string) => {
  return !!getTsconfig(cwd);
};

export const getTSConfig = async (cwd: string) => {
  return getTsconfig(cwd)?.config;
};

export const getTSConfigAliasPrefix = async (cwd: string) => {
  const config = await getTSConfig(cwd);
  if (!config) return null;
  const { compilerOptions } = config;
  const aliasPaths = compilerOptions?.paths ?? {};
  const [alias] = Object.entries(aliasPaths).find(([, paths]) =>
    paths.some((p) => /^\.\/(src|app)?\*$/.test(p))
  ) ?? [Object.keys(aliasPaths)[0]];
  return alias ? alias.replace(/\/\*$/, "") : null;
};

export const getProjectConfig = async (cwd: string) => {};
