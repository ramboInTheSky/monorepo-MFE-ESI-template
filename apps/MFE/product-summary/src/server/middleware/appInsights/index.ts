import {TelemetryClient} from "applicationinsights"

/* eslint-disable no-param-reassign */
export const appInsightsMiddleware = (client: TelemetryClient) => (req, _res, next) => {
    const customProperties = {
        "x-monorepo-correlation-id": req.headers["x-monorepo-correlation-id"],
        "x-monorepo-time-machine-date": req.headers["x-monorepo-time-machine-date"],
        Application: "Product Summary UI",
        Referer: req.headers.Referer,
        UserAgent: req.headers["User-Agent"],
    }
    client.context.tags[client.context.keys.cloudRole] = "productsummary-frontend"
    client.commonProperties = customProperties
    next()
}

export default appInsightsMiddleware
