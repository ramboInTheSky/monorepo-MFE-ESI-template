import {connect} from "react-redux"

import State from "../../models/State"
import {setFilterClearAllAction} from "../../ducks/search"
import {setTabbedFiltersOpenAction, syncTabbedFiltersFromSearch} from "../../ducks/tabbedFilters"
import {getIsAnyFilterSelected} from "../../utils/isAnyFilterSelected"
import TrackFilterClearAll from "../../events/trackEvent/events/trackFilterClearAll"

const mapStateToProps = (state: State) => {
    const {filters, isOpen, historicFacetFilter, filtersSort, selectedFilter} = state.tabbedFilters
    const priceFilter = Object.values(filters).find(item => item?.type === "price")
    const isAnyFilterSelected = getIsAnyFilterSelected(historicFacetFilter, priceFilter)
    const {text} = state
    return {
        filters,
        filtersSort,
        isAnyFilterSelected,
        isOpen,
        hasSelectedFacet: Boolean(selectedFilter),
        text,
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        clearAll: () => {
            TrackFilterClearAll()
            dispatch(setFilterClearAllAction())
        },
        syncTabbedFilters: isOpen => dispatch(syncTabbedFiltersFromSearch(isOpen)),
        closeTabbedFilters: isOpen => dispatch(setTabbedFiltersOpenAction(isOpen)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
