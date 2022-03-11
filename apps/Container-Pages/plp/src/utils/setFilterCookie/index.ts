import Cookies from "js-cookie"
import {FilterCookie, FilterCategorySettings} from "../../models/cookie"
import {FILTER_SETTINGS_COOKIE, SearchApiRequestTypes} from "../../config/constants"
import {getCategorySegmentFromUrl} from "../getCategoryFromUrl"

const setFilterCookie = (
    searchTerm: string | null,
    type: SearchApiRequestTypes,
    url: string,
    siteUrl: string,
    name: string,
    isOpen: boolean,
    isViewMoreOpen: boolean,
) => {
    let filterCookie = Cookies.getJSON(FILTER_SETTINGS_COOKIE) as FilterCookie
    const category = getCategorySegmentFromUrl(url, siteUrl, type)
    const cookieKey = type === SearchApiRequestTypes.Category ? category : searchTerm

    if (!filterCookie || filterCookie.page !== cookieKey) {
        const filterCategorySettings: FilterCategorySettings = {}
        filterCategorySettings[name] = {
            isOpen,
            viewMoreOpened: isViewMoreOpen,
        }
        filterCookie = {
            page: cookieKey!,
            filterCategorySettings,
        }
    } else {
        const filterCategorySettings = filterCookie.filterCategorySettings[name] ?? {}
        filterCategorySettings.isOpen = isOpen
        filterCategorySettings.viewMoreOpened = isViewMoreOpen

        filterCookie.filterCategorySettings[name] = filterCategorySettings
    }

    const inTwelveHours = new Date(new Date().getTime() + 60 * 60 * 1000 * 12)

    const uri = new URL(url)
    Cookies.set(FILTER_SETTINGS_COOKIE, JSON.stringify(filterCookie), {
        path: "/",
        domain: uri.hostname,
        expires: inTwelveHours,
    })
}

export default setFilterCookie
