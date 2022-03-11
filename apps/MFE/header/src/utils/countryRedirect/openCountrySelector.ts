import TrackGAEventWrapper from "../GA"
import PublishCountrySelectorOpen from "../../events/countrySelectorOpen"
import {SubscribeCountrySelectorClosed} from "../../events/countrySelectorClosed"
import {SubscribeCountrySelectorRedirect} from "../../events/countrySelectorRedirect"
import {fetchRetry} from "./utils"
import {SessionUpdate} from "./sessionUpdate"
import {GeolocationModel} from "../../models/geolocation"

export const openCountrySelector = async (
    countryCode: string,
    country: GeolocationModel,
    GeolocationVersion: number,
    siteUrl: string,
) => {
    // compare countryCode and country.ISOCountryCode
    /* 1. If in correct country, modal not required */
    /* 2. If in incorrect country, show modal with specific message */
    if (countryCode === "" || country.ISOCountryCode === "") return

    if (countryCode === country.ISOCountryCode) {
        await fetchRetry((attempt: number) =>
            SessionUpdate(false, false, country, GeolocationVersion, siteUrl, attempt),
        )
        return
    }

    PublishCountrySelectorOpen({isoCountryCode: country.ISOCountryCode!})

    await fetchRetry(async (attempt: number) => {
        await SessionUpdate(true, true, country, GeolocationVersion, siteUrl, attempt)
        TrackGAEventWrapper("CountryRedirect", "Popup Displayed", country.ISOCountryName!, 0)
    })

    const closedSubscription = SubscribeCountrySelectorClosed(() => {
        if (closedSubscription) closedSubscription.subscription.unsubscribe()

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        fetchRetry(async (attempt: number) => {
            await SessionUpdate(true, false, country, GeolocationVersion, siteUrl, attempt)
            TrackGAEventWrapper("CountryRedirect", "Closed Popup", country.ISOCountryName!, 0)
        })
    })

    const redirectSubscription = SubscribeCountrySelectorRedirect(() => {
        if (redirectSubscription) redirectSubscription.subscription.unsubscribe()
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        fetchRetry(async (attempt: number) => {
            await SessionUpdate(true, true, country, GeolocationVersion, siteUrl, attempt)
            TrackGAEventWrapper("CountryRedirect", "Redirected to Specific Country", country.ISOCountryName!, 0)
        })
    })
}
