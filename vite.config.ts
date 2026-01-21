import { readFileSync } from "node:fs";
import { defineConfig } from "vite";

const packageJson = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf-8"),
) as { version: string };

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "bling-ha-tile-library",
    },
    rollupOptions: {
      output: {
        entryFileNames: "bling-ha-tile-library.js",
      },
    },
  },
  define: {
    __CARD_VERSION__: JSON.stringify(packageJson.version),
  },
});
