import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: true,
  },
  build: {
    lib: {
      entry: "src/index.js",
      name: "ChatBandhu",
      formats: ["es", "umd"], // common formats: es + umd
      fileName: (format) => `chat-bandhu.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
        exports: "named", // 👈 important to avoid the default/named conflict warning
      },
    },
  },
});
