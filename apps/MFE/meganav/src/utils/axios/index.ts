/* istanbul ignore file */
import axiosInstance from "axios"
import logger from "@monorepo/core-logger"
import {getRegExValue} from "../getRegExValue"
import env from "../../config/env"
import {IS_BROWSER} from "../window"

const {PORT, REACT_APP_DEV_URL_OVERRIDE} = env
axiosInstance.defaults.baseURL = IS_BROWSER() ? REACT_APP_DEV_URL_OVERRIDE : `http://localhost:${PORT}`
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

const clientSideCallAxiosInstance = axiosInstance.create({})
clientSideCallAxiosInstance.interceptors.response.use(
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
    if (req.headers["x-monorepo-correlation-id"]) {
        axiosInstance.defaults.headers.common["x-monorepo-correlation-id"] = req.headers["x-monorepo-correlation-id"]
    }

    if (req.headers["x-monorepo-time-machine-date"])
        axiosInstance.defaults.headers.common["x-monorepo-time-machine-date"] =
            req.headers["x-monorepo-time-machine-date"]

    axiosInstance.defaults.headers.common["x-monorepo-session-id"] = nextVisitorCookie
        ? getRegExValue(nextVisitorCookie, "LatestSessionID", "=(.*)&LatestSessionTimestamp")
        : ""
}

export {axiosInstance, clientSideCallAxiosInstance}
