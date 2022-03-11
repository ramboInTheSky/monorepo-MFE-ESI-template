import {MIN_NUMBER_CHAR_TO_SHOW_AUTOCOMPLETE} from "../../config/constants"

export type SearchDuckState = {
    typedCharacters: string
    showAutocomplete: boolean
    showRecentSearch: boolean
}

export const SET_TYPED_SEARCH = "SET_TYPED_SEARCH"
export const SHOW_AUTOCOMPLETE_PANEL = "SHOW_AUTOCOMPLETE_PANEL"
export const SHOW_RECENTSEARCH_PANEL = "SHOW_RECENTSEARCH_PANEL"

type Actions = {
    type: typeof SET_TYPED_SEARCH | typeof SHOW_AUTOCOMPLETE_PANEL | typeof SHOW_RECENTSEARCH_PANEL
    payload: string | boolean
}

export const setSearch = (payload: string): Actions => ({
    type: SET_TYPED_SEARCH,
    payload,
})

export const showAutoComplete = (payload: boolean): Actions => ({
    type: SHOW_AUTOCOMPLETE_PANEL,
    payload,
})

export const showRecentSearch = (payload: boolean): Actions => ({
    type: SHOW_RECENTSEARCH_PANEL,
    payload,
})

export const getPlpUrl = (plpUrl: string) => (term: string) => `${plpUrl}/search?w=${encodeURIComponent(term)}`

export const search = (plpUrl: string, term: string) => () => {
    const plpUrlPath = getPlpUrl(plpUrl)(term)
    window.location.href = plpUrlPath
}

export const typing = (typedCharacters: string) => (dispatch: any) => {
    dispatch(setSearch(typedCharacters))
    dispatch(openDrawer())
}

export const openDrawer = () => (dispatch: any, getState: any) => {
    const {typedCharacters} = getState().search

    if (typedCharacters.length >= MIN_NUMBER_CHAR_TO_SHOW_AUTOCOMPLETE) {
        dispatch(showAutoComplete(true))
        dispatch(showRecentSearch(false))
    } else {
        dispatch(showRecentSearch(true))
        dispatch(showAutoComplete(false))
    }
}

export const closeAllPanels = () => (dispatch: any) => {
    dispatch(showRecentSearch(false))
    dispatch(showAutoComplete(false))
}

const initialState: SearchDuckState = {
    typedCharacters: "",
    showAutocomplete: false,
    showRecentSearch: false,
}

const reducer = (state: SearchDuckState = initialState, action) => {
    switch (action.type) {
        case SET_TYPED_SEARCH:
            return {...state, typedCharacters: action.payload}
        case SHOW_AUTOCOMPLETE_PANEL:
            return {...state, showAutocomplete: action.payload}
        case SHOW_RECENTSEARCH_PANEL:
            return {...state, showRecentSearch: action.payload}
        default:
            return state
    }
}
export default reducer
