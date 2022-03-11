import {GetFavourites, GetFavouritesCallback} from "@monorepo/eventservice"
import Cookies from "js-cookie"
import {FavouritesApiGet} from "../../api/favourites"
import {shouldUseSessionStorage, setCacheVersion} from "../../utils/favourites"
import {RPID_COOKIE, MY_ACCOUNT_URL} from "../../config/constants"

const getFavouritesESB = new GetFavourites()
const getFavouritesCallbackESB = new GetFavouritesCallback()

export const SubscribeToFavouritesGet = (siteUrl: string) => {
    getFavouritesESB.subscribe(() => {
        LoadFavouritesApiData(siteUrl)
    })
}

export const LoadFavouritesApiData = (url: string) => {
    const queryString: string = buildQueryString()
    FavouritesApiGet(`${url}/favourite${queryString}`, getFavouritesCallbackESB)
}

const buildQueryString = () => {
    const href = window?.location.href.toLowerCase()
    const isAccountPage = href?.includes(MY_ACCOUNT_URL)
    const shouldCache = () => (isAccountPage ? setCacheVersion(true) : setCacheVersion())
    const cacheVersion = shouldUseSessionStorage() ? shouldCache() : ""
    const rpidCookie = Cookies.get(RPID_COOKIE)
    if (rpidCookie !== undefined) {
        const index = rpidCookie.indexOf("=")
        const rpid = rpidCookie.substring(index + 1)
        return `?id=${rpid}&_=${cacheVersion}`
    }
    return `?_=${cacheVersion}`
}
