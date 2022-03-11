/* eslint-disable @typescript-eslint/camelcase */
import {LOCAL_STORAGE_ACTIVE_DEPT_NAME, GTM_SEARCH_RESULTS} from "../../../../config/constants"
import {getWindow} from "../../../../utils/window"
import {publishTrackEvent} from "../.."

interface HandleCategoryLoadProps {
    category: string | null
    selectedFilters?: string
    searchKeyword?: string | null
    selectedSort?: string
    totalResults?: number
    currentPage?: number
    gender?: string[] | null
}

export const handleCategoryPageLoad = ({
    category,
    selectedFilters,
    searchKeyword,
    selectedSort,
    totalResults,
    currentPage,
    gender,
}: HandleCategoryLoadProps) => {
    const {localStorage} = getWindow()!

    let primaryNavDept: string | null = null
    const getSelectedDepartmentDetails: string | null = localStorage.getItem(LOCAL_STORAGE_ACTIVE_DEPT_NAME)

    if (getSelectedDepartmentDetails) {
        const parseDepartmentDetails = JSON.parse(getSelectedDepartmentDetails)
        if (parseDepartmentDetails?.dept) {
            primaryNavDept = parseDepartmentDetails.dept.toLowerCase()
        }
    }
    const formattedGender = gender ? gender[0] : ""

    publishTrackEvent(GTM_SEARCH_RESULTS, {
        searchResults: {
            search_keyword: searchKeyword || "*",
            selected_sort: window.decodeURIComponent(selectedSort || "score"),
            selected_filter: selectedFilters || "",
            total_number_of_items: totalResults?.toString() || "",
            current_page_number: currentPage?.toString() || "",
            department: primaryNavDept || formattedGender,
            category,
        },
    })
}
