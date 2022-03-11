import logger from "@monorepo/core-logger"
import {IncomingHttpHeaders} from "http"
import {axiosInstance as axios} from "../../utils/axios"
import {SecondaryNav} from "../../models/secondary-nav"
import AppApiConfig from "../../config/api/appdata"

export const getSecondaryNavData = async (
    baseUrl: string,
    headers: IncomingHttpHeaders,
    department: string,
): Promise<SecondaryNav> => {
    try {
        const page = "home" // FIXME hard coded for now until we can dynamically get the page
        const {cookie, ...rest} = headers
        const getAppDataApi = AppApiConfig("getSecondaryNavData")
        const response = await axios({
            method: getAppDataApi.method,
            url: `${baseUrl}${getAppDataApi.localEndpoint(page, department)}`,
            headers: rest,
        })

        return response.data
    } catch (ex) {
        logger.error(ex)
        throw ex
    }
}
