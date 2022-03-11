import {getWindow} from "../window"
import {PLP_ENTRYPOINT_ID} from "../../config/constants"

export const doCountryRedirect = (): boolean => {
    const w = getWindow()
    if (w && (w.document.getElementById(PLP_ENTRYPOINT_ID) || (w.platmodflags && w.platmodflags.countryRedirect))) return true
    return false
}

export const doCookiePolicy = (): boolean => {
    const w = getWindow()
    if (w && (w.document.getElementById(PLP_ENTRYPOINT_ID) || (w.platmodflags && w.platmodflags.modernisedCookieConsent)))
        return true
    return false
}

export const doGoogleAnalytics = (): boolean => {
    const w = getWindow()
    if (w && (w.document.getElementById(PLP_ENTRYPOINT_ID) || (w.platmodflags && w.platmodflags.googleAnalytics))) return true
    return false
}

export const doGTMDataLayerEvents = (): boolean => {
    const w = getWindow()
    if (w && (w.document.getElementById(PLP_ENTRYPOINT_ID) || (w.platmodflags && w.platmodflags.gtmDataLayerEvents))) return true
    return false
}

export const doMonetateEvents = (): boolean => {
    const w = getWindow()
    if (w && (w.document.getElementById(PLP_ENTRYPOINT_ID) || (w.platmodflags && w.platmodflags.monetateEvents))) return true
    return false
}

export const doSearchABAdaptor = (): boolean => {
    const w = getWindow()
    if (w && (w.document.getElementById(PLP_ENTRYPOINT_ID) || (w.platmodflags && w.platmodflags.searchABAdaptor))) return true
    return false
}

export const doUserVariables = (): boolean => {
    const w = getWindow()
    if (w && (w.document.getElementById(PLP_ENTRYPOINT_ID) || (w.platmodflags && w.platmodflags.userVariables))) return true
    return false
}
