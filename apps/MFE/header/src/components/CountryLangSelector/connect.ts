import {connect} from "react-redux"
import State from "../../ducks/state"
import {
    openDrawer,
    closeCountrySelector,
    getCountriesListThunk,
    selectLanguage,
    setDefaultCountryCode,
    redirectToAlternativeLanguageThunk,
    requestCountryChange,
} from "../../ducks/country-selector"
import {TERRITORY_HEADER, LANGUAGE_HEADER} from "../../config/constants"
import {formatCdnPath} from "../../utils/getCdnUrl"
import {getBaseSiteUrl} from "../../utils/getBaseSiteUrl"
import redirectPage from "../../utils/redirectPage"
import PublishCountrySelectorClosed from "../../events/countrySelectorClosed"
import {PublishToModalsClosed} from "../../events/modalsClosed"
import urls from "../../config/urls"
import {deleteRecentQueries} from "../../ducks/recents/index"

const getIconUrl = (area: string) => formatCdnPath(`/icons/shared/countryflags/${area.toLowerCase()}.png`)

const {countrySelectUrl} = urls.countryLangSelector

export const mapStateToProps = (state: State) => {
    const territory = state.request?.headers![TERRITORY_HEADER] as string
    const language = state.request?.headers![LANGUAGE_HEADER] as string
    const text = state.text.countryLangSelector
    const {textAlignment} = state
    const {siteUrl, isInternationalCountry} = state.request
    const {itemCount} = state.shoppingBag

    const {showCountrySelector, isActive, selectedLanguage, selectedCountry, showOverlay, loaded} =
        state.countrySelector

    return {
        showCountrySelector,
        iconUrl: getIconUrl(territory),
        isActive,
        showOverlay,
        textAlignment,
        territory: territory.toUpperCase(),
        language,
        selectedLanguage,
        selectedCountry,
        isInternationalCountry,
        loaded,
        itemCount,
        ROWLinkUrl: getBaseSiteUrl(siteUrl, territory, language) + countrySelectUrl,
        text,
    }
}

export const mergeProps = (state: any, {dispatch}: any, ownProps) => ({
    ...state,
    ...ownProps,
    closePanel: () => {
        PublishCountrySelectorClosed()
        return dispatch(closeCountrySelector())
    },
    openDrawer: (showOverlay: boolean) => {
        PublishToModalsClosed()
        return dispatch(openDrawer(showOverlay))
    },
    selectDefaultCountry: (countryCode: string) => dispatch(setDefaultCountryCode(countryCode)),
    selectLanguage: (language: string) => dispatch(selectLanguage(language)),
    deleteRecentQueries: () => {
        dispatch(deleteRecentQueries())
    },
    shopNowOnClick: (itemCount: number) => {
        if (state.selectedCountry?.CountryCode === state.territory) {
            if (state.selectedLanguage !== state.language) {
                return redirectPage(state.selectedCountry, state.selectedLanguage)
            }
            PublishCountrySelectorClosed()
            return dispatch(closeCountrySelector())
        }
        if (itemCount > 0) {
            dispatch(closeCountrySelector())
            dispatch(requestCountryChange(true))
        } else {
            return redirectPage(state.selectedCountry, state.selectedLanguage)
        }
    },
    getCountriesListThunk: () => dispatch(getCountriesListThunk()),
    redirectPageToAlternativeLanguage: () => dispatch(redirectToAlternativeLanguageThunk()),
})

export default connect(mapStateToProps, null, mergeProps)
