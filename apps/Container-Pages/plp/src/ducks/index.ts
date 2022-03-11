import {combineReducers, createStore, applyMiddleware} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import env from "../config/env"
import State from "../models/State"
import requestReducer from "./request"
import textAlignmentReducer from "./text-alignment"
import searchReducer from "./search"
import viewAllModalReducer from "./viewAllModal"
import SeoReducer from "./seoFilters"
import FeaturesReducer from "./feature-switch"
import categoryQuickLinksReducer from "./categoryQuickLinks"
import tabbedFiltersReducer from "./tabbedFilters"
import textReducer from "./text"

const {DEVELOPMENT} = env

export const rootReducer = combineReducers({
    request: requestReducer,
    search: searchReducer,
    textAlignment: textAlignmentReducer,
    viewAllModal: viewAllModalReducer,
    seoFilters: SeoReducer,
    features: FeaturesReducer,
    categoryQuickLinks: categoryQuickLinksReducer,
    tabbedFilters: tabbedFiltersReducer,
    text: textReducer,
})

export const makeStore = (initialState?: State) => {
    return createStore(
        rootReducer,
        initialState,
        DEVELOPMENT ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk),
    )
}
