import {makeStore, State} from "../ducks"

export const getStore = (_STATE_?: State) => {
    const state = _STATE_ || getState()
    // reproduce the store used to render the page on server
    const store = makeStore(state)
    return store
}

export const getProps = () => {
    // Read the initial props as set by the server
    const {appProps} = (window as any).ssrClientSettings.footer
    // delete the initial props from global window object
    delete (window as any).ssrClientSettings.footer.appProps
    return appProps
}

const getState = () => {
    // Read the state sent with markup
    const {_STATE_} = (window as any).ssrClientSettings.footer

    // delete the state from global window object
    delete (window as any).ssrClientSettings.footer._STATE_
    return _STATE_
}
