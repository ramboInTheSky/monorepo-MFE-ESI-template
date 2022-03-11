import {connect} from "react-redux"
import State from "../../../models/State"

const mapStateToProps = (state: State) => ({
    hasSelectedFacet: Boolean(state.tabbedFilters.selectedFilter),
})

export default connect(mapStateToProps)
