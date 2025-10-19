// source.config.ts
import {
  defineConfig,
  defineDocs,
  frontmatterSchema
} from "fumadocs-mdx/config";
import { z } from "zod";
var docs = defineDocs({
  dir: "./src/content/docs",
  docs: {
    schema: frontmatterSchema.extend({
      links: z.object({
        doc: z.string().optional(),
        api: z.string().optional()
      }).optional()
    })
  }
});
var source_config_default = defineConfig({
  mdxOptions: {
    remarkNpmOptions: {
      persist: { id: "pm" }
    }
  }
});
export {
  source_config_default as default,
  docs
};
