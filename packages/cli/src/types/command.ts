import z from "zod";

export const initOptionsSchema = z.object({
  cwd: z.string(),
});

export type InitOptionsSchema = z.infer<typeof initOptionsSchema>;

export const addOptionsSchema = z.object({
  components: z.array(z.string()).optional(),
  overwrite: z.boolean(),
  cwd: z.string(),
  all: z.boolean(),
});

export type AddOptionsSchema = z.infer<typeof addOptionsSchema>;

export const buildOptionsSchema = z.object({
  registryFile: z.string(),
  outputDir: z.string(),
  cwd: z.string(),
});

export type BuildOptionsSchema = z.infer<typeof buildOptionsSchema>;
