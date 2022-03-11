import {connect} from "react-redux"
import {State} from "../../ducks"

export const mapStateToProps = (state: State) => {
    const {text} = state
    return {
        text,
    }
}

export default connect(mapStateToProps)
