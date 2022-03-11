import React, {useEffect, useState} from "react"
import {useModalsCloseObservable} from "@monorepo/eventservice"
import ToolTip from "@monorepo/tooltipv2"
import {Container, Title, CloseButton, CloseImage, Header, Content, Link, UserSection} from "./components"
import env from "../../config/env"
import {
    getHardLogoutPromptDisplayed,
    getIdentifiedUser,
    getFavouriteLoginPromptDisplayed,
    getSoftLoginFirstname,
} from "../../utils/getWindowNextFavourites"
import {FavouriteState} from "../../models/Favourites"
import {IS_BROWSER} from "../../utils/window"
import {getAccountPage, getRegisterPage} from "../../urls"
import {TextModel} from "../../models/Text"

export interface FavoritesToolTipProps {
    baseUrl: string
    isProductFavourited: boolean
    favState: FavouriteState
    referenceElement: HTMLElement | null
    text: TextModel
    setFavClicked: (value: boolean) => void
}

const FavoritesToolTip = ({
    baseUrl,
    isProductFavourited,
    favState,
    referenceElement,
    text,
    setFavClicked,
}: FavoritesToolTipProps) => {
    const [toolTipVisible, setToolTipVisible] = useState(false)

    const showAuthenticatedToolTip = IS_BROWSER() && !getHardLogoutPromptDisplayed() && getIdentifiedUser()
    const showAnonymousToolTip = IS_BROWSER() && !getFavouriteLoginPromptDisplayed() && !getSoftLoginFirstname()

    const getContent = () => {
        if (showAuthenticatedToolTip) {
            return (
                <Content data-testid="product-summary-favourite-authenticated-tooltip">
                    {text.labels.favouritesAddedInfo}
                    <br /> {getSoftLoginFirstname()}
                    {text.labels.apostrophe} <strong>{text.labels.favouritesList}</strong>
                    <UserSection>
                        {text.labels.not} {getSoftLoginFirstname()}
                        {text.labels.questionSymbol} <Link href={getAccountPage(baseUrl)}>{text.buttons.signOut}</Link>
                    </UserSection>
                </Content>
            )
        }

        if (showAnonymousToolTip) {
            return (
                <Content data-testid="product-summary-favourite-anonymous-tooltip">
                    <Link href={getAccountPage(baseUrl)}>{text.buttons.signIn}</Link> {text.labels.or}{" "}
                    <Link href={getRegisterPage(baseUrl)}>{text.buttons.register}</Link>{" "}
                    {text.labels.favouritesSavePermanently}
                </Content>
            )
        }
    }

    useEffect(() => {
        if (isProductFavourited && favState === FavouriteState.Active) {
            if (showAuthenticatedToolTip || showAnonymousToolTip) {
                setToolTipVisible(true)
            }
        }
    }, [isProductFavourited, favState, showAuthenticatedToolTip, showAnonymousToolTip])

    const handleClose = () => {
        setToolTipVisible(false)
        setFavClicked(false)
    }

    useModalsCloseObservable(handleClose)

    if (!toolTipVisible) return null
    return (
        <ToolTip handleClose={handleClose} referenceElement={referenceElement}>
            <Container>
                <Header>
                    <Title>{text.product.favourites}</Title>
                    <CloseButton onClick={handleClose} data-testid="product-summary-favourite-tooltip-close">
                        <CloseImage
                            src={`${env.REACT_APP_BLOB_STORAGE_PATH}/icons/shared/close.svg`}
                            alt={text.labels.continueShopping}
                        />
                    </CloseButton>
                </Header>
                {getContent()}
            </Container>
        </ToolTip>
    )
}

export default FavoritesToolTip
