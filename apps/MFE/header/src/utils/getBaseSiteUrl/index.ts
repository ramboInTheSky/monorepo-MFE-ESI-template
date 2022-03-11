export const getBaseSiteUrl = (siteUrl: string, territory: string, language: string): string => {
    let newSiteUrl = siteUrl.toLowerCase()

    newSiteUrl = newSiteUrl.replace(`/${territory.toLowerCase()}/`, "/")
    const CONV = "conv"
    if (newSiteUrl.includes(`${language}${CONV}`)) {
        const words = newSiteUrl.split(CONV)
        words[1].replace(`/${language.toLowerCase()}`, "")
        return `${words[0]}${CONV}${words[1].replace(`/${language.toLowerCase()}`, "")}`
    }
    newSiteUrl = newSiteUrl.replace(`/${language.toLowerCase()}`, "")

    return newSiteUrl
}
