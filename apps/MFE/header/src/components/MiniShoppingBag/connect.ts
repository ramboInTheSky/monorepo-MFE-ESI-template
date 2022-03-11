import {connect} from "react-redux"
import State from "../../ducks/state"
import urls from "../../config/urls"

export const mapStateToProps = (state: State) => {
    const {bag, itemCount} = state.shoppingBag

    const {siteUrl} = state.request
    const {
        text: {miniShoppingBag},
    } = state
    return {
        text: miniShoppingBag,
        itemCount,
        bag,
        shoppingBagUrl: `${siteUrl}${urls.shoppingBag.url}`,
    }
}

export default connect(mapStateToProps)
