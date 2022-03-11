import {FilterCookie} from "../../models/cookie"
import type {SearchState} from "../../models/SearchState"
import {isPriceFilter} from "../../models/Filter/typeGuards"
import { SearchApiResponse } from "../../models/searchApi"

interface ESIReplacedSearchApiResponse extends SearchApiResponse {
    searchBannerHtml?: null | string
}

const mapApiDataToState = (data: ESIReplacedSearchApiResponse, cookie?: FilterCookie): SearchState => {
    const state = {
        totalResults: data.totalResults,
        filters: data.filters,
        filtersSort: data.filtersSort,
        facets: data.facets,
        items: data.items,
        sorting: data.sorting,
        title: data.title,
        autoCorrectQuery: data.autoCorrectQuery,
        relaxedQuery: data.relaxedQuery,
        includedComponents: data.includedComponents,
        searchCategory: data.searchCategory,
        searchBannerHtml: data.searchBannerHtml ?? null,
    }

    if (!cookie) {
        return state as SearchState
    }

    Object.entries(cookie.filterCategorySettings).forEach(([key, value]) => {
        if (key in state.filters) {
            const filter = state.filters[key]
            if (isPriceFilter(filter)) {
                filter.isFilterOpen = value.isOpen
            } else {
                filter.isFilterOpen = value.isOpen
                filter.isViewMoreOpen = value.viewMoreOpened
            }
        }
    })

    

    return state as SearchState
}

export default mapApiDataToState