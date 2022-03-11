/* istanbul ignore file */

import React from "react"
import Logger from "@monorepo/core-logger"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import {getStore, getProps, getNextItemNumber, getState} from "./utils"
import ClientApp from "./ClientApp"

hydrateAvailableItems()

function hydrateAvailableItems() {
    let itemNumber = getNextItemNumber()
    while (itemNumber) {
        const appProps = getProps(itemNumber)
        const state = getState(itemNumber)
        const store = getStore(itemNumber, {...state})
        hydrateClientApp({itemNumber, state, appProps, store})
        itemNumber = getNextItemNumber()
    }
}

interface HydrateClientAppArgs {
    itemNumber: string
    state: any
    appProps: any
    store: any
}

function hydrateClientApp({itemNumber, appProps, store}: HydrateClientAppArgs) {
    Logger.debug(`Hydrating Review Stars for Item Number - ${itemNumber}`)

    const props = {...appProps, itemNumber}
    const container = document.getElementById(`review-stars-entrypoint-${itemNumber}`)

    ReactDOM.hydrate(
        <Provider store={store}>
            <ClientApp {...props} />
        </Provider>,
        container,
    )
}
