import {connect} from "react-redux"
import {TERRITORY_HEADER} from "../../config/constants"
import {State} from "../../ducks"
import {requestCountryChange} from "../../ducks/country-selector"

export const mapStateToProps = (state: State) => {

    const {data, textAlignment, shoppingBag, countrySelector} = state
    const regions = data?.regions || []
    const hasRegions = regions.length > 0

    if (!data || !regions || !hasRegions) {
        throw new Error("Header: there is no data to render the header")
    }

    return {
        textAlignment,
        siteUrl: state.request.siteUrl,
        geolocationUrl: state.request.geolocationBaseUrl,
        geolocationVersion: state.request.geolocationVersion,
        territory: state.request?.headers![TERRITORY_HEADER] as string,
        bloomReachCachingEnabled: state.request?.bloomReachCachingEnabled,
        bloomReachCachingCookieList: state.request?.bloomReachCachingCookieList,
        itemCount: shoppingBag.itemCount,
        requestedCountryChange: countrySelector.requestedCountryChange,
        enableCookieConsent: !state.settings["userConsentManagement.enabled"],
        cookieDomain: state.request.cookieDomain,
        enableFavourites: state.favourites?.enableFavourites,
        showSaleWarningBag: state.request.showSaleWarningBag,
    }
}

export const mapDispatchToProps = (dispatch: any) => ({
    requestCountryChange: () => dispatch(requestCountryChange(false)),
})

export default connect(mapStateToProps, mapDispatchToProps)
