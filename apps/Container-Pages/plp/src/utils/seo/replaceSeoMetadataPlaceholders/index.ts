import {SeoMetadata} from "../types"

interface Placeholders {
    searchTerm: string
    filters: string
    market: string
}

export function replaceSeoMetadataPlaceholders(seoMetadata: SeoMetadata, placeholders: Placeholders) {
    const amidoMetadata = {}
    Object.entries(seoMetadata || {}).forEach(([key, value]) => {
        amidoMetadata[key] = value
            .replace(new RegExp("{SearchTerm}", "g"), placeholders.searchTerm)
            .replace(new RegExp("{Filters}", "g"), placeholders.filters)
            .replace(new RegExp("{CountryName}", "g"), placeholders.market)
            .replace(/ +(?= )/g, "")
    })
    return amidoMetadata as SeoMetadata
}
