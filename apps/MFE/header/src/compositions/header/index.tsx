import React, {useEffect, useState} from "react"
import {useShoppingBagGetCallbackObservable} from "@monorepo/eventservice"
import connect from "./connect"
import PublishCountrySelectorClosed from "../../events/countrySelectorClosed"
import {
    SubscribeToFavouritesGet,
    SubscribeToFavouritesAdd,
    SubscribeToFavouritesRemove,
    LoadFavouritesApiData,
    SubscribeToShoppingBagGet,
    LoadShoppingBagApiData,
    SubscribeToShoppingBagAdd,
    SubscribeToShoppingBagAddCist,
    SubscribeToShoppingBagAddEVoucher,
    SubscribeToShoppingBagAddLinkedItem,
    SubscribeToShoppingBagAddMultiple,
    SubscribeToShoppingBagAddWarranty,
    SubscribeToShoppingBagRemove,
    SubscribeToShoppingBagUpdateSize,
    SubscribeToShoppingBagUpdateQuantity,
} from "../../events"
import {PerformCountryRedirectCheck} from "../../utils/countryRedirect"
import useBloomreachCookieCheck from "../../hooks/useBloomreachCookieCheck"
import {
    usePushSiteDetails,
    usePushBloomreachDetails,
    usePushMonetateDetails,
    usePushUCMDetails,
} from "../../hooks/useTrackingEvents"

export interface HeaderProps {
    headerComponent: any
    textAlignment: string
    siteUrl: string
    cookieDomain: string
    geolocationUrl: string
    geolocationVersion: number
    territory: string
    useDevEsi: boolean
    bloomReachCachingCookieList: string
    bloomReachCachingEnabled: boolean
    itemCount: number
    requestedCountryChange: boolean
    requestCountryChange: () => void
    enableCookieConsent: boolean
    enableFavourites: boolean
    showSaleWarningBag: boolean
}

export const Header = ({
    headerComponent,
    textAlignment,
    siteUrl,
    cookieDomain,
    geolocationUrl,
    geolocationVersion,
    territory,
    useDevEsi,
    bloomReachCachingCookieList,
    bloomReachCachingEnabled,
    itemCount,
    requestedCountryChange,
    requestCountryChange,
    enableCookieConsent,
    enableFavourites,
    showSaleWarningBag,
}: HeaderProps) => {
    const [showModal, setShowModal] = useState(false)
    useEffect(() => {
        if (itemCount > 0 && requestedCountryChange) {
            PublishCountrySelectorClosed()
            setShowModal(true)
        }
    }, [itemCount, requestedCountryChange])

    const closeModalHandler = () => {
        requestCountryChange()
        setShowModal(false)
    }

    useEffect(() => {
        SubscribeToFavouritesGet(siteUrl)
        SubscribeToFavouritesAdd(siteUrl)
        SubscribeToFavouritesRemove(siteUrl)
        SubscribeToShoppingBagGet(siteUrl)
        SubscribeToShoppingBagAdd(siteUrl)
        SubscribeToShoppingBagAddCist(siteUrl)
        SubscribeToShoppingBagAddEVoucher(siteUrl)
        SubscribeToShoppingBagAddLinkedItem(siteUrl)
        SubscribeToShoppingBagAddMultiple(siteUrl)
        SubscribeToShoppingBagAddWarranty(siteUrl)
        SubscribeToShoppingBagRemove(siteUrl)
        SubscribeToShoppingBagUpdateSize(siteUrl)
        SubscribeToShoppingBagUpdateQuantity(siteUrl)
        LoadShoppingBagApiData(siteUrl, false)

        if (enableFavourites) LoadFavouritesApiData(siteUrl)
    }, [enableFavourites, siteUrl])

    useBloomreachCookieCheck({cookieDomain, bloomReachCachingCookieList, bloomReachCachingEnabled})
    usePushSiteDetails()
    usePushBloomreachDetails()
    usePushMonetateDetails()
    usePushUCMDetails()

    useShoppingBagGetCallbackObservable(data => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        PerformCountryRedirectCheck(data.data?.CountryRedirect, territory, geolocationVersion, siteUrl, geolocationUrl)
    })
    const HeaderComponent = headerComponent
    return (
        <HeaderComponent
            textAlignment={textAlignment}
            useDevEsi={useDevEsi}
            showModal={showModal}
            closeModalHandler={closeModalHandler}
            enableCookieConsent={enableCookieConsent}
            showSaleWarningBag={showSaleWarningBag}
        />
    )
}

export default connect(Header)
