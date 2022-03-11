import {SearchApiRequestTypes} from "../../config/constants"
import {handleCategoryPageLoad} from "../../events/trackEvent/events/trackPageLoadCategory"
import {handleSearchPageLoad} from "../../events/trackEvent/events/trackPageLoadKeyword"

import State from "../../models/State"

const selectStateForGTM = (state: State) => {
    if (state.search.items?.length <= 0 && Object.entries(state.search.filters).length <= 0) return null
    const {facets, totalResults, sorting, autoCorrectQuery, searchCategory} = state.search
    const {selected: selectedSort} = sorting
    const {page: currentPage, category, searchTerm: searchKeyword, gender, type} = state.request

    const selectedFilters = Object.values(facets).reduce((acc, currentValue) => {
        if (currentValue.s) {
            return `${acc.length ? `${acc} ` : acc}${currentValue.v}`
        }

        return acc
    }, "")

    return {
        selectedFilters,
        totalResults,
        currentPage,
        selectedSort,
        autoCorrectQuery,
        category,
        searchKeyword,
        gender,
        type,
        searchCategory,
    }
}

export const pushSearchResultsEvent = (state: State, page?: number) => {
    const gtmData = selectStateForGTM(state)
    if (!gtmData) {
        return
    }
    gtmData.currentPage = page ?? gtmData.currentPage
    if (gtmData.type === SearchApiRequestTypes.Category) {
        handleCategoryPageLoad(gtmData)
    } else {
        handleSearchPageLoad(gtmData)
    }
}
