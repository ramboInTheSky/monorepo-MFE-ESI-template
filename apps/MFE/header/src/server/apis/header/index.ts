/* eslint-disable import/no-extraneous-dependencies */
import {Router} from "express"
import {getSettingsHeaders, getSettingsHeadersAsObject} from "@monorepo/utils"
import BFFLogger from "../../core/BFFLogger"
import HeaderApiConfig from "../../../config/api/headerdata"
import axios from "../../core/xhr"

export const getHeaderData = HeaderApiConfig("getHeaderData")

export const getHeaderDataHandler = async (req: any, res: any) => {
    const apiUrlSettings = getSettingsHeadersAsObject(req.headers)
    const headers = getSettingsHeaders(req.headers)
    try {
        const response = await (axios as any)[getHeaderData.method](getHeaderData.url(apiUrlSettings)(), {
            headers,
            params: req.query,
        })
        res.send(response.data)
    } catch (err) {
        BFFLogger.error(err)
        res.status(500).end()
    }
}

export default (router: Router) => {
    router.get(getHeaderData.routeDefinition, getHeaderDataHandler)
}
