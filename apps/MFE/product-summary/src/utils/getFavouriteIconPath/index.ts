import env from "../../config/env"
import {FavouriteState} from "../../models/Favourites"

const formatCdnPath = (icon: string): string => `${env.REACT_APP_BLOB_STORAGE_PATH.replace(/\/$/, "")}${icon}`

export const getFavouriteIconPath = (state: FavouriteState): string => {
    return formatCdnPath(`/icons/shared/favourites-${state}.svg`)
}
