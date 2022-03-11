import breakpointToViewportSize from "../../utils/breakpointToViewportSize"
import type State from "../../models/State"
import { FacetsState } from "../../models/FacetsState"
import {ItemsPerPage} from "../../models/ItemsPerPage"
import {MapProductsFragmentToItemsResponse} from "../../utils/productsFragment"
import {SearchState} from "../../models/SearchState"
import {getScrollPosition} from "../../utils/urlBuilder"

export const applyIncompatibleWithToFacets = <T extends { facets: FacetsState}>(stateCopy: T, value: string) => {
    const disableElements = stateCopy.facets[value]?.incompatibleWith
    if (disableElements?.length) {
        disableElements.forEach(option => {
            if (stateCopy.facets[option]) {
                // eslint-disable-next-line no-param-reassign
                stateCopy.facets[option].d = !stateCopy.facets[option].d
            }
        })
    }
    return stateCopy
}

export const calculateStartItem = (
    pageToFetch: number,
    initialItemsPerPage: number,
    subsequentItemsPerPage: number,
) => {
    const currentSubsequentPageAmt = pageToFetch - 1
    return subsequentItemsPerPage * currentSubsequentPageAmt + initialItemsPerPage - subsequentItemsPerPage
}

export const getLazyloadItemIndexFrom = (state: State) => {
    const itemsPerRow = selectItemsPerRow(state)
    const subsequentPagesNonLazyloadRows = selectSubsequentPagesNonLazyloadRows(state)
    return subsequentPagesNonLazyloadRows * itemsPerRow
}

export const selectSubsequentPagesNonLazyloadRows = (state: State) => {
    const {subsequentPagesNonLazyloadRows, currentBreakpoint} = state.search
    return subsequentPagesNonLazyloadRows[currentBreakpoint]
}

export const selectSubsequentItemsPerPage = (state: State) => {
    const {itemsPerPage, currentBreakpoint} = state.search
    return itemsPerPage.subsequent[breakpointToViewportSize(currentBreakpoint)]
}

export const selectFetchTriggerOffset = (state: State) => {
    const itemsPerRow = selectItemsPerRow(state)
    const offsetRows = selectFetchTriggerOffsetRows(state)
    return offsetRows * itemsPerRow
}

export const selectItemsPerRow = (state: State) => {
    const {itemsPerRow, currentBreakpoint} = state.search
    const {enablePageInFilters} = state.features
    const itemsPerRowConfig = enablePageInFilters ? itemsPerRow.inPageFiltersEnabled : itemsPerRow.default
    return itemsPerRowConfig[currentBreakpoint]
}

export const selectFetchTriggerOffsetRows = (state: State) => {
    const {fetchTriggerOffsetRows, currentBreakpoint} = state.search
    return fetchTriggerOffsetRows[currentBreakpoint]
}

export const getInitialPage = (itemsPerPage: ItemsPerPage, currentBreakpoint: string, historyUrl?: string) => {
    let startPage = 1
    let endPage = 1
    let scrollLocation = 0
    let pageSize: number = itemsPerPage.initial[breakpointToViewportSize(currentBreakpoint)]

    if (historyUrl) {
        const url = new URL(historyUrl)
        const {searchParams} = url
        // eslint-disable-next-line dot-notation
        const pageNumberFromUri = parseInt(searchParams.get("p") ?? "0", 10)
        if (pageNumberFromUri) {
            scrollLocation = getScrollPosition(historyUrl)
            endPage = pageNumberFromUri
            if (endPage > 2) {
                startPage = endPage - 1
            }
            
            if (startPage > 1) {
                pageSize = itemsPerPage.subsequent[breakpointToViewportSize(currentBreakpoint)]
            }
        }
    }

    return {
        startPage,
        endPage,
        pageSize,
        scrollLocation
    }
}

/**
 * When no products are returned from the search, we want to persist the previous filter/facet selection
 * so the user can amend their search if they want to.
 */
export const formatSearchState = (previousSearchState: SearchState, decodedApiResponse: MapProductsFragmentToItemsResponse): SearchState => {
    if (decodedApiResponse.searchStateData?.totalResults === 0) {
        return {
            ...previousSearchState,
            facets: previousSearchState.facets,
            filters: previousSearchState.filters,
            filtersSort: previousSearchState.filtersSort,
            totalResults: decodedApiResponse.searchStateData.totalResults,
            sorting: decodedApiResponse.searchStateData.sorting,
            items: decodedApiResponse.items,
            title: decodedApiResponse.searchStateData.title,
            startPage: 1,
            endPage: 1,
            searchBannerHtml: decodedApiResponse.searchBannerHtml
        }
    }
    return {
        ...previousSearchState,
        facets: decodedApiResponse.searchStateData!.facets,
        filters: decodedApiResponse.searchStateData!.filters,
        filtersSort: decodedApiResponse.searchStateData!.filtersSort,
        totalResults: decodedApiResponse.searchStateData!.totalResults,
        sorting: decodedApiResponse.searchStateData!.sorting,
        items: decodedApiResponse.items,
        title: decodedApiResponse.searchStateData!.title,
        startPage: 1,
        endPage: 1,
        searchBannerHtml: decodedApiResponse.searchBannerHtml
    }
}
