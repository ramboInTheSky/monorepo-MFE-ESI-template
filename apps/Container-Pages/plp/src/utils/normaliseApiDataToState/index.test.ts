import {ExternalSearchApiResponse} from "models/searchApi"
import normaliseDataToState from "."

const mockAPiJson = {
    title: "red",
    totalResults: 9999,
    autoCorrectQuery: "foo",
    filters: [
        {
            name: "Test1",
            displayName: "Test 1",
            type: "feat",
            options: [
                {
                    n: "opt1",
                    c: 1,
                    v: "opt1",
                    s: true,
                    incompatibleWith: [],
                },
            ],
        },
        {
            name: "Test2",
            displayName: "Test 2",
            type: "filter",
            options: [
                {
                    n: "opt2",
                    c: 1,
                    v: "opt2",

                    incompatibleWith: [],
                },
            ],
        },
        {
            name: "Test3",
            displayName: "Test 2",
            type: "price",
            min: 0,
            max: 100,
            selectedMin: 20,
            selectedMax: 80,
            currencyCode: "GBP",
        },
    ],
    items: [
        {
            itemNumber: "111111",
            newIn: true,
        },
        {
            itemNumber: "222222",
            newIn: true,
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
        selected: "newpop",
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
    searchCategory: {id: "", name: ""}
}
const mockAPiJsonIncomplete = {
    title: "red",
    totalResults: 9999,
    autoCorrectQuery: "foo",
    filters: [
        {
            name: "Test1",
            displayName: "Test 1",
            type: "feat",
            options: [
                {
                    n: "opt1",
                    c: 1,
                    v: "opt1",
                    s: true,
                    incompatibleWith: [],
                },
            ],
        },
        {
            name: "Test2",
            displayName: "Test 2",
            type: "filter",
            options: [
                {
                    n: "opt2",
                    c: 1,
                    v: "opt2",

                    incompatibleWith: [],
                },
            ],
        },
        {
            name: "Test3",
            displayName: "Test 2",
            type: "price",
            min: 0,
            max: 100,
            selectedMin: 20,
            selectedMax: 80,
            currencyCode: "GBP",
        },
    ],
    items: [
        {
            itemNumber: "111111",
            newIn: true,
        },
        {
            itemNumber: "222222",
            newIn: true,
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
        selected: "newpop",
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
}

const relaxedQueryAPIJson = {
    title: "red",
    totalResults: 9999,
    autoCorrectQuery: "foo",
    filters: [
        {
            name: "Test1",
            displayName: "Test 1",
            type: "feat",
            options: [
                {
                    n: "opt1",
                    c: 1,
                    v: "opt1",
                    s: true,
                    incompatibleWith: [],
                },
            ],
        },
        {
            name: "Test2",
            displayName: "Test 2",
            type: "filter",
            options: [
                {
                    n: "opt2",
                    c: 1,
                    v: "opt2",

                    incompatibleWith: [],
                },
            ],
        },
        {
            name: "Test3",
            displayName: "Test 2",
            type: "price",
            min: 0,
            max: 100,
            selectedMin: 20,
            selectedMax: 80,
            currencyCode: "GBP",
        },
    ],
    items: [
        {
            itemNumber: "111111",
            newIn: true,
        },
        {
            itemNumber: "222222",
            newIn: true,
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
        selected: "newpop",
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
    relaxedQuery: "jeans",
    includedComponents: [],
    searchCategory: {id: "", name: ""}
}

const mockStateData = {
    title: "red",
    totalResults: 9999,
    filters: {
        Test1: {
            name: "Test1",
            facets: ["opt1"],
            displayName: "Test 1",
            type: "feat",
            isFilterOpen: false,
            isViewMoreOpen: false,
        },
        Test2: {
            name: "Test2",
            facets: ["opt2"],
            displayName: "Test 2",
            type: "filter",
            isFilterOpen: false,
            isViewMoreOpen: false,
        },
        Test3: {
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
    filtersSort: ["Test1", "Test2", "Test3"],
    facets: {
        opt1: {n: "opt1", c: 1, v: "opt1", s: true, incompatibleWith: []},
        opt2: {n: "opt2", c: 1, v: "opt2", incompatibleWith: []},
    },
    relaxedQuery: "",
    includedComponents: [],
    searchCategory: {id: "", name: ""},
    items: [
        {itemNumber: "111111", newIn: true},
        {itemNumber: "222222", newIn: true},
    ],
    sorting: {
        selected: "newpop",
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
}

describe("Given a normaliseDataToStatem", () => {
    describe("when normalising data", () => {
        const expectedStateData = {...mockStateData, autoCorrectQuery: "foo"}
        it("should return the expected data", () => {
            expect(normaliseDataToState(mockAPiJson as ExternalSearchApiResponse)).toEqual(expectedStateData)
        })
    })

    describe("when normalising empty data", () => {
        it("should return the expected data", () => {
            const noFiltersJson = {...mockAPiJson}
            noFiltersJson.filters = []

            const noFiltersData = {
                ...mockStateData,
                facets: {},
                filtersSort: [],
                filters: {},
                autoCorrectQuery: "foo",
            }

            expect(normaliseDataToState(noFiltersJson as ExternalSearchApiResponse)).toEqual(noFiltersData)
        })
    })

    describe("when normalising incomplete data", () => {
        it("should return the expected data", () => {
            const noFiltersData = {
                ...mockStateData,
                autoCorrectQuery: "foo",
                includedComponents : [],
                searchCategory: {id: "", name: ""}
            }

            expect(normaliseDataToState(mockAPiJsonIncomplete as any)).toEqual(noFiltersData)
        })
    })

    describe("when normalising data with relaxedQuery", () => {
        it("should return the expected data", () => {
            const relaxedQueryData = {
                ...mockStateData,
                autoCorrectQuery: "foo",
                relaxedQuery: "jeans"
            }

            expect(normaliseDataToState(relaxedQueryAPIJson as ExternalSearchApiResponse)).toEqual(relaxedQueryData)
        })
    })
})
