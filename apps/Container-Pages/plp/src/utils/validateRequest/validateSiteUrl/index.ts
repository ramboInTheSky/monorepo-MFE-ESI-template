import logger from "@monorepo/core-logger"

const isSiteUrlValid = (siteUrl: any) => {
    if (!siteUrl || !siteUrl.url) {
        logger.error("Site Url not provided on request")
        return false
    }

    return true
}
export default isSiteUrlValid
