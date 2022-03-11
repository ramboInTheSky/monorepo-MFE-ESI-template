/* eslint-disable no-param-reassign */
import {TelemetryClient} from "applicationinsights"
import env from "../../../config/env"

export const appInsightsMiddleware = (client: TelemetryClient | null) => (req, _res, next) => {
    if (env.REACT_APP_APPINSIGHTS_KEY && client) {
        const customProperties = {
            "x-monorepo-correlation-id": req.headers["x-monorepo-correlation-id"],
            "x-monorepo-time-machine-date": req.headers["x-monorepo-time-machine-date"],
            Application: "PLP UI",
            Referer: req.headers.Referer,
            UserAgent: req.headers["User-Agent"],
            "x-monorepo-siteurl": req.headers["x-monorepo-siteurl"],
            ENVIRONMENT: JSON.stringify(env),
        }
        client.context.tags[client.context.keys.cloudRole] = "monorepo-plp-frontend"
        client.commonProperties = customProperties
    }
    next()
}

export default appInsightsMiddleware
