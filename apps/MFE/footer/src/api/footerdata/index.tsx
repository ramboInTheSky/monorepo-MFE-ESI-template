import logger from "@monorepo/core-logger"
import {IncomingHttpHeaders} from "http"
import axios from "../../utils/axios"

import {FooterModel} from "../../models/footerModel"
import FooterApiConfig from "../../config/api/footerdata"

// this will always be called server-side on first render and subsequent server-side renders
export const getFooterData = async (headers: IncomingHttpHeaders): Promise<FooterModel> => {
    try {
        const getFooterDataApi = FooterApiConfig("getFooterData")
        const response = await axios({
            method: getFooterDataApi.method,
            url: `${getFooterDataApi.localEndpoint()}`,
            headers,
        })

        return response.data
    } catch (ex) {
        logger.error(ex)
        throw ex
    }
}
