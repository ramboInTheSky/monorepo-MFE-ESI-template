import getGeolocation from "../../api/countryRedirect"

import {openCountrySelector} from "./openCountrySelector"
import {SessionUpdate} from "./sessionUpdate"
import {fetchRetry, GetDevOverrideIpAddress, IsApplicable} from "./utils"

import {doCountryRedirect} from "../featureSwitch"

interface CountryRedirectParams {
    Version: number
    PopupDisplayed: boolean | null
    ShowPopup: boolean | null
    PopupDate: string | null
    ISOCode: string | null
    CountryName: string | null
    RedirectUrl: string | null
}

// countryRedirectParams -bag/get CountryRedirect.  If you have previously been shown the country redirect, it will be set here
// territory - x-monorepo-territory
// GeolocationVersion - feature settings GeolocationVersion
export const PerformCountryRedirectCheck = async (
    countryRedirectParams: CountryRedirectParams | null,
    territory: string,
    GeolocationVersion: number,
    siteUrl: string,
    geolocationUrl: string,
): Promise<void> => {
    if (!doCountryRedirect()) return

    const countryCode = territory.toUpperCase()
    if (!IsApplicable()) {
        return
    }

    if (!countryRedirectParams) {
        await callGeolocationApi(GeolocationVersion, siteUrl, countryCode, geolocationUrl)
        return
    }
    if (countryRedirectParams.Version < GeolocationVersion && !countryRedirectParams.PopupDisplayed) {
        await callGeolocationApi(GeolocationVersion, siteUrl, countryCode, geolocationUrl)
        return
    }

    if (countryRedirectParams.ShowPopup) {
        const currentDate = new Date()
        const popupDate = countryRedirectParams.PopupDate
            ? new Date(parseInt(countryRedirectParams.PopupDate.substr(6), 10))
            : null
        if (!popupDate || popupDate < currentDate) {
            const country = {
                ISOCountryCode: countryRedirectParams.ISOCode,
                ISOCountryName: countryRedirectParams.CountryName,
                RedirectUrl: countryRedirectParams.RedirectUrl,
            }
            await openCountrySelector(countryCode, country, GeolocationVersion, siteUrl)
        }
    }
}

export const callGeolocationApi = async (
    GeolocationVersion: number,
    siteUrl: string,
    countryCode: string,
    geolocationUrl: string,
) => {
    const geolocationData = await getGeolocation(geolocationUrl, GetDevOverrideIpAddress())

    if (!geolocationData || !geolocationData.ISOCountryCode || !geolocationData.ISOCountryName) {
        await fetchRetry((attempt: number) =>
            SessionUpdate(false, false, geolocationData, GeolocationVersion, siteUrl, attempt),
        )
        return
    }
    await openCountrySelector(countryCode, geolocationData, GeolocationVersion, siteUrl)
}

export default PerformCountryRedirectCheck
