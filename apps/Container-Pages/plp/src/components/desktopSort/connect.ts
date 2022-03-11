import {connect} from "react-redux"
import State from "../../models/State"
import {setSelectedSortingAction} from "../../ducks/search"

export const mapStateToProps = (state: State) => {
    return {
        sortOptions: state.search.sorting,
        text : state.text
    }
}
export const mergeProps = (state: any, {dispatch}: any, ownProps) => ({
    ...state,
    ...ownProps,
    onSelect: (value: string) => {
        dispatch(setSelectedSortingAction(value))
    },
})

export default connect(mapStateToProps, null as any, mergeProps)
