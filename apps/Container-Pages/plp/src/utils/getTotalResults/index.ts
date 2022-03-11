import logger from "@monorepo/core-logger"
import {IncomingHttpHeaders} from "http2"
import {NO_LAZYLOAD} from "../../models/Lazyload"
import {getProductsFragmentByPage} from "../../api/getProductsFragmentByPage"
import {SearchApiRequestTypes} from "../../config/constants"
import {ExternalSearchApiResponse} from "../../models/searchApi"
import {mapProductsFragmentToItems} from "../productsFragment"
import {BloomreachCookiesInitialVal} from "../../models/SearchState"
import redirectErrorPage from "../redirectErrorPage"

const getTotalResults = async (
    searchUrl: string,
    siteUrl: string,
    headers: IncomingHttpHeaders,
    searchTerm: string | null,
    type: SearchApiRequestTypes,
    lazyloadItemIndexFrom: number,
    bloomreachCookiesInitialVal: BloomreachCookiesInitialVal,
    bloomreachPersonalizationEnabled: boolean,
): Promise<number> => {
    try {
        const fields: (keyof ExternalSearchApiResponse)[] = ["totalResults"]

        const apiResponse = await getProductsFragmentByPage({
            url: searchUrl,
            baseUrl: siteUrl,
            headers,
            searchTerm,
            type,
            startPage: 1,
            endPage: 1,
            pageSize: 1,
            bloomreachCookiesInitialVal,
            bloomreachPersonalizationEnabled,
            fields,
        })

        const decodedApiResponse = mapProductsFragmentToItems(apiResponse, lazyloadItemIndexFrom, NO_LAZYLOAD)
        const newTotalResults = decodedApiResponse.searchStateData!.totalResults

        return newTotalResults
    } catch (error) {
        window.location.href = `${redirectErrorPage(siteUrl)}`
        logger.error(error, "search-for-selected-assets-error")
        throw error
    }
}

export default getTotalResults
