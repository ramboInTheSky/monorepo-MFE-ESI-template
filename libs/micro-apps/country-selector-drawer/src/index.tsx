import React from "react"
import {Provider} from "react-redux"
import App from "./app"
import {store} from "./ducks"

export const CountrySelectorDrawer = props => {
    return (
        <Provider store={store}>
            <App {...props} />
        </Provider>
    )
}
