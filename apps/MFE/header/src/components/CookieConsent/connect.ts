import {connect} from "react-redux"
import Cookies from "js-cookie"
import State from "../../ducks/state"
import {AMIDO_COOKIE, AMIDO_DIRECT_COOKIE} from "../../config/constants"

export const mapStateToProps = (state: State) => {
    const {isInternationalCountry, cookieDomain} = state.request
    const {
        text: {cookiePolicy},
    } = state

    const privacyUrl = isInternationalCountry ? "/privacypolicy" : "/privacy"
    const cookieName = isInternationalCountry ? AMIDO_DIRECT_COOKIE : AMIDO_COOKIE
    const hasConsentCookie = !!Cookies.get(cookieName)

    return {
        cookieDomain,
        hasConsentCookie,
        privacyUrl,
        cookieName,
        text: cookiePolicy,
    }
}

export default connect(mapStateToProps)
