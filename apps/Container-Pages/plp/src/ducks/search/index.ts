/* eslint-disable import/no-cycle */
/* eslint-disable react/static-property-placement */
import {Store, Dispatch} from "redux"
import logger from "@monorepo/core-logger"
import Cookies from "js-cookie"
import { Breakpoint } from "@mui/material"
import { getCategorySearchUrlSegment } from "../../utils/seo/getCategorySearchUrlSegment"
import type {State} from "../../models/State"
import { setViewAllCloseAction } from "../viewAllModal"
import {ProductItem} from "../../models/Product"
import {mapProductsFragmentToItems} from "../../utils/productsFragment"
import {getProducts} from "../../api/getProducts"
import {isRedirectResponse} from "../../models/searchApi/typeGuards"
import {FilterCookie} from "../../models/cookie"
import {PREV_PAGE, NEXT_PAGE, FILTERING} from "../../models/Lazyload"
import setFilterCookie from "../../utils/setFilterCookie"
import mapApiDataToState from "../../utils/mapApiDataToState"
import {ExternalSearchApiResponse, GenericSearchResponse} from "../../models/searchApi"
import {FilterPriceApiResponse, Filters, FilterPrice} from "../../models/Filter"
import {FacetsState} from "../../models/FacetsState"
import {PageRange, SearchState} from "../../models/SearchState"
import {applyIncompatibleWithToFacets as deselectAllFiltersIncompatibleWith, calculateStartItem, getInitialPage, formatSearchState, getLazyloadItemIndexFrom, selectSubsequentItemsPerPage} from "./utils"
import { getProductsFragment } from "../../api/getProductsFragment"
import {getProductsFragmentByPage} from "../../api/getProductsFragmentByPage"
import {isFilterFacet, isPriceFilter} from "../../models/Filter/typeGuards"
import {getWindow, scrollToTop} from "../../utils/window"
import {debounceAndGetCancelToken} from "../../utils/debounceAndGetCancelToken"
import {selectedFacetFilterTitle} from "../../utils/selectedFacetFilterTitle"
import build from "../../utils/urlBuilder"
import {FILTER_SETTINGS_COOKIE, HISTORY_EVENT, SEARCH_CATEGORY_SEGMENT, TOKEN_CANCELLATION_FLAG, SearchApiRequestTypes, CATEGORY_FILTERS_REGEX} from "../../config/constants"
import {populateCategoryQuickLinks} from "../categoryQuickLinks"
import {selectSeoMetadata} from "../../utils/seo/selectSeoMetadata"
import {updateDocumentSeoMetadata} from "../../utils/seo/updateDocumentSeoMetadata"
import {assignRequestDuck} from "../request"
import redirectErrorPage from "../../utils/redirectErrorPage"
import {syncTabbedFiltersFromSearch} from "../tabbedFilters"
import {getSEOFiltersHTML} from "../../utils/getSEOFiltersHTML"
import indexFilters from "../../utils/seo/indexFilters"

import PublishProductSummaryTrackPage from "../../events/publishProductSummaryTrackPage"
import TrackFilterSelection from "../../events/trackEvent/events/trackFilterSelection"
import TrackFilterDeselect from "../../events/trackEvent/events/trackFilterDeselect"
import TrackCTATabbedFilters from "../../events/trackEvent/events/trackCTATabbedFilters"
import TrackPriceFilterChange from "../../events/trackEvent/events/trackPriceFilterChange"
import { pushSearchResultsEvent } from "../../utils/pushSearchResultsEvent"

    
export const SET_FACET = "SET_FACET"
export const SET_CLEAR_TYPE_FILTER = "SET_CLEAR_TYPE_FILTER"
export const SET_CLEAR_ALL_FILTER = "SET_CLEAR_ALL_FILTER"
export const SET_CLEAR_PRICE_FILTER = "SET_CLEAR_PRICE_FILTER"
export const SET_ALL_FILTERS = "SET_ALL_FILTERS"
export const SET_SEARCH_DATA = "SET_SEARCH_DATA"
export const SET_FILTER_IS_OPEN = "SET_FILTER_IS_OPEN"
export const SET_SELECTED_SORTING = "SET_SELECTED_SORTING"
export const NEXT_PAGE_ITEMS_READY = "NEXT_PAGE_ITEMS_READY"
export const PREVIOUS_PAGE_ITEMS_READY = "PREVIOUS_PAGE_ITEMS_READY"
export const SET_PAGE_ITEMS = "SET_PAGE_ITEMS"
export const SET_IS_FETCHING_PAGE_ITEMS = "SET_IS_FETCHING_PAGE_ITEMS"
export const SET_STARTING_PAGE = "SET_STARTING_PAGE"
export const SET_IS_FETCHING_NEXT_PAGE = "SET_IS_FETCHING_NEXT_PAGE"
export const SET_IS_FETCHING_PREVIOUS_PAGE = "SET_IS_FETCHING_PREVIOUS_PAGE"
export const SET_SELECTED_PRICE_FILTER = "SET_SELECTED_PRICE_FILTER"
export const SET_INITIAL_PAGE_RANGE_FROM_PAGE = "SET_INITIAL_PAGE_RANGE_FROM_PAGE"
export const SET_DEBOUNCE_TIME = 'SET_DEBOUNCE_TIME'
export const SET_SINGLE_OPTION_FACET_LIST = 'SET_SINGLE_OPTION_FACET_LIST'
export const FIX_FACETS = "FIX_FACETS"
export const UNFIX_FACETS = "UNFIX_FACETS"
export const ASSIGN_SEARCH_STATE = "ASSIGN_SEARCH_STATE"
export const SET_CURRENT_BREAKPOINT = "SET_CURRENT_BREAKPOINT"
export const SET_SEO_FILTERS = "SET_SEO_FILTERS"
export const SET_BLOOMREACH_COOKIES_INIT_LOAD = "SET_BLOOMREACH_COOKIES_INIT_LOAD"

interface FixFacets {
    type: typeof FIX_FACETS
}

interface UnfixFacets {
    type: typeof UNFIX_FACETS
}


interface SetFacet {
    type: typeof SET_FACET
    value: string
}

interface SetAllFilters {
    type: typeof SET_ALL_FILTERS
    value: NewFiltersState
}

export interface NewFiltersState {
    facets: FacetsState
}

interface SetClearTypeFilters {
    type: typeof SET_CLEAR_TYPE_FILTER
    payload: string
}
interface SetClearAllFilters {
    type: typeof SET_CLEAR_ALL_FILTER
}
interface SetClearPriceFilter {
    type: typeof SET_CLEAR_PRICE_FILTER
}
interface SetSearchData {
    type: typeof SET_SEARCH_DATA
    data: SearchState
}

interface SetSEOFilters {
    type: typeof SET_SEO_FILTERS
    data: string
}
interface SetCurrentBreakpoint {
    type: typeof SET_CURRENT_BREAKPOINT
    payload: Breakpoint
}

interface SetInitialPageRangeFromPage {
    type: typeof SET_INITIAL_PAGE_RANGE_FROM_PAGE
    page: number
}

interface SetFilterIsOpenData {
    isOpen: boolean
    isViewMoreOpen: boolean
    name: string
}
interface SetFilterIsOpen {
    type: typeof SET_FILTER_IS_OPEN
    data: SetFilterIsOpenData
}
interface SetSelectedSorting {
    type: typeof SET_SELECTED_SORTING
    value: string
}

interface NextPageItemsReady {
    type: typeof NEXT_PAGE_ITEMS_READY
    items: ProductItem[]
    currentPage: number
}

interface SetPageItems {
    type: typeof SET_PAGE_ITEMS
    items: ProductItem[]
}

interface SetIsFetchingPageItems {
    type: typeof SET_IS_FETCHING_PAGE_ITEMS
    value: boolean
}

interface PreviousPageItemsReady {
    type: typeof PREVIOUS_PAGE_ITEMS_READY
    items: ProductItem[]
    currentPage: number
}

interface SetDebounceTime {
    type: typeof SET_DEBOUNCE_TIME
    time
}

interface AssignSearchState {
    type: typeof ASSIGN_SEARCH_STATE
    state
}

interface SetIsFetchingNextPage {
    type: typeof SET_IS_FETCHING_NEXT_PAGE
    value: boolean
}

interface SetIsFetchingPreviousPage {
    type: typeof SET_IS_FETCHING_PREVIOUS_PAGE
    value: boolean
}

interface SetSelectedPriceFilterData {
    facetName: string
    selectedMin: number
    selectedMax: number
}

interface SetSelectedPriceFilter {
    type: typeof SET_SELECTED_PRICE_FILTER
    data: SetSelectedPriceFilterData
}

interface SetBloomreachCookiesInitialLoadData {
    brUid2: string
    brMtSearch: string
}

interface SetBloomreachCookiesInitialLoad {
    type: typeof SET_BLOOMREACH_COOKIES_INIT_LOAD
    data: SetBloomreachCookiesInitialLoadData
}

interface SetSingleOptionFacetList {
    type: typeof SET_SINGLE_OPTION_FACET_LIST
    data: string[]
}

type GetStateFn = () => State

export const initialState: SearchState = {
    totalResults: 0,
    singleOptionFacetList: [],
    filters: new Filters(),
    filtersSort: [],
    facets: new FacetsState(),
    items: [],
    sorting: {
        selected: "",
        options: [],
    },
    startPage: 1,
    endPage: 1,
    isFetchingNextPage: false,
    isFetchingPreviousPage: false,
    isFetchingPageItems: false,
    debounceTime: 700,
    shouldFacetsBeFixed: false,
    autoCorrectQuery: null,
    title: '',
    itemsPerPage: {
        initial: {
            mobile: 8,
            tablet: 12,
            desktop: 24,
        },
        subsequent: {
            mobile: 10,
            tablet: 16,
            desktop: 28,
        }
    },
    itemsPerRow: {
        default: {
            xs: 0,
            sm: 0,
            md: 0,
            lg: 0,
            xl: 0
        },
        inPageFiltersEnabled: {
            xs: 0,
            sm: 0,
            md: 0,
            lg: 0,
            xl: 0
        }
    },
    initialItemsPerPage: 0,
    fetchTriggerOffset: {
        xs: 0,
        sm: 0,
        md: 0,
        lg: 0,
        xl: 0
    },
    fetchTriggerOffsetRows: {
        xs: 0,
        sm: 0,
        md: 0,
        lg: 0,
        xl: 0
    },
    subsequentPagesNonLazyloadRows: {
        xs: 0,
        sm: 0,
        md: 0,
        lg: 0,
        xl: 0
    },
    relaxedQuery: "",
    currentBreakpoint: 'lg',
    includedComponents: [],
    searchCategory: {
        id: "",
        name: ""
    },
    searchBannerHtml: null,
    seoFilters: "",
    bloomreachCookiesInitialVal: {
        brUid2: "",
        brMtSearch: "",
    }
}


export const selectItems = (state: State) => {
    return state.search.items
}

export function selectShouldFacetsBeFixed(state: State) {
    return state.search.shouldFacetsBeFixed
}

export const selectTotalPages = (state: State) => {
    const { totalResults, initialItemsPerPage } = state.search 
    const subsequentItemsPerPage = selectSubsequentItemsPerPage(state)
    const subsequentTotalItems = totalResults - initialItemsPerPage
    const subsequentPages = Math.ceil(subsequentTotalItems / subsequentItemsPerPage)
    return subsequentPages + 1
}

export const selectHasNextPage = (state: State) => {
    const totalPages = selectTotalPages(state)
    return state.search.endPage < totalPages
}

export const selectHasPreviousPage = (state: State) => {
    return state.search.startPage > 1
}

export function selectIsFetchingNextPage(state: State) {
    return state.search.isFetchingNextPage
}

export const fixFacets = (): FixFacets => {
    return {
        type: FIX_FACETS,
    }
}

export const unfixFacets = (): UnfixFacets => {
    return {
        type: UNFIX_FACETS,
    }
}

export const setSearchSelectedPriceFilter = (data: SetSelectedPriceFilterData): SetSelectedPriceFilter => {
    return {
        type: SET_SELECTED_PRICE_FILTER,
        data,
    }
}

export const setIsFetchingNextPageAction = (value: boolean): SetIsFetchingNextPage => {
    return {
        type: SET_IS_FETCHING_NEXT_PAGE,
        value,
    }
}

export const setIsFetchingPreviousPageAction = (value: boolean): SetIsFetchingPreviousPage => {
    return {
        type: SET_IS_FETCHING_PREVIOUS_PAGE,
        value,
    }
}

export const assignSearchStateAction = (state: Partial<SearchState>): AssignSearchState => {
    return {
        type: ASSIGN_SEARCH_STATE,
        state,
    }
}

export const setCurrentBreakpoint = (payload: Breakpoint): SetCurrentBreakpoint => {
    return {
        type: SET_CURRENT_BREAKPOINT,
        payload,
    }
}

export const setDebounceTimeAction = (time: number): SetDebounceTime => {
    return {
        type: SET_DEBOUNCE_TIME,
        time,
    }
}

export const setSingleOptionFacetList = (data: string[]): SetSingleOptionFacetList => {
    return {
        type: SET_SINGLE_OPTION_FACET_LIST,
        data,
    }
}

export const nextPageItemsReadyAction = (items: ProductItem[], currentPage: number): NextPageItemsReady => {
    return {
        type: NEXT_PAGE_ITEMS_READY,
        items,
        currentPage,
    }
}

export const setPageItemsAction = (items: ProductItem[]): SetPageItems => {
    return {
        type: SET_PAGE_ITEMS,
        items,
    }
}

export const setIsFetchingPageItems = (value: boolean): SetIsFetchingPageItems => {
    return {
        type: SET_IS_FETCHING_PAGE_ITEMS,
        value,
    }
}

export const previousPageItemsReadyAction = (items: ProductItem[], currentPage: number): PreviousPageItemsReady => {
    return {
        type: PREVIOUS_PAGE_ITEMS_READY,
        items,
        currentPage,
    }
}

export const setCurrentBreakpointAction = (breakpoint: Breakpoint) => (dispatch: Dispatch) => {
    dispatch(setCurrentBreakpoint(breakpoint))
}

export const setPageItemsThunk = ({historyUrl, enableDebounce }: { historyUrl?: string, enableDebounce?: boolean} = { }) => async (dispatch: Dispatch, getState: GetStateFn) => {
    let cancelToken
    try {
        logger.debug("Fetching filtered items")
        dispatch(setIsFetchingPageItems(true))
        
        const state = getState()
        const {headers, searchTerm, type, siteUrl, bloomreachPersonalizationEnabled} = state.request
        const {debounceTime, currentBreakpoint, itemsPerPage, bloomreachCookiesInitialVal} = state.search

        if (enableDebounce) {
            cancelToken = await debounceAndGetCancelToken(debounceTime)
        }

        const url =
            historyUrl ??
            build(
                state.request.url,
                state.search.sorting?.selected,
                state.request.type,
                state.search.facets,
                state.search.filters?.Price as FilterPriceApiResponse,
            )
        if (!historyUrl) getWindow()!.history.pushState({url, type: HISTORY_EVENT}, "", url)
        const fields: (keyof ExternalSearchApiResponse)[] = ["items", "filters", "totalResults", "sorting", 'title', "relaxedQuery", "includedComponents", "searchCategory"]

        const {
            startPage,
            endPage,
            pageSize,
            scrollLocation
        } = getInitialPage(itemsPerPage, currentBreakpoint, historyUrl)

        const apiResponse = await getProductsFragmentByPage({
            url,
            baseUrl: siteUrl,
            headers,
            searchTerm,
            type,
            startPage,
            endPage,
            pageSize,
            fields,
            cancelToken,
            bloomreachCookiesInitialVal,
            bloomreachPersonalizationEnabled
        })

        const lazyloadItemIndexFrom = getLazyloadItemIndexFrom(state)
        
        const {search: previousSearchState, tabbedFilters: {isOpen: isTabbedFiltersOpen}} = getState()
        const decodedApiResponse = mapProductsFragmentToItems(apiResponse, lazyloadItemIndexFrom, FILTERING)
        const searchState = formatSearchState(previousSearchState, decodedApiResponse)

        const cookie = Cookies.getJSON(FILTER_SETTINGS_COOKIE) as FilterCookie
        const newCookieState = mapApiDataToState(searchState, cookie)
        const subsequentItemsPerPage = selectSubsequentItemsPerPage(state)
        const ids = newCookieState.items.map(({itemNumber}, index) => ({itemNumber, index: (startPage - 1) * subsequentItemsPerPage + index }))
        PublishProductSummaryTrackPage(ids)
        pushSearchResultsEvent(state)
        dispatch(setSearchDataAction(newCookieState))
        dispatch(assignSearchStateAction({
            startPage,
            endPage,
            initialItemsPerPage: pageSize
        }))
        
        dispatch(assignRequestDuck({url}))

        const seoMetadata = selectSeoMetadata(state)
        updateDocumentSeoMetadata(seoMetadata)

        if (scrollLocation > 0) {
            window.scrollTo(0, scrollLocation)

            // Show the facets list
            dispatch(fixFacets())
            dispatch(unfixFacets())

        } else {
            scrollToTop()
        }

        if (isTabbedFiltersOpen){
            dispatch(syncTabbedFiltersFromSearch(true) as any)
        }
    } catch (error) {
        const state = getState()
        const {siteUrl} = state.request
        if (error.message === TOKEN_CANCELLATION_FLAG) return

        dispatch(setPageItemsAction([]))
        scrollToTop()
        window.location.href = `${redirectErrorPage(siteUrl)}`
        logger.error(error, "set-page-items-error")
        throw error
    }
}

export const fetchPreviousPageItemsThunk = () => async (dispatch: Dispatch, getState: GetStateFn) => {
    try {
        const state = getState()
        const {startPage, bloomreachCookiesInitialVal} = state.search
        const subsequentItemsPerPage = selectSubsequentItemsPerPage(state)
        const pageToFetch = startPage - 1
        const {headers, url, searchTerm, type, siteUrl, bloomreachPersonalizationEnabled} = state.request
        logger.debug(`Fetching page ${pageToFetch} of items`)
        dispatch(setIsFetchingPreviousPageAction(true))
        const fields: (keyof ExternalSearchApiResponse)[] = ["items"]

        const fragment = await getProductsFragmentByPage({
            url,
            baseUrl: siteUrl,
            headers,
            searchTerm,
            type,
            startPage: pageToFetch,
            endPage: pageToFetch,
            pageSize: subsequentItemsPerPage,
            bloomreachCookiesInitialVal,
            bloomreachPersonalizationEnabled,
            fields,
        })

        const numberOfItemsToLazyload = getLazyloadItemIndexFrom(state)
        const items = mapProductsFragmentToItems(fragment, numberOfItemsToLazyload, PREV_PAGE)
       const itemsPerPage = selectSubsequentItemsPerPage(state)
        const ids = items.items.map(({itemNumber}, index) => ({itemNumber, index: (pageToFetch - 1) * itemsPerPage + index }))
        PublishProductSummaryTrackPage(ids)
        pushSearchResultsEvent(state, pageToFetch)
        const postFetchState = getState()
        // Check that the flag hasn't been reset by any other action. eg setPageItemsThunk
        if (postFetchState.search.isFetchingPreviousPage) {
            dispatch(previousPageItemsReadyAction(items.items, pageToFetch))
        }
    } catch (error) {
        const state = getState()
        const {siteUrl} = state.request
        dispatch(setIsFetchingPreviousPageAction(false))
        logger.error(error, "fetch-previous-products-page-error")
        window.location.href = `${redirectErrorPage(siteUrl)}`
        throw error
    }
}

export const fetchNextPageItemsThunk = () => async (dispatch: Dispatch, getState: GetStateFn) => {
    try {
        const state = getState()
        const {endPage, initialItemsPerPage, bloomreachCookiesInitialVal} = state.search
        const {bloomreachPersonalizationEnabled} = state.request
        const subsequentItemsPerPage = selectSubsequentItemsPerPage(state)
        const pageToFetch = endPage + 1
        const {headers, url, searchTerm, type, siteUrl} = state.request
        logger.debug(`Fetching page ${pageToFetch} of items`)
        dispatch(setIsFetchingNextPageAction(true))
        const fields: (keyof ExternalSearchApiResponse)[] = ["items"]
        const startingItem = calculateStartItem(pageToFetch, initialItemsPerPage, subsequentItemsPerPage)

        const fragment = await getProductsFragment({
            headers,
            url,
            baseUrl: siteUrl,
            searchTerm,
            type,
            start: startingItem,
            pageSize: subsequentItemsPerPage,
            bloomreachCookiesInitialVal,
            bloomreachPersonalizationEnabled,
            fields,
        })

        const numberOfItemsToLazyload = getLazyloadItemIndexFrom(state)
        const items = mapProductsFragmentToItems(fragment, numberOfItemsToLazyload, NEXT_PAGE)
        const ids = items.items.map(({itemNumber}, index) => ({itemNumber, index: startingItem + index }))
        PublishProductSummaryTrackPage(ids)
        const postFetchState = getState()
        pushSearchResultsEvent(postFetchState, pageToFetch)
        if (postFetchState.search.isFetchingNextPage) {
            dispatch(nextPageItemsReadyAction(items.items, pageToFetch))
        }
    } catch (error) {
        const state = getState()
        const {siteUrl} = state.request
        dispatch(setIsFetchingNextPageAction(false))
        logger.error(error, "fetch-next-products-page-error")
        window.location.href = `${redirectErrorPage(siteUrl)}`
        throw error
    }
}

export const setFilterClearTypeAction = (type: string) => dispatch => {
    dispatch({
        type: SET_CLEAR_TYPE_FILTER,
        payload: type
    })
    dispatch(setPageItemsThunk({ enableDebounce: false }))
}

export const setFilterClearAllAction = () => dispatch => {
    dispatch({
        type: SET_CLEAR_ALL_FILTER,
    })
    dispatch({
        type: SET_CLEAR_PRICE_FILTER,
    })
    dispatch(setPageItemsThunk({ enableDebounce: false }))
}

const setSearchDataAction = (data: SearchState): SetSearchData => {
    return {
        type: SET_SEARCH_DATA,
        data,
    }
}

const setSEOFiltersAction = (data: string): SetSEOFilters => {
    return {
        type: SET_SEO_FILTERS,
        data,
    }
}

export const setInitialPageRangeFromPageAction = (page: number): SetInitialPageRangeFromPage => {
    return {
        type: SET_INITIAL_PAGE_RANGE_FROM_PAGE,
        page,
    }
}

const setFacetsOpenAction = (isOpen: boolean, isViewMoreOpen: boolean, name: string): SetFilterIsOpen => {
    const data = {isOpen, isViewMoreOpen, name}

    return {
        type: SET_FILTER_IS_OPEN,
        data,
    }
}

export const setSelectedSortingAction = (value: string) => dispatch => {
    dispatch({
        type: SET_SELECTED_SORTING,
        value,
    })
    dispatch(setPageItemsThunk())
}

export const setSelectedPriceFilterAction = (
    facetName: string,
    selectedMin: number,
    selectedMax: number,
) => dispatch => {
    dispatch({
        type: SET_SELECTED_PRICE_FILTER,
        data: {facetName, selectedMin, selectedMax},
    })
    dispatch(setPageItemsThunk())
}

export const updateProducts = async (
    {dispatch, getState}: Store,
    cookie?: FilterCookie,
): Promise<GenericSearchResponse> => {
    try {
        const {
            search: {startPage, endPage, initialItemsPerPage, bloomreachCookiesInitialVal},
            request: {headers, url, searchTerm, type, bloomreachPersonalizationEnabled},
            seoFilters: {filterDepthCount}
        } = getState() as State
        
        const fields: (keyof ExternalSearchApiResponse)[] = ["items", "filters", "totalResults", "sorting", 'title', 'autoCorrectQuery', "relaxedQuery", "includedComponents", "searchCategory"]
        const response = await getProducts(headers, url, searchTerm, type, bloomreachCookiesInitialVal, bloomreachPersonalizationEnabled, startPage, endPage, initialItemsPerPage, fields)      
        
        if (isRedirectResponse(response)) {
            return response
        }
        
        const state = mapApiDataToState(response, cookie)
        
        if(!state.totalResults) {
            dispatch(populateCategoryQuickLinks())
        }
        
        let seoFilters = "" 
        if(url.includes(`/${SEARCH_CATEGORY_SEGMENT}`)){
            const urlSegments = getCategorySearchUrlSegment(
                url.substring(url.indexOf(`/${SEARCH_CATEGORY_SEGMENT}`)),
                SearchApiRequestTypes.Category,
            )
            
            // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
            const filterDepth = urlSegments.filter.match(CATEGORY_FILTERS_REGEX)?.length || 0
            const allowIndexOfFilters = indexFilters(urlSegments.filter) && indexFilters(urlSegments.category) 

            if((urlSegments.filter === "" || filterDepth < filterDepthCount) && allowIndexOfFilters) {
                seoFilters = getSEOFiltersHTML(response, url, urlSegments)
                dispatch(setSEOFiltersAction(seoFilters))
            }
        }

        dispatch(setSearchDataAction(state))
        return response
    } catch (error) {
        logger.error(error)
        throw error
    }
}

export const setFilterIsOpenThunk = (isOpen: boolean, name: string) => (dispatch: Dispatch, getState: GetStateFn) => {
    const {
        request: {url, searchTerm, type, siteUrl},
        search: {filters},
    } = getState()

    const filter = filters[name]
    if (isPriceFilter(filter)) {
        setFilterCookie(searchTerm, type, url, siteUrl, name, isOpen, false)
        dispatch(setFacetsOpenAction(isOpen, false, name))
    } else {
        setFilterCookie(searchTerm, type, url, siteUrl,  name, isOpen, filter.isViewMoreOpen)
        dispatch(setFacetsOpenAction(isOpen, filter.isViewMoreOpen, name))
    }
}

export const setViewMoreIsOpenThunk = (isViewMoreOpen: boolean, name: string) => (
    dispatch: Dispatch,
    getState: GetStateFn,
) => {
    const {
        request: {url, searchTerm, type, siteUrl},
        search: {filters},
    } = getState() 

    const filter = filters[name]
    setFilterCookie(searchTerm, type, url, siteUrl, name, filter.isFilterOpen, isViewMoreOpen)
    dispatch(setFacetsOpenAction(filter.isFilterOpen, isViewMoreOpen, name))
}

export const setFilter = (value: string, enableDebounce = true) => dispatch => {
    dispatch({
        type: SET_FACET,
        value,
    })
    dispatch(setPageItemsThunk({ enableDebounce }))
}


export function mapToInitialPageRange(value: number): PageRange {
    let endPage = 1
    let startPage = 1

    if (value > 1) {
        endPage = value
        startPage = value - 1
    }

    return {startPage, endPage}
}

export const setAllFilters = (value: NewFiltersState) => dispatch => {
    dispatch({
        type: SET_ALL_FILTERS,
        value,
    })

    TrackCTATabbedFilters(selectedFacetFilterTitle(value))

    return dispatch(setPageItemsThunk())
}

export const applyAllFilters = () => (dispatch : Dispatch, getState : GetStateFn) => {
    const { viewAllModal : {facets: filters} } = getState()
    const newFilters : FacetsState = Object.entries(filters).reduce( (actionData, [filterName, filterValue]) => {
        // eslint-disable-next-line no-param-reassign
        actionData[filterName] = {...filterValue}
        return actionData
    }, {} as FacetsState)
    dispatch(setViewAllCloseAction())
    setAllFilters({facets : newFilters})(dispatch)
}

export const setBloomreachCookiesInitialLoad = (data: SetBloomreachCookiesInitialLoadData) : SetBloomreachCookiesInitialLoad => {
    return {
        type: SET_BLOOMREACH_COOKIES_INIT_LOAD,
        data,
    }
}



const reducer = (
    state: SearchState = initialState,
    action:
        | SetSearchData
        | SetSelectedSorting
        | SetFilterIsOpen
        | NextPageItemsReady
        | PreviousPageItemsReady
        | SetPageItems
        | SetIsFetchingPageItems
        | SetIsFetchingNextPage
        | SetIsFetchingPreviousPage
        | SetFacet
        | SetSelectedPriceFilter
        | SetInitialPageRangeFromPage
        | SetAllFilters
        | SetDebounceTime
        | FixFacets
        | UnfixFacets
        | SetClearAllFilters
        | SetClearTypeFilters
        | SetClearPriceFilter
        | AssignSearchState
        | SetCurrentBreakpoint
        | SetSEOFilters
        | SetBloomreachCookiesInitialLoad
        | SetSingleOptionFacetList
        

): SearchState => {
    switch (action.type) {
        case SET_FACET: {
            const newState: SearchState = {
                ...state,
                facets: {
                    ...state.facets,
                    [action.value]: {...state.facets[action.value], s: !state.facets[action.value].s},
                },
            }
            // Trigger select/deselect for Filters by checking newState.facets[action.value].s to see if it's selected or deselected
            // Then split newState.facets[action.value].v by ":" where [0] is the filter and [1] the facet
            if(newState.facets[action.value].s) {
                const splitFilterName = newState.facets[action.value].v.split(":")
                TrackFilterSelection(splitFilterName[0], splitFilterName[1])
            } else {
                const splitFilterName = newState.facets[action.value].v.split(":")
                TrackFilterDeselect(splitFilterName[0], splitFilterName[1])
            }

            return deselectAllFiltersIncompatibleWith(newState, action.value)
        }
        case SET_ALL_FILTERS: {
            const newState: SearchState = {
                ...state,
                facets :{...state.facets,
                ...action.value.facets,
                }
            }
            return newState
        }

        case SET_CLEAR_TYPE_FILTER: {
            const newState: SearchState = {
                ...state,
            }
            Object.entries(newState.facets).forEach(([_key, value]) => {
                if(_key.includes(action.payload)) {
                    // eslint-disable-next-line no-param-reassign
                    value.s = false
                }
            })
            return newState
        }

        case SET_CLEAR_ALL_FILTER: {
            const newState: SearchState = {
                ...state,
            }
            // eslint-disable-next-line no-param-reassign, no-return-assign
            Object.entries(newState.facets).forEach(([_key, value]) => {if(value.s) value.s = false})
            return newState
        }
        case SET_CLEAR_PRICE_FILTER: {
            const newState = {...state}
            const facet = newState.filters?.Price as FilterPrice

            facet.selectedMin = facet.min
            facet.selectedMax = facet.max
            
            return newState
        }
        case SET_SEO_FILTERS: {
            return {
                ...state,
                seoFilters: action.data
            }
        }
        case SET_SEARCH_DATA: {
            const newState: SearchState = {
                ...state,
                ...action.data,
                isFetchingPageItems: false,
                // Set page items supercedes infinite scroll actions
                isFetchingNextPage: false,
                isFetchingPreviousPage: false,
            }
            Object.entries(newState.facets).forEach(([key, value]) => {
                if (value.s) {
                    deselectAllFiltersIncompatibleWith(newState, key)
                }
            })
            return newState
        }
        case SET_SELECTED_SORTING: {
            const newState = {...state}
            newState.sorting.selected = action.value
            return newState
        }
        case SET_FILTER_IS_OPEN: {
            const newState = {...state}
            const facet = newState.filters[action.data.name]
            facet.isFilterOpen = action.data.isOpen

            if (isFilterFacet(facet)) {
                facet.isViewMoreOpen = action.data.isViewMoreOpen
            }
            return newState
        }
        case SET_SELECTED_PRICE_FILTER: {
            const newState = {...state}
            const facet = newState.filters[action.data.facetName]

            if (isPriceFilter(facet)) {
                facet.selectedMin = action.data.selectedMin
                facet.selectedMax = action.data.selectedMax
                TrackPriceFilterChange(facet.selectedMin, facet.selectedMax)
            }
            return newState
        }
        case SET_PAGE_ITEMS: {
            return {
                ...state,
                items: action.items,
                isFetchingPageItems: false,
                // Set page items supercedes infinite scroll actions
                isFetchingNextPage: false,
                isFetchingPreviousPage: false,
            }
        }
        case SET_IS_FETCHING_PAGE_ITEMS: {
            return {
                ...state,
                isFetchingPageItems: action.value,
                // Set page items supercedes infinite scroll actions
                isFetchingNextPage: false,
                isFetchingPreviousPage: false,
            }
        }
        case NEXT_PAGE_ITEMS_READY: {
            return {
                ...state,
                items: [...state.items, ...action.items],
                endPage: action.currentPage,
                isFetchingNextPage: false,
            }
        }
        case PREVIOUS_PAGE_ITEMS_READY: {
            return {
                ...state,
                items: [...action.items, ...state.items],
                startPage: action.currentPage,
                isFetchingPreviousPage: false,
            }
        }
        case SET_IS_FETCHING_NEXT_PAGE: {
            return {
                ...state,
                isFetchingNextPage: action.value,
            }
        }
        case SET_IS_FETCHING_PREVIOUS_PAGE: {
            return {
                ...state,
                isFetchingPreviousPage: action.value,
            }
        }
        case SET_INITIAL_PAGE_RANGE_FROM_PAGE: {
            const newState = {
                ...state,
                ...mapToInitialPageRange(action.page),
            }
            return newState
        }
        case SET_DEBOUNCE_TIME: {
            return  {
                ...state,
                debounceTime: action.time
            }
        }
        case SET_SINGLE_OPTION_FACET_LIST: {
            return  {
                ...state,
                singleOptionFacetList: action.data
            }
        }
        case FIX_FACETS: {
            return {
                ...state,
                shouldFacetsBeFixed: true,
            }
        }
        case UNFIX_FACETS: {
            return {
                ...state,
                shouldFacetsBeFixed: false,
            }
        }
        case ASSIGN_SEARCH_STATE: {
            // Please do not any additional functionality!!!

            return {
                ...state,
                ...action.state
            }
        }
        case SET_CURRENT_BREAKPOINT: {
            return {
                ...state,
                currentBreakpoint: action.payload
            }
        }
        case SET_BLOOMREACH_COOKIES_INIT_LOAD: {
            return {
                ...state,
                bloomreachCookiesInitialVal: action.data
            }
        }
        default:
            return state
    }
}

export default reducer
