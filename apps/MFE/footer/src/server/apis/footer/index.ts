/* eslint-disable import/no-extraneous-dependencies */
import {Router} from "express"
import {getSettingsHeaders, getSettingsHeadersAsObject} from "@monorepo/utils"
import BFFLogger from "../../core/BFFLogger"
import FooterApiConfig from "../../../config/api/footerdata"
import axios from "../../core/xhr"

export const getFooterData = FooterApiConfig("getFooterData")

export const getFooterDataHandler = async (req: any, res: any) => {
    const apiUrlSettings = getSettingsHeadersAsObject(req.headers)
    const headers = getSettingsHeaders(req.headers)
    try {
        const response = await (axios as any)[getFooterData.method](getFooterData.url(apiUrlSettings)(), {
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
    router.get(getFooterData.routeDefinition, getFooterDataHandler)
}
