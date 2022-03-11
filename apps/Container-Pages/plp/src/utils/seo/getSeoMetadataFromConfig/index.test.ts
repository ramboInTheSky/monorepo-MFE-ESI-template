import {getSeoMetadataFromConfig, KEYWORD_SEARCH, CATEGORY_SEARCH} from "."

const seoMetadataConfig = {
    amido: {
        uk: {
            category: {
                withFilters: {
                    title: "title: amido uk category with-filters",
                    description: "description: amido uk category with-filters",
                    keywords: "keywords: amido uk category with-filters",
                    robots: "robots: amido uk category with-filters",
                },
                withoutFilters: {
                    title: "title: amido uk category without-filters",
                    description: "description: amido uk category without-filters",
                    keywords: "keywords: amido uk category without-filters",
                    robots: "robots: amido uk category without-filters",
                },
            },
            keyword: {
                withFilters: {
                    title: "title: amido uk keyword with-filters",
                    description: "description: amido uk keyword with-filters",
                    keywords: "keywords: amido uk keyword with-filters",
                    robots: "robots: amido uk keyword with-filters",
                },
                withoutFilters: {
                    title: "title: amido uk keyword without-filters",
                    description: "description: amido uk keyword without-filters",
                    keywords: "keywords: amido uk keyword without-filters",
                    robots: "robots: amido uk keyword without-filters",
                },
            },
        },
        international: {
            category: {
                withFilters: {
                    title: "title: amido international category with-filters",
                    description: "description: amido international category with-filters",
                    keywords: "keywords: amido international category with-filters",
                    robots: "robots: amido international category with-filters",
                },
                withoutFilters: {
                    title: "title: amido international category without-filters",
                    description: "description: amido international category without-filters",
                    keywords: "keywords: amido international category without-filters",
                    robots: "robots: amido international category without-filters",
                },
            },
            keyword: {
                withFilters: {
                    title: "title: amido international keyword with-filters",
                    description: "description: amido international keyword with-filters",
                    keywords: "keywords: amido international keyword with-filters",
                    robots: "robots: amido international keyword with-filters",
                },
                withoutFilters: {
                    title: "title: amido international keyword without-filters",
                    description: "description: amido international keyword without-filters",
                    keywords: "keywords: amido international keyword without-filters",
                    robots: "robots: amido international keyword without-filters",
                },
            },
        },
    },
}

describe("Given `getSeoMetadataFromConfig`", () => {
    describe("When the metadata for amido is in the config", () => {
        describe.each([
            [
                {
                    realm: "amido",
                    territory: "us",
                    searchType: KEYWORD_SEARCH,
                    withFilters: true,
                },
                seoMetadataConfig.amido.international.keyword.withFilters,
            ],
            [
                {
                    realm: "amido",
                    territory: "us",
                    searchType: KEYWORD_SEARCH,
                    withFilters: false,
                },
                seoMetadataConfig.amido.international.keyword.withoutFilters,
            ],
            [
                {
                    realm: "amido",
                    territory: "us",
                    searchType: CATEGORY_SEARCH,
                    withFilters: true,
                },
                seoMetadataConfig.amido.international.category.withFilters,
            ],
            [
                {
                    realm: "amido",
                    territory: "gb",
                    searchType: KEYWORD_SEARCH,
                    withFilters: false,
                },
                seoMetadataConfig.amido.uk.keyword.withoutFilters,
            ],
        ])("With args: %p", (args, expectedResult) => {
            it("should retrieve the correct seo metadata from the config", () => {
                const result = getSeoMetadataFromConfig({...args, config: seoMetadataConfig})
                expect(result).toEqual(expectedResult)
            })

            it("should return a clone", () => {
                const result = getSeoMetadataFromConfig({...args, config: seoMetadataConfig})
                expect(result).not.toBe(expectedResult)
            })
        })
    })

    describe("When the metadata is not in the config", () => {
        it("should return null", () => {
            const result = getSeoMetadataFromConfig({
                realm: "otherRealmType",
                territory: "us",
                searchType: KEYWORD_SEARCH,
                withFilters: false,
                config: seoMetadataConfig,
            })

            expect(result).toBeNull()
        })
    })
})
