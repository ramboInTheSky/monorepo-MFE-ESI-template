import {connect} from "react-redux"
import State from "../../models/State"
import getRealmFromHeaders from "../../utils/getRealmFromHeaders"

type OwnProps = {
    ariaValueText: string
    testid: string
}

export const mapStateToProps = (state: State, ownProps: OwnProps) => {
    return {
        ...ownProps,
        realm: getRealmFromHeaders(state.request.headers),
    }
}

export default connect(mapStateToProps)
