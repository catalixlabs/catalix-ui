import { z } from "zod/v4";

export const initOptionsSchema = z.object({
  cwd: z.string(),
});

export type InitOptionsSchema = z.infer<typeof initOptionsSchema>;
