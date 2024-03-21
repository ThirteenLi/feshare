import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";
import { vitePluginForArco } from "@arco-plugins/vite-react";

export default defineConfig({
  plugins: [react(), vitePluginForArco(), reactRefresh()],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  resolve: {
    alias: [
      {
        find: "~",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
});
