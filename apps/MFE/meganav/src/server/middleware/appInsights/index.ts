import env from "../../../config/env"

export const appInsightsMiddleware = (client: any) => (req, _res, next) => {
    const customProperties = {
        "x-monorepo-correlation-id": req.headers["x-monorepo-correlation-id"],
        Application: "MegaNav UI",
        Referer: req.headers.Referer,
        UserAgent: req.headers["User-Agent"],
        "x-monorepo-siteurl": req.headers["x-monorepo-siteurl"],
        ENVIRONMENT: JSON.stringify(env),
        "x-monorepo-time-machine-date": req.headers["x-monorepo-time-machine-date"],
    }
    // eslint-disable-next-line no-param-reassign
    client.commonProperties = customProperties
    next()
}

export default appInsightsMiddleware
