import env from "../../../config/env"

export const appInsightsMiddleware = (client: any) => (req, _res, next) => {
    const customProperties = {
        "x-monorepo-correlation-id": req.headers["x-monorepo-correlation-id"],
        Application: "Header UI",
        Referer: req.headers.Referer,
        UserAgent: req.headers["User-Agent"],
        "x-monorepo-siteurl": req.headers["x-monorepo-siteurl"],
        ENVIRONMENT: JSON.stringify(env),
    }
    // eslint-disable-next-line no-param-reassign
    client.commonProperties = customProperties
    next()
}

export default appInsightsMiddleware
