import {combineReducers, createStore, applyMiddleware} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import env from "../config/env"
import requestReducer from "./request"
import primarynavReducer from "./primary-nav"
import secondarynavReducer from "./secondary-nav"
import accordionActivityReducer from "./accordion-activity"
import tabsActivityReducer from "./tabs-activity"
import textAlignmentReducer from "./text-alignment"
import textReducer from "./text"
import {settingsReducer} from "./settings"
import AppState from "./state"
import {compositionSettingsReducer} from "./compositionSettings"

export type State = AppState

const {DEVELOPMENT} = env

export const rootReducer = combineReducers({
    request: requestReducer,
    primarynav: primarynavReducer,
    accordionActivity: accordionActivityReducer,
    tabsActivity: tabsActivityReducer,
    secondarynav: secondarynavReducer,
    textAlignment: textAlignmentReducer,
    text: textReducer,
    settings: settingsReducer,
    compositionSettings: compositionSettingsReducer,
})

export const makeStore = (initialState?: State) => {
    return createStore(
        rootReducer,
        initialState,
        DEVELOPMENT ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk),
    )
}
