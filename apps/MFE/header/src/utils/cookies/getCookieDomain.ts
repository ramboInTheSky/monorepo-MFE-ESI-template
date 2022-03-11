import URI from "urijs"
import {LOCALHOST} from "../../config/constants"


export const getCookieDomain = (siteUrl: string) => {
    // Workaround until URI.js supports the Estonian level domains
    if (siteUrl.includes("next.com.ee")) {
        return ".next.com.ee"
    }
    const uri = new URI(siteUrl)
    if (siteUrl && !siteUrl.includes(LOCALHOST) && uri) {
        return  `.${uri.domain()}`
    }
    return ""
}
