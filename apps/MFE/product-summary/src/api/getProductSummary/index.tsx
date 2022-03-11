import logger from "@monorepo/core-logger"
import {IncomingHttpHeaders} from "http"
import axios from "../../utils/axios"

import {ProductSummaryData} from "../../models/searchApi/product"
import {SuitSummaryData} from "../../models/searchApi/suit"
import {SofaSummaryData} from "../../models/searchApi/sofa"
import SearchApi from "../../config/api/search"

// this will always be called server-side on first render and subsequent server-side renders
export const getProductSummary = async (
    headers: IncomingHttpHeaders,
    itemNumber: string | number,
    type: string,
): Promise<{response: ProductSummaryData | SuitSummaryData | SofaSummaryData; responseHeaders}> => {
    try {
        const getProductSummaryDataApi = SearchApi("getTypeSummary")
        const response = await axios({
            method: getProductSummaryDataApi.method,
            url: `${getProductSummaryDataApi.localEndpoint(itemNumber, type)}`,
            headers,
        })

        return {
            response: response.data,
            responseHeaders: response.headers,
        }
    } catch (error) {
        if (error.response) {
            // Axios interceptors log this error already
            throw error
        }
        logger.error(error)
        throw error
    }
}
