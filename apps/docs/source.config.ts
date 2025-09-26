import { defineConfig, defineDocs } from "fumadocs-mdx/config";

export const docs = defineDocs({
  dir: "./src/contents/docs",
});

export default defineConfig();
