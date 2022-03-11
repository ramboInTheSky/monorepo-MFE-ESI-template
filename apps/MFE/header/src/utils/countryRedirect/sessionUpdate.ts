import {GeolocationModel} from "../../models/geolocation"
import {updateSession} from "../../api/countryRedirect"

export const SessionUpdate = async (
    popupDisplayed: boolean,
    showPopup: boolean,
    countryData: GeolocationModel | null,
    GeolocationVersion: number,
    siteUrl: string,
    attempt: number,
) => {
    if (!countryData || (!countryData.ISOCountryCode && !countryData.ISOCountryName && !countryData.RedirectUrl)) {
        return
    }

    const postData = {
        Version: GeolocationVersion,
        PopupDisplayed: popupDisplayed,
        ShowPopup: showPopup,
        ISOCode: countryData.ISOCountryCode ?? null,
        CountryName: countryData.ISOCountryName ?? null,
        RedirectUrl: countryData.RedirectUrl ?? null,
        Attempt: attempt,
    }

    await updateSession(siteUrl, postData)
}
