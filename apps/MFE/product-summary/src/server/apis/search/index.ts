/* eslint-disable import/no-extraneous-dependencies */
import {Router} from "express"
import {getSettingsHeadersAsObject, getSettingsHeaders} from "@monorepo/utils"
import logger from "../../core/BFFLogger"
import SearchApi from "../../../config/api/search"
import axios from "../../core/xhr"
import mapProductSummaryApiToDuckState from "../../../utils/mapProductSummaryApiToDuckState"
import getRealmFromHeaders from "../../../utils/getRealmFromHeaders"
import {BASELINECSS_GENERATE_CSS_ITEM_NUMBER} from "../../../config/settings"
import BASELINECSS from "./baselinecssdata"
import {ProductType} from "../../../config/constants"
import {SetLastModifiedResponseHeader} from "../../middleware/cache-control"
import {SetCacheTagsResponseHeader} from "../../middleware/cache-tag"

export const getTypeSummary = SearchApi("getTypeSummary")

export const getProductSummaryHandler = async (req: any, res: any) => {
    try {
        if (req.params.itemNumber === BASELINECSS_GENERATE_CSS_ITEM_NUMBER) {
            res.send(BASELINECSS)
            return
        }
        const headers = getSettingsHeaders(req.headers)
        const realm = getRealmFromHeaders(req.headers)
        if (req.headers["x-monorepo-time-machine-date"]) {
            headers["x-monorepo-time-machine-date"] = req.headers["x-monorepo-time-machine-date"]
        }
        const apiUrlSettings = getSettingsHeadersAsObject(req.headers)

        console.log(getTypeSummary.url(apiUrlSettings)(req.params.itemNumber, req.params.type || ProductType))

        const response = await (axios as any)[getTypeSummary.method](
            getTypeSummary.url(apiUrlSettings)(req.params.itemNumber, req.params.type || ProductType),
            {
                headers,
            },
        )

        const mappedData = mapProductSummaryApiToDuckState(
            {...response.data},
            res.locals.configuration,
            req.siteUrl.url,
            realm,
        )
        SetLastModifiedResponseHeader(res, response.headers)
        SetCacheTagsResponseHeader(res, response.headers)
        res.send(mappedData)
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                logger.error(`No Product API Data found for: ${req.params.itemNumber}`)

                return res.sendStatus(404)
            }
        } else if (!error.request) {
            logger.error(error)
        }
        res.sendStatus(500)
    }
}

export default (router: Router) => {
    router.get(getTypeSummary.routeDefinition, getProductSummaryHandler)
}
