import {SearchApiRequestTypes} from "config/constants"
import {SettingsSdkKeys} from "../../models/settings"
import {ExternalSearchApiResponse} from "../../models/searchApi"
import {FilterApiResponse, FilterFacetApiResponse} from "../../models/Filter"
import {getCategorySegmentFromUrl} from "../getCategoryFromUrl"

interface RequestType {
    url: string
    siteUrl: string
    type: SearchApiRequestTypes
}

export const prefixProtocolToUrl = (url: string, siteUrl: string) => {
    return url.startsWith("http") ? url : `${siteUrl.split("//")[0]}//${url}`
}

export function filterNonSingleOptionFacetList({
    apiData,
    config,
    request: {url, siteUrl, type},
}: {
    apiData: ExternalSearchApiResponse
    config: Record<string, any>
    request: RequestType
}): ExternalSearchApiResponse {
    const category = getCategorySegmentFromUrl(prefixProtocolToUrl(url, siteUrl), siteUrl, type)
    const singleOptionFacetList: string[] = config && config[SettingsSdkKeys.SingleOptionFacetList]?.Value
    if (!apiData?.filters?.length) return apiData
    const filteredList = apiData.filters.filter((item: FilterApiResponse) => {
        if (singleOptionFacetList.includes(item.name)) return true
        if ((item as FilterFacetApiResponse)?.options) {
            return !(
                (item as FilterFacetApiResponse).options?.length === 1 &&
                (item as FilterFacetApiResponse).options[0].s &&
                category.includes((item as FilterFacetApiResponse).options[0].v.replace(":", "-"))
            )
        }
        return true
    })

    return {
        ...apiData,
        filters: filteredList,
    }
}
