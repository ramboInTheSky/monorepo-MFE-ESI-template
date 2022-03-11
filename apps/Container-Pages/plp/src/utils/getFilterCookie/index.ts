import {Store} from "redux"
import {FilterCookie} from "../../models/cookie"
import State from "../../models/State"
import {FILTER_SETTINGS_COOKIE, SearchApiRequestTypes} from "../../config/constants"
import {getCategorySegmentFromUrl} from "../getCategoryFromUrl"

const getFilterCookie = (request: any, _response: any, {getState}: Store): FilterCookie | undefined => {
    const {
        request: {url, searchTerm, type, siteUrl},
    } = getState() as State
    let cookie: FilterCookie | undefined
    if (request.cookies[FILTER_SETTINGS_COOKIE]) {
        cookie = JSON.parse(request.cookies[FILTER_SETTINGS_COOKIE]) as FilterCookie
    }

    if (!cookie) {
        return undefined
    }

    const category = getCategorySegmentFromUrl(url, siteUrl, type)

    if (
        (type === SearchApiRequestTypes.Keyword && searchTerm!.toLowerCase() !== cookie.page) ||
        (type === SearchApiRequestTypes.Category && category?.toLowerCase() !== cookie.page)
    ) {
        return undefined
    }

    return cookie
}

export default getFilterCookie
