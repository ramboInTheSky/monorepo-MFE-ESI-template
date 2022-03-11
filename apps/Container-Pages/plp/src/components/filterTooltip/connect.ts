import {connect} from "react-redux"
import State from "../../models/State"

const mapStateToProps = (state: State) => {
    const {text, request} = state
    const {siteUrl} = request
    return {
      text,
      siteUrl
    }
}

export default connect(mapStateToProps)