import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base:'./',// 避免你打包后404问题
  resolve: {
    extensions: [".vue", ".js", ".ts", ".tsx"],
  },
});
