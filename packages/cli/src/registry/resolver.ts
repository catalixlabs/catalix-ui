import { getRegistryItem } from "@/registry/api";
import {
  registryResolvedItemsTreeSchema,
  type RegistryResolvedTree,
  type RegistryItem,
} from "@/types/registry";

export const resolveRegistryTree = async (
  names: string[]
): Promise<RegistryResolvedTree | null> => {
  const items = await collectItems([...new Set(names)]);
  if (!items.length) return null;
  return registryResolvedItemsTreeSchema.parse(mergeItems(items));
};

const collectItems = async (names: string[]): Promise<RegistryItem[]> => {
  const items: RegistryItem[] = [];

  for (const name of names) {
    const item = await getRegistryItem(name);
    if (!item) continue;
    items.push(item);

    // Collect dependencies recursively
    if (item.registryDependencies?.length) {
      const deps = await collectItems(item.registryDependencies);
      items.push(...deps);
    }
  }

  return items;
};

const mergeItems = (items: RegistryItem[]): RegistryResolvedTree => {
  const files = items.flatMap((item) => item.files || []);
  const dependencies = [
    ...new Set(items.flatMap((item) => item.dependencies || [])),
  ];
  const devDependencies = [
    ...new Set(items.flatMap((item) => item.devDependencies || [])),
  ];
  const docs = items.find((item) => item.docs)?.docs || "";
  return { files, dependencies, devDependencies, docs };
};
