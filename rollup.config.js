import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

export default {
  input: "src/index.ts",
  plugins: [
    commonjs(),
    json(),
    nodeResolve({
      browser: true,
      extensions: [".js", ".ts"],
      preferBuiltins: false,
    }),
    typescript({
      tsconfig: "./tsconfig.base.json",
      moduleResolution: "node",
      outDir: "types",
      target: "es2022",
      outputToFilesystem: false,
    }),
  ],
  external: [
    "@coral-xyz/borsh",
    "@solana/web3.js",
    "@solana/spl-token"
  ],
  output: {
    file: "dist/browser/index.js",
    format: "es",
    sourcemap: true,
  },
};