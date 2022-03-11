/* eslint-disable import/no-cycle */

import React from "react"
import { Dispatch } from "redux"
import {  FilterPriceApiResponse, Filters } from "../../models/Filter"
import { FacetsState } from "../../models/FacetsState"
import { ProductItem } from "../../models/Product"
import type { State } from "../../models/State"
import { isPriceFilter } from "../../models/Filter/typeGuards"
import build from "../../utils/urlBuilder"
import getFacetSearchResults from "../../utils/getFacetSearchResults"
import { getHistoricFacetFilter } from "../../utils/getHistoricFacetFilter"
import { disableNonReturnedFilters } from "../../utils/disableNonReturnedFilters"
import { disableNonReturnedKeyFilters} from "../../utils/disableNonReturnedKeyFilters"
import { applyIncompatibleWithToFacets } from "../search/utils"
import { setAllFilters, setSearchSelectedPriceFilter } from "../search"
import TrackFilterSelection from "../../events/trackEvent/events/trackFilterSelection"
import TrackFilterDeselect from "../../events/trackEvent/events/trackFilterDeselect"

export const SYNC_TABBED_FILTERS = "SYNC_TABBED_FILTERS"
export const SET_SELECTED_FILTER = "SET_SELECTED_FILTER"
export const SET_TABBED_FACET  = "SET_TABBED_FACET"
export const SET_KEY_FILTER  = "SET_KEY_FILTER"
export const SET_BRAND_NAME_SEARCH = "SET_BRAND_NAME_SEARCH"
export const SET_TABBED_FILTER  = "SET_TABBED_FILTER"
export const SET_IS_PERFORMING_KEY_FILTER_SEARCH  = "SET_IS_PERFORMING_KEY_FILTER_SEARCH"
export const SET_TABBED_FILTERS_IS_OPEN  = "SET_TABBED_FILTERS_IS_OPEN"
export const SET_UPDATED_SEARCH_RESULTS  = "SET_UPDATED_SEARCH_RESULTS"
export const SET_TABBED_PRICE_FILTER = "SET_TABBED_PRICE_FILTER"
export const SET_TABBED_FILTERS_IS_FETCHING = "SET_TABBED_FILTERS_IS_FETCHING"
export const SET_CAN_SYNC = "SET_CAN_SYNC"

type GetStateFn = () => State
export interface NewFiltersState {
    facets: FacetsState
}

interface SyncTabbedFilters {
    type: typeof SYNC_TABBED_FILTERS
    data: TabbedFilterDuckState
}

interface SetSelectedFacet {
    type: typeof SET_SELECTED_FILTER
    name: string
}

interface SetBrandName {
    type: typeof SET_BRAND_NAME_SEARCH
    value: string
}

interface SetTabbedFacet {
    type: typeof SET_TABBED_FACET
    data: {
        child: string
        parent: string
    }
}

interface SetTabbedFiltersIsOpen {
    type: typeof SET_TABBED_FILTERS_IS_OPEN
    isOpen: boolean
}

interface SetTabbedPriceFilter {
    type: typeof SET_TABBED_PRICE_FILTER
    data: {name, selectedMin, selectedMax},
}

interface SetUpdatedSearchResults {
    type: typeof SET_UPDATED_SEARCH_RESULTS
    data: {
        totalResults: number
        filters: Filters
        facets: FacetsState
        filtersSort: string[]
    }
}

interface SetIsPerformingKeyFilterSearch {
    type: typeof SET_IS_PERFORMING_KEY_FILTER_SEARCH
    value: boolean
}

interface SetKeyFilter {
    type: typeof SET_KEY_FILTER
    name: string
}

interface SetCanSync {
    type: typeof SET_CAN_SYNC
    value: boolean
}

export const syncTabbedFiltersAction = (data: TabbedFilterDuckState): SyncTabbedFilters => {
    return {
        type: SYNC_TABBED_FILTERS,
        data,
    }
}

export const setTabbedFiltersOpenAction = (isOpen: boolean) : SetTabbedFiltersIsOpen => {
    return  {
        type: SET_TABBED_FILTERS_IS_OPEN,
        isOpen
    }
}

export const setSelectedFacetAction = (name: string): SetSelectedFacet => {
    return  {
        type: SET_SELECTED_FILTER,
        name
    }
}

export const setBrandName = (e: React.SyntheticEvent): SetBrandName => {
    const { value } = (e.target as HTMLInputElement)
    return {
        type: SET_BRAND_NAME_SEARCH,
        value
    }
}

export const setTabbedFacet = ({ parent, child }: { parent: string, child: string }): SetTabbedFacet => {
   return {
        type: SET_TABBED_FACET,
        data: {
            parent, child
        },
    }
}

export const setUpdatedSearchResults = ({
    totalResults,
    filters,
    facets,
    filtersSort: facetsSort
}: SetUpdatedSearchResults['data']) :  SetUpdatedSearchResults => {
    return {
         type: SET_UPDATED_SEARCH_RESULTS,
         data: {
            totalResults,
            filters,
            facets,
            filtersSort: facetsSort
         },
     }
 }

export const setTabbedPriceFilterAction = (
    name: string,
    selectedMin: number,
    selectedMax: number,
) => {
   return {
        type: SET_TABBED_PRICE_FILTER,
        data: {name, selectedMin, selectedMax},
    }
}

const setCanSync = (value: boolean): SetCanSync => {
    return {
        type: SET_CAN_SYNC,
        value
    }
}

const setKeyFilter = (name: string): SetKeyFilter => {
    return {
        type: SET_KEY_FILTER,
        name
    }
}

const setIsPerformingKeyFilterSearch = (value: boolean): SetIsPerformingKeyFilterSearch => {
    return {
        type: SET_IS_PERFORMING_KEY_FILTER_SEARCH,
        value
    }
}

export interface TabbedFilterDuckState {
    isOpen: boolean
    totalResults: number
    filters: Filters
    filtersSort: string[]
    facets: FacetsState
    items: ProductItem[]
    selectedFilter: string | null
    brandSearch: string
    historicFacetFilter: Record<string, string[]>
    isPerformingKeyFilterSearch: boolean
    canSync: boolean
    isPriceFacetChanged: boolean
}

export interface SearchValue {
    n: string
    v: string
}

export interface FiltersAlphabetState {
    activeCharacter: string
}

const initialState: TabbedFilterDuckState = {
    isOpen: false,
    totalResults: 0,
    filters: new Filters(),
    filtersSort: [],
    facets: new FacetsState(),
    items: [],
    selectedFilter: null,
    brandSearch: "",
    historicFacetFilter: {},
    isPerformingKeyFilterSearch: false,
    canSync: true,
    isPriceFacetChanged: false
}

const updateSearchDuckIfNecessary = async (dispatch: Dispatch, getState: GetStateFn) => {
    const { tabbedFilters: { facets: filters, isPriceFacetChanged }, search } = getState()
    const hasFiltersStateChanged = JSON.stringify(search.facets) !== JSON.stringify(filters)
    
    if (hasFiltersStateChanged || isPriceFacetChanged) {
        dispatch(setCanSync(false))
        await dispatch(setAllFilters({ facets: filters }) as any)
        dispatch(setCanSync(true))
    }
}

export const onClickViewResults = () => async (dispatch: Dispatch, getState: GetStateFn) => {
    await updateSearchDuckIfNecessary(dispatch, getState)
    dispatch(setTabbedFiltersOpenAction(false))
}

export const setSelectedFilterThunk = (name: string) => async (dispatch: Dispatch, getState: GetStateFn) => {
    const {tabbedFilters: {selectedFilter: selectedFacet}} = getState()
    if (name === selectedFacet) return

    dispatch(setSelectedFacetAction(name))
    
    await updateSearchDuckIfNecessary(dispatch, getState)
}

export const searchForSelectedPrice = (name: string, selectedMin: number, selectedMax: number) => async (dispatch: Dispatch, getState: GetStateFn) => {
        const {
            request: {headers, searchTerm, type, siteUrl, url, bloomreachPersonalizationEnabled}, 
            tabbedFilters: {facets: oldFacets, filters: oldFilters, filtersSort: oldFiltersSort}, 
            search: {sorting, bloomreachCookiesInitialVal} 
        } = getState()

        const selectedTabbedPriceState = {...oldFilters[name]} as FilterPriceApiResponse
        selectedTabbedPriceState.selectedMax = selectedMax
        selectedTabbedPriceState.selectedMin = selectedMin

        const searchUrl =
            build(
                url,
                sorting?.selected,
                type,
                oldFacets,
                selectedTabbedPriceState,
            )

        const {
            totalResults,
            filtersSort: incomingFiltersSort,
            facets: incomingFacets,
            filters: incomingFilters
        } = await getFacetSearchResults(searchUrl, siteUrl, headers ,searchTerm, type, 0, bloomreachCookiesInitialVal, bloomreachPersonalizationEnabled)
        
        dispatch(setTabbedPriceFilterAction(name, selectedMin, selectedMax))
        dispatch(setSearchSelectedPriceFilter({facetName: name, selectedMin, selectedMax}))
        
        const {filters: newFilters, filtersSort } = disableNonReturnedFilters({
            oldFilters, 
            newFiltersSort: incomingFiltersSort, 
            newFilters: incomingFilters, 
            oldFiltersSort
        })
        const {facets, filters} = disableNonReturnedKeyFilters({ 
            newFacets: incomingFacets, 
            oldFacets, 
            oldFilters, 
            newFilters 
        })
        dispatch(setUpdatedSearchResults({
            totalResults,
            filters,
            facets,
            filtersSort
        }))
}

export const searchForSelectedFacets = ({ parent, child }: { parent: string, child: string }) => async (dispatch: Dispatch, getState: GetStateFn) => {
    
        const {
            request: {headers, searchTerm, type, siteUrl, url, bloomreachPersonalizationEnabled}, 
            tabbedFilters: {facets: oldFacets, filters: oldFilters, filtersSort: oldFiltersSort}, 
            search: {sorting, bloomreachCookiesInitialVal} 
        } = getState()
        const changedFacetsState: FacetsState = {
            ...oldFacets,
            [child]: {...oldFacets[child], s: !oldFacets[child].s},
        }
        // Trigger select/deselect for TabbedFilters by checking changedFacetsState[child].s to see if it's selected or deselected
        // Then split changedFacetsState[child].v by ":" where [0] is the filter and [1] the facet
        if(changedFacetsState[child].s) {
            const splitFilterName = changedFacetsState[child].v.split(":")
            TrackFilterSelection(splitFilterName[0], splitFilterName[1])
        } else {
            const splitFilterName = changedFacetsState[child].v.split(":")
            TrackFilterDeselect(splitFilterName[0], splitFilterName[1])
        }
        
        const searchUrl =
            build(
                url,
                sorting?.selected,
                type,
                changedFacetsState,
                oldFilters?.Price as FilterPriceApiResponse,
            )
      
        const {
            totalResults,
            filtersSort: incomingFiltersSort,
            facets: incomingFacets,
            filters: incomingFilters
        } = await getFacetSearchResults(searchUrl, siteUrl,headers ,searchTerm, type, 0, bloomreachCookiesInitialVal, bloomreachPersonalizationEnabled)

        dispatch(setTabbedFacet({
            parent,
            child
        }))
        const {filters: newFacets, filtersSort} = disableNonReturnedFilters({
            oldFilters, 
            newFiltersSort: incomingFiltersSort,
            newFilters: incomingFilters, 
            oldFiltersSort
        })
        const {facets: returnedFacets, filters} = disableNonReturnedKeyFilters({ 
            newFacets: incomingFacets, 
            oldFacets, 
            oldFilters, 
            newFilters: newFacets 
        })
        dispatch(setUpdatedSearchResults({
            totalResults,
            filters,
            facets: {...returnedFacets, [child]: changedFacetsState[child], },
            filtersSort
        }))
}

export const searchForKeyFilters = (name: string) => async (dispatch: Dispatch, getState: GetStateFn) => {
    dispatch(setIsPerformingKeyFilterSearch(true))
    dispatch(setKeyFilter(name))

    const {tabbedFilters: {facets: filters}} = getState()
    await dispatch(setAllFilters({ 
        facets: {
            ...filters, 
            [name]: {
                ...filters[name], 
                s: !filters[name].s 
            }
        } 
    }) as any)

    dispatch(setIsPerformingKeyFilterSearch(false))
}

export const syncTabbedFiltersFromSearch = (
    isOpen: boolean
) => (dispatch: Dispatch, getState: GetStateFn) => {
    const {
        search,
        tabbedFilters
    } = getState()
    
    if (!tabbedFilters.canSync) return

    const historicFacetFilter = {}
    const searchDuckCopy: State["search"] = JSON.parse(JSON.stringify(search))


    Object.values(searchDuckCopy.facets).forEach((facet) => {
        if(facet.s) {
            const [possibleFacetName] = facet.v.split(":")
            if(searchDuckCopy.filters[possibleFacetName]) {
                const list = historicFacetFilter[possibleFacetName]
                if (list) {
                    list.push(facet.v)
                } else {
                    historicFacetFilter[possibleFacetName] = [facet.v]
                }
            }
        }
    })

    if (tabbedFilters.isOpen && tabbedFilters.isPerformingKeyFilterSearch) {
       const { filtersSort, filters: newFilters } = disableNonReturnedFilters({
            oldFilters: tabbedFilters.filters, 
            newFiltersSort: searchDuckCopy.filtersSort,
            newFilters: searchDuckCopy.filters,
            oldFiltersSort: tabbedFilters.filtersSort
        })
        const { filters, facets } = disableNonReturnedKeyFilters({ 
            oldFilters: tabbedFilters.filters,
            newFacets: searchDuckCopy.facets,
            oldFacets: tabbedFilters.facets,
            newFilters
        })
        searchDuckCopy.facets = facets
        searchDuckCopy.filters = filters
        searchDuckCopy.filtersSort = filtersSort
    }

    const actionData: TabbedFilterDuckState = {
        isOpen,
        totalResults: searchDuckCopy.totalResults,
        filters: searchDuckCopy.filters,
        filtersSort: searchDuckCopy.filtersSort,
        facets: searchDuckCopy.facets,
        items: searchDuckCopy.items,
        selectedFilter: tabbedFilters.selectedFilter,
        historicFacetFilter,
        isPerformingKeyFilterSearch: tabbedFilters.isPerformingKeyFilterSearch,
        canSync: tabbedFilters.canSync,
        isPriceFacetChanged: false,
        brandSearch: tabbedFilters?.brandSearch ?? ""
    }
    dispatch(syncTabbedFiltersAction(actionData))
}

type TabbedFilterActions = SyncTabbedFilters 
    | SetTabbedPriceFilter 
    | SetTabbedFacet
    | SetSelectedFacet
    | SetBrandName
    | SetUpdatedSearchResults
    | SetTabbedFiltersIsOpen
    | SetIsPerformingKeyFilterSearch
    | SetKeyFilter
    | SetCanSync

const reducer = (state: TabbedFilterDuckState = initialState, action: TabbedFilterActions): TabbedFilterDuckState => {
    switch (action.type) {
        case SYNC_TABBED_FILTERS: {
            return {
                ...state,
                ...action.data,
            }
        }

        case SET_SELECTED_FILTER: {
            return {
                ...state,
                selectedFilter: action.name
            }
        }

        case SET_BRAND_NAME_SEARCH: {
            return {
                ...state,
                brandSearch: action.value
            }
        }

        case SET_TABBED_FACET: {
            const {child,parent} = action.data
            return {
                ...state,
                historicFacetFilter: getHistoricFacetFilter({ state, parent, child })
            }
        }

        case SET_TABBED_PRICE_FILTER: {
            const newState = {...state}
            const {name, selectedMin, selectedMax} = action.data
            const filter = newState.filters[name]

            let {isPriceFacetChanged} = state
            if (isPriceFilter(filter)) {
                isPriceFacetChanged = selectedMax !== filter.selectedMax || selectedMin !== filter.selectedMin
                filter.selectedMin = selectedMin
                filter.selectedMax = selectedMax
            }

            return {...newState, isPriceFacetChanged }
        }
        case SET_UPDATED_SEARCH_RESULTS: {
            return {
                ...state,
                ...action.data
            }
        }
        case SET_TABBED_FILTERS_IS_OPEN : {
            const {isOpen} = action
            return {
                ...state,
                isOpen,
                selectedFilter: !isOpen ? null : state.selectedFilter
            }
        }

        case SET_IS_PERFORMING_KEY_FILTER_SEARCH : {
            return {
                ...state,
                isPerformingKeyFilterSearch: action.value
            }
        }

        case SET_KEY_FILTER: {
            return applyIncompatibleWithToFacets({...state}, action.name)
        }

        case SET_CAN_SYNC: {
            return {
                ...state,
                canSync: action.value
            }
        }

        default:
            return state
    }
}

export default reducer
