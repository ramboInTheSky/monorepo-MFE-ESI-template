/* istanbul ignore file */
import axiosInstance from "axios"
import logger from "@monorepo/core-logger"
import {getRegExValue} from "../getRegExValue"
import env from "../../config/env"

const {PORT} = env
axiosInstance.defaults.baseURL = `http://localhost:${PORT}`
axiosInstance.interceptors.request.use(
    config => {
        setAxiosDefaultsFromNextRequest(config)
        return config
    },
    error => {
        logger.error(error, "axios-request-error")
        return Promise.reject(error)
    },
)

axiosInstance.interceptors.response.use(
    response => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response
    },
    error => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        logger.error(error, "axios-response-error")
        return Promise.reject(error)
    },
)

export const setAxiosDefaultsFromNextRequest = (req: any) => {
    const nextVisitorCookie = req.headers?.cookie
        ? getRegExValue(req.headers.cookie, "NextVisitor", "=([^;]+)")
        : undefined

    if (req.headers["x-monorepo-correlation-id"])
        axiosInstance.defaults.headers.common["x-monorepo-correlation-id"] = req.headers["x-monorepo-correlation-id"]
    axiosInstance.defaults.headers.common["x-monorepo-session-id"] = nextVisitorCookie
        ? getRegExValue(nextVisitorCookie, "LatestSessionID", "=(.*)&LatestSessionTimestamp")
        : ""
}

export default axiosInstance
