import {connect} from "react-redux"
import State from "../../models/State"

export const mapStateToProps = (state: State) => {
    const {text} = state
    return {searchTerm: state.request.searchTerm, text}
}

export default connect(mapStateToProps)
