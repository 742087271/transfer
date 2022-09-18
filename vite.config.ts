import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// https://vitejs.dev/config/
const lib = {
  plugins: [vue()],
  base: "./", // 避免你打包后404问题
  resolve: {
    extensions: [".vue", ".js", ".ts", ".tsx"],
    dedupe: ["vue"],
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "./src/modules/index.ts"), //指定组件编译入口文件
      name: "transfer",
      fileName: "transfer",
    },
    outDir: "lib",
    // 打包成组件库时不能将vue打包进去，否则会报错
    rollupOptions: {
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
  },
};
const project = (url) => {
  return defineConfig({
    plugins: [vue()],
    base: "./", // 避免你打包后404问题
    resolve: {
      extensions: [".vue", ".js", ".ts", ".tsx"],
      dedupe: ["vue"],
    },
    // 打包配置
  });
};
export default ({ mode }) => {
  const url = loadEnv(mode, process.cwd()).VITE_APP_FILE;
  console.log("url", url);
  
  switch (url) {
    case "lib": // 打包库文件
      return lib;

    default: // 开发模式、生产模式
      return project(url);
  }
};
