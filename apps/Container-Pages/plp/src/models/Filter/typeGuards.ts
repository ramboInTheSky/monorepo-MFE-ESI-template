import {Filter, FilterApiResponse, FilterFacet, FilterFacetApiResponse, FilterPrice, FilterPriceApiResponse} from "."

export const isApiPriceFilter = (response: FilterApiResponse): response is FilterPriceApiResponse =>
    (response as FilterPriceApiResponse).type === "price"

export const isApiFilterFacet = (response: FilterApiResponse): response is FilterFacetApiResponse =>
    (response as FilterFacetApiResponse).type === "feat" || (response as FilterFacetApiResponse).type === "filter"

export const isPriceFilter = (response: Filter): response is FilterPrice => (response as FilterPrice).type === "price"

export const isFilterFacet = (response: Filter): response is FilterFacet =>
    (response as FilterFacet).type === "feat" || (response as FilterFacet).type === "filter"
