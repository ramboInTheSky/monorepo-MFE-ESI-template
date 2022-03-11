import {Store} from "redux"

export const SET_LANGUAGE = "SET_LANGUAGE"

interface SetLanguage {
    type: typeof SET_LANGUAGE
    languageSelectorData: LanguageDuckState
}

export interface LanguageDuckState {
    currentLanguageText: string
    altLanguageName: string
    altLanguageUrl: string
    currentLanguageName: string
    direction: string
    siteUrl: string
}

export const initialState: LanguageDuckState = {
    currentLanguageText: "",
    altLanguageName: "",
    altLanguageUrl: "",
    currentLanguageName: "",
    direction: "ltr",
    siteUrl: "",
}

export const setLanguageIds = (languageSelectorData: LanguageDuckState): SetLanguage => ({
    type: SET_LANGUAGE,
    languageSelectorData,
})

const reducer = (state: LanguageDuckState = initialState, action: SetLanguage): LanguageDuckState => {
    switch (action.type) {
        case SET_LANGUAGE:
            return {...action.languageSelectorData}
        default:
            return state
    }
}

export const updateLanguage = (store: Store, languageSelectorData: LanguageDuckState) => {
    store.dispatch(setLanguageIds(languageSelectorData))
}

export default reducer
