import {RedirectResponse} from "../../../models/searchApi"

const absoluteUrlTest = new RegExp("^(?:[a-z]+:)?//", "i")

const ClientRedirect = (res: any, siteUrl: string, redirectResponse: RedirectResponse) => {
    let redirectUrl = redirectResponse.url
    if (redirectUrl.startsWith("/")) {
        redirectUrl = redirectUrl.substr(1)
    }

    const protocol = siteUrl.substring(0, siteUrl.indexOf(":") + 3)
    redirectUrl = redirectResponse.url.startsWith("www.") ? `${protocol}${redirectResponse.url}` : redirectUrl

    if (!absoluteUrlTest.test(redirectUrl)) {
        redirectUrl = `${siteUrl}/${redirectUrl}`
    }
    res.redirect(redirectResponse.statusCode, redirectUrl.toLowerCase())
}

export default ClientRedirect
