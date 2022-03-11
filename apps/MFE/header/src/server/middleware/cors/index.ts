export const CORSMiddleware = (req, res: any, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.referer.replace(/\/$/, ""))
    res.header("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE")
    res.header("Access-Control-Allow-Credentials", "true")
    res.header("Access-Control-Allow-Headers", [
        "content-type, pragma, accept, x-monorepo-territory, x-monorepo-realm, x-monorepo-language, x-monorepo-correlation-id, x-monorepo-session-id, x-monorepo-siteurl",
    ])
    next()
}

export default CORSMiddleware
