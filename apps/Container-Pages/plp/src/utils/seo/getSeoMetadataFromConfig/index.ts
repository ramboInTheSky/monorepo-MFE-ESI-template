import {TERRITORY_GB} from "../../../config/constants"
import {SeoMetadataConfig} from "../types"

export const KEYWORD_SEARCH = "keyword" as const
export const CATEGORY_SEARCH = "category" as const

type SearchType = typeof CATEGORY_SEARCH | typeof KEYWORD_SEARCH

interface SeoMetadataArgs {
    realm: string
    territory: string
    searchType: SearchType
    withFilters: boolean
    config: SeoMetadataConfig
}

export function getSeoMetadataFromConfig({realm, territory, searchType, withFilters, config}: SeoMetadataArgs) {
    const $withFilters = withFilters ? "withFilters" : "withoutFilters"
    const region = territory === TERRITORY_GB ? "uk" : "international"
    const metadata = config[realm]?.[region]?.[searchType]?.[$withFilters]
    if (!metadata) return null
    return clone(metadata)
}

function clone(obj: {}) {
    return JSON.parse(JSON.stringify(obj))
}
