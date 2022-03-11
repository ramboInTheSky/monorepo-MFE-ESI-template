import logger from "@monorepo/core-logger"
import {IncomingHttpHeaders} from "http2"
import {getProductsFragmentByPage} from "../../api/getProductsFragmentByPage"
import {SearchApiRequestTypes} from "../../config/constants"
import {ExternalSearchApiResponse} from "../../models/searchApi"
import {SearchState, BloomreachCookiesInitialVal} from "../../models/SearchState"
import {mapProductsFragmentToItems} from "../productsFragment"
import redirectErrorPage from "../redirectErrorPage"

const getFacetSearchResults = async (
    searchUrl: string,
    siteUrl: string,
    headers: IncomingHttpHeaders,
    searchTerm: string | null,
    type: SearchApiRequestTypes,
    lazyloadItemIndexFrom: number,
    bloomreachCookiesInitialVal: BloomreachCookiesInitialVal,
    bloomreachPersonalizationEnabled: boolean,
): Promise<Pick<SearchState, "totalResults" | "facets" | "filtersSort" | "filters">> => {
    try {
        const fields: (keyof ExternalSearchApiResponse)[] = ["totalResults", "filters"]

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

        const {totalResults, filters, filtersSort, facets} = mapProductsFragmentToItems(
            apiResponse,
            lazyloadItemIndexFrom,
        ).searchStateData!

        return {
            totalResults,
            filters,
            filtersSort,
            facets,
        }
    } catch (error) {
        window.location.href = `${redirectErrorPage(siteUrl)}`
        logger.error(error, "search-for-selected-assets-error")
        throw error
    }
}

export default getFacetSearchResults
