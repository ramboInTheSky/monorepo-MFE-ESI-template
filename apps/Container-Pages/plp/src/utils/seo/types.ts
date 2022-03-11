export interface SeoMetadata {
    title: string
    keywords: string
    description: string
    robots: string
}

export type HeaderLanguageType = string | string[] | undefined

export interface SeoMetadataConfig {
    [realm: string]: {
        uk?: {
            category?: {
                withFilters?: Partial<SeoMetadata>
                withoutFilters?: Partial<SeoMetadata>
            }
            keyword?: {
                withFilters?: Partial<SeoMetadata>
                withoutFilters?: Partial<SeoMetadata>
            }
        }
        international?: {
            category?: {
                withFilters?: Partial<SeoMetadata>
                withoutFilters?: Partial<SeoMetadata>
            }
            keyword?: {
                withFilters?: Partial<SeoMetadata>
                withoutFilters?: Partial<SeoMetadata>
            }
        }
    }
}
