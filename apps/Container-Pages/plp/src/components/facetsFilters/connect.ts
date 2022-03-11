import {connect} from "react-redux"
import {setFilterIsOpenThunk, setFilterClearTypeAction} from "../../ducks/search"
import State from "../../models/State"
import {isFilterFacet} from "../../models/Filter/typeGuards"
import TrackFilterExpanded from "../../events/trackEvent/events/trackFilterExpanded"
import TrackFilterClear from "../../events/trackEvent/events/trackFilterClear"

export const mapStateToProps = (state: State, ownProps: any) => {
    const filter = state.search.filters[ownProps.name]
    const allFilters = state.search.facets
    const {text} = state
    
    let isFilterSelected = false

    if (isFilterFacet(filter)) {
        isFilterSelected = filter.facets.some(filterName => allFilters[filterName] && allFilters[filterName].s === true)
    }

    return {
        displayName: filter.displayName,
        isOpen: filter.isFilterOpen,
        type: filter.type,
        isFilterSelected,
        text
    }
}

export const mergeProps = (state: any, {dispatch}: any, ownProps) => ({
    ...state,
    ...ownProps,
    toggleExpansionPanel: (event: React.ChangeEvent<{}>) => {
        event.preventDefault()
        if (!state.isOpen) {
            TrackFilterExpanded(ownProps.name)
        }
        dispatch(setFilterIsOpenThunk(!state.isOpen, ownProps.name))
    },
    clearTypeFilters: () => {
        TrackFilterClear(ownProps.name)
        dispatch(setFilterClearTypeAction(ownProps.name))
    },
})

export default connect(mapStateToProps, null as any, mergeProps)
