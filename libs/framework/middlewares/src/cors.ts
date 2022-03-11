// CORSMiddleware package must be kept in sync with the repos that are using them

export const CORSMiddleware = (_req, res: any, next) => {
    res.header({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers":
            "accept, x-monorepo-territory, x-monorepo-realm, x-monorepo-language, x-monorepo-correlation-id, x-monorepo-session-id, x-monorepo-time-machine-date, x-monorepo-viewport-size, x-monorepo-persona",
    })
    next()
}

export default CORSMiddleware
