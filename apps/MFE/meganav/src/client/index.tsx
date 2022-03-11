/* istanbul ignore file */
// import "core-js/es/symbol"
// import "core-js/es/object"

import Logger from "@monorepo/core-logger"
import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import {getStore, getProps} from "./utils"
import ClientApp from "./ClientApp"

const store = getStore()
const appProps = getProps()
Logger.debug(`Hydrating MegaNav`)

const hydrate = () => {
    ReactDOM.hydrate(
        <Provider store={store}>
            <ClientApp {...appProps} />
        </Provider>,
        document.getElementById("meganav-entrypoint"),
    )
}

setTimeout(hydrate, 0)
