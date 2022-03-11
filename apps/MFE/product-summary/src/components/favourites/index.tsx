import React, {useEffect, useRef, useState} from "react"
import {FavouriteState} from "../../models/Favourites"
import {FavouritesContainer, FavouritesIcon, FavouritesButton} from "./components"
import connect from "./connect"
import {useProductFavourites} from "../../hooks/useProductFavourites"
import {
    getFavouriteIconPath,
    shoppingListItemsToFavouritedColourways,
    setFavoritesCallback,
    getNextFavouritesData,
} from "../../utils/favourites"
import {FavErrorToolTipType} from "../../models/ProductSummary"
import FavouritesErrorToolTip from "../favouritesErrorToolTip"
import FavouritesToolTip from "../favouritesToolTip"
import {getFavourtiesSubscriptionCallBack} from "../../events"
import {TextModel} from "../../models/Text"


interface ProductFavouritesProps {
    addToFavourites: () => void
    removeFromFavourites: () => void
    baseUrl: string
    isFav: boolean
    itemNumber: string
    showFavErrorToolTip: FavErrorToolTipType | null
    isLoadingFav: boolean
    text: TextModel
    setFavouritedColourways: (favoritedColourways: string[]) => void
    animateFavouriteIcon: boolean
    selectedColourwayTitle: string
}

export const ProductFavourites = ({
    isFav,
    addToFavourites,
    removeFromFavourites,
    baseUrl,
    setFavouritedColourways,
    isLoadingFav,
    text,
    animateFavouriteIcon,
    selectedColourwayTitle
}: ProductFavouritesProps) => {
    const [favClicked, setFavClicked] = useState(false)

    const {toggleProductFavourites, favState} = useProductFavourites({
        isFav,
        addToFavourites,
        removeFromFavourites,
        isLoadingFav,
        setFavClicked
    })

    useEffect(() => {
        const favouritesData = getNextFavouritesData()
        if (favouritesData) {
            setFavouritedColourways(shoppingListItemsToFavouritedColourways(favouritesData?.ShoppingListItems))
        } else {
            getFavourtiesSubscriptionCallBack(setFavoritesCallback, setFavouritedColourways)
        }
    }, [])

    const favoritesIconRef = useRef(null)

    const getTranslatedFavState = (favouriteState: FavouriteState) => {
        const {inactive, loading, active} = text.favouriteStates
        switch (favouriteState) {
            case FavouriteState.Active:
                return active
            case FavouriteState.Inactive:
                return inactive
            case FavouriteState.Loading:
                return loading
            default:
                return ""
        }
    }

    const formatButtonTitleAndLabel = `${text.product.favourites} ${selectedColourwayTitle} ${getTranslatedFavState(favState)}`

    return (
        <FavouritesContainer
            className="product-summary-favourites-container"
            data-testid="product-summary-favourites-button-container"
        >
            <FavouritesButton
                onClick={toggleProductFavourites}
                data-testid="product-summary-favourites-button"
                aria-label={formatButtonTitleAndLabel}
                title={formatButtonTitleAndLabel}
            >
                <FavouritesIcon
                    id="product-summary-favourites-icon"
                    data-testid={`product-${favState}-favourite-icon`}
                    favState={favState}
                    ref={favoritesIconRef}
                    shouldAnimate={animateFavouriteIcon}
                >
                    <title>{formatButtonTitleAndLabel}</title>
                    <use
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        xlinkHref={getFavouriteIconPath(favState)}
                        viewBox="0 0 26 24"
                    />
                </FavouritesIcon>
            </FavouritesButton>            
            <FavouritesToolTip
                isProductFavourited={isFav && favClicked}
                favState={favState}
                baseUrl={baseUrl}
                referenceElement={favoritesIconRef.current}
                text={text}
                setFavClicked={setFavClicked}
            />
            <FavouritesErrorToolTip referenceElement={favoritesIconRef.current} />
        </FavouritesContainer>
    )
}

export default connect(ProductFavourites)
