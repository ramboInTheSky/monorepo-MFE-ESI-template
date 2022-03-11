import logger from "@monorepo/core-logger"
import {IncomingHttpHeaders} from "http"
import {axiosInstance as axios} from "../../utils/axios"
import {HeaderModel} from "../../models/headerModel"
import HeaderApiConfig from "../../config/api/headerdata"
import defaultHeaderData from "./defaultHeaderData"
import {REALM_HEADER} from "../../config/constants"

// this will always be called server-side on first render and subsequent server-side renders
export const getHeaderData = async (
    headers: IncomingHttpHeaders,
    defaultHeaderVersion: string,
): Promise<HeaderModel> => {
    try {
        const getHeaderDataApi = HeaderApiConfig("getHeaderData")
        const response = await axios({
            method: getHeaderDataApi.method,
            url: `${getHeaderDataApi.localEndpoint()}`,
            headers,
        })

        return response.data
    } catch (ex) {
        logger.error("Failed to load the header api: ", ex)
        const defaultData = await defaultHeaderData(headers[REALM_HEADER], defaultHeaderVersion)
        return defaultData
    }
}
