import {connect} from "react-redux"
import State from "../../models/State"
import {setSelectedSortingAction} from "../../ducks/search"
import TrackSortOption from "../../events/trackEvent/events/trackSortOption"

export const mapStateToProps = (state: State) => {
    const {text} = state
    return {
        sortOptions: state.search.sorting,
        text
    }
}

export const mergeProps = (state: any, {dispatch}: any, ownProps) => ({
    ...state,
    ...ownProps,
    onSelect: (value: string) => {
        dispatch(setSelectedSortingAction(value))
        TrackSortOption(value)
    },
})

export default connect(mapStateToProps, null as any, mergeProps)
