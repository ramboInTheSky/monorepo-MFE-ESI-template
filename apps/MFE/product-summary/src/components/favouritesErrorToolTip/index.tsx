import {ClickAwayListener} from "@mui/base"
import {CTA} from "@monorepo/cta"
import {useModalsCloseObservable} from "@monorepo/eventservice"
import React, {useEffect, useState} from "react"
import ToolTip from "@monorepo/tooltipv2"
import env from "../../config/env"
import {FavErrorToolTipType} from "../../models/ProductSummary"
import {getFavouritesPage} from "../../urls"
import {getMaximumLimit} from "../../utils/getWindowNextFavourites"
import {
    CloseButton,
    CloseImage,
    Container,
    Content,
    ErrorContainer,
    Header,
    ManageFavouritesButton,
    ShoppingLink,
    ShoppingLinkWrapper,
    Title,
} from "./components"
import connect from "./connect"
import {TextModel} from "../../models/Text"

export interface FavouritesErrorToolTipProps {
    showFavErrorToolTip: FavErrorToolTipType | null
    setShowFavErrorToolTip: (show: FavErrorToolTipType | null) => void
    baseUrl: string
    referenceElement: HTMLElement | null
    text: TextModel
}

export const FavouritesErrorToolTip = ({
    showFavErrorToolTip,
    setShowFavErrorToolTip,
    baseUrl,
    referenceElement,
    text,
}: FavouritesErrorToolTipProps) => {
    const [toolTipVisible, setToolTipVisible] = useState(false)

    useEffect(() => {
        setToolTipVisible(showFavErrorToolTip !== null)
    }, [showFavErrorToolTip])

    const handleClose = () => {
        setToolTipVisible(false)
        setShowFavErrorToolTip(null)
    }

    useModalsCloseObservable(handleClose)

    if (!toolTipVisible) return null
    return (
        <ToolTip timeout={10000} handleClose={handleClose} referenceElement={referenceElement}>
            <ClickAwayListener onClickAway={handleClose}>
                <>
                    {showFavErrorToolTip === FavErrorToolTipType.MaxLimit && (
                        <MaxLimitComponent handleClose={handleClose} baseUrl={baseUrl} siteText={text} />
                    )}
                    {showFavErrorToolTip !== FavErrorToolTipType.MaxLimit && (
                        <PleaseTryAgainComponent siteText={text} />
                    )}
                </>
            </ClickAwayListener>
        </ToolTip>
    )
}

const MaxLimitComponent = ({handleClose, baseUrl, siteText}) => (
    <Container>
        <Header>
            <Title>{siteText.labels.maxLimitReached}</Title>
            <CloseButton onClick={handleClose} data-testid="product-summary-favourite-error-tooltip-close">
                <CloseImage
                    src={`${env.REACT_APP_BLOB_STORAGE_PATH}/icons/shared/close.svg`}
                    alt={siteText.labels.continueShopping}
                />
            </CloseButton>
        </Header>
        <Content data-testid="product-summary-favourite-max-error-tooltip">
            {siteText.labels.maxLimitReachedItems} {getMaximumLimit()} {siteText.labels.maxLimitReachedReview}
            <ManageFavouritesButton>
                <CTA
                    enable
                    text={siteText.buttons.manageFavourites}
                    themeType="Secondary"
                    url={getFavouritesPage(baseUrl)}
                />
            </ManageFavouritesButton>
            <ShoppingLinkWrapper>
                <ShoppingLink onClick={handleClose}>{siteText.labels.continueShopping}</ShoppingLink>
            </ShoppingLinkWrapper>
        </Content>
    </Container>
)

const PleaseTryAgainComponent = ({siteText}) => (
    <ErrorContainer>
        <Content data-testid="product-summary-favourite-error-tooltip">{siteText.labels.pleaseTryAgain}</Content>
    </ErrorContainer>
)

export default connect(FavouritesErrorToolTip)
