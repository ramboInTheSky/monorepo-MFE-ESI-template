/* eslint-disable import/no-extraneous-dependencies */
import {Router} from "express"
import {getSettingsHeaders, getSettingsHeadersAsObject} from "@monorepo/utils"
import {CORSMiddleware} from "@monorepo/middlewares"
import {SecondaryMeganavCacheControlMiddleware} from "../../middleware/cache-control"
import BFFLogger from "../../core/BFFLogger"
import MegaNavApiConfig from "../../../config/api/appdata"
import axios from "../../core/xhr"
import env from "../../../config/env"
import {DEFAULT_SECONDARY_NAV_VERSION, DEFAULT_SECONDARY_NAV_TYPE} from "../../../config/constants"
import {SecondaryNav, DefaultConfig} from "../../../models/secondary-nav"
import {SettingsSdkKeys} from "../../../models/settings"

const {REACT_APP_BLOB_STORAGE_PATH, REACT_APP_BLOB_STORAGE_SSR_BASEURL} = env

export const getSecondaryNavData = MegaNavApiConfig("getSecondaryNavData")

const defaultSecondaryData = async (realm, department, {version}): Promise<SecondaryNav> => {
    try {
        const normalisedDepartment = department.replace(" ", "-")
        const url = `${REACT_APP_BLOB_STORAGE_SSR_BASEURL}${REACT_APP_BLOB_STORAGE_PATH}/fallback-api-data/meganav/${version}/${realm}/${DEFAULT_SECONDARY_NAV_TYPE}/fallback/${normalisedDepartment}.json`
        const defaultDataResponse = await axios.get(url)

        return defaultDataResponse.data
    } catch (ex) {
        BFFLogger.error(`Meganav - Secondary nav - Unable to get CDN: ${ex}`)
        throw new Error(ex)
    }
}

export const getSecondaryNavDataHandler = async (req: any, res: any) => {
    const apiUrlSettings = getSettingsHeadersAsObject(req.headers)
    const headers = getSettingsHeaders(req.headers)
    if (req.headers["x-monorepo-time-machine-date"])
        headers["x-monorepo-time-machine-date"] = req.headers["x-monorepo-time-machine-date"]

    const {page, department} = req.params
    try {
        const response = await (axios as any)[getSecondaryNavData.method](
            getSecondaryNavData.url(apiUrlSettings)(page, department),
            {
                headers,
                params: req.query,
            },
        )
        res.send(response.data)
    } catch (err) {
        try {
            const config: DefaultConfig = res.locals.configuration
                ? res.locals.configuration[SettingsSdkKeys.defaultSecondaryConfig]
                : {
                      country: apiUrlSettings.territory,
                      version: DEFAULT_SECONDARY_NAV_VERSION,
                  }
            const response = await defaultSecondaryData(apiUrlSettings.realm, department, config)

            res.send(response)
        } catch (e) {
            BFFLogger.error(err)
            res.status(500).end()
        }
    }
}

export default (router: Router) => {
    router.options(getSecondaryNavData.routeDefinition, CORSMiddleware)
    router.get(
        getSecondaryNavData.routeDefinition,
        CORSMiddleware,
        SecondaryMeganavCacheControlMiddleware,
        getSecondaryNavDataHandler,
    )
}
