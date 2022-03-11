export const CORSMiddleware = (_req, res: any, next) => {
    res.header("Access-Control-Allow-Origin", ["*"])
    res.header("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE")
    res.header("Access-Control-Allow-Headers", ["*"])
    res.header("Access-Control-Allow-Headers", "x-monorepo-viewport-size")
    next()
}

export default CORSMiddleware
