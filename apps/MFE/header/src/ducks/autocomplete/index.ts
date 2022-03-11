import {Store} from "redux"
import logger from "@monorepo/core-logger"
import {getAutocompleteData} from "../../api/autocomplete"
import {AutoCompleteInitial, AutoCompleteStateModel} from "../../models/autocomplete"
import {showAutoComplete, showRecentSearch} from "../search"
import {SettingsSdkKeys} from "../../models/settings"

import env from "../../config/env"

const {BLOOMREACH_BASE_URL} = env

export const SET_LOADING = "SET_LOADING"
export const SET_AUTO_COMPLETE_DATA = "SET_AUTO_COMPLETE_DATA"
export const SET_PARAMETER_VALUES = "SET_PARAMETER_VALUES"
export const CLEAR_SUGGESTIONS = "CLEAR_SUGGESTIONS"

export const BR_UID_2 = "_br_uid_2"

export type AutoCompleteDuckState = AutoCompleteStateModel

export const initialState: AutoCompleteStateModel = {
    parameters: {
        accountId: "",
        domainKey: "",
        authKey: "",
    },
    q: "",
    suggestions: null,
    isLoading: false,
    numFound: 0,
    products: null,
}
interface Actions {
    type: typeof SET_AUTO_COMPLETE_DATA | typeof SET_PARAMETER_VALUES | typeof CLEAR_SUGGESTIONS
    payload: AutoCompleteInitial | boolean | any
}

export const setAutoCompleteData = (payload: AutoCompleteInitial): Actions => ({
    type: SET_AUTO_COMPLETE_DATA,
    payload,
})

export const clearSuggestions = () => ({
    type: CLEAR_SUGGESTIONS,
})

export const getAutoCompleteThunk =
    (
        searchValue: number | string,
        accountId: string,
        domainKey: string,
        authKey: string,
        uid2: string,
        updateProductsOnly = false,
    ) =>
    async (_dispatch: any, getState: any) => {
        _dispatch({
            type: SET_LOADING,
            payload: true,
        })
        try {
            _dispatch(showAutoComplete(true))
            _dispatch(showRecentSearch(false))
            const {autocomplete} = getState()
            const data = await getAutocompleteData(
                BLOOMREACH_BASE_URL,
                searchValue,
                accountId,
                domainKey,
                authKey,
                uid2,
            )

            if (updateProductsOnly) {
                _dispatch({
                    type: SET_AUTO_COMPLETE_DATA,
                    payload: {
                        response: {
                            ...autocomplete,
                            products: data.response.products,
                            q: data.response.q,
                        },
                    },
                })
            } else {
                _dispatch({
                    type: SET_AUTO_COMPLETE_DATA,
                    payload: data,
                })
            }

            _dispatch({
                type: SET_LOADING,
                payload: false,
            })
        } catch (e) {
            logger.error(e)
            _dispatch(showAutoComplete(false))
            _dispatch({
                type: SET_AUTO_COMPLETE_DATA,
                payload: initialState,
            })
            _dispatch({
                type: SET_LOADING,
                payload: false,
            })
        }
    }

export const setAutoCompleteParameters = (store: Store, configuration: any) => {
    const payload = configuration[SettingsSdkKeys.autoComplete]
    store.dispatch({
        type: SET_PARAMETER_VALUES,
        payload,
    })
}

const reducer = (state: AutoCompleteStateModel = initialState, action): AutoCompleteStateModel => {
    const {payload} = action
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            }
        case SET_AUTO_COMPLETE_DATA:
            return {
                ...state,
                q: payload?.response?.q || "",
                suggestions: payload?.response?.suggestions || [],
                numFound: payload?.response?.numFound || 0,
                products: payload?.response?.products || [],
            }
        case CLEAR_SUGGESTIONS:
            return {
                ...state,
                q: "",
                suggestions: [],
                numFound: 0,
            }
        case SET_PARAMETER_VALUES:
            return {...state, parameters: payload}
        default:
            return state
    }
}

export default reducer
