/* eslint-disable @typescript-eslint/camelcase */
import {publishTrackEvent} from "../.."
import {GTM_SEARCH_RESULTS} from "../../../../config/constants"

interface HandleSearchLoadProps {
    searchKeyword: string | null
    selectedFilters?: string
    selectedSort?: string
    totalResults?: number
    currentPage?: number
    autoCorrectQuery?: string | null
}

export const handleSearchPageLoad = ({
    searchKeyword,
    selectedFilters,
    selectedSort,
    totalResults,
    currentPage,
    autoCorrectQuery,
}: HandleSearchLoadProps) => {
    publishTrackEvent(GTM_SEARCH_RESULTS, {
        searchResults: {
            search_keyword: searchKeyword,
            selected_sort: window.decodeURIComponent(selectedSort || "score"),
            selected_filter: selectedFilters || "",
            total_number_of_items: totalResults?.toString() || "",
            current_page_number: currentPage?.toString() || "",
            department: "search",
            category: searchKeyword,
            br_search_term: searchKeyword,
            ...(autoCorrectQuery && {
                refined_search_keyword: autoCorrectQuery,
            }),
        },
    })
}
