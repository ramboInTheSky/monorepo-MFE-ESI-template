import {connect} from "react-redux"
import State from "../../ducks/state"
import urls from "../../config/urls"

export const mapStateToProps = (state: State) => ({
    text: {miniShoppingBag: state.text.miniShoppingBag, shoppingBag: state.text.shoppingBag},
    itemCount: state.shoppingBag.itemCount,
    checkoutUrl: `${state.request.siteUrl}${urls.shoppingBag.url}`,
})

export default connect(mapStateToProps)
