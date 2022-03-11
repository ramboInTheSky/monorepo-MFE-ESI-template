import Cookies from "js-cookie"
import {BR_UID_DEFAULT_VALUE, SearchApiRequestTypes} from "../../config/constants"
import {ExternalSearchApiResponse, SearchApiRequest} from "../../models/searchApi"
import {BloomreachCookiesInitialVal} from "../../models/SearchState"
import {IS_BROWSER} from "../window"

const buildProductsRequestParams = (
    url: string,
    searchTerm: string | null,
    type: SearchApiRequestTypes,
    startPage = 1,
    endPage = 1,
    pageSize = 24,
    bloomreachCookiesInitialVal: BloomreachCookiesInitialVal,
    bloomreachPersonalizationEnabled: boolean,
    fields?: (keyof ExternalSearchApiResponse)[],
): SearchApiRequest => {
    const params = new SearchApiRequest()
    const totalPages = endPage - startPage + 1

    let bloomreachCookieMT = ""
    let bloomreachCookieUID = ""
    if(bloomreachPersonalizationEnabled) {
        if (!IS_BROWSER()) {
            bloomreachCookieMT = bloomreachCookiesInitialVal.brMtSearch
            bloomreachCookieUID = bloomreachCookiesInitialVal.brUid2
        } else {
            bloomreachCookieMT = Cookies.getJSON("_br_mt_search") || ""
            bloomreachCookieUID = Cookies.getJSON("_br_uid_2") || BR_UID_DEFAULT_VALUE
        }
        params.contextid = bloomreachCookieUID
        params.segment = bloomreachCookieMT
    } else {
        params.contextid = "TODO CONTEXT ID"
    }

    params.start = pageSize * startPage - pageSize
    params.pagesize = pageSize * totalPages
    params.searchTerm = searchTerm ?? ""
    params.type = type
    params.criteria = url
    params.fields = fields ? fields.join() : null

    return params
}

export default buildProductsRequestParams
