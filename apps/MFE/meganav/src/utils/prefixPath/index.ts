const configureSiteUrl = (siteUrl: string) => {
    const splitSiteUrl = siteUrl.split("/")
    const newSiteUrl = `${splitSiteUrl[0]}//${splitSiteUrl[2]}`

    return newSiteUrl
}

export const prefixImagePath = (siteUrl: string) => url => {
    if (!url) return ""
    if (url.indexOf("http") === 0 || url.indexOf("//") === 0) return url

    const newSiteUrl = configureSiteUrl(siteUrl)

    return `${newSiteUrl}${url}`
}
