import {connect} from "react-redux"
import State from "../../ducks/state"

export const mapStateToProps = (state: State) => ({
    textAlignment: state.textAlignment,
    text: { chevronIconAltText: state.text.chevronIconAltText },
    siteUrl: state.request.siteUrl
})

export default connect(mapStateToProps)
