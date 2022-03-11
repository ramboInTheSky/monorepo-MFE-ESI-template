import {connect} from "react-redux"
import urls from "../../config/urls"
import State from "../../ducks/state"
import {REALM_HEADER} from "../../config/constants"
import {updateFavouritesInState} from "../../ducks/favourites"

export const mapStateToProps = (state: State) => {
    const {siteUrl} = state.request
    const {variant} = state.settings
    const realm = state.request.headers![REALM_HEADER] as string
    const icon = state.favourites?.hasFavourites
        ? urls.favourites.activeIconUrl(realm, variant)
        : urls.favourites.inactiveIconUrl(realm, variant)
    const enableFavourites = state.favourites?.enableFavourites
    const {
        text: {
            favourites: {altText},
        },
    } = state
    return {
        altText,
        iconUrl: icon,
        enableFavourites,
        favouritesUrl: `${siteUrl}${urls.favourites.url}`,
    }
}

export const mergeProps = (state: any, {dispatch}: any, ownProps) => ({
    ...state,
    ...ownProps,
    updateFavourites: (data: any) => {
        dispatch(updateFavouritesInState(data))
    },
})

export default connect(mapStateToProps, null as any, mergeProps)
