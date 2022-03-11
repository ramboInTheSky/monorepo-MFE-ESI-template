import {ProductItem} from "../Product"
import {Sorting} from "../Sorting"
import {Filters} from "../Filter"
import {SearchCategory} from "../SearchCategory"
import {FacetsState} from "../FacetsState"
import {ItemsPerPage} from "../ItemsPerPage"

export interface PageRange {
    startPage: number
    endPage: number
}

export type SearchState = {
    totalResults: number
    filters: Filters
    filtersSort: string[]
    facets: FacetsState
    items: ProductItem[]
    sorting: Sorting
    startPage: number
    endPage: number
    isFetchingNextPage: boolean
    isFetchingPreviousPage: boolean
    isFetchingPageItems: boolean
    debounceTime: number
    shouldFacetsBeFixed: boolean
    autoCorrectQuery: string | null
    title: string
    config?: any
    initialItemsPerPage: number
    fetchTriggerOffset: Breakpoints
    itemsPerRow: ItemsPerRow
    currentBreakpoint: string
    fetchTriggerOffsetRows: Breakpoints
    subsequentPagesNonLazyloadRows: Breakpoints
    itemsPerPage: ItemsPerPage
    relaxedQuery: string
    includedComponents: string[]
    searchCategory: SearchCategory
    searchBannerHtml: string | null
    seoFilters: string
    bloomreachCookiesInitialVal: BloomreachCookiesInitialVal
    singleOptionFacetList: string[]
}

export type ItemsPerRow = {
    inPageFiltersEnabled: Breakpoints
    default: Breakpoints
}

export type BloomreachCookiesInitialVal = {
    brUid2: string
    brMtSearch: string
}

export type Breakpoints = {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
}
