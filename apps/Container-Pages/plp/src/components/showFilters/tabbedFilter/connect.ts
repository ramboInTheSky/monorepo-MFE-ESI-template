import {connect} from "react-redux"
import State from "../../../models/State"
import {searchForSelectedFacets, searchForKeyFilters} from "../../../ducks/tabbedFilters"

const mapStateToProps = (state: State, ownProps: any) => {
    const {filterName} = ownProps
    const {facets: filters} = state.tabbedFilters

    const filterState = filters[filterName]

    return {
        filterState,
    }
}

export const mergeProps = (state: any, {dispatch}: any, ownProps) => ({
    ...state,
    ...ownProps,

    onFilterSelect: () => {
        const {isTabbedFilter, filterName, facetName} = ownProps
        if (isTabbedFilter) {
            dispatch(searchForSelectedFacets({child: filterName, parent: facetName}))
        } else {
            dispatch(searchForKeyFilters(filterName))
        }
    },
})

export default connect(mapStateToProps, null as any, mergeProps)
