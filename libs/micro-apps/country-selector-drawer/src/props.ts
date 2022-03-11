import {Country} from "./models/countryselector"

export type CountrySelectorProps = {
    realm: string
    territory: string
    language: string
    textAlignment: string
    cdnBaseUrl: string
    siteUrl: string
    isInternationalCountry: boolean
}

export interface CountrySelectorInternalProps extends CountrySelectorProps {
    flagIconUrl: string
    showOverlay: boolean
    selectedLanguage: string
    selectedCountry: Country
    loaded: boolean
    ROWLinkUrl: string
    shopNowOnClick: () => void
    openDrawer: (showOverlay?: boolean) => void
    closePanel: () => void
    selectLanguage: (language: string) => void
    selectDefaultCountry: (countryCode: string) => void
    getCountriesListThunk: () => void
    redirectPageToAlternativeLanguage: () => void
    showCountrySelector: boolean
}
