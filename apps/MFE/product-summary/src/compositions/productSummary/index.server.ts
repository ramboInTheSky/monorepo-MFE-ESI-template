import {Store} from "redux"

import {ProductType} from "../../config/constants"
import BFFLogger from "../../server/core/BFFLogger"
import {updateProductSummary} from "../../ducks/productSummary"
import {QUERY_PARAMETER_NEW_IN} from "../../config/settings"
import getSearchDescription from "../../utils/getSearchDescription"
import {SetLastModifiedResponseHeader} from "../../server/middleware/cache-control"
import {SetCacheTagsResponseHeader} from "../../server/middleware/cache-tag"

interface GetServerSideResponse {
    isConfError: boolean
    isDataError: boolean
    isNotModified: boolean
}

export const getServerSideProps = async (req: any, res: any, _store: Store): Promise<GetServerSideResponse> => {
    const serverSideResponse = {
        isDataError: false,
        isConfError: false,
        isNotModified: false,
    }

    try {
        const {headers} = res.req

        const enabledSearchDescription = getSearchDescription(res.locals.configuration)

        const responseHeaders = await updateProductSummary(
            _store,
            {
                headers,
                itemNumber: req.params.itemNumber,
                type: req.params.type || ProductType,
                showNewIn: req.query[QUERY_PARAMETER_NEW_IN],
            },
            enabledSearchDescription,
        )

        if (responseHeaders.errorStatusCode) {
            if (responseHeaders.errorStatusCode === 304) {
                serverSideResponse.isNotModified = true
            } else {
                serverSideResponse.isDataError = true
            }
            return serverSideResponse
        }

        SetLastModifiedResponseHeader(res, responseHeaders)
        SetCacheTagsResponseHeader(res, responseHeaders)
        return serverSideResponse
    } catch (err) {
        BFFLogger.error(err)
        serverSideResponse.isConfError = true
        return serverSideResponse
    }
}

export default getServerSideProps
