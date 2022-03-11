import {connect} from "react-redux"
import {State} from "../../../ducks"

export const mapStateToProps = (state: State) => ({
    user: state.user,
    siteUrl: state.languages.siteUrl,
})

export default connect(mapStateToProps)
