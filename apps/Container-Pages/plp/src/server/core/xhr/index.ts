/* istanbul ignore file */
import axiosInstance from "axios"
import logger from "@monorepo/core-logger"
import {urlSanitiser} from "../../../utils/httpUrlTrimmer"

axiosInstance.interceptors.request.use(
    config => {
        // Do something before request is sent
        logger.debug(config.url, config.headers["x-monorepo-correlation-id"])
        logger.info(config.url, config.headers["x-monorepo-time-machine-date"])
        //   setAxiosDefaultsFromNextRequest(config)
        if (config?.params?.criteria) {
            const myConf = {...config}
            myConf.params.criteria = urlSanitiser(config.params.criteria)
            return myConf
        }
        if (config?.params?.url) {
            const myConf = {...config}
            myConf.params.url = urlSanitiser(config.params.url)
            return myConf
        }
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
        logger.debug(`${response.config.url} - ${response.status}`, response.headers["x-monorepo-correlation-id"])
        logger.info(`${response.config.url} - ${response.status}`, response.headers["x-monorepo-time-machie-date"])
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
