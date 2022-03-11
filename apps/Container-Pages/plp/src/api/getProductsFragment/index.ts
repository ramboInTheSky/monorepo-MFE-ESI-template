import logger from "@monorepo/core-logger"
import {AxiosRequestConfig} from "axios"
import {IncomingHttpHeaders} from "http"
import Cookies from "js-cookie"
import axios from "../../utils/axios"
import ProductsApi from "../../config/api/products"
import {BR_UID_DEFAULT_VALUE, SearchApiRequestTypes, TOKEN_CANCELLATION_FLAG} from "../../config/constants"
import {ExternalSearchApiResponse, SearchApiRequest} from "../../models/searchApi"
import {BloomreachCookiesInitialVal} from "../../models/SearchState"
import {httpUrlTrimmer, urlSanitiser} from "../../utils/httpUrlTrimmer"
import {IS_BROWSER} from "../../utils/window"

interface GetProductsFragmentFnOptions {
    headers: IncomingHttpHeaders
    url: string
    baseUrl: string
    searchTerm: string | null
    type: SearchApiRequestTypes
    start: number
    pageSize: number
    fields: (keyof ExternalSearchApiResponse)[]
    bloomreachCookiesInitialVal: BloomreachCookiesInitialVal
    bloomreachPersonalizationEnabled: boolean
    cancelToken?: AxiosRequestConfig["cancelToken"]
}

export const getProductsFragment = async ({
    url,
    baseUrl,
    headers,
    searchTerm,
    type,
    start,
    pageSize,
    fields,
    bloomreachCookiesInitialVal,
    bloomreachPersonalizationEnabled,
    cancelToken,
}: GetProductsFragmentFnOptions): Promise<string> => {
    try {
        const getProductsFragmentApi = ProductsApi("getProductsFragment")

        const urlParam = httpUrlTrimmer(url)

        const response = await axios({
            method: getProductsFragmentApi.method,
            url: `${urlSanitiser(baseUrl)}${getProductsFragmentApi.localEndpoint()}`,
            headers,
            params: buildParams({url: urlParam, searchTerm, type, start, pageSize, bloomreachCookiesInitialVal, bloomreachPersonalizationEnabled, fields}),
            cancelToken,
        })
        return response.data
    } catch (error) {
        if (error.message !== TOKEN_CANCELLATION_FLAG) {
            logger.error(error, "getProductFragments")
        }

        throw error
    }
}

type Params = {
    url: string
    searchTerm: string | null
    type: SearchApiRequestTypes
    start: number
    pageSize: number
    bloomreachCookiesInitialVal: BloomreachCookiesInitialVal
    bloomreachPersonalizationEnabled: boolean
    fields?: (keyof ExternalSearchApiResponse)[]
}

export const buildParams = ({
    url,
    searchTerm,
    type,
    start,
    pageSize = 24,
    bloomreachCookiesInitialVal,
    bloomreachPersonalizationEnabled,
    fields,
}: Params): SearchApiRequest => {
    const params = new SearchApiRequest()

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

    params.start = start
    params.pagesize = pageSize
    params.searchTerm = searchTerm ?? ""
    params.type = type
    params.criteria = url
    params.fields = fields ? fields.join() : null

    return params
}
