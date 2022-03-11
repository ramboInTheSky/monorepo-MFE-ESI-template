/* eslint-disable react/static-property-placement */
import {FilterType} from "../../config/constants"
import {FacetApiResponse} from "../Facet"

class FilterCore {
    name = ""
    displayName = ""
    type: FilterType = "filter"
    disabled?: boolean
}
export class FilterPriceApiResponse extends FilterCore {
    type: FilterType = "price"
    min = 0
    max = 0
    selectedMin = 0
    selectedMax = 0
    currencyCode = "GBP"
}
export class FilterFacetApiResponse extends FilterCore {
    options: FacetApiResponse[] = []
}
export type FilterApiResponse = FilterFacetApiResponse | FilterPriceApiResponse

export class Filters {
    [key: string]: Filter
}
export class FilterFacet extends FilterCore {
    facets: string[] = []
    isViewMoreOpen = false
    isFilterOpen = false
}
export class FilterPrice extends FilterPriceApiResponse {
    isFilterOpen = false
}

export class AlphabeticalisedFilters {
    sortedFilters = ""
    isort = ""
    price = ""
}
export type Filter = FilterFacet | FilterPrice
