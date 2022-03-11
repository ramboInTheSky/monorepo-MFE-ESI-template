import {makeStore} from "../ducks"
import State from "../models/state"

interface ReviewStarsWindow {
    itemNumbers: string[]
}

export const getNextItemNumber = (): string | null => {
    const {itemNumbers} = (window as any).ssrClientSettings.reviewStars as ReviewStarsWindow
    if (itemNumbers.length > 0) {
        const nextItemNumber = itemNumbers[0]
        ;(window as any).ssrClientSettings.reviewStars.itemNumbers.splice(0, 1)
        return nextItemNumber
    }
    return null
}

export const getStore = (itemNumber: string, _STATE_?: State) => {
    const state = _STATE_ || getState(itemNumber)
    // reproduce the store used to render the page on server
    const store = makeStore(state)
    return store
}

export const getProps = (itemNumber: string) => {
    // Read the initial props as set by the server
    const {appProps} = (window as any).ssrClientSettings.reviewStars[itemNumber]
    // delete the initial props from global window object
    delete (window as any).ssrClientSettings.reviewStars[itemNumber].appProps
    return appProps
}

export const getState = (itemNumber: string) => {
    // Read the state sent with markup
    const {_STATE_} = (window as any).ssrClientSettings.reviewStars[itemNumber]

    // delete the state from global window object
    delete (window as any).ssrClientSettings.reviewStars[itemNumber]._STATE_
    return _STATE_
}
