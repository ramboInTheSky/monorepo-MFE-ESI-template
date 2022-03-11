const exp = require("../../../tools/config/rollup.config.config")
const pkg = require("./package.json")

module.exports = {...exp(pkg)}
