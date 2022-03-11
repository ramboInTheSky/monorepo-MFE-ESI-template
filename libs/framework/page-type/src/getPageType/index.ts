import {PAGE_TYPES} from "../constants"
import {getMvcPageType} from "../utils/getMvcPageType"

export const getPageType = (siteUrl) => {
    const url = window.location.href
    const urlToTest = url.replace(siteUrl, "")

    const existingPageType = PAGE_TYPES[urlToTest]
    if (existingPageType) {
        return existingPageType
    }
    switch (true) {
        case url === siteUrl:
            return "homePage"
        case urlToTest.includes("/sale/search") || urlToTest.includes("/clearance/search"):
            return "sale"
        case urlToTest.includes("/secure/checkout/delivery/home") || urlToTest.includes("/secure/checkout/delivery/choosehomeaddress"):
            return "checkoutHomeDelivery"
        case urlToTest.includes("/secure/checkout/delivery/store") || urlToTest.includes("/storesearch"):
            return "checkoutStoreCollection"
        case urlToTest.includes("/secure/checkout/delivery/dpdhome"):
            return "checkoutDpdHome"
        default: {
            const foundMatch = Object.entries(PAGE_TYPES).find(
                ([match]) => match !== "/" && urlToTest.includes(match),
            )
            if (foundMatch) {
                return foundMatch[1]
            }
        }
    }
    
    return getMvcPageType()
}

export default getPageType
