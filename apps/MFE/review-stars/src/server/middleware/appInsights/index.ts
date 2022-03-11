export const appInsightsMiddleware = (client: any) => (req, _res, next) => {
    const customProperties = {
        "x-monorepo-correlation-id": req.headers["x-monorepo-correlation-id"],
        Application: "Review Stars UI",
        Referer: req.headers.Referer,
        UserAgent: req.headers["User-Agent"],
    }
    // eslint-disable-next-line no-param-reassign
    client.commonProperties = customProperties
    next()
}

export default appInsightsMiddleware
