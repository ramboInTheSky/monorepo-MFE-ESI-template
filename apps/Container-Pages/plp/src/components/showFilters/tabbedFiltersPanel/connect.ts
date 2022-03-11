import {connect} from "react-redux"
import State from "../../../models/State"

const mapStateToProps = (state: State) => {
    const {selectedFilter, isPerformingKeyFilterSearch, filters} = state.tabbedFilters
    const {text} = state
    return {
        filter: selectedFilter ? {...filters[selectedFilter]} : null,
        isFetchingPageItems: isPerformingKeyFilterSearch,
        text
    }
}

export default connect(mapStateToProps)
