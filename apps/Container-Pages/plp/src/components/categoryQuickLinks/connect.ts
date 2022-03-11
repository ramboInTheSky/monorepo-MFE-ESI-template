import {connect} from "react-redux"
import State from "../../models/State"

const mapStateToProps = (state: State) => {
    const {text} = state
    const {items} = state.categoryQuickLinks
    return {items, text}
}

export default connect(mapStateToProps)
