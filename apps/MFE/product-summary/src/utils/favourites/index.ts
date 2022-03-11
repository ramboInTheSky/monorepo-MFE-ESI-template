import {FavouritesGeneralCallbackContractModel} from "@monorepo/eventservice"
import env from "../../config/env"
import {FavouriteState} from "../../models/Favourites"

const formatCdnPath = (icon: string): string => `${env.REACT_APP_BLOB_STORAGE_PATH.replace(/\/$/, "")}${icon}`

export const getFavouriteIconPath = (state: FavouriteState): string => {
    return formatCdnPath(`/icons/shared/favourites.svg#${state}`)
}

export const isFavouriteProduct = (data: any, productId: string): boolean => {
    const getFavouriteIds: string[] = data?.map(item => item?.ItemNumber?.replace(/-/g, "")) || []

    return getFavouriteIds?.includes(productId) || false
}

export const setFavoritesCallback = (
    favouritesCallBackData: FavouritesGeneralCallbackContractModel,
    setFavouritedColourways: Function,
) => {
    if (favouritesCallBackData.success) {
        if (favouritesCallBackData.data?.ShoppingListItems)
            setFavouritedColourways(
                shoppingListItemsToFavouritedColourways(favouritesCallBackData.data?.ShoppingListItems),
            )
    }
}

export const getNextFavouritesData = () => {
    return window.NextFavourites?.Data
}

export const shoppingListItemsToFavouritedColourways = (shoppingListItems: any[]) =>
    shoppingListItems.map(shoppingListItem => shoppingListItem?.ItemNumber.replace(/-/g, ""))
