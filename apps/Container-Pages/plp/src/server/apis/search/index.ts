/* eslint-disable import/no-extraneous-dependencies */
import {Router} from "express"
import {getSettingsHeadersAsObject} from "@monorepo/utils"
import {IncomingHttpHeaders} from "http"
import BFFLogger from "../../core/BFFLogger"
import Api from "../../../config/api/products"
import {SearchApiRequest} from "../../../models/searchApi"
import RedirectToPdp from "./redirectToPdp"
import createApiHeaders from "../../../utils/createApiRequestHeaders"
import isItemNumberValid from "../../../utils/isItemNumberValid"
import {getSearchResults} from "../../../utils/getSearchResults"

const getProducts = Api("getProducts")

interface Request {
    headers: IncomingHttpHeaders
    query: SearchApiRequest
}

export const getProductsHandler = async (req: Request, res: any) => {
    try {
        const headers = createApiHeaders(req.headers)
        const apiUrlSettings = getSettingsHeadersAsObject(req.headers)

        const searchTerm = req.query.searchTerm.trim().toUpperCase()

        if (isItemNumberValid(searchTerm)) {
            await RedirectToPdp(apiUrlSettings, res, req, headers, searchTerm.replace("-", ""))
        } else {
            await getSearchResults(req, res, apiUrlSettings, headers)
        }
    } catch (err) {
        BFFLogger.error(err)
        res.status(500).end()
    }
}

export default (router: Router) => {
    router.get(getProducts.routeDefinition, getProductsHandler)
}
