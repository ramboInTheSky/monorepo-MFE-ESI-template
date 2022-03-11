import {connect} from "react-redux"

import State from "../../models/state"

export const mapStateToProps = (state: State) => ({
    isLazyloadFitIcons: state.lazyload.fitIcons,
    text: state.text
})

export default connect(mapStateToProps)