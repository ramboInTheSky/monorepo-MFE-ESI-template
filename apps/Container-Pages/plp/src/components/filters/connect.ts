import {connect} from "react-redux"
import State from "../../models/State"
import {setFilterClearAllAction} from "../../ducks/search"
import {isFilterFacet} from "../../models/Filter/typeGuards"
import {getFacetsWithUnselectedOption, getFilteredFacetList, getRefinedFilters} from "../../utils/getFilterFacets"
import TrackFilterClearAll from "../../events/trackEvent/events/trackFilterClearAll"

export const mapStateToProps = (state: State) => {
    const {totalResults, filtersSort, filters, facets, singleOptionFacetList} = state.search

    const filteredFacets: Record<string, string[]> = {}

    const consolidatedFacets: string[] = []

    Object.entries(filters).forEach(([_key, value]) => {
        if (isFilterFacet(value)) {
            const filteredFacetList = getFilteredFacetList(value, facets)
            if (filteredFacetList.length > 0) filteredFacets[value.displayName] = filteredFacetList
            if (getFacetsWithUnselectedOption(value, facets)) {
                consolidatedFacets.push(value.name)
            }
        }
    })

    const consolidatedFilters = getRefinedFilters(filtersSort, filters, singleOptionFacetList, consolidatedFacets)

    const isFilterSelected: boolean = Object.keys(filteredFacets).length > 0

    const {text} = state
    return {
        totalResults,
        filters,
        consolidatedFilters,
        isFilterSelected,
        text,
    }
}

export const mergeProps = (state: any, {dispatch}: any, ownProps) => ({
    ...state,
    ...ownProps,
    clearAllFilters: () => {
        TrackFilterClearAll()
        dispatch(setFilterClearAllAction())
    },
})

export default connect(mapStateToProps, null as any, mergeProps)
