import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["./src/index.ts"],
    platform: "node",
    dts: true,
    sourcemap: true,
    shims: true,
    env: {
      REGISTRY_URL: "http://localhost:3000/r",
    },
  },
]);
