import isSiteUrlValid from "./validateSiteUrl"
import areFeatureSettingsValid from "./validateSettings"

const isRequestValid = (request: any, response: any): boolean => {
    let validRequest = true
    if (!isSiteUrlValid(request.siteUrl)) validRequest = false
    if (!areFeatureSettingsValid(response.locals.configuration)) validRequest = false

    return validRequest
}
export default isRequestValid
