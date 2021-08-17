import ts from "rollup-plugin-typescript2";
import { OutputOptions, Plugin, RollupOptions } from "rollup";

const config: RollupOptions = {
  input: "src/plugin/index.ts",
  output: [
    {
      file: "dist/index.cjs.js",
      format: "cjs",
      exports: "auto",
    },
    {
      file: "dist/index.esm.js",
      format: "es",
    },
    {
      file: "dist/index.iife.js",
      format: "iife",
      globals: {
        "vue-demi": "VueDemi",
      },
      name: "VueScrollPosition",
    },
  ],
  external: ["vue-demi"],
  plugins: [
    ts({
      tsconfigOverride: {
        compilerOptions: {
          declaration: false,
        },
        exclude: ["**/__tests__", "test-dts"],
      },
    }),
  ],
};

export default config;
