import {combineReducers, createStore, applyMiddleware} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import env from "../config/env"
import State from "../models/state"
import textAlignmentReducer from "./text-alignment"
import productSummaryReducer from "./productSummary"
import lazyloadReducer from "./lazyload"
import requestReducer from "./request"
import textReducer from "./text"

const {DEVELOPMENT} = env

export const rootReducer = combineReducers({
    productSummary: productSummaryReducer,
    textAlignment: textAlignmentReducer,
    lazyload: lazyloadReducer,
    request: requestReducer,
    text: textReducer,
})

export const makeStore = (initialState?: State) => {
    return createStore(
        rootReducer,
        initialState,
        DEVELOPMENT ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk),
    )
}
