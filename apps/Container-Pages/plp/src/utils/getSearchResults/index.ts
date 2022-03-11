import {SearchApiRequestTypes} from "../../config/constants"
import {isSearchApiResponse} from "../../models/searchApi/typeGuards"
import redirectToResponseUrl from "../../server/apis/search/redirectToApiResponse"
import {filterNonSingleOptionFacetList} from "../filterNonSingleOptionFacet"
import {getSearchApiResult} from "../getSearchApiResult"
import normaliseDataToState from "../normaliseApiDataToState"

export const getSearchResults = async (req: any, res: any, apiUrlSettings: any, headers: any) => {
    const response = await getSearchApiResult(req, apiUrlSettings, headers)
    const apiData = response.data
    if (isSearchApiResponse(apiData)) {
        redirectToResponseUrl(apiData, res)
    } else if (response?.config?.params?.type === SearchApiRequestTypes.Category) {
        res.send(
            normaliseDataToState(
                filterNonSingleOptionFacetList({
                    apiData,
                    config: res.locals.configuration,
                    request: {
                        url: response.config.params.criteria,
                        siteUrl: req.siteUrl.url,
                        type: SearchApiRequestTypes.Category,
                    },
                }),
            ),
        )
    } else {
        res.send(normaliseDataToState(apiData))
    }
}
