import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

console.log(resolve(__dirname, "./src/index.ts"));

// https://vitejs.dev/config/
export default defineConfig({
  root: "demo/",
  optimizeDeps: {
    exclude: ["vue-demi"],
  },
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: "vue-scroll-position",
        replacement: resolve(__dirname, "./src/index.ts"),
      },
    ],
  },
});
