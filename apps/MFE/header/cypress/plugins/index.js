/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

 module.exports = (_on, _config) => {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config
    // _config.env = {...env}
    _config.baseUrl = process.env.REACT_APP_APP_URL || "http://localhost:3333"

    _on("before:browser:launch", (browser = {}, launchOptions) => {
        // `args` is an array of all the arguments that will
        // be passed to browsers when it launches
        console.log(launchOptions.args) // print all current args

        if (browser.family === "chromium" && browser.name !== "electron") {
            // auto open devtools
            launchOptions.args.push("--no-sandbox")
        }

        // whatever you return here becomes the launchOptions
        return launchOptions
    })

    return _config
}
