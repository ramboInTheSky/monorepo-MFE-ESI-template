/* istanbul ignore file */

import Logger from "@monorepo/core-logger"
import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import {getStore, getProps} from "./utils"
import ClientApp from "./ClientApp"
import inialiseGlobalEvents from "../events/initialiseGlobalEvents"
import subscribeRedirectToAlternativeLangeuage from "../utils/redirectToAlternativeLanguage"

declare const window: any
const store = getStore()
const appProps = getProps()
Logger.debug(`Hydrating Header`)
const hydrate = () => {
    ReactDOM.hydrate(
        <Provider store={store}>
            <ClientApp {...appProps} />
        </Provider>,
        document.getElementById("header-entrypoint"),
    )
}

inialiseGlobalEvents()

setTimeout(hydrate, 0)

subscribeRedirectToAlternativeLangeuage()

const platModPage = "platform_modernisation"

if (window.document.getElementById(platModPage) || window.platmodflags?.googleAnalytics) {
    if (window.GoogleAnalytics !== undefined) {
        window.GoogleAnalytics.Init(appProps.siteUrl)
    }
}

if (window.document.getElementById(platModPage) || window.platmodflags?.monetateEvents) {
    if (window.MonetateShoppingBagSDK !== undefined) {
        window.MonetateShoppingBagSDK.InitialiseEvents()
    }
}
