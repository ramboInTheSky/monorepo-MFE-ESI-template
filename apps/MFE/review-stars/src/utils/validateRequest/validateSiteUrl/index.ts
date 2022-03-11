import BFFLogger from "../../../server/core/BFFLogger"

const isSiteUrlValid = (siteUrl: any) => {
    if (!siteUrl || !siteUrl.url) {
        BFFLogger.error("Site Url not provided on request")
        return false
    }

    return true
}
export default isSiteUrlValid
