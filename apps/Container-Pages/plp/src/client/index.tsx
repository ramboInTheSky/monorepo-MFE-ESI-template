/* istanbul ignore file */

import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import Logger from "@monorepo/core-logger"
import {getStore, getProps, getState} from "./utils"
import ClientApp from "./ClientApp"

const state = getState()
const appProps = getProps()
Logger.debug(`Hydrating PLP `)
const store = getStore({...state})
const hydrate = () => {
    ReactDOM.hydrate(
        <Provider store={store}>
            <ClientApp {...{...appProps}} />
        </Provider>,
        document.getElementById(`plp-entrypoint`),
    )
}
setTimeout(hydrate, 0)
