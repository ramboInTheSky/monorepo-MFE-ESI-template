import {connect} from "react-redux"
import State from "../../ducks/state"

export const mapStateToProps = (state: State) => ({
    siteUrl: state.request.siteUrl,
    textAlignment: state.textAlignment,
    text: { arrowIconUrlAltText: state.text.arrowIconUrlAltText}
})

export default connect(mapStateToProps)
