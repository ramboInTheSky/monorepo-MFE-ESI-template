import {TelemetryClient} from "applicationinsights"

/* eslint-disable no-param-reassign */
export const appInsightsMiddleware = (client: TelemetryClient) => (req, _res, next) => {
    const customProperties = {
        "x-monorepo-correlation-id": req.headers["x-monorepo-correlation-id"],
        Application: "SEO Metadata",
        Referer: req.headers.Referer,
        UserAgent: req.headers["User-Agent"],
    }
    client.context.tags[client.context.keys.cloudRole] = seo-metadata-ui"
    client.commonProperties = customProperties
    next()
}

export default appInsightsMiddleware
