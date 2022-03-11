
import { FacetsState } from "../../models/FacetsState"
import {HideSearchFilterModalElements} from "../../models/HideSearchFilterModalElements"
import type { State } from "../../models/State"
import { FilterFacet } from "../../models/Filter"

export const SET_VIEW_ALL_OPEN = "SET_VIEW_ALL_OPEN"
export const SET_VIEW_ALL_CLOSE = "SET_VIEW_ALL_CLOSE"
export const SET_FILTERS_ALPHABET = "SET_FILTER_ALPHABET"

export const SET_FILTER_MODAL = "SET_FILTER_MODAL"
export const SET_HIDE_SEARCH_FILTER_MODAL_ELEMENTS = "SET_HIDE_SEARCH_FILTER_MODAL_ELEMENTS"
export const CLEAR_FILTERS = "CLEAR_FILTERS"

export interface NewFacetsState {
    facets: FacetsState
}

interface SetViewAllOpen {
    type: typeof SET_VIEW_ALL_OPEN
    data: ViewAllModalDuckState
}

interface SetViewAllClose {
    type: typeof SET_VIEW_ALL_CLOSE
}

interface SetFiltersAlphabet {
    type: typeof SET_FILTERS_ALPHABET
    activeCharacter: string
}

interface SetFilterModal {
    type: typeof SET_FILTER_MODAL
    value: string
}

interface ClearFilters {
    type: typeof CLEAR_FILTERS
    data: NewFacetsState
}

interface SetHideSearchFilterModalElements {
    type: typeof SET_HIDE_SEARCH_FILTER_MODAL_ELEMENTS
    data: HideSearchFilterModalElements
}

export const setViewAllOpenAction = (data: ViewAllModalDuckState): SetViewAllOpen => {
    return {
        type: SET_VIEW_ALL_OPEN,
        data,
    }
}

export const setFiltersAlphabetAction = (activeCharacter: string): SetFiltersAlphabet => {
    return {
        type: SET_FILTERS_ALPHABET,
        activeCharacter,
    }
}

export const setViewAllCloseAction = (): SetViewAllClose => {
    return {
        type: SET_VIEW_ALL_CLOSE,
    }
}



export const setHideSearchFilterModalElements = (data: HideSearchFilterModalElements): SetHideSearchFilterModalElements => {
    return {
        type: SET_HIDE_SEARCH_FILTER_MODAL_ELEMENTS,
        data
    }
}

export interface ViewAllModalDuckState {
    isOpen: boolean
    name: string
    displayName: string
    activeCharacter: string
    facets: FacetsState
    hideSearchFilterModalElements: HideSearchFilterModalElements
}

export interface SearchValue {
    n: string
    v: string
}

export interface FiltersAlphabetState {
    activeCharacter: string
}

const initialState: ViewAllModalDuckState = {
    isOpen: false,
    name: "",
    displayName: "",
    activeCharacter: "All",
    facets: new FacetsState(),
    hideSearchFilterModalElements: {
        letterNav: false,
        searchBox: false
    }
}

export const setFilterModal = (value: string): SetFilterModal => {
    return {
        type: SET_FILTER_MODAL,
        value,
    }
}

export const clearFiltersAction = (data: NewFacetsState): ClearFilters => {
    return {
        type: CLEAR_FILTERS,
        data,
    }
}

export const clearFilters = () => (dispatch: any, getState: any) => {
    const {
        viewAllModal: {facets},
    } = getState() as State

    const facetsCopy = Object.keys(facets).reduce((obj, key) => {
        // eslint-disable-next-line no-param-reassign
        obj[key] = facets[key]
        // eslint-disable-next-line no-param-reassign
        obj[key].s = false
        return obj
    }, {})

    const actionData: NewFacetsState = {
        facets: {
            ...facetsCopy,
        },
    }
    dispatch(clearFiltersAction(actionData))
}

export const setViewAllOpen = (name: string) => (dispatch: any, getState: any) => {
    const {
        search: {facets, filters}, viewAllModal
    } = getState() as State
    const filter = filters[name] as FilterFacet

    const modalFilters = Object.keys(facets)
        .filter(key => filter.facets.includes(key))
        .reduce((obj, key) => {
            // eslint-disable-next-line no-param-reassign
            obj[key] = facets[key]
            return obj
        }, {})

    const actionData: ViewAllModalDuckState = {
        ...viewAllModal,
        isOpen: true,
        name,
        displayName: filter.displayName,
        activeCharacter: "All",
        facets: modalFilters,
    }
    dispatch(setViewAllOpenAction(actionData))
}




const reducer = (state: ViewAllModalDuckState = initialState, action) => {
    switch (action.type) {
        case SET_VIEW_ALL_OPEN:
            return {
                ...state,
                ...action.data,
            }
        case SET_FILTERS_ALPHABET:
            return {
                ...state,
                activeCharacter: action.activeCharacter,
            }
        case SET_FILTER_MODAL:
            return {
                ...state,
                facets: {
                    ...state.facets,
                    [action.value]: {...state.facets[action.value], s: !state.facets[action.value].s},
                },
            }

        case CLEAR_FILTERS:
            return {
                ...state,
                ...action.data,
            }
        case SET_VIEW_ALL_CLOSE:
            return {
                ...initialState,
                hideSearchFilterModalElements: state.hideSearchFilterModalElements
            }

        case SET_HIDE_SEARCH_FILTER_MODAL_ELEMENTS: {
            return {
                ...state,
                hideSearchFilterModalElements: action.data
            }
        }

        default:
            return state
    }
}

export default reducer
