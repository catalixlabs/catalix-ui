import z from "zod";

export const buildOptionsSchema = z.object({
  registryFile: z.string(),
  output: z.string(),
  cwd: z.string(),
});

export type BuildOptions = z.infer<typeof buildOptionsSchema>;
