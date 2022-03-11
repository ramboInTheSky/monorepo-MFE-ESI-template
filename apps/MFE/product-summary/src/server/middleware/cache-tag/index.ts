import BFFLogger from "../../core/BFFLogger"
import env from "../../../config/env"
import {CACHE_HEADER_CACHE_TAGS, PRODUCT_SUMMARY_CACHE_TAG} from "../../../config/constants"

const productSummaryCacheTag = `${env.ENVIRONMENT_NAME}-${PRODUCT_SUMMARY_CACHE_TAG}`

export const CacheTagMiddleware = (_req: any, res: any, _next) => {
    try {
        const header = res.get(CACHE_HEADER_CACHE_TAGS)
        const cacheTagHeader = header ? `${header}, ${productSummaryCacheTag}` : productSummaryCacheTag
        res.set(CACHE_HEADER_CACHE_TAGS, cacheTagHeader)
    } catch (err) {
        BFFLogger.error(err)
    }
    _next()
}

export default CacheTagMiddleware

export const SetCacheTagsResponseHeader = (res, apiResponseHeaders) => {
    if (apiResponseHeaders && apiResponseHeaders[CACHE_HEADER_CACHE_TAGS]) {
        res.set(CACHE_HEADER_CACHE_TAGS, apiResponseHeaders[CACHE_HEADER_CACHE_TAGS])
    }
}
