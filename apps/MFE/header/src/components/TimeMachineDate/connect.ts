import {connect} from "react-redux"
import State from "../../ducks/state"

export const mapStateToProps = (state: State) => ({
    useTimeMachineCookie: state.request.useTimeMachineCookie,
})

export default connect(mapStateToProps)
