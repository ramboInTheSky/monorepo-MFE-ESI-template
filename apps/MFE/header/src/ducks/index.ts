import {combineReducers, createStore, applyMiddleware} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import env from "../config/env"
import requestReducer from "./request"
import recentsReducer from "./recents"
import searchReducer from "./search"
import shoppingBagReducer from "./shoppingbag"
import headerReducer from "./headerdata"
import userReducer from "./user"
import autocompleteReducer from "./autocomplete"
import languageReducer from "./languages"
import textAlignmentReducer from "./text-alignment"
import textReducer from "./text"
import favouritesReducer from "./favourites"
import featuresReducer from "./feature-switch"
import countrySelectorReducer from "./country-selector"
import templateReducer from "./template"
import St from "./state"
import { settingsReducer } from "./settings"

export type State = St

const {DEVELOPMENT} = env

export const rootReducer = combineReducers({
    user: userReducer,
    recents: recentsReducer,
    request: requestReducer,
    search: searchReducer,
    shoppingBag: shoppingBagReducer,
    languages: languageReducer,
    data: headerReducer,
    textAlignment: textAlignmentReducer,
    autocomplete: autocompleteReducer,
    favourites: favouritesReducer,
    features: featuresReducer,
    countrySelector: countrySelectorReducer,
    text: textReducer,
    template: templateReducer,
    settings: settingsReducer,
})

export const makeStore = (initialState?: State) => {
    return createStore(
        rootReducer,
        initialState,
        DEVELOPMENT ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk),
    )
}
