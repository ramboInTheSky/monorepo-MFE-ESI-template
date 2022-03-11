import logger from "@monorepo/core-logger"
import {IncomingHttpHeaders} from "http"
import {axiosInstance as axios} from "../../utils/axios"

import {PrimaryNav, DefaultConfig} from "../../models/primary-nav"
import AppApiConfig from "../../config/api/appdata"
import {REALM_HEADER} from "../../config/constants"
import {defaultPrimaryData} from "../getDefaultData"

// this will always be called server-side on first render and subsequent server-side renders
export const getPrimaryNavData = async (
    headers: IncomingHttpHeaders,
    defaultPrimaryConfig: DefaultConfig,
): Promise<PrimaryNav> => {
    try {
        const getAppDataApi = AppApiConfig("getPrimaryNavData")
        const response = await axios({
            method: getAppDataApi.method,
            url: `${getAppDataApi.localEndpoint()}`,
            headers,
        })

        return response.data
    } catch (ex) {
        logger.error(ex)
        const defaultData = await defaultPrimaryData(headers[REALM_HEADER], defaultPrimaryConfig)
        return defaultData
    }
}
