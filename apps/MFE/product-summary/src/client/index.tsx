/* istanbul ignore file */

import React from "react"
import Logger from "@monorepo/core-logger"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import {HydrateProductSummaryESB} from "@monorepo/eventservice"
import {getStore, getProps, getNextItemNumber, getState} from "./utils"
import ClientApp from "./ClientApp"
import {isIE} from "../utils/isIE"
import {triggerIEWindowResize} from "../utils/triggerIEWindowResize"

hydrateAvailableItems()
handleProductSummaryHydrateEvent()

function handleProductSummaryHydrateEvent() {
    const esb = new HydrateProductSummaryESB()
    esb.subscribe(() => hydrateAvailableItems())
}

function hydrateAvailableItems() {
    let itemNumber = getNextItemNumber()

    while (itemNumber) {
        ;(no => {
            setTimeout(() => {
                const appProps = getProps(no)
                const state = getState(no)
                const store = getStore(no, {...state})

                hydrateClientApp({itemNumber: no, state, appProps, store})
            }, 0)
        })(itemNumber)
        itemNumber = getNextItemNumber()
    }

    setTimeout(() => {
        if (isIE()) {
            // this is necessary to cause swiper to work on IE
            // it triggers a resize event wth no screen size changes
            triggerIEWindowResize()
        }
    }, 0)
}

interface HydrateClientAppArgs {
    itemNumber: string
    state: any
    appProps: any
    store: any
}

function hydrateClientApp({itemNumber, appProps, store}: HydrateClientAppArgs) {
    Logger.debug(`Hydrating Product Summary for Item Number - ${itemNumber}`)

    const props = {...appProps, itemNumber}
    const container = document.getElementById(`product-summary-entrypoint-${itemNumber}`)

    ReactDOM.hydrate(
        <Provider store={store}>
            <ClientApp {...props} />
        </Provider>,
        container,
    )
}
