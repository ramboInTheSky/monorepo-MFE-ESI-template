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
        logger.error(error.toJSON(), "axios-request-error")
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
        if (error.response && error.response.status && error.response.status === 404) {
            return Promise.reject(error)
        }
        logger.error(error.toJSON(), "axios-response-error")
        return Promise.reject(error)
    },
)

export const setAxiosDefaultsFromNextRequest = (req: any) => {
    const nextVisitorCookie = req.headers?.cookie
        ? getRegExValue(req.headers.cookie, "NextVisitor", "=([^;]+)")
        : undefined

    axiosInstance.defaults.headers.common["x-monorepo-session-id"] = nextVisitorCookie
        ? getRegExValue(nextVisitorCookie, "LatestSessionID", "=(.*)&LatestSessionTimestamp")
        : ""
}

export default axiosInstance
