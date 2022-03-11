import {connect} from "react-redux"
import State from "../../ducks/state"

export const mapStateToProps = (state: State) => ({
    text: { chevronIconAltText: state.text.chevronIconAltText },
})

export default connect(mapStateToProps)
