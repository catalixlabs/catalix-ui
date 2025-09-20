import type { SourceFile } from "ts-morph";
import { getTSConfig } from "@/utils/project-info";

export const transformImports = async (cwd: string) => {
  const tsconfig = await getTSConfig(cwd);
  const paths = tsconfig?.config.compilerOptions?.paths ?? {};

  // Detect catch-all alias from tsconfig (e.g. "@/*", "~/*")
  const catchAllAlias =
    Object.keys(paths)
      .find((alias) => alias.endsWith("/*"))
      ?.replace(/\/\*$/, "") ?? "@";

  return function transformImport(sourceFile: SourceFile): SourceFile {
    if (![".tsx", ".ts", ".jsx", ".js"].includes(sourceFile.getExtension())) {
      return sourceFile;
    }

    const importDeclarations = sourceFile.getImportDeclarations();

    for (const importDecl of importDeclarations) {
      const moduleSpecifier = importDecl.getModuleSpecifierValue();
      if (!moduleSpecifier.startsWith("@/registry/")) continue;

      // Replace registry prefix with project alias
      const updated = moduleSpecifier.replace(
        /^@\/registry\/[^/]+/,
        catchAllAlias
      );
      importDecl.setModuleSpecifier(updated);
    }

    return sourceFile;
  };
};
