import { connect } from "react-redux"
import State from "../../models/State"
import { isFilterFacet, isPriceFilter } from "../../models/Filter/typeGuards"
import { getFilteredFacetList, isFilteredPriceFn } from "../../utils/getFilterFacets"

export const mapStateToProps = (state: State) => {
    const { facets, filters } = state.search
    const filteredFacets: Record<string, string[]> = {}
    const {text} = state

    let isFilteredPrice

    Object.entries(filters).forEach(([_key, value]) => {
        if (isPriceFilter(value)) isFilteredPrice = isFilteredPriceFn(value)
        if (isFilterFacet(value)) {
            const filteredFacetList = getFilteredFacetList(value, facets)
            if (filteredFacetList.length > 0) filteredFacets[value.displayName] = filteredFacetList
        }
    })

    const isFilterSelected: boolean = Object.keys(filteredFacets).length > 0

    return {
        isFilterSelected,
        isFilteredPrice,
        filteredFacets,
        text
    }
}

export default connect(mapStateToProps)
