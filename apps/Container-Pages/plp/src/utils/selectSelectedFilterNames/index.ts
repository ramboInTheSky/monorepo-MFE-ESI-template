import State from "models/State"
import {FilterFacet} from "../../models/Filter"
import {LANGUAGE_HEADER, LANGUAGE_ENGLISH} from "../../config/constants"

export function selectSelectedFilterNames(state: State) {
    const result: string[] = []
    const {facets, filters, filtersSort} = state.search

    const gender= state.request.gender ?? []
    const category = state.request.category ?? ''

    filtersSort.forEach(filterKey => {
        const filter = filters[filterKey]
        ;((filter as FilterFacet).facets || []).forEach(facetKey => {
            const facet = facets[facetKey]
            if (facet.s === true && gender.filter((g)=> g.toLowerCase() === facet.n.toLowerCase()).length === 0 && category.toLowerCase() !== facet.n.toLowerCase()) {
                if (state.request.headers[LANGUAGE_HEADER] === LANGUAGE_ENGLISH) {
                    result.push(
                        facet.n
                            .charAt(0)
                            .toUpperCase()
                            .concat(facet.n.slice(1), " "),
                    )
                } else {
                    result.push(
                        facet.n
                            .charAt(0)
                            .toUpperCase()
                            .concat(facet.n.slice(1), ", "),
                    )
                }
            }
        })
    })

    return result
}
