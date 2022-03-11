import {IncomingHttpHeaders} from "http2"
import {getSettingsHeaders} from "@monorepo/utils"
import env from "../../config/env"
import {TIME_MACHINE_DATE_HEADER} from "../../config/constants"

const createApiRequestHeaders = (requestHeaders: IncomingHttpHeaders) => {
    const headers = getSettingsHeaders(requestHeaders)
    const apiHeaders = {
        "x-monorepo-correlation-id": headers["x-monorepo-correlation-id"],
        ...(headers["x-monorepo-persona"] && {
            "x-monorepo-persona": headers["x-monorepo-persona"],
        }),
    }

    if (env.REACT_APP_USE_TIME_MACHINE_COOKIE === "true") {
        if (requestHeaders[TIME_MACHINE_DATE_HEADER]) {
            apiHeaders[TIME_MACHINE_DATE_HEADER] = requestHeaders[TIME_MACHINE_DATE_HEADER]
        }
    }
    return apiHeaders
}

export default createApiRequestHeaders
