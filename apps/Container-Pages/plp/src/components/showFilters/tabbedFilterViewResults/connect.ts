import {connect} from "react-redux"
import State from "../../../models/State"
import {onClickViewResults} from "../../../ducks/tabbedFilters"

const mapStateToProps = (state: State) => {
    const {totalResults} = state.tabbedFilters
    const {text} = state
    return {
        totalResults,
        text
    }
}

export const mapDispatchToProps = {
    closeTabbedFilters: onClickViewResults,
}

export default connect(mapStateToProps, mapDispatchToProps)
