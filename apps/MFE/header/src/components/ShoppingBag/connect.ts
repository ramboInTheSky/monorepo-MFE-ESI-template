import {connect} from "react-redux"
import State from "../../ducks/state"
import urls from "../../config/urls"
import {REALM_HEADER} from "../../config/constants"
import {updateBag, addEVoucherToBag} from "../../ducks/shoppingbag"

export const mapStateToProps = (state: State) => {
    const realm = state.request.headers![REALM_HEADER] as string
    const {variant} = state.settings
    const {
        text: {
            shoppingBag: {altText},
        },
    } = state
    const {itemCount, loading} = state.shoppingBag
    return {
        altText,
        iconUrl: urls.shoppingBag.iconUrl(realm, variant),
        itemCount,
        isBagLoading: loading,
        shoppingBagUrl: `${state.request.siteUrl}${urls.shoppingBag.url}`,
    }
}

export const mergeProps = (state: any, {dispatch}: any, ownProps) => ({
    ...state,
    ...ownProps,
    updateShoppingBag: (data: any) => {
        dispatch(updateBag(data))
    },
    addEVoucherToBag: (data: any) => {
        dispatch(addEVoucherToBag(data))
    },
})

export default connect(mapStateToProps, null as any, mergeProps)
