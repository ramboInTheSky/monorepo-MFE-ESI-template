import {connect} from "react-redux"
import State from "../../models/State"

export const mapStateToProps = (state: State) => {
    // If filters are present with no items we are working on the client side
    // If there are no filters then it means the initial SS API call to fetch the filters returned no items
    const noResults = state.search.items?.length <= 0 && Object.entries(state.search.facets).length <= 0
    return {
        noResults,
    }
}

export default connect(mapStateToProps)
