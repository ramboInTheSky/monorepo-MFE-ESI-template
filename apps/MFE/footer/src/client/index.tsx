/* istanbul ignore file */
// import "core-js/es/symbol"
// import "core-js/es/object"

import Logger from "@monorepo/core-logger"
import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import {getStore, getProps} from "./utils"
import App from "../App"
import isFooterInViewport from "../utils/window/isFooterInViewport"
import executeOnLoad from "../utils/window/executeOnLoad"
import executeOnScroll from "../utils/window/executeOnScroll"

const store = getStore()
const appProps = getProps()
Logger.debug(`Hydrating Footer`)
const hydrate = () => {
    ReactDOM.hydrate(
        <Provider store={store}>
            <App {...appProps} />
        </Provider>,
        document.getElementById("footer-entrypoint"),
    )
}

const doHydrate = () => {
    if (isFooterInViewport()) {
        executeOnLoad(hydrate)
    } else {
        executeOnLoad(() => executeOnScroll(hydrate))
    }
}

doHydrate()
