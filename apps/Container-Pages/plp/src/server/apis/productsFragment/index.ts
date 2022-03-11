/* eslint-disable import/no-extraneous-dependencies */
import {Router} from "express"
import {IncomingHttpHeaders} from "http"
import {getSettingsHeadersAsObject} from "@monorepo/utils"
import axios from "../../core/xhr"
import BFFLogger from "../../core/BFFLogger"
import ProductsConfig from "../../../config/api/products"
import {appendFilterData, createProductsFragment} from "../../../utils/productsFragment"
import {ExternalSearchApiResponse, SearchApiRequest} from "../../../models/searchApi"
import normaliseDataToState from "../../../utils/normaliseApiDataToState"
import {
    DEV_ESI_HEADER,
    ESISeparator,
    SearchApiRequestTypes,
    SEARCH_BANNER_INCLUDE_COMPONENTS,
} from "../../../config/constants"
import createSearchBannerEsiTag from "../../../utils/createSearchBannerEsiTag"
import createApiHeaders from "../../../utils/createApiRequestHeaders"
import {filterNonSingleOptionFacetList} from "../../../utils/filterNonSingleOptionFacet"

const getProductsFragment = ProductsConfig("getProductsFragment")
interface Request {
    headers: IncomingHttpHeaders
    query: SearchApiRequest
}

export const getProductsFragmentHandler = async (req: Request & any, res: any) => {
    try {
        const headers = createApiHeaders(req.headers)

        const apiUrlSettings = getSettingsHeadersAsObject(req.headers)
        const apiResponse = await axios({
            method: getProductsFragment.method,
            url: getProductsFragment.url(apiUrlSettings)(),
            params: req.query,
            headers,
        })
        const data = apiResponse.data as ExternalSearchApiResponse
        let response = ""
        if (data.items) {
            const {items} = data
            response = createProductsFragment(items, req.siteUrl.url as string, !!req.headers[DEV_ESI_HEADER])
        }
        if (data.filters || data.totalResults) {
            let normalisedFilterData
            if (req.query.type === SearchApiRequestTypes.Category) {
                normalisedFilterData = normaliseDataToState(
                    filterNonSingleOptionFacetList({
                        apiData: data,
                        config: res.locals.configuration,
                        request: {
                            url: req.query.criteria,
                            siteUrl: req.siteUrl.url,
                            type: req.query.type,
                        },
                    }),
                )
            } else {
                normalisedFilterData = normaliseDataToState(data)
            }

            response = appendFilterData(response, normalisedFilterData)
            if (data.includedComponents?.includes(SEARCH_BANNER_INCLUDE_COMPONENTS)) {
                const splitUrl = req.siteUrl.url.split("/")
                let protocol = splitUrl[0]
                protocol += "//"

                response += `${ESISeparator.SearchBanner}${createSearchBannerEsiTag(
                    req.siteUrl.url,
                    req.headers[DEV_ESI_HEADER],
                    protocol + req.query.criteria,
                    req.query.type,
                )}`
            }
        }

        res.send(response)
    } catch (err) {
        BFFLogger.error(err)
        res.status(500).end()
    }
}

export default (router: Router) => {
    router.get(getProductsFragment.routeDefinition, getProductsFragmentHandler)
}
