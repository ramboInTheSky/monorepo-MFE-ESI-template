import {getCategorySearchUrlSegment} from "../../../utils/seo/getCategorySearchUrlSegment"
import alphabeticaliseCategoryFilters from "../../../utils/seo/alphabeticaliseCategoryFilters"
import {urlSanitiser} from "../../../utils/httpUrlTrimmer"
import {RedirectResponse} from "../../../models/searchApi"
import {SearchApiRequestTypes, SEARCH_CATEGORY_SEGMENT} from "../../../config/constants"
import ClientRedirect from "../render/clientRedirect"
import env from "../../../config/env"

const seoRedirectMiddlware = () => (req, _res: any, nextOp) => {
    const sanitisedPath = urlSanitiser(req.originalUrl)
    const type =
        sanitisedPath.substr(1, 4).toLowerCase() === SEARCH_CATEGORY_SEGMENT
            ? SearchApiRequestTypes.Category
            : SearchApiRequestTypes.Keyword
    if (type !== SearchApiRequestTypes.Category) {
        nextOp()
        return
    }
    // turn getCategorySearchUrlSegment into an object to get all the peices of the URL out to allow construction of new url
    const urlFragments = getCategorySearchUrlSegment(`${req.originalUrl}`, type)
    if (urlFragments.filter === "") {
        nextOp()
        return
    }
    const orderedFitlers = alphabeticaliseCategoryFilters(urlFragments.filter)
    const isortAddition = orderedFitlers.isort !== "" ? `-${orderedFitlers.isort}` : ""
    const priceAddition = orderedFitlers.price !== "" ? `-${orderedFitlers.price}` : ""
    const compiledFilters = orderedFitlers.sortedFilters + priceAddition + isortAddition
    if (compiledFilters === urlFragments.filter || orderedFitlers.sortedFilters === "") {
        nextOp()
        return
    }
    const redirectToAlphabetical: RedirectResponse = {
        statusCode: 301,
        url: `${env.REACT_APP_SERVE_PATH_PREFIX}/${SEARCH_CATEGORY_SEGMENT}/${urlFragments.category}/${compiledFilters}`,
    }
    ClientRedirect(_res, req.siteUrl.url, redirectToAlphabetical)
}

export default seoRedirectMiddlware()
