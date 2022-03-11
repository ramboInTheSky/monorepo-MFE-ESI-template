/* istanbul ignore file */
import axiosInstance from "axios"
import logger from "@monorepo/core-logger"
import {SettingsSdkKeys} from "../../../models/settings"

const {correlationHeaderName} = SettingsSdkKeys

axiosInstance.interceptors.request.use(
    config => {
        // Do something before request is sent
        logger.debug(
            `URL: ${config.url}, HEADERS: ${JSON.stringify(config.headers)}`,
            config.headers[correlationHeaderName],
        )
        // setAxiosDefaultsFromNextRequest(config)
        return config
    },
    error => {
        // Do something with request error
        logger.error(error, "axios-request-error-server")
        return Promise.reject(error)
    },
)

axiosInstance.interceptors.response.use(
    response => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        logger.debug(`${response.config.url} - ${response.status}`, response.headers[correlationHeaderName])
        return response
    },
    error => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        logger.error(error, "axios-response-error-server")
        return Promise.reject(error)
    },
)

export default axiosInstance
