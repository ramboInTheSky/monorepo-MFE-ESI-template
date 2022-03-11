import {connect} from "react-redux"
import {State} from "../../ducks"

export const mapStateToProps = (state: State) => ({
    features: state.features,
    closeText: state.text.searchBox.closeButton.text,
})

export default connect(mapStateToProps)
