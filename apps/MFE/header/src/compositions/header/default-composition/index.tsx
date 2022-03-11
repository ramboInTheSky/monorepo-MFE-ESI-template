import React from "react"
import {useMediaQuery} from "@mui/material"
import MeganavESI from "../../../components/MeganavESI"
import CookieConsent from "../../../components/CookieConsent"
import CountryChangeConfirmPopup from "../../../components/CountryChangeConfirmPopup"
import {InnerContainer} from "./components"
import Brand from "../../../components/Brand"
import Search from "../../../components/Search"
import MyAccount from "../../../components/MyAccount"
import QuickLinksContainer from "../../../components/QuickLinksContainer"
import Favourites from "../../../components/Favourites"
import ShoppingBag from "../../../components/ShoppingBag"
import Checkout from "../../../components/Checkout"
import {
    HEADER_NAV_BAR_QUICK_LINKS,
    HEADER_NAV_BAR_SHOPPING_BAG_CHECKOUT,
    COUNTRY_SELECTOR_DRAWER_BREAKPOINT,
} from "../../../config/constants"
import CountryLangSelector from "../../../components/CountryLangSelector"
import TestTools from "../../../components/TestTools"
import TimeMachineDate from "../../../components/TimeMachineDate"
import UpperHeaderWrapper from "../../../components/UpperHeader"
import env from "../../../config/env"
import SaleBagWarningModal from "../../../components/SaleBagWarningModal"

export interface DefaultHeaderProps {
    textAlignment: string
    showModal: boolean
    closeModalHandler: () => void
    useDevEsi: boolean
    enableCookieConsent: boolean
    showSaleWarningBag: boolean
}

export const DefaultHeader = ({
    textAlignment,
    showModal,
    closeModalHandler,
    useDevEsi,
    enableCookieConsent,
    showSaleWarningBag,
}: DefaultHeaderProps) => {
    const {DEVELOPMENT} = env
    const openingFromBottom = !useMediaQuery(`(min-width:${COUNTRY_SELECTOR_DRAWER_BREAKPOINT})`)
    return (
        <header dir={textAlignment}>
            <UpperHeaderWrapper>
                <InnerContainer>
                    <Brand />
                    <Search />
                    <MyAccount />
                    <QuickLinksContainer hiddenProps={{mdDown: true}} />
                    <Favourites />
                    <ShoppingBag />
                    <Checkout dataGaV1={HEADER_NAV_BAR_QUICK_LINKS} dataGaV2={HEADER_NAV_BAR_SHOPPING_BAG_CHECKOUT} />
                    <CountryLangSelector openingFromBottom={openingFromBottom} />
                    {DEVELOPMENT && <TestTools />}
                    <TimeMachineDate />
                    {showSaleWarningBag && <SaleBagWarningModal />}
                </InnerContainer>
            </UpperHeaderWrapper>
            <MeganavESI useDevEsi={useDevEsi} />
            {showModal && <CountryChangeConfirmPopup showModal={showModal} closeModal={closeModalHandler} />}
            {enableCookieConsent && <CookieConsent />}
        </header>
    )
}
export default DefaultHeader
