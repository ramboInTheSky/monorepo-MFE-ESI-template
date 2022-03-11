import {CACHE_HEADER_CACHE_TAGS} from "../../config/constants"

const SetCacheTagsResponseHeader = (res, apiResponseHeaders) => {
    if (apiResponseHeaders?.[CACHE_HEADER_CACHE_TAGS]) {
        res.set(CACHE_HEADER_CACHE_TAGS, apiResponseHeaders[CACHE_HEADER_CACHE_TAGS])
    }
}

export default SetCacheTagsResponseHeader
