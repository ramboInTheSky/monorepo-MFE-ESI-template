import {MAX_LIMIT_FAVOURITES_FALLBACK} from "../../config/constants"

export const getListId = (): string => window?.NextFavourites?.Data?.ShoppingLists[0]?.ListId || 0
export const getShoppingLists = (): [] => window?.NextFavourites?.Data?.ShoppingLists || []
export const getMaximumLimit = (): number => window?.NextFavourites?.Data?.MaximumLimit || MAX_LIMIT_FAVOURITES_FALLBACK
export const getHardLogoutPromptDisplayed = (): boolean => window?.NextFavourites?.Data?.HardLogoutPromptDisplayed
export const getIdentifiedUser = (): boolean => window?.NextFavourites?.Data?.IdentifiedUser
export const getSoftLoginFirstname = (): string => window?.NextFavourites?.Data?.SoftLoginFirstname || ""
export const getFavouriteLoginPromptDisplayed = (): boolean =>
    window?.NextFavourites?.Data?.FavouriteLoginPromptDisplayed
