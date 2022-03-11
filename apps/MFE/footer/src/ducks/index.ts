import {combineReducers, createStore, applyMiddleware} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import requestReducer, {RequestDuckState} from "./request"
import env from "../config/env"
import footerReducer, {FooterDuckState} from "./footerdata"
import userReducer, {UserDuckState} from "./user"
import textReducer, {TextDuckState} from "./text"
import languageReducer, {LanguageDuckState} from "./languages"
import textAlignmentReducer from "./text-alignment"
import settingsReducer, {SettingsDuckState} from "./settings"

const {DEVELOPMENT} = env

export interface State {
    user: UserDuckState
    request: RequestDuckState
    languages: LanguageDuckState
    data: FooterDuckState
    textAlignment: string
    text: TextDuckState
    settings: SettingsDuckState
}

export const rootReducer = combineReducers({
    user: userReducer,
    request: requestReducer,
    languages: languageReducer,
    data: footerReducer,
    textAlignment: textAlignmentReducer,
    text: textReducer,
    settings: settingsReducer,
})

export const makeStore = (initialState?: State) => {
    return createStore(
        rootReducer,
        initialState,
        DEVELOPMENT ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk),
    )
}
