import { z } from "zod/v4";

export const initOptionsSchema = z.object({
  cwd: z.string(),
  srcDir: z.boolean(),
});

export type InitOptionsSchema = z.infer<typeof initOptionsSchema>;
