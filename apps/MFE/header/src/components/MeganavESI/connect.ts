import {connect} from "react-redux"
import State from "../../ducks/state"

export const mapStateToProps = (state: State) => {
    const {timeMachineDate, siteUrl} = state.request
    return {
        timeMachineDate,
        siteUrl,
    }
}

export default connect(mapStateToProps)
