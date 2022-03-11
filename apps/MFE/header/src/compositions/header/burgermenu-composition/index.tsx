import React from "react"
import {env} from "process"
import MeganavESI from "../../../components/MeganavESI"
import CookieConsent from "../../../components/CookieConsent"
import CountryChangeConfirmPopup from "../../../components/CountryChangeConfirmPopup"
import Brand from "../../../components/Brand"
import Search from "../../../components/Search"
import MyAccount from "../../../components/MyAccount"
import {InnerContainer, Header, Links, VerticalDivider} from './components'
import UpperHeaderWrapper from "../../../components/UpperHeader"
import QuickLinksContainer from "../../../components/QuickLinksContainer"
import Favourites from "../../../components/Favourites"
import ShoppingBag from "../../../components/ShoppingBag"
import CountryLangSelector from "../../../components/CountryLangSelector"
import TestTools from "../../../components/TestTools"
import TimeMachineDate from "../../../components/TimeMachineDate"
import SaleBagWarningModal from "../../../components/SaleBagWarningModal"

export interface BurgerMenuHeaderProps {
    textAlignment: string
    showModal: boolean
    closeModalHandler: () => void
    useDevEsi: boolean
    enableCookieConsent: boolean
    showSaleWarningBag: boolean
}

export const BurgerMenuHeader = ({
    textAlignment,
    showModal,
    closeModalHandler,
    useDevEsi,
    enableCookieConsent,
    showSaleWarningBag,
}: BurgerMenuHeaderProps) => {
    const {DEVELOPMENT} = env
    return (
        <Header dir={textAlignment}>
            <UpperHeaderWrapper>
                <InnerContainer>
                    <Brand />
                    <Search />
                    <Links>
                        <MyAccount hideText />
                        <QuickLinksContainer hiddenProps={{smDown: true}} />
                        <Favourites hiddenProps={{smDown: true}} />
                        <ShoppingBag />
                        <VerticalDivider data-testid="nav-divider" />
                        <CountryLangSelector hiddenProps={{smDown: true}} openingFromBottom />
                    </Links>
                    {DEVELOPMENT && <TestTools />}
                    <TimeMachineDate />
                    {showSaleWarningBag && <SaleBagWarningModal />}
                </InnerContainer>
            </UpperHeaderWrapper>
            <MeganavESI useDevEsi={useDevEsi} />
            {showModal && <CountryChangeConfirmPopup showModal={showModal} closeModal={closeModalHandler} />}
            {enableCookieConsent && <CookieConsent />}
        </Header>
    )
}

export default BurgerMenuHeader