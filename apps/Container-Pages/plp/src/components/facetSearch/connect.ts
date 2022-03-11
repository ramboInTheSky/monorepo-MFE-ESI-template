import {connect} from "react-redux"
import {setFilterModal} from "../../ducks/viewAllModal"
import State from "../../models/State"

export const mapStateToProps = (state: State) => ({
    facets: state.viewAllModal.facets,
    searchFacets: Object.keys(state.viewAllModal.facets).map((key: string) => ({
        n: state.viewAllModal.facets[key].n,
        v: key,
    })),
    displayName: state.viewAllModal.displayName.toLowerCase(),
    text: state.text
})

export const mergeProps = (state: any, {dispatch}: any, ownProps) => ({
    ...state,
    ...ownProps,

    handleSetFilterModal: (filterValue: string): void => {
        dispatch(setFilterModal(filterValue))
    },
})

export default connect(mapStateToProps, null as any, mergeProps)
