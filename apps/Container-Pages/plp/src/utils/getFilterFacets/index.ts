import {FilterFacet, FilterPrice, Filters} from "../../models/Filter"
import {FacetsState} from "../../models/FacetsState"
import {isPriceFilter} from "../../models/Filter/typeGuards"

const isFilteredPriceFn = ({max, selectedMax, min, selectedMin}: FilterPrice) =>
    max !== selectedMax || min !== selectedMin

const getFilteredFacetList = (filter: FilterFacet, facets: FacetsState): string[] => {
    const data: string[] = []
    filter.facets.forEach(filterName => {
        if (facets[filterName]?.s) {
            data.push(facets[filterName].n)
        }
    })

    return data
}

const getRefinedFilters = (
    filtersSort: string[],
    filters: Filters,
    singleOptionFacetList: string[],
    consolidatedFacets: string[],
) =>
    filtersSort.filter(facetItem => {
        if (isPriceFilter(filters[facetItem])) return true
        if (singleOptionFacetList?.includes(facetItem)) return true
        if (consolidatedFacets?.includes(facetItem)) return false
        return true
    })

const getFacetsWithUnselectedOption = (filter: FilterFacet, facets: FacetsState): boolean => {
    let hasFacetsWithOneSelectedOption = false
    filter.facets.forEach(filterName => {
        if (filter.facets.length === 1 && !facets[filterName]?.s) {
            hasFacetsWithOneSelectedOption = true
        }
    })
    return hasFacetsWithOneSelectedOption
}

export {isFilteredPriceFn, getFilteredFacetList, getFacetsWithUnselectedOption, getRefinedFilters}
