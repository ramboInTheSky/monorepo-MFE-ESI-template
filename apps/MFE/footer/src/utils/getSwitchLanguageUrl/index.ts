import logger from "@monorepo/core-logger"

const getSwitchLanguageUrl = (siteUrl: string, altLanguageUrl: string): string => {
    // eslint-disable-next-line @typescript-eslint/prefer-includes
    if (!siteUrl || siteUrl.indexOf("http") === -1) {
        logger.error("Language Selector Quick link: No site Url site or not valid siteurl")
        return altLanguageUrl
    }

    const spliturl = siteUrl.split("/").filter(el => {
        return el !== ""
    })

    const httpPath = `${spliturl[0]}`
    const originPath = `${spliturl[1]}`

    const baseUrl = `${httpPath}//${originPath}`
    switch (spliturl.length) {
        case 3:
            // {url}/{alternative language}
            return `${baseUrl}${altLanguageUrl}`
        case 4:
            // eslint-disable-next-line no-case-declarations
            const countryPath = `${spliturl[2]}`
            // {url}/{country}/{alternative language}
            return `${baseUrl}/${countryPath}${altLanguageUrl}`
        default:
            return siteUrl
    }
}

export default getSwitchLanguageUrl
