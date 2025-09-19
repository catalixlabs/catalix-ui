import { z } from "zod";

const typeEnum = z.enum([
  "registry:lib",
  "registry:block",
  "registry:component",
  "registry:core",
  "registry:hook",
  "registry:page",
  "registry:file",
]);

const fileSchema = z.object({
  path: z.string(),
  content: z.string().optional(),
  type: typeEnum,
  target: z.string().optional(),
});

export const registryItemSchema = z.object({
  name: z.string(),
  type: typeEnum,
  title: z.string().optional(),
  description: z.string().optional(),
  author: z.string().optional(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(fileSchema),
  docs: z.string().optional(),
  categories: z.array(z.string()).optional(),
});

export const registrySchema = z.object({
  name: z.string(),
  homepage: z.string(),
  items: z.array(registryItemSchema).min(1),
});

export type RegistryItem = z.infer<typeof registryItemSchema>;
export type Registry = z.infer<typeof registrySchema>;

export const registryResolvedItemsTreeSchema = z.object({
  files: z.array(registryItemSchema.shape.files.element).default([]),
  dependencies: z.array(z.string()).default([]),
  devDependencies: z.array(z.string()).default([]),
  docs: z.string().default(""),
});

export type RegistryResolvedTree = z.infer<
  typeof registryResolvedItemsTreeSchema
>;
