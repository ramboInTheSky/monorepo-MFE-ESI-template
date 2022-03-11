const json = require("@rollup/plugin-json")
const exp = require("../../../tools/config/rollup.package.config")
const pkg = require("./package.json")

module.exports = {...exp(pkg, true), plugins: [...exp(pkg).plugins, json()]}
