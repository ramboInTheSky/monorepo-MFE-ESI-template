import {connect} from "react-redux"
import State from "../../ducks/state"

export const mapStateToProps = (state: State) => ({
    siteUrl: state.request.siteUrl,
    showSecondaryNavArrow: state.compositionSettings.showSecondaryNavArrow,
})

export default connect(mapStateToProps)
