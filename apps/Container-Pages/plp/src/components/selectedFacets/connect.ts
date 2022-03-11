import {connect} from "react-redux"
import {clearFilters, setFilterModal} from "../../ducks/viewAllModal"
import State from "../../models/State"
import TrackViewAllModalRemoveAll from "../../events/trackEvent/events/viewAllModalRemoveAll"

export const mapStateToProps = (state: State) => {
    const {text} = state
    const title = state.viewAllModal.displayName
    return {
    title,
    selectedFacets: Object.values(state.viewAllModal.facets).filter(filter => filter.s),
    text
}
}

export const mergeProps = (state: any, {dispatch}: any, ownProps) => ({
    ...state,
    ...ownProps,

    onClearFacets: (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        dispatch(clearFilters())
        TrackViewAllModalRemoveAll()
    },

    selectFacet: (filterValue: string): void => {
        dispatch(setFilterModal(filterValue))
    },
})

export default connect(mapStateToProps, null as any, mergeProps)
