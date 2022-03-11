import {connect} from "react-redux"
import {State} from "../../ducks"

export const mapStateToProps = ({data, textAlignment, text}: State) => ({
    data,
    textAlignment,
    text,
})

export default connect(mapStateToProps)
