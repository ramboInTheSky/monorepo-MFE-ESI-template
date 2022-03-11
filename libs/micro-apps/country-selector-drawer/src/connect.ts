import {connect} from "react-redux"
import {
    State,
    openDrawer,
    closeCountrySelector,
    getCountriesListThunk,
    selectLanguage,
    setDefaultCountryCode,
    redirectToAlternativeLanguageThunk,
} from "./ducks"
import {getBaseSiteUrl} from "./utils/getBaseSiteUrl"
import PublishCountrySelectorClosed from "./events/countrySelectorClosed"
import PublishCountrySelectorRedirect from "./events/countrySelectorRedirect"
import {PublishToModalsClosed} from "./events/modalsClosed"
import {COUNTRY_SELECTOR_URL} from "./config/constants"
import {getCountryFlagPath} from "./utils/countryUtils"
import {CountrySelectorProps} from "./props"

export const mapStateToProps = (state: State, ownProps: CountrySelectorProps) => {
    const {territory, language, textAlignment, siteUrl, isInternationalCountry, cdnBaseUrl} = ownProps
    const {selectedLanguage, selectedCountry, showOverlay, loaded, showCountrySelector} = state

    return {
        flagIconUrl: getCountryFlagPath(cdnBaseUrl, territory),
        showCountrySelector,
        showOverlay,
        textAlignment,
        territory: territory?.toUpperCase(),
        language,
        selectedLanguage,
        selectedCountry,
        isInternationalCountry,
        loaded,
        ROWLinkUrl: getBaseSiteUrl(siteUrl, territory, language) + COUNTRY_SELECTOR_URL,
    }
}

export const redirectPage = (selectedCountry, selectedLanguage) => {
    PublishCountrySelectorRedirect()

    const selectedLang = selectedCountry?.languages.find(l => l.name === selectedLanguage)
    if (selectedLang) {
        window.location.href = selectedLang.targetUrl
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
    shopNowOnClick: () => {
        if (state.selectedCountry?.countryCode === ownProps.territory && state.selectedLanguage === ownProps.language) {
            PublishCountrySelectorClosed()
            dispatch(closeCountrySelector())
        } else {
            return redirectPage(state.selectedCountry, state.selectedLanguage)
        }
    },
    getCountriesListThunk: () =>
        dispatch(getCountriesListThunk(ownProps.cdnBaseUrl, ownProps.territory, ownProps.language)),
    redirectPageToAlternativeLanguage: () =>
        dispatch(redirectToAlternativeLanguageThunk(ownProps.cdnBaseUrl, ownProps.territory, ownProps.language)),
})

export default connect(mapStateToProps, null, mergeProps)
