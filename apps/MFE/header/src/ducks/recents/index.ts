import {Reducer, Dispatch} from "redux"
import Cookies from "js-cookie"
import {SupportedFeatureTypes} from "../../models/features"

const COOKIE_KEY = "recentSearches"

export type RecentsDuckState = {
    queryIds: string[]
}

type PartialState = Partial<RecentsDuckState>
type GetState = any

export const SET_RECENT_SEARCH = "SET_RECENT_SEARCH"

type Action = {
    type: typeof SET_RECENT_SEARCH
    payload: PartialState
}

export const setRecent = (payload: PartialState) => ({
    type: SET_RECENT_SEARCH,
    payload,
})

export const createRecentQuery = (term: string) => (dispatch: Dispatch, getState: GetState) => {
    const {
        request: {cookieDomain},
        recents: {queryIds: oldQueryIds},
    } = getState()
    const MaxItems = getState().features[SupportedFeatureTypes.SearchBar]?.RecentSearch?.MaxItems

    const startIndex = oldQueryIds.length >= MaxItems ? 1 : 0
    const queryIds = oldQueryIds.slice(startIndex, MaxItems).concat(term).filter(id => id.trim() !== "")
    const payload = {queryIds}

    dispatch(setRecent(payload))

    if (queryIds !== []) {
        Cookies.set(COOKIE_KEY, payload.queryIds, {domain: cookieDomain})
    }
}
export const deleteRecentQueries = () => (dispatch: Dispatch, getState: GetState) => {
    const {cookieDomain} = getState().request
    const payload = {...initialState}
    dispatch(setRecent(payload))
    Cookies.remove(COOKIE_KEY,  {domain: cookieDomain})
}
export const updateRecentQueries = () => (dispatch: Dispatch) => {
    let storedQueries = Cookies.getJSON(COOKIE_KEY) || []
    if (!Array.isArray(storedQueries) || (storedQueries.length > 0 && typeof storedQueries[0] !== "string")) {
        deleteRecentQueries()
        storedQueries = []
    }
    const queryIds = storedQueries.map(queryId => queryId)
    const payload = {queryIds}
    dispatch(setRecent(payload))
}

const initialState: RecentsDuckState = {
    queryIds: [],
}

const reducer: Reducer<RecentsDuckState, Action> = (state = initialState, action) => {
    switch (action.type) {
        case SET_RECENT_SEARCH:
            return {...state, ...action.payload}
        default:
            return state
    }
}
export default reducer
