import {connect} from "react-redux"
import State from "../../ducks/state"

export const mapStateToProps = (state: State) => ({
    text: { drawerIconAltText: state.text.drawerIconAltText },
})

export default connect(mapStateToProps)
