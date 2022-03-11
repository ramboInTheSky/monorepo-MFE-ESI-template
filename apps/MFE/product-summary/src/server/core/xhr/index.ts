/* istanbul ignore file */
import axiosInstance from "axios"
import logger from "@monorepo/core-logger"

axiosInstance.interceptors.request.use(config => {
    // Do something before request is sent
    logger.debug(config.url, config.headers && config.headers["x-monorepo-correlation-id"])
    // setAxiosDefaultsFromNextRequest(config)
    return config
})

axiosInstance.interceptors.response.use(response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    logger.debug(`${response.config.url} - ${response.status}`, response.headers["x-monorepo-correlation-id"])
    return response
})

export default axiosInstance
