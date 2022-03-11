import {filterNonSingleOptionFacetList, prefixProtocolToUrl} from "."
import {SearchApiRequestTypes} from "../../config/constants"
import {FilterFacetApiResponse} from "../../models/Filter"

const mockApiData = {
    totalResults: 20,
    redirect: null,
    filters: null,
    items: [
        {
            itemNumber: "408697",
            newIn: false,
        },
    ],
    pagination: null,
    keywordRedirect: null,
    sorting: null,
} as any

const mockFilters: FilterFacetApiResponse = [
    {
        options: [
            {
                incompatibleWith: ["feat:backinstock"],
                n: "Newin",
                v: "feat:newin",
                c: 843,
                s: false,
            },
        ],
        name: "feat",
        displayName: "Feat",
        type: "feat",
    },
    {
        options: [
            {
                n: "Newborn Unisex",
                v: "gender:newbornunisex",
                c: 11,
                s: true,
            },
        ],
        name: "gender",
        displayName: "Gender",
        type: "filter",
    },
    {
        min: 0,
        max: 3000,
        selectedMin: 0,
        selectedMax: 3000,
        currencyCode: "GBP",
        name: "Price",
        displayName: "Price",
        type: "price",
    },
] as any

const mockConfig = {
    "monorepo.plp.frontend.singleOptionFacetList": {
        Value: ["personalised", "feat", "sizetype", "deliverby"],
    },
}

describe("Given a filterNonSingleOptionFacetList() function", () => {
    it("should return the non filter data without modifying it", () => {
        expect(
            filterNonSingleOptionFacetList({
                apiData: mockApiData,
                config: mockConfig,
                request: {
                    siteUrl: "http://localhost:3009",
                    type: SearchApiRequestTypes.Category,
                    url: "localhost:3009/shop/gender-women",
                },
            }),
        ).toEqual(mockApiData)
    })

    it("should return the data with filters by modifying it", () => {
        expect(
            filterNonSingleOptionFacetList({
                apiData: {...mockApiData, filters: mockFilters},
                config: {
                    ...mockConfig,
                    "monorepo.plp.frontend.singleOptionFacetList": {
                        Value: [],
                    },
                },
                request: {
                    siteUrl: "http://localhost:3009",
                    type: SearchApiRequestTypes.Category,
                    url: "localhost:3009/shop/gender-newbornunisex",
                },
            }),
        ).toEqual({
            ...mockApiData,
            filters: [
                {
                    options: [
                        {
                            incompatibleWith: ["feat:backinstock"],
                            n: "Newin",
                            v: "feat:newin",
                            c: 843,
                            s: false,
                        },
                    ],
                    name: "feat",
                    displayName: "Feat",
                    type: "feat",
                },
                {
                    min: 0,
                    max: 3000,
                    selectedMin: 0,
                    selectedMax: 3000,
                    currencyCode: "GBP",
                    name: "Price",
                    displayName: "Price",
                    type: "price",
                },
            ],
        })
    })

    describe("When there are filters present in apiData", () => {
        it("should return the correct values", () => {
            expect(
                filterNonSingleOptionFacetList({
                    apiData: {...mockApiData, filters: mockFilters},
                    config: mockConfig,
                    request: {
                        siteUrl: "http://localhost:3009",
                        type: SearchApiRequestTypes.Category,
                        url: "localhost:3009/shop/gender-women",
                    },
                }),
            ).toEqual({
                ...mockApiData,
                filters: [
                    {
                        options: [
                            {
                                incompatibleWith: ["feat:backinstock"],
                                n: "Newin",
                                v: "feat:newin",
                                c: 843,
                                s: false,
                            },
                        ],
                        name: "feat",
                        displayName: "Feat",
                        type: "feat",
                    },
                    {
                        options: [{n: "Newborn Unisex", v: "gender:newbornunisex", c: 11, s: true}],
                        name: "gender",
                        displayName: "Gender",
                        type: "filter",
                    },
                    {
                        min: 0,
                        max: 3000,
                        selectedMin: 0,
                        selectedMax: 3000,
                        currencyCode: "GBP",
                        name: "Price",
                        displayName: "Price",
                        type: "price",
                    },
                ],
            })
        })
    })
})

describe("Given prefixProtocolToUrl() function", () => {
    it("should not return prefixed url", () => {
        expect(prefixProtocolToUrl("http://mainUrl.com", "https://siteUrl")).toEqual("http://mainUrl.com")
    })

    it("should prefix url", () => {
        expect(prefixProtocolToUrl("mainUrl.com", "https://siteUrl")).toEqual("https://mainUrl.com")
    })
})
