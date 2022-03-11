import {Filters} from "../../models/Filter"

interface Params {
    oldFilters: Filters
    oldFiltersSort: string[]
    newFiltersSort: string[]
    newFilters: Filters
}

export const disableNonReturnedFilters = ({
    oldFilters,
    newFiltersSort,
    newFilters,
    oldFiltersSort: oldFacetsSort,
}: Params) => {
    const filters = {...newFilters}
    let filtersSort = [...newFiltersSort]

    oldFacetsSort.forEach((oldFacetKey, indexOfOldFacetKey) => {
        if (newFiltersSort.includes(oldFacetKey)) {
            filters[oldFacetKey].disabled = false
        } else {
            const firstPart = filtersSort.slice(0, indexOfOldFacetKey)
            const secondPart = filtersSort.slice(indexOfOldFacetKey)
            filters[oldFacetKey] = {...oldFilters[oldFacetKey], disabled: true}
            filtersSort = [...firstPart, oldFacetKey, ...secondPart]
        }
    })

    return {
        filters,
        filtersSort,
    }
}
