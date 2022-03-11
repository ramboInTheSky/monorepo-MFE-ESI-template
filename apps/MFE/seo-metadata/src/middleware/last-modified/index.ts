import {CACHE_HEADER_LAST_MODIFIED} from "../../config/constants"

const SetLastModifiedResponseHeader = (res, apiResponseHeaders) => {
    if (apiResponseHeaders?.[CACHE_HEADER_LAST_MODIFIED]) {
        res.set(CACHE_HEADER_LAST_MODIFIED, apiResponseHeaders[CACHE_HEADER_LAST_MODIFIED])
    }
}

export default SetLastModifiedResponseHeader
