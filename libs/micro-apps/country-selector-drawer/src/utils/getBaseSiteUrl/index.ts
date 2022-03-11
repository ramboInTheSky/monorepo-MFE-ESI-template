export const getBaseSiteUrl = (siteUrl: string, territory: string, language: string): string => {
    let newSiteUrl = siteUrl.toLowerCase()
    newSiteUrl = newSiteUrl.replace(`/${territory.toLowerCase()}/`, "/")
    newSiteUrl = newSiteUrl.replace(`/${language.toLowerCase()}`, "")
    return newSiteUrl
}
