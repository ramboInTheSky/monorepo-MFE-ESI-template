import State from "../../../models/State"
import config from "../../../config/seoMetadata.json"
import {selectSeoMetadataArgs} from "../selectSeoMetadataArgs"
import {getSeoMetadataFromConfig} from "../getSeoMetadataFromConfig"
import {replaceSeoMetadataPlaceholders} from "../replaceSeoMetadataPlaceholders"

export function selectSeoMetadata(state: State) {
    const {realm, territory, searchTerm, market, searchType, filters, withFilters} = selectSeoMetadataArgs(state)
    const seoMetadata = getSeoMetadataFromConfig({realm, territory, searchType, withFilters, config})
    const placeholders = {searchTerm, filters, market}
    return replaceSeoMetadataPlaceholders(seoMetadata, placeholders)
}
