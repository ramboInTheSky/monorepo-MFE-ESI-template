import {FilterFacet, Filters} from "../../models/Filter"
import {FacetsState} from "../../models/FacetsState"

interface Params {
    oldFacets: FacetsState
    newFacets: FacetsState
    oldFilters: Filters
    newFilters: Filters
}

export function disableNonReturnedKeyFilters({oldFacets, newFacets, oldFilters, newFilters}: Params) {
    const newFacetsCopy = {...newFacets}
    const value = Object.entries(oldFilters).find(([, item]) => item.type === "feat")

    if (!value) {
        return {
            facets: newFacetsCopy,
            filters: newFilters,
        }
    }
    const [featFacetKey, featFacet] = value

    const {facets} = featFacet as FilterFacet
    facets.forEach(key => {
        if (!newFacetsCopy[key]) {
            newFacetsCopy[key] = {...oldFacets[key], d: true}
        }
    })

    return {
        facets: newFacetsCopy,
        filters: {...newFilters, [featFacetKey]: featFacet},
    }
}
