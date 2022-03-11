import {connect} from "react-redux"
import State from "../../ducks/state"
import urls from "../../config/urls"

export const mapStateToProps = (state: State) => {
    const {siteUrl} = state.request
    const {text:{checkout:{text}}} = state
    return {
        enable: state.shoppingBag.itemCount > 0,
        text,
        url: `${siteUrl}${urls.checkout.url}`,
        isInternationalCountry: state.request.isInternationalCountry,
    }
}

export default connect(mapStateToProps)
