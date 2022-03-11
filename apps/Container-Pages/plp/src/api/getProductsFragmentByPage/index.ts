import logger from "@monorepo/core-logger"
import {AxiosRequestConfig} from "axios"
import {IncomingHttpHeaders} from "http"
import axios from "../../utils/axios"
import ProductsApi from "../../config/api/products"
import build from "../../utils/buildProductsRequestParams"
import {SearchApiRequestTypes, TOKEN_CANCELLATION_FLAG} from "../../config/constants"
import {ExternalSearchApiResponse} from "../../models/searchApi"
import {BloomreachCookiesInitialVal} from "../../models/SearchState"
import {httpUrlTrimmer} from "../../utils/httpUrlTrimmer"

interface GetProductsFragmentByPageFnOptions {
    headers: IncomingHttpHeaders
    url: string
    baseUrl: string
    searchTerm: string | null
    type: SearchApiRequestTypes
    startPage: number
    endPage: number
    pageSize: number
    fields: (keyof ExternalSearchApiResponse)[]
    bloomreachCookiesInitialVal: BloomreachCookiesInitialVal,
    bloomreachPersonalizationEnabled: boolean,
    cancelToken?: AxiosRequestConfig["cancelToken"]
}

export const getProductsFragmentByPage = async ({
    url,
    baseUrl,
    headers,
    searchTerm,
    type,
    startPage,
    endPage,
    pageSize,
    fields,
    bloomreachCookiesInitialVal,
    bloomreachPersonalizationEnabled,
    cancelToken,
}: GetProductsFragmentByPageFnOptions): Promise<string> => {
    try {
        const getProductsFragmentApi = ProductsApi("getProductsFragment")
        const urlParam = httpUrlTrimmer(url)

        const response = await axios({
            method: getProductsFragmentApi.method,
            url: `${baseUrl}${getProductsFragmentApi.localEndpoint()}`,
            headers,
            params: build(urlParam, searchTerm, type, startPage, endPage, pageSize, bloomreachCookiesInitialVal, bloomreachPersonalizationEnabled, fields),
            cancelToken,
        })
        return response.data
    } catch (error) {
        if (error.message !== TOKEN_CANCELLATION_FLAG) {
            logger.error(error, "getProductsFragmentByPage")
        }

        throw error
    }
}
