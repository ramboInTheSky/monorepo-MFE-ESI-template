/* eslint-disable import/no-extraneous-dependencies */
import {Router} from "express"
import {getSettingsHeaders, getSettingsHeadersAsObject} from "@monorepo/utils"
import BFFLogger from "../../core/BFFLogger"
import MegaNavApiConfig from "../../../config/api/appdata"
import axios from "../../core/xhr"

export const getPrimaryNavData = MegaNavApiConfig("getPrimaryNavData")

export const getPrimaryNavDataHandler = async (req: any, res: any) => {
    const apiUrlSettings = getSettingsHeadersAsObject(req.headers)
    const headers = getSettingsHeaders(req.headers)
    try {
        if (req.headers["x-monorepo-time-machine-date"])
            headers["x-monorepo-time-machine-date"] = req.headers["x-monorepo-time-machine-date"]

        const response = await (axios as any)[getPrimaryNavData.method](getPrimaryNavData.url(apiUrlSettings)(), {
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
    router.get(getPrimaryNavData.routeDefinition, getPrimaryNavDataHandler)
}
