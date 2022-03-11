const typescript = require("rollup-plugin-typescript2")
const localtypescript = require("typescript")
const resolve = require("@rollup/plugin-node-resolve")
const commonjs = require("@rollup/plugin-commonjs")
const externals = require("rollup-plugin-node-externals")
const pkg = require("./package.json")

module.exports = {
    input: "src/index.ts",
    output: [
        {
            file: pkg.main,
            format: "cjs",
        },
    ],
    plugins: [
        externals({
            deps: true,
            peerDeps: true,
        }),
        typescript({
            typescript: localtypescript,
            tsconfig: "./tsconfig.build.json",
        }),
        resolve(),
        commonjs(),
    ],
}
