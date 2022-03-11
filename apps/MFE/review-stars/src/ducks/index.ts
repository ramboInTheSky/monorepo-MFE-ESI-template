import {combineReducers, createStore, applyMiddleware} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import env from "../config/env"
import State from "../models/state"
import textAlignment from "./text-alignment"
import reviewStars from "./reviewStars"

const {DEVELOPMENT} = env

export const rootReducer = combineReducers({
    reviewStars,
    textAlignment,
})

export const makeStore = (initialState?: State) => {
    return createStore(
        rootReducer,
        initialState,
        DEVELOPMENT ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk),
    )
}
