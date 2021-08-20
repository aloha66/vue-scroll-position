import ts from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import { OutputOptions, Plugin, RollupOptions } from "rollup";

const input = "src/index.ts";

const output: OutputOptions[] = [
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
];

const configs: RollupOptions[] = [
  {
    input,
    output,
    external: ["vue-demi"],
    plugins: [
      terser({
        format: {
          comments: false,
        },
      }),
      ts({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
          },
          exclude: ["**/__tests__", "test-dts"],
        },
      }),
    ],
  },
];

configs.push({
  input,
  output: {
    file: "dist/index.d.ts",
    format: "es",
  },
  external: ["vue-demi"],
  plugins: [dts()],
});

export default configs;
