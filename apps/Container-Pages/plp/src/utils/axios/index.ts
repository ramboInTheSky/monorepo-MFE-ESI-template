/* istanbul ignore file */
import axiosInstance from "axios"
import logger from "@monorepo/core-logger"
import {IS_BROWSER} from "../window"
import {getRegExValue} from "../getRegExValue"
import env from "../../config/env"
import {TOKEN_CANCELLATION_FLAG} from "../../config/constants"

const {PORT, REACT_APP_APP_URL} = env
axiosInstance.defaults.baseURL = IS_BROWSER() ? REACT_APP_APP_URL : `http://localhost:${PORT}`
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
        // Don't log requests that the user cancelled.
        if (error?.message !== TOKEN_CANCELLATION_FLAG) logger.error(error, "axios-response-error")
        return Promise.reject(error)
    },
)

export const setAxiosDefaultsFromNextRequest = (req: any) => {
    const amidoVisitorCookie = req.headers?.cookie
        ? getRegExValue(req.headers.cookie, "AmidoVisitor", "=([^;]+)")
        : undefined

    axiosInstance.defaults.headers.common["x-monorepo-session-id"] = amidoVisitorCookie
        ? getRegExValue(amidoVisitorCookie, "LatestSessionID", "=(.*)&LatestSessionTimestamp")
        : ""
}

export default axiosInstance
