import {GetBag, GetBagCallback} from "@monorepo/eventservice"
import {ShoppingBagApiGet} from "../../api/shoppingbag"
import {setBackDataInSession} from "../../utils/gtmSdkShoppingBagCallback"

const getBagESB = new GetBag()
const getBagCallbackESB = new GetBagCallback()

export const SubscribeToShoppingBagGet = (siteUrl: string) => {
    getBagESB.subscribe(data => {
        LoadShoppingBagApiData(siteUrl, data.guestAccountConverted)
    })
}

export const LoadShoppingBagApiData = (url: string, guestAccountConverted: boolean) => {
    const href = window.location.href.toLowerCase()
    const skipRebuild = shouldSkipRebuild(href, guestAccountConverted)

    const ap = href.includes("/login")
    ShoppingBagApiGet({skipRebuild, ap}, `${url}/bag/get`, getBagCallbackESB, setBackDataInSession)
}

const skipRebuildUrls = ["delivery", "checkout", "myaccount/addresses", "redirect_navigate", "navigate"]

export const shouldSkipRebuild = (href: string, guestAccountConverted: boolean) => {
    return (
        guestAccountConverted === false &&
        skipRebuildUrls.some(matchHref => href.includes(matchHref)) &&
        !href.includes("secure/checkout/complete")
    )
}
