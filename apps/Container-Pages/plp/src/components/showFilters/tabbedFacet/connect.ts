import {connect} from "react-redux"

import State from "../../../models/State"
import {setSelectedFilterThunk} from "../../../ducks/tabbedFilters"
import getLocaleFromHeaders from "../../../utils/getLocaleFromHeaders"
import getRealmFromHeaders from "../../../utils/getRealmFromHeaders"
import {getSelectedFacetFilters} from "../../../utils/getSelectedFacetFilters"
import {isFacetFiltersSelected} from "../../../utils/isFacetFiltersSelected"
import TrackFilterExpanded from "../../../events/trackEvent/events/trackFilterExpanded"

const mapStateToProps = (state: State, ownProps: any) => {
    const {facetName, isFirstFacet} = ownProps
    const {filters, selectedFilter, historicFacetFilter, facets, isOpen} = state.tabbedFilters
    const {disabled} = filters[facetName]
    const filter = filters[facetName]
    const hasSelectedFacet = Boolean(selectedFilter)
    const hasSelectedFilters = isFacetFiltersSelected(filter, historicFacetFilter)
    let selectedFacetFilters: undefined | string

    if (!hasSelectedFacet && isOpen) {
        selectedFacetFilters = getSelectedFacetFilters({
            historicFacetFilter,
            filter,
            facets,
            locale: getLocaleFromHeaders(state.request.headers),
            realm: getRealmFromHeaders(state.request.headers),
        })
    }

    return {
        isFocused: hasSelectedFacet ? facetName === selectedFilter : undefined,
        hasSelectedFilters,
        hideTopBorder: isFirstFacet && hasSelectedFacet,
        hasSelectedFacet,
        disabled,
        selectedFacetFilters,
    }
}

const mergeProps = (state: State, {dispatch}: any, ownProps) => ({
    ...state,
    ...ownProps,
    setSelectedFacet: () => {
        TrackFilterExpanded(ownProps.facetName)
        dispatch(setSelectedFilterThunk(ownProps.facetName))
    },
})

export default connect(mapStateToProps as any, null as any, mergeProps)
