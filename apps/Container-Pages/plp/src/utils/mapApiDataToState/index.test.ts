import mapApiDataToState from "."
import {Sorting} from "../../models/Sorting"
import {SearchApiResponse} from "../../models/searchApi"

describe("Given a mapApiDataToState", () => {
    describe("When mapping empty data response api data", () => {
        const expectedState = {
            totalResults: undefined,
            facets: {},
            filtersSort: [],
            filters: {},
            items: [],
            relaxedQuery: "",
            sorting: new Sorting(),
            title: "",
            autoCorrectQuery: "",
            includedComponents: [],
            searchCategory: {id: "", name: ""},
            searchBannerHtml: null,
        }
        it("Should return the expected state", () => {
            expect(mapApiDataToState(new SearchApiResponse())).toEqual(expectedState)
        })
    })

    describe("When mapping data response api data", () => {
        const expectedState = {
            title: "red",
            totalResults: 1234,
            autoCorrectQuery: "",
            filters: {
                Size: {
                    name: "Size",
                    displayName: "Size",
                    type: "filter",
                    facets: ["8tall"],
                    isViewMoreOpen: true,
                    isFilterOpen: true,
                },
                Style: {
                    name: "Style",
                    displayName: "Style",
                    type: "filter",
                    facets: ["8tall"],
                    isViewMoreOpen: false,
                    isFilterOpen: false,
                },
                Price: {
                    name: "Test3",
                    displayName: "Test 2",
                    type: "price",
                    min: 0,
                    max: 100,
                    selectedMin: 20,
                    selectedMax: 80,
                    isFilterOpen: true,
                    currencyCode: "GBP",
                },
            },
            filtersSort: ["Size", "Style", "Price"],
            facets: {
                "8tall": {
                    n: "1 Tall",
                    c: 24,
                    v: "8tall",
                    s: true,
                    incompatibleWith: [],
                    d: false,
                },
            },
            items: [
                {itemNumber: "111111", newIn: true},
                {itemNumber: "222222", newIn: false},
            ],
            sorting: {
                selected: "score",
                options: [
                    {
                        name: "Most Relevant",
                        value: "score",
                    },
                    {
                        name: "Most Popular",
                        value: "newpop",
                    },
                    {
                        name: "Alphabetical",
                        value: "alpha",
                    },
                    {
                        name: "Price: Low - High",
                        value: "pricelow",
                    },
                    {
                        name: "Price: High - Low",
                        value: "pricehi",
                    },
                ],
            },
            relaxedQuery: "",
            includedComponents: [],
            searchCategory: {id: "", name: ""},
            searchBannerHtml: null,
        }

        const mockApiData = {
            title: "red",
            totalResults: 1234,
            autoCorrectQuery: "",
            filters: {
                Size: {
                    name: "Size",
                    displayName: "Size",
                    type: "filter",
                    facets: ["8tall"],
                    isViewMoreOpen: false,
                    isFilterOpen: false,
                },
                Style: {
                    name: "Style",
                    displayName: "Style",
                    type: "filter",
                    facets: ["8tall"],
                    isViewMoreOpen: false,
                    isFilterOpen: false,
                },
                Price: {
                    name: "Test3",
                    displayName: "Test 2",
                    isFilterOpen: false,
                    type: "price",
                    min: 0,
                    max: 100,
                    selectedMin: 20,
                    selectedMax: 80,
                    currencyCode: "GBP",
                },
            },
            filtersSort: ["Size", "Style", "Price"],
            facets: {
                "8tall": {
                    n: "1 Tall",
                    c: 24,
                    v: "8tall",
                    s: true,
                    incompatibleWith: [],
                    d: false,
                },
            },
            items: [
                {
                    itemNumber: "111111",
                    newIn: true,
                },
                {
                    itemNumber: "222222",
                    newIn: false,
                },
            ],
            pagination: {
                totalResults: 2403,
                numberOfItems: 24,
                start: 0,
                previousPageUrl: "http://resourceUrl/resourceEndpoint?params",
                nextPageUrl: "http://resourceUrl/resourceEndpoint?params",
            },
            keywordRedirect: {
                redirectedUrl: "/clearance",
                redirectedQuery: "clearance",
                originalQuery: "clearance",
            },
            sorting: {
                selected: "score",
                options: [
                    {
                        name: "Most Relevant",
                        value: "score",
                    },
                    {
                        name: "Most Popular",
                        value: "newpop",
                    },
                    {
                        name: "Alphabetical",
                        value: "alpha",
                    },
                    {
                        name: "Price: Low - High",
                        value: "pricelow",
                    },
                    {
                        name: "Price: High - Low",
                        value: "pricehi",
                    },
                ],
            },
            redirect: null,
            relaxedQuery: "",
            includedComponents: [],
            searchCategory: {id: "", name: ""},
            searchBannerHtml: null,
        }
        const mockCookie = {
            page: "test",
            filterCategorySettings: {
                Size: {
                    viewMoreOpened: true,
                    isOpen: true,
                },
                Test: {
                    viewMoreOpened: true,
                    isOpen: true,
                },
                Price: {
                    viewMoreOpened: false,
                    isOpen: true,
                },
            },
        }
        it("Should return the expected state", () => {
            expect(mapApiDataToState(mockApiData as SearchApiResponse, mockCookie)).toEqual(expectedState)
        })
    })
})
