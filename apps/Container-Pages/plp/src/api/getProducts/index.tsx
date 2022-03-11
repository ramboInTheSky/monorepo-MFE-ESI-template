import logger from "@monorepo/core-logger"
import {IncomingHttpHeaders} from "http"
import axios from "../../utils/axios"

import {ExternalSearchApiResponse, GenericSearchResponse} from "../../models/searchApi"
import {BloomreachCookiesInitialVal} from "../../models/SearchState"
import ProductsApi from "../../config/api/products"
import build from "../../utils/buildProductsRequestParams"
import {SearchApiRequestTypes} from "../../config/constants"
import { httpUrlTrimmer } from "../../utils/httpUrlTrimmer"

// this will always be called server-side on first render and subsequent server-side renders
export const getProducts = async (
    headers: IncomingHttpHeaders,
    url: string,
    searchTerm: string | null,
    type: SearchApiRequestTypes,
    bloomreachCookiesInitialVal: BloomreachCookiesInitialVal,
    bloomreachPersonalizationEnabled: boolean,
    startPage?: number,
    endPage?: number,
    pageSize?: number,
    fields?: (keyof ExternalSearchApiResponse)[],
): Promise<GenericSearchResponse> => {
    try {
        const getProductsApi = ProductsApi("getProducts")
        
        const urlTrimmed = httpUrlTrimmer(url)
        const response = await axios({
            method: getProductsApi.method,
            url: `${getProductsApi.localEndpoint()}`,
            headers,
            params: build(urlTrimmed, searchTerm, type, startPage, endPage, pageSize, bloomreachCookiesInitialVal, bloomreachPersonalizationEnabled, fields),
        })
        return response.data
    } catch (ex) {
        logger.error(ex)
        throw ex
    }
}
