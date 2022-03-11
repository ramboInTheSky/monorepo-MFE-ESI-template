import {connect} from "react-redux"
import {State} from "../../../ducks"
import {AMIDO_REALM, REALM_HEADER} from "../../../config/constants"

export const mapStateToProps = (state: State) => {
    const isAmidoRealm = state.request.headers![REALM_HEADER] === AMIDO_REALM
    const {isInternationalCountry} = state.request

    return {
        cookies: state.request.headers?.cookie,
        isAmidoInternational: isAmidoRealm && isInternationalCountry,
        siteUrl: state.languages.siteUrl,
    }
}

export default connect(mapStateToProps)
