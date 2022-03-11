import BFFLogger from "../../core/BFFLogger"
import env from "../../../config/env"
import {CACHE_HEADERS_EDGE_CACHE_TAG, SEARCH_CACHE_TAG} from "../../../config/constants"

const searchUICacheTag = `${env.ENVIRONMENT_NAME}-${SEARCH_CACHE_TAG}`

export const CacheTagMiddleware = (_req: any, res: any, _next) => {
    try {
        res.set(CACHE_HEADERS_EDGE_CACHE_TAG, searchUICacheTag)
    } catch (err) {
        BFFLogger.error(err)
    }
    _next()
}

export default CacheTagMiddleware
